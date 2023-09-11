import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UsersSchema } from '../modules/users/users.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {

  url = "./assets/images/img1.png"
  editAdminStatus: boolean = false
  admin: UsersSchema = {}
  @Output() onUpdate = new EventEmitter()
  
  constructor(private api: ApiService) {
    this.api.adminDetails().subscribe({
      next: (res: UsersSchema) => {
        console.log(res);
        this.admin = res
        if (res.picture) {
          this.url = res.picture
        }
      }
    })
  }

  editAdminClick() {
    this.editAdminStatus = true

  }

  getFile(event: any) {
    console.log(event.target.files[0]);
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event: any) => {
      this.url = event.target.result
      this.admin.picture = this.url
    }
  }

  update() {
    this.api.updateAdmin(this.admin).subscribe({
      next: (res: any) => {
        console.log(res);
         // save details in local storage
         localStorage.setItem("admin_name",res.name)
         localStorage.setItem("admin_pswd",res.password)
        alert("Admin details updated successfully")
        this.editAdminStatus = false
        this.onUpdate.emit(res.name)
      },
      error: (err: any) => {
        console.log(err);
        alert("Updation failed server currently unavailable")

      },
    })
  }

  cancel(){
    this.editAdminStatus = false
  }

}
