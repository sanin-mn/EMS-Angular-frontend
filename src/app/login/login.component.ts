import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // property
  email: string = ""
  password: string = ""

  constructor(private api: ApiService, private loginRouter: Router) { }

  login() {
    if (this.email && this.password) {
      this.api.adminDetails().subscribe({
        next: (result: any) => {
          console.log(result);
          // compare email and password with admin details
          if (this.email === result.email && this.password === result.password) {
            // save details in local storage
            localStorage.setItem("admin_name",result.name)
            localStorage.setItem("admin_pswd",result.password)

            alert("Authorisation succesfull")
            // navigate to home page - use navigateByUrl() - router class
            this.loginRouter.navigateByUrl('home')
          } else {
            alert("invalid admin details")
          }
        },
        error: (result: any) => {
          console.log(result);
          alert("Error while fetching the data... Please try after some time..")
        }
      })
    } else {
      alert("please fill the form completely !!!")
    }
  }
}
