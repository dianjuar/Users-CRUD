import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { LocalUser } from './local-user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class LocalUserService {

  /**
   * The endpoint to "save" the users
   */
  private readonly saveUsersEndPoint = 'https://reqres.in/api/users';

  constructor(
    private http: HttpClient
  ) {

  }

  /**
   * Save user
   *
   * @param user The user to save
   */
  saveUser(user: LocalUser) {
    this.http.post(this.saveUsersEndPoint, { })
      .do(() => console.log('saved'))
      .subscribe();
  }

}
