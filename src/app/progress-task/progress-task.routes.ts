import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ProgressTaskComponent } from './progress-task.component';

const routes: Routes = [
    {
        path: '',
        component: ProgressTaskComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgressTaskRoutingModule {

}