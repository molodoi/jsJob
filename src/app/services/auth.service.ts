import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth/';
  TOKEN_NAME = 'jbb-token';
  decodedToken = null;

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post(this.BASE_URL + 'login', credentials)
              .map(res => res.json());
  }

  userIsLoggedIn() {
    return !!localStorage.getItem(this.TOKEN_NAME);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem('token');
  }

  register(credentials) {
    // console.log('register credentials: ', credentials);
    return this.http.post(this.BASE_URL + 'register', credentials)
                    .map(res => res.json());
  }

  decodeToken(token) {
    return jwtDecode(token);
  }

  addAuthorizationHeader(token) {
    const authorizationHeader = new Headers({
      'Authorization': 'Bearer ' + token
    });
    return new RequestOptions({ headers: authorizationHeader });
  }

}