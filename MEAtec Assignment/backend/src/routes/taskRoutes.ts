import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { taskSchema, updateTaskSchema } from '../utils/validation';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', validateRequest(taskSchema), createTask);
router.put('/:id', validateRequest(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;

