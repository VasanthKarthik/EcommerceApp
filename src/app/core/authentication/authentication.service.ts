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
          let newUser = sessionStorage.getItem('new-user')
            ? JSON.parse(sessionStorage.getItem('new-user'))
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
            sessionStorage.setItem(credentials, JSON.stringify(this.currentUser));
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
    if (sessionStorage.getItem(credentials)) {
      return true;
    }
    return false;
  }

  logout(): boolean {
    sessionStorage.removeItem(credentials);
    return true;
  }

  getUser() {
    let user = sessionStorage.getItem(credentials);
    return JSON.parse(user);
  }
}
