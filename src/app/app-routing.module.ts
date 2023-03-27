import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'complete-task',
    loadChildren: () => import('./completed-task/completed-task.module').then((m) => m.CompletedTaskModule)
  },
  {
    path: 'my-task',
    loadChildren: () => import('./mytask/my-task.module').then((m) => m.MyTaskModule)
  },
  {
    path: 'progress-task',
    loadChildren: () => import('./progress-task/progress-task.module').then((m) => m.ProgressTaskModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
