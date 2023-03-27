import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { CompletedTaskComponent } from './completed-task.component';

const routes: Routes = [
    {
        path: '',
        component: CompletedTaskComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompletedTaskRoutingModule {

}