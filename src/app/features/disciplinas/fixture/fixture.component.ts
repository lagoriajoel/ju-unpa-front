import { Component, OnInit } from '@angular/core';
export interface fechas {
  number: number;
  equipo1:string;
  equipo2:string;
  lugar:string;
  fecha:string;
}

const fechas_data:fechas[]=[
  {number:1,equipo1:"UARG",equipo2:"UACO",lugar:"Caleta Olivia",fecha:"14/09/23"},
  {number:2,equipo1:"UACO",equipo2:"UART",lugar:"Caleta Olivia",fecha:"14/09/23"},
  {number:3,equipo1:"UARG",equipo2:"UASJ",lugar:"Caleta Olivia",fecha:"14/09/23"},
  {number:4,equipo1:"UASJ",equipo2:"UACO",lugar:"Caleta Olivia",fecha:"14/09/23"}


]

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
 fechas: fechas[]=[]
  constructor() { 
    this.fechas=fechas_data
  }

  ngOnInit(): void {
  }

}
