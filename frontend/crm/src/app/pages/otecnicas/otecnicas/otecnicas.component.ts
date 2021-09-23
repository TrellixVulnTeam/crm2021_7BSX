import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-otecnicas',
  templateUrl: './otecnicas.component.html',
  styleUrls: ['./otecnicas.component.css']
})
export class OtecnicasComponent implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Ordenes Técnicas CRM');
    });
  }


}
