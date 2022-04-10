import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableService } from '../table.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  show_delete:boolean = false;
  selected: string = '';
 
  
  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private tableService: TableService, private router: Router){}

  @ViewChild('nameinput') nameinput:ElementRef | undefined;
  @ViewChild('mailinput') mailinput:ElementRef | undefined;

  ngOnInit(): void {

    if(this.router.url != '/min'){

      if(this.data.id ){

        this.show_delete = true;
      }
  
    }
    
  }

  DeleteRow(){
    this.tableService.deleteRow(this.data.id).subscribe((res) =>{
      console.log('DeleteRow', res);
      this.dialogRef.close();

    })
  }

  AddRow(){

    let data = {
      name: this.nameinput?.nativeElement.value,
      email: this.mailinput?.nativeElement.value,
      department: this.selected,
    }

    console.log('AddRow', data);

    this.tableService.postNewRow(data).subscribe((res) =>{
      console.log('AddRow', res);
      this.dialogRef.close();

    })
  }

  changeClient(value:any) {
    this.selected = value;
    console.log('changeClient',value);
}

  close() {
      this.dialogRef.close();
  }

}
