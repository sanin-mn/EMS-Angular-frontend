import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersSchema } from '../modules/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:string= "http://localhost:3000"

  constructor(private http:HttpClient) { }

  // get admin details
  adminDetails(){
    // api call to http://localhost:3000/users/1
    return this.http.get(`${this.base_url}/users/1`)
  }
  
  // get all users
  getallusers(){
    // api call to http://localhost:3000/users
    return this.http.get(`${this.base_url}/users`)
  }

  // add user
  addUser(user:UsersSchema){
    // api call to http://localhost:3000/users
    return this.http.post(`${this.base_url}/users`,user)
  }

  // get exsisting user
  getexistingUser(id:any){
    // api call to http://localhost:3000/users/id
    return this.http.get(`${this.base_url}/users/${id}`)
  }

  // to update user
  updateUser(id:any,data:UsersSchema){
    // api call to http://localhost:3000/users/id
    return this.http.put(`${this.base_url}/users/${id}`,data)
  }

  // to delete user
  deleteUser(id:any){
    // api call to http://localhost:3000/users/id
    return this.http.delete(`${this.base_url}/users/${id}`)
  }

  // to update admin
  updateAdmin(adminBody: UsersSchema){
    return this.http.put(`${this.base_url}/users/1`,adminBody)
  }
}
