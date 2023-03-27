import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routes';

@NgModule({
    imports: [
        FormsModule,
        LoginRoutingModule,
        CommonModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: []
})

export class LoginModule {

}