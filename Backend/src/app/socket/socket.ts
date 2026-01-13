/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import config from '../config';
import { TTokenUser } from '../middlewares/auth';
import { allowedOrigins } from '../utils/cors';

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.use((socket: any, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error('Authentication token missing'));
      }

      const decoded = jwt.verify(
        token,
        config.jwt_token_secret as string,
      ) as TTokenUser;

      socket.data.user = {
        id: decoded.userId,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user.id;

    socket.join(`user:${userId}`);

    socket.on('disconnect', () => {
      socket.leave(`user:${userId}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
