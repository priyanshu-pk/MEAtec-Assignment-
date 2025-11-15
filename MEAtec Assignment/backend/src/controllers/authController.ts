import { Response } from 'express';
import { AuthRequest, ApiResponse } from '../types';
import { registerUser, loginUser } from '../services/authService';

export const register = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const { username, password } = req.body;
    const result = await registerUser(username, password);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    });
  }
};

export const login = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    });
  }
};

