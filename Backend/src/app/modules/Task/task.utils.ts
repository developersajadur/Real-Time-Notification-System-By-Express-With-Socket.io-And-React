import { MemberModel } from '../Member/member.model';
import { TaskModel } from './task.model';

export const autoAssignMember = async (projectId: string) => {
  const projectTasks = await TaskModel.find({ project: projectId });

  // Count tasks per member
  const taskCount: Record<string, number> = {};
  projectTasks.forEach((t) => {
    if (t.assignedTo) {
      const id = t.assignedTo.toString();
      taskCount[id] = (taskCount[id] || 0) + 1;
    }
  });

  // Get project team ID from project (populate in service)
  const members = await MemberModel.find({ team: projectId });

  // Pick least-loaded member within capacity
  let bestMember = null;
  let bestLoad = Infinity;

  for (const m of members) {
    const load = taskCount[m._id.toString()] || 0;
    if (load < m.capacity && load < bestLoad) {
      bestMember = m;
      bestLoad = load;
    }
  }

  return bestMember?._id || null;
};
