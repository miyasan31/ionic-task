import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  title = 'タスク一覧';
  taskList = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    if ('taskList' in localStorage) {
      this.taskList = JSON.parse(localStorage.taskList);
    }
  }

  async updateTask(index: number) {
    const prompt = await this.alertController.create({
      header: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.taskList[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: (data) => {
            this.taskList[index] = { name: data.task };
            localStorage.taskList = JSON.stringify(this.taskList);
          },
        },
      ],
    });
    prompt.present();
  }

  async changeTask(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.taskList = this.taskList.filter((_, i) => i !== index);
            localStorage.taskList = JSON.stringify(this.taskList);
          },
        },
        {
          text: '変更',
          icon: 'create',
          handler: () => {
            this.updateTask(index);
          },
        },
        {
          text: '閉じる',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('キャンセル');
          },
        },
      ],
    });
    actionSheet.present();
  }
}
