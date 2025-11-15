import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/slices/taskSlice';

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']),
});

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || '',
      status: task.status,
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateTask({ id: task.id, ...data })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(task.id)).unwrap();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="glass p-6 rounded-2xl shadow-2xl border border-white/30 transform transition-all duration-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            register={register}
            error={errors.title}
          />
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              rows="3"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="flex-1">
              Save
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                task.status === 'completed'
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
              }`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500 font-medium bg-white/50 px-3 py-1 rounded-lg">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <Button
          variant="primary"
          onClick={() => setIsEditing(true)}
          className="flex-1"
        >
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete} className="flex-1">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
