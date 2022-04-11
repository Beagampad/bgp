import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { Dataset } from '../dataset';
import { ModalComponent } from '../modal/modal.component';
import { TableService } from '../table.service';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {

  elements:Dataset[] = [];
  elements_marketing: Dataset[] = [];
  elements_development: Dataset[] = [];
  filteredItems_development: Dataset[] = [];
  filteredItems_marketing: Dataset[] = [];

  constructor(private tableService: TableService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getData();

  }

   // Get Data from API
   getData(): void {
    this.tableService.getAll().subscribe((res) => {
          console.log('getData', res);
          this.elements = res;

          this.elements.forEach(element =>{
            if((element.department === 'Marketing') || (element.department === 'marketing')){
              this.elements_marketing.push(element);
              this.filteredItems_marketing = Object.assign([], this.elements_marketing);

            }else{
              this.elements_development.push(element);
              this.filteredItems_development = Object.assign([], this.elements_development);
            }
           
          })
    });
  }

  addRow() {

    let dialogRef = this.dialog.open(ModalComponent);
     
    dialogRef.afterClosed().subscribe(()  => {
      console.log("Dialog output:");
      this.getData();
    }); 
  }

  calculateTime(element_date:string){

    let date_today = new Date(); 
	  let date2 = new Date(element_date); 

    let Time = date_today.getTime() - date2.getTime(); 
    let Days = Time / (1000 * 3600 * 24); //Diference in Days

    return Days;

  }

 
 filterItemDev(value:string){
   console.log('FILTER', value)
    if(!value){
      this.filteredItems_development = Object.assign([], this.elements_development);
    } // when nothing has typed
    this.filteredItems_development = Object.assign([], this.elements_development).filter(
       item => JSON.stringify(item).toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }

 filterItemMark(value:string){
  console.log('FILTER', value)
   if(!value){
    this.filteredItems_marketing = Object.assign([], this.elements_marketing);
   } // when nothing has typed
   this.filteredItems_marketing = Object.assign([], this.elements_marketing).filter(
      item => JSON.stringify(item).toLowerCase().indexOf(value.toLowerCase()) > -1
   )
}
    

}
