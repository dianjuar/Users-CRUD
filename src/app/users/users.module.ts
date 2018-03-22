import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

// Components
import { ApiUsersComponent } from './api-users/api-users.component';
import { LocalUsersComponent } from './local-users/local-users.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';

import { ApiUserService } from './shared/api-user.service';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule
  ],
  declarations: [UsersComponent, ApiUsersComponent, LocalUsersComponent],
  exports: [UsersComponent],
  providers: [ApiUserService]
})
export class UsersModule { }
