import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { isNotNUllOrUndefined } from '../services/app.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.scss']
})
export class MytaskComponent implements OnInit {
  @ViewChild('taskList', { static: false }) taskList: TaskListComponent;
  tasks?: any;
  taskObj = new MyTask('', new Date(), '', 'New', false, false)
  isTaskSave: boolean;
  errorMessage = null;
  isError = false;
  isTaskUpdate = false;
  isTaskLoad: boolean = false;
  constructor(public apiService: ApiService, private router: Router, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || !isNotNUllOrUndefined(isLoggedIn)) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.fetchTasks()
  }

  fetchTasks() {
    // fetch all task
    this.apiService.getTodoTasks().subscribe(res => {
      if (res.status === "success") {
        this.tasks = res.data;
        this.isTaskLoad = true;
      }
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onSubmit(e) {
    e.preventDefault();
    if (!isNotNUllOrUndefined(this.taskObj.name)) {
      this.errorMessage = "name can not be null";
      this.isError = true;
    } else if (!isNotNUllOrUndefined(this.taskObj.dueDate)) {
      this.errorMessage = "Date can not be null";
      this.isError = true;
    } else if (!isNotNUllOrUndefined(this.taskObj.description)) {
      this.errorMessage = "Description can not be null";
      this.isError = true;
    } else {
      this.isTaskSave = true;
      this.isError = false;
      this.errorMessage = null;
      if (this.isTaskUpdate) {
        var TaskObjIndex = this.tasks.findIndex(
          ele => ele._id === this.taskObj._id
        );
        if (TaskObjIndex === -1) {
          return;
        }
        this.taskObj = {
          ...this.taskObj,
          dueDate: this.taskObj.dueDate
        };
        // Update task
        this.updateTodoTaskCommonMethod(this.taskObj, TaskObjIndex);
        this.isTaskUpdate = false;
        this.resetTaskForm();
        return;
      }
      this.taskObj = {
        ...this.taskObj,
        dueDate: this.taskObj.dueDate
      };
      // save task
      this.apiService.saveTodoTask(this.taskObj).subscribe(res => {
        if (res.status === 200) {
          this.tasks.push(res.data.data);
        }
      });
      this.resetTaskForm();
    }
  }

  // update task
  updateTodoTaskCommonMethod(taskObj, index) {
    this.apiService.updateTodoTaskById(taskObj._id, taskObj).subscribe(res => {
      if (res.status === 200) {
        this.tasks.splice(index, 1, taskObj);
      }
    });
  }

  handleTaskUpdate(taskObj) {
    if (taskObj.isCompleted) {
      return;
    }
    this.taskObj = {
      ...taskObj,
      status: "New",
      inProgress: false,
      isCompleted: false,
      dueDate: null
    };

    this.isTaskUpdate = true;
    this.isTaskSave = false;
  }

  // delete task by id
  handleTaskRemove(taskObj, index) {
    this.apiService.removeTodoTaskById(taskObj._id).subscribe(res => {
      if (res.status === 200) {
        this.tasks.splice(index, 1, taskObj);
      }
    });
    //
  }


  childEventHandling(EventObjRef) {
    // eslint-disable-next-line no-console
    if (EventObjRef["type"]) {
      if (EventObjRef.type === "Task_Completed_Type") {
        this.handleTaskCompleteAction(
          EventObjRef.event,
          EventObjRef.data,
          EventObjRef.index
        );
      } else if (EventObjRef.type === "Task_InProgress_Type") {
        this.handleTaskProgress(EventObjRef.data, EventObjRef.index);
      } else if (EventObjRef.type === "Task_Update_Type") {
        this.handleTaskUpdate(EventObjRef.data);
      } else if (EventObjRef.type === "Task_Delete_Type") {
        this.handleTaskRemove(EventObjRef.data, EventObjRef.index);
      }
    }
  }

  // Complete Task
  handleTaskCompleteAction(e, taskObj, index) {
    if (taskObj.isCompleted) {
      e.preventDefault();
      return;
    }
    taskObj = {
      ...taskObj,
      isCompleted: true,
      inProgress: false,
      status: "Completed"
    };
    this.updateTodoTaskCommonMethod(taskObj, index);
    this.resetTaskForm();
  }

  // reset form
  resetTaskForm() {
    setTimeout(() => {
      this.isTaskSave = false;
      this.taskObj = {
        name: null,
        dueDate: null,
        description: null,
        status: "New",
        inProgress: false,
        isCompleted: false
      };
    }, 500);
  }

  // In Progress Task
  handleTaskProgress(taskObj, index) {
    if (!taskObj.inProgress) {
      taskObj = {
        ...taskObj,
        inProgress: true,
        isCompleted: false,
        status: "New"
      };
      this.updateTodoTaskCommonMethod(taskObj, index);
      return;
    }
    taskObj = {
      ...taskObj,
      inProgress: false,
      isCompleted: false,
      status: "New"
    };
    this.updateTodoTaskCommonMethod(taskObj, index);
  };
}



export class MyTask {

  constructor(
    public name: string,
    public dueDate: Date,
    public description: string,
    public status: string,
    public inProgress: boolean,
    public isCompleted: boolean,
    public _id?: number,
  ) {

  }
}
