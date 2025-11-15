import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../store/slices/authSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (token) {
      navigate('/tasks');
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/tasks');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
            Get Started
          </h2>
          <p className="text-white/90 text-lg">
            Create your account to manage tasks
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="glass py-10 px-8 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl">
            <ErrorMessage
              message={error}
              onClose={() => dispatch(clearError())}
            />
            <Input
              label="Username"
              name="username"
              register={register}
              error={errors.username}
              placeholder="Enter your username"
              autoComplete="username"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-6"
            >
              Create Account
            </Button>
            <p className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-purple-600 hover:text-purple-700 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
