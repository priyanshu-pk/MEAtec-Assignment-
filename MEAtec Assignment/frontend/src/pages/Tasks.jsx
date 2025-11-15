import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  createTask,
  clearMessage,
} from '../store/slices/taskSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import Navbar from '../components/Navbar';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).default('pending'),
});

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error, message } = useSelector(
    (state) => state.tasks
  );
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: 'pending',
    },
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(createTask(data)).unwrap();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
              My Tasks
            </h1>
            <Button
              variant="primary"
              onClick={() => setShowForm(!showForm)}
              className="text-lg px-8"
            >
              {showForm ? 'Cancel' : '+ New Task'}
            </Button>
          </div>

          <SuccessMessage
            message={message}
            onClose={() => dispatch(clearMessage())}
          />
          <ErrorMessage
            message={error}
            onClose={() => dispatch(clearMessage())}
          />

          {showForm && (
            <div className="glass p-8 rounded-3xl shadow-2xl border border-white/30 mb-8 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 gradient-text">
                Create New Task
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  placeholder="Enter task title"
                />
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    {...register('description')}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
                    rows="4"
                    placeholder="Enter task description"
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
                <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
                  Create Task
                </Button>
              </form>
            </div>
          )}
        </div>

        {isLoading && tasks.length === 0 ? (
          <Loader message="Loading tasks..." />
        ) : tasks.length === 0 ? (
          <div className="glass p-16 rounded-3xl shadow-2xl text-center border border-white/30">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-700 text-xl font-semibold">
              No tasks yet. Create your first task!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
