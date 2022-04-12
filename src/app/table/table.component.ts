import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Dataset } from '../dataset';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'department', 'actions'];
  dataSource: Dataset[] = [];
  showInputComments: boolean = false;
  editRowId:number = 0;

  constructor(private tableService: TableService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getData();

  }

  // Get Data from API
   getData(): void {
    this.tableService.getAll().subscribe((res) => {
          console.log('getData', res);
          this.dataSource = res;
          this.tableService.data = res;
    });
  }

  EditRow(id:number){
    this.editRowId = id;
    console.log('EditRow', id);
  }

  ConfirmEdition(id:number, name:string, email:string, department:string){

    let data = {
      id: id,
      name: name,
      email: email,
      department: department
    }

    this.tableService.putEditionRow(data).subscribe((res) =>{
      console.log('putEditionRow', res);
      this.editRowId = 0; //reset
    })
  }

  cancelEdition(){
    this.editRowId = 0; //reset
  }

  openDialog(id?:number, name?:string, email?:string, department?:string) {

    let dialogRef = this.dialog.open(ModalComponent, {
      data: {
        id: id,
        name: name,
        email: email,
        department: department
      },
    });

    dialogRef.afterClosed().subscribe(()  => {
      console.log("Dialog output:");
      this.getData();
    }); 
  }
  
}
