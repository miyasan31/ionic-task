import { createAction, props } from '@ngrx/store';
import { Task } from './type';

export const readTaskAction = createAction('TASK_READ', props<{ taskList: Task[] }>());
export const createTaskAction = createAction('TASK_CREATE', props<{ task: Task }>());
export const updateTaskAction = createAction('TASK_UPDATE', props<{ index: number; task: Task }>());
export const deleteTaskAction = createAction('TASK_DELETE', props<{ index: number }>());
