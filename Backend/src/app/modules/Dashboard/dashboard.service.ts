/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { ProjectModel } from '../Project/project.model';
import { TaskModel } from '../Task/task.model';
import { TeamModel } from '../Team/team.model';
import { MemberModel } from '../Member/member.model';
import { ActivityLogModel } from '../ActivityLog/activity.model';

type TeamSummaryItem = {
  teamId: string;
  teamName: string;
  members: Array<{
    memberId: string;
    name: string;
    role: string;
    capacity: number;
    currentTasks: number;
    overloaded: boolean;
  }>;
};

type IActivityPopulated = {
  _id: string;
  message: string;
  createdAt: Date;

  task?: { _id: string; title: string };
  fromMember?: { _id: string; name: string };
  toMember?: { _id: string; name: string };
};

export const dashboardService = {
  async getSummary(ownerId: string, teamId?: string) {
    // ------------------------------
    // 1) Total Projects
    // ------------------------------
    const projectFilter: any = { owner: new Types.ObjectId(ownerId) };
    if (teamId) projectFilter.team = new Types.ObjectId(teamId);

    const totalProjects = await ProjectModel.countDocuments(projectFilter);

    const projectIds = (
      await ProjectModel.find(projectFilter).select('_id')
    ).map((p) => p._id);

    // ------------------------------
    // 2) Total Tasks
    // ------------------------------
    const totalTasks = await TaskModel.countDocuments({
      project: { $in: projectIds },
    });

    // ------------------------------
    // 3) Team Summaries
    // ------------------------------
    const teamFilter: any = teamId
      ? { _id: new Types.ObjectId(teamId), owner: new Types.ObjectId(ownerId) }
      : { owner: new Types.ObjectId(ownerId) };

    const teams = await TeamModel.find(teamFilter).select('_id name');
    const teamSummaries: TeamSummaryItem[] = [];

    const taskCountsAgg = await TaskModel.aggregate([
      {
        $match: {
          project: { $in: projectIds },
          status: { $in: ['Pending', 'In Progress'] },
        },
      },
      { $group: { _id: '$assignedTo', count: { $sum: 1 } } },
    ]);

    const countsMap = new Map<string, number>();
    taskCountsAgg.forEach((r) => {
      if (r._id) countsMap.set(r._id.toString(), r.count);
    });

    for (const t of teams) {
      const members = await MemberModel.find({ team: t._id }).select(
        '_id name role capacity',
      );

      const memberSummaries = members.map((m) => {
        const cur = countsMap.get(m._id.toString()) || 0;
        return {
          memberId: m._id.toString(),
          name: m.name,
          role: m.role,
          capacity: m.capacity,
          currentTasks: cur,
          overloaded: cur > m.capacity,
        };
      });

      teamSummaries.push({
        teamId: t._id.toString(),
        teamName: t.name,
        members: memberSummaries,
      });
    }

    // ------------------------------
    // 4) ACTIVITY LOG SECTIONS
    // ------------------------------

    // 4.1 Recent Assignments (assignedTo only)
    const assignmentsRaw = await ActivityLogModel.find({
      fromMember: null,
      toMember: { $ne: null },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('task', 'title')
      .populate('toMember', 'name')
      .lean();

    const recentAssignments = assignmentsRaw.map((rec) => {
      const r = rec as unknown as IActivityPopulated;
      return {
        _id: r._id,
        message: r.message,
        taskId: r.task?._id,
        taskTitle: r.task?.title,
        toMemberId: r.toMember?._id,
        toMemberName: r.toMember?.name,
        createdAt: r.createdAt,
      };
    });

    // 4.2 Recent Reassignments (fromMember + toMember)
    const reassignmentsRaw = await ActivityLogModel.find({
      fromMember: { $ne: null },
      toMember: { $ne: null },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('task', 'title')
      .populate('fromMember', 'name')
      .populate('toMember', 'name')
      .lean();

    const recentReassignments = reassignmentsRaw.map((rec) => {
      const r = rec as unknown as IActivityPopulated;
      return {
        _id: r._id,
        message: r.message,
        taskId: r.task?._id,
        taskTitle: r.task?.title,
        fromMemberId: r.fromMember?._id,
        fromMemberName: r.fromMember?.name,
        toMemberId: r.toMember?._id,
        toMemberName: r.toMember?.name,
        createdAt: r.createdAt,
      };
    });

    // 4.3 Recent Updates (no member movement)
    const updatesRaw = await ActivityLogModel.find({
      fromMember: null,
      toMember: null,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('task', 'title')
      .lean();

    const recentUpdates = updatesRaw.map((rec) => {
      const r = rec as unknown as IActivityPopulated;
      return {
        _id: r._id,
        message: r.message,
        taskId: r.task?._id,
        taskTitle: r.task?.title,
        createdAt: r.createdAt,
      };
    });

    return {
      totalProjects,
      totalTasks,
      teamSummaries,
      recentAssignments,
      recentReassignments,
      recentUpdates,
    };
  },
};
