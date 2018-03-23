import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { ApiUsersComponent } from './api-users/api-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LocalUsersComponent } from './local-users/local-users.component';
import { UsersComponent } from './users.component';

// Services
import { ApiUserService } from './shared/api-user.service';
// Modules
import { LoadingModule } from 'ngx-loading';

// Material
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { LocalUserService } from './shared/local-user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,

    // Material
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  declarations: [UsersComponent, ApiUsersComponent, LocalUsersComponent, CreateUserComponent],
  exports: [UsersComponent],
  providers: [ApiUserService, LocalUserService],
  entryComponents: [
    CreateUserComponent
  ]
})
export class UsersModule { }
