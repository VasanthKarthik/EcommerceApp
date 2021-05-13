import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';

const credentials = 'current-user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser: IUser;
  public loginSubject = new BehaviorSubject<boolean>(false);

  login$ = this.loginSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(userData: any) {
    return new Promise((resolve, reject) => {
      const url = 'assets/json/userDetails.json';
      this.http
        .get(url)
        .toPromise()
        .then((response: IUser[]) => {
          let newUser = localStorage.getItem('new-user')
            ? JSON.parse(localStorage.getItem('new-user'))
            : '';
          if (newUser) {
            response.push(newUser);
          }
          this.currentUser = response.find(
            (item) =>
              (item.userName === userData.userName ||
                item.email === userData.userName) &&
              item.password === userData.password
          );
          if (this.currentUser) {
            localStorage.setItem(credentials, JSON.stringify(this.currentUser));
            resolve(this.currentUser);
          } else {
            reject();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  isLogin(): boolean {
    if (localStorage.getItem(credentials)) {
      return true;
    }
    return false;
  }

  logout(): boolean {
    localStorage.removeItem(credentials);
    return true;
  }

  getUser() {
    let user = localStorage.getItem(credentials);
    return JSON.parse(user);
  }
}
