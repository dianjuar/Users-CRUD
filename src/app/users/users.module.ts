import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ApiUsersComponent } from './api-users/api-users.component';
import { LocalUsersComponent } from './local-users/local-users.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersComponent, ApiUsersComponent, LocalUsersComponent]
})
export class UsersModule { }
