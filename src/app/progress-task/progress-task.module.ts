import { NgModule } from "@angular/core";
import { ProgressTaskComponent } from './progress-task.component';
import { ProgressTaskRoutingModule } from './progress-task.routes';
import { TaskListModule } from '../task-list/task-list.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ProgressTaskRoutingModule,
        TaskListModule
    ],
    declarations: [ProgressTaskComponent],
    exports: [ProgressTaskComponent],
    providers: []
})

export class ProgressTaskModule {

}