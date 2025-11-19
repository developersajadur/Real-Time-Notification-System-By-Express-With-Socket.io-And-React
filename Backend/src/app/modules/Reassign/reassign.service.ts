/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityLogModel } from '../ActivityLog/activity.model';
import { MemberModel } from '../Member/member.model';
import { TaskModel } from '../Task/task.model';

export const reassignTasksService = async () => {
  // Step 1: all members load check
  const members = await MemberModel.find({});
  const tasks = await TaskModel.find({});

  const taskCount: Record<string, number> = {};

  tasks.forEach((t) => {
    if (!t.assignedTo) return;
    const id = t.assignedTo.toString();
    taskCount[id] = (taskCount[id] || 0) + 1;
  });

  const overloaded: any[] = [];
  const underloaded: any[] = [];

  // Step 2: Find overloaded & underloaded members
  members.forEach((m) => {
    const load = taskCount[m._id.toString()] || 0;

    if (load > m.capacity) {
      overloaded.push({ member: m, load });
    } else if (load < m.capacity) {
      underloaded.push({
        member: m,
        load,
        free: m.capacity - load,
      });
    }
  });

  const logs: any[] = [];

  // Step 3: Process overloaded members
  for (const o of overloaded) {
    const { member } = o;
    const extra = o.load - member.capacity;

    // Fetch LOW + MEDIUM priority tasks (eligible for move)
    const candidateTasks = await TaskModel.find({
      assignedTo: member._id,
      priority: { $in: ['Low', 'Medium'] },
    }).sort({ priority: 1 }); // Low first

    let remaining = extra;

    for (const task of candidateTasks) {
      if (remaining <= 0) break;

      // Pick the underloaded member with maximum free capacity
      const target = underloaded.sort((a, b) => b.free - a.free)[0];
      if (!target || target.free <= 0) break;

      // Step 4: Move task
      const prevMember = member._id;
      const newMember = target.member._id;

      task.assignedTo = newMember;
      await task.save();

      // update free capacity
      target.free -= 1;
      remaining -= 1;

      // Step 5: Create log
      const log = await ActivityLogModel.create({
        message: `Task "${task.title}" reassigned from ${member.name} to ${target.member.name}`,
        task: task._id,
        fromMember: prevMember,
        toMember: newMember,
      });

      logs.push(log);
    }
  }

  return logs;
};
