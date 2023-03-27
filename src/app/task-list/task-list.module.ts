import { NgModule } from "@angular/core";
import { TaskListComponent } from './task-list.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TaskListComponent],
    exports: [TaskListComponent],
    providers: []
})

export class TaskListModule {

}