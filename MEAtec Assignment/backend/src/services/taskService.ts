import prisma from '../config/database';

export const getTasksByUserId = async (userId: number) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTask = async (
  userId: number,
  title: string,
  description?: string,
  status: 'pending' | 'completed' = 'pending'
) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      status,
      userId,
    },
  });
};

export const updateTask = async (
  taskId: number,
  userId: number,
  data: {
    title?: string;
    description?: string;
    status?: 'pending' | 'completed';
  }
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error('Task not found or you do not have permission');
  }

  return await prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = async (taskId: number, userId: number) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error('Task not found or you do not have permission');
  }

  return await prisma.task.delete({
    where: { id: taskId },
  });
};

