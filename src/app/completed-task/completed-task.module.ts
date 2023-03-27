import { NgModule } from "@angular/core";
import { CompletedTaskComponent } from './completed-task.component';
import { CompletedTaskRoutingModule } from './completed-task.routes';
import { TaskListModule } from '../task-list/task-list.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CompletedTaskRoutingModule,
        TaskListModule,
        CommonModule,
    ],
    declarations: [CompletedTaskComponent],
    exports: [CompletedTaskComponent],
    providers: []
})

export class CompletedTaskModule {

}