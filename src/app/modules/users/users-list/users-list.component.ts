import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UsersSchema } from '../users.model';
// import { AnonymousSubject } from 'rxjs/internal/Subject';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers: UsersSchema[] = []
  searchKey:string=''
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  constructor(private api: ApiService) {

  }

  // when UsersListComponent page open call getUserList()
  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    // When user list page open, display all users list from json file by making an api call : http://localhost:3000/users
    this.api.getallusers().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result

      },
      error: (result: any) => {
        console.log(result);
        alert("Error while fetching the data... Please try after some time..")
      }
    })
  }

  deleteUser(id:any){
    this.api.deleteUser(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getUserList()
      },
      error:(err:any)=>{
        console.log(err);
        alert("Cannot perform action now... Please try after some times...")
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  }

  onTableDatachange(event: any){
    this.page = event;
    // this.getUserList()
  }

  generatePDF(){
    let pdf = new jsPDF()
    let head = [['User Id','Username','Email','Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(17)
    pdf.text("All Employee List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("EmployeeList.pdf")
  }
}
