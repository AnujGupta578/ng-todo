import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MyTask } from '../mytask/mytask.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input('tasks') tasks;
  @Input('inProgressView') inProgressView;
  @Input('isCompletedView') isCompletedView;
  @Output() taskEventRef = new EventEmitter<{}>();
  taskData: Array<any>;
  isDataEmpty: boolean;
  constructor() { }

  ngOnInit() {
    this.taskData = this.tasks;
    this.isDataEmpty = this.taskData.length === 0;
  }

  stopPropagate(e) {
    e.preventDefault();
  }


  childEventHandling(data) {
    console.log(data);
    this.taskEventRef.emit(data);

  }

}
