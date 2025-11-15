import { Response } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import {
  getTasksByUserId,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../services/taskService';

export const getTasks = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.userId!;
    const tasks = await getTasksByUserId(userId);

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch tasks',
    });
  }
};

export const createTaskHandler = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.userId!;
    const { title, description, status } = req.body;

    const task = await createTaskService(
      userId,
      title,
      description,
      status || 'pending'
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create task',
    });
  }
};

export const updateTaskHandler = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.userId!;
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    const task = await updateTaskService(taskId, userId, {
      title,
      description,
      status,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update task',
    });
  }
};

export const deleteTaskHandler = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.userId!;
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    await deleteTaskService(taskId, userId);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete task',
    });
  }
};

export const createTask = createTaskHandler;
export const updateTask = updateTaskHandler;
export const deleteTask = deleteTaskHandler;

