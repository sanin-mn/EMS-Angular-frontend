import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UsersSchema } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user : UsersSchema={}
  originalUser : UsersSchema={}
  constructor (private route:ActivatedRoute,private api:ApiService){

  }

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      console.log(id);
      this.existinguser(id)
    })
  }

  existinguser(id:any){
    this.api.getexistingUser(id).subscribe({
      next:(res:UsersSchema)=>{
        console.log(res);
        this.user = res       
      },
      error:(err:any)=>{
        console.log(err);
        console.log("Cannot perform the action now...Please try after somtime");
      }
    })
  }

  updateUser(){
    this.api.updateUser(this.user.id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User details updated succussfully")
      },
      error:(err:any)=>{
        console.log(err);
        alert("Cannot perform thr action now... Please try after sometimes...")
      }
    })
  }

  cancelUpdate(userId:any){
    
   this.existinguser(userId)   
  }

}
