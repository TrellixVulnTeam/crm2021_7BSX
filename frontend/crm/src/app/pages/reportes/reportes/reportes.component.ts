import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Reportes CRM');
    });

  }

}
