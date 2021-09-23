import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Suministros EDESAL');
    });

  }

}
