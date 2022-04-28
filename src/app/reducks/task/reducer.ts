import { Action, createReducer, on } from '@ngrx/store';
import { createTaskAction, deleteTaskAction, updateTaskAction } from './action';
import { Task } from './type';

const initialState: Task[] = [];

const reducer = createReducer(
  initialState,
  on(createTaskAction, (state, action) => [...state, action.task]),
  on(updateTaskAction, (state, action) =>
    state.map((task, index) => (index === action.index ? action.task : task)),
  ),
  on(deleteTaskAction, (state, action) => state.filter((_, i) => i !== action.index)),
);

export const taskReducer = (taskList: Task[], action: Action): Task[] => reducer(taskList, action);
