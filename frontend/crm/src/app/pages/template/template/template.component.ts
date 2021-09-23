import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Inicio');
    });

  }

}
