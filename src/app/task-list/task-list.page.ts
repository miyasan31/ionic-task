import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Reducers } from '../reducks/reducers';
import { deleteTaskAction, updateTaskAction } from '../reducks/task/action';
import { Task } from '../reducks/task/type';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  title = 'タスク一覧';
  taskList$: Observable<Task[]>;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private store: Store<Reducers>,
  ) {
    this.taskList$ = store.select('taskList');
  }

  ngOnInit() {}

  async updateTask(index: number) {
    this.taskList$
      .pipe(
        filter((_, i) => i === 0),
        take(1),
      )
      .subscribe(async (taskList) => {
        const prompt = await this.alertController.create({
          header: '変更後のタスク',
          inputs: [
            {
              name: 'task',
              placeholder: 'タスク',
              value: taskList[index].name,
            },
          ],
          buttons: [
            {
              text: '閉じる',
            },
            {
              text: '保存',
              handler: (data) => {
                this.store.dispatch(updateTaskAction({ index, task: { name: data.task } }));
              },
            },
          ],
        });

        prompt.present();
      });
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
            this.store.dispatch(deleteTaskAction({ index }));
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
          handler: () => null,
        },
      ],
    });
    actionSheet.present();
  }
}
