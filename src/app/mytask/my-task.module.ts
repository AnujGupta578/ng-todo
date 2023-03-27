import { NgModule } from "@angular/core";
import { MytaskComponent } from './mytask.component';
import { MyTaskRoutingModule } from './mytask.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskListModule } from '../task-list/task-list.module';

@NgModule({
    imports: [
        MyTaskRoutingModule,
        FormsModule,
        CommonModule,
        TaskListModule
    ],
    declarations: [MytaskComponent],
    exports: [MytaskComponent],
    providers: []
})

export class MyTaskModule {

}