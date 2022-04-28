import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from './task/reducer';
import { Task } from './task/type';

export type Reducers = {
  taskList: Task[];
};

export const reducers: ActionReducerMap<Reducers> = {
  taskList: taskReducer,
};
