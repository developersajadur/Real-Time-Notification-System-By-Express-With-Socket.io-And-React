import { getIO } from './socket';

const emitToUser = (userId: string, event: string, payload: unknown) => {
  const io = getIO();
  io.to(`user:${userId}`).emit(event, payload);
};

export const socketEmitter = {
  emitToUser,
};
