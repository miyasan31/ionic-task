import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  title = 'タスク登録';
  taskList = [];
  inputTask = '';

  constructor() {}

  ngOnInit() {
    this.taskList = JSON.parse(localStorage.taskList);
  }

  onClick() {
    if (!this.inputTask) {
      return;
    }
    this.taskList = [...this.taskList, { name: this.inputTask }];
    localStorage.taskList = JSON.stringify(this.taskList);
    this.inputTask = '';
  }
}
