import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNotNUllOrUndefined } from '../services/app.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.scss']
})
export class CompletedTaskComponent implements OnInit {
  tasks = [];
  isCompletedView = true;
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
    this.apiService.getCompletedTask().subscribe(res => {
      if (res.status === "success") {
        this.isTaskLoad = true;
        this.tasks = res.data;
      }
    });
  };

}
