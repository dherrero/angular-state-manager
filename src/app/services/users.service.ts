import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '@interfaces/user.request';

/**
 * UsersService
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  /**
   * Class constructor
   */
  constructor(private http: HttpClient) {}

  // Necesario tener arrancado Mockoon y el servicio /users que trae por defecto
  // https://mockoon.com/
  get() {
    return this.http.get<UserRequest>('http://localhost:3000/users');
  }
}
