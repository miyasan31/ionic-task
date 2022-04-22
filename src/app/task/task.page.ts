import { Component, OnInit } from '@angular/core';
import { initialize } from '@ionic/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  title = 'タスク登録';
  taskList = [];
  task = {
    editIndex: null,
    inputTask: '',
  };

  constructor() {}

  ngOnInit() {
    if ('taskList' in localStorage) {
      this.taskList = JSON.parse(localStorage.taskList);
    }
  }

  onTaskUpsert() {
    if (!this.task) {
      return;
    }

    if (!this.task.editIndex) {
      // 編集
      this.taskList[this.task.editIndex] = { name: this.task.inputTask };
    } else {
      // 追加
      this.taskList = [...this.taskList, { name: this.task.inputTask }];
    }

    localStorage.taskList = JSON.stringify(this.taskList);
    this.task = {
      editIndex: null,
      inputTask: '',
    };
  }

  onTaskEdit(index: number) {
    this.task = {
      editIndex: index,
      inputTask: this.taskList.filter((_, i) => i === index)[0].name,
    };
  }

  onTaskDelete(index: number) {
    this.taskList = this.taskList.filter((_, i) => i !== index);
    localStorage.taskList = JSON.stringify(this.taskList);
  }
}
