import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../store/task/type';
import { createTaskAction, deleteTaskAction, updateTaskAction } from '../store/task/action';
import { Reducers } from '../store/reducers';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  title = 'タスク登録';
  taskList$: Observable<Task[]>;
  task = {
    editIndex: null,
    inputText: '',
  };

  constructor(private store: Store<Reducers>) {
    this.taskList$ = store.select('taskList');
  }

  onTaskUpsert() {
    // CMT:indexが0の場合があるためnullで判断
    if (this.task.editIndex !== null) {
      // 編集
      this.store.dispatch(
        updateTaskAction({ index: this.task.editIndex, task: { name: this.task.inputText } }),
      );
    } else {
      // 追加
      this.store.dispatch(createTaskAction({ task: { name: this.task.inputText } }));
    }

    this.task = {
      editIndex: null,
      inputText: '',
    };
  }

  onTaskEdit(index: number, taskName: Task['name']) {
    this.task = {
      editIndex: index,
      inputText: taskName,
    };
  }

  onTaskDelete(index: number) {
    this.store.dispatch(deleteTaskAction({ index }));
  }
}
