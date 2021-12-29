import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manual-md',
  templateUrl: './manual-md.component.html',
  styleUrls: ['./manual-md.component.css']
})
export class ManualMdComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  cerrarMd(){
    this.dialog.closeAll();
  }

}
