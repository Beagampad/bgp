import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { TableService } from '../table.service';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {

 
  constructor(private tableService: TableService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getData();

  }

   // Get Data from API
   getData(): void {
    this.tableService.getAll().subscribe((res) => {
          console.log('getData', res);
         
    });
  }

  addRow() {

    let dialogRef = this.dialog.open(ModalComponent);
     
    dialogRef.afterClosed().subscribe(()  => {
      console.log("Dialog output:");
      this.getData();
    }); 
  }

}
