import { Component, OnInit } from '@angular/core';
import { isNotNUllOrUndefined } from '../services/app.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-progress-task',
  templateUrl: './progress-task.component.html',
  styleUrls: ['./progress-task.component.scss']
})
export class ProgressTaskComponent implements OnInit {
  tasks?: any;
  inProgressView = true;
  isTaskLoad: boolean;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.created();
  }

  created() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || !isNotNUllOrUndefined(isLoggedIn)) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.apiService.getInProgressTask().subscribe(res => {
      if (res.status === "success") {
        this.isTaskLoad = true;
        this.tasks = res.data;

      }
    });
  };

}
