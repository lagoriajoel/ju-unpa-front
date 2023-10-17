import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { equipo } from 'src/app/core/Entities/equipo';
import { fecha } from 'src/app/core/Entities/fecha';
import { torneo } from 'src/app/core/Entities/torneo';
import { equipoService } from 'src/app/core/services/equipo.service';
import { fechaService } from 'src/app/core/services/fecha.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { torneoService } from 'src/app/core/services/torneo.Service';
import { AddProgramComponent } from '../add-program/add-program.component';
import { EditResultComponent } from '../edit-result/edit-result.component';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
equipos: equipo[]= [];
fechas: fecha[]= [];
nombreTorneo: string=""
torneo_id!: number
  constructor(
    private equipoService: equipoService,
    private route: ActivatedRoute,
    private torneoService: torneoService,
    private fechaService: fechaService,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.torneo_id=Number(params.get("torneo_id"))
      }
    )
    this.listarEquiposPorTorneo(this.torneo_id)
    this.listarFechasPorTorneo(this.torneo_id)
    this.listarTorneo(this.torneo_id)
   }

  ngOnInit(): void {
  }
  listarTorneo(torneoId: number): void {
    this.torneoService.detail(torneoId).subscribe({
      next: data=>{
        this.nombreTorneo=data.nombre
      }
    })
  }
  listarFechasPorTorneo(id: number): void {
    this.fechaService.listaPorTorneo(id).subscribe({
      next: data=> {
        this.fechas=data
        console.log(data);
      }
    })
  }
  listarEquiposPorTorneo(id: number): void {
    this.equipoService.listaPorTorneo(id).subscribe({
      next: data=> {
        this.equipos = data
      }
    })
  }

  EditGame(id: number): void {
    const dialogRef = this.dialog.open(AddProgramComponent, {
      width: "500px",
      disableClose: true,
     data: { idGame: id },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.listarEquiposPorTorneo(this.torneo_id)
        this.listarFechasPorTorneo(this.torneo_id)
        console.log("aca");
       // this.listarTorneo(this.torneo_id)
      }
    });

  }
  EditResultGame(id: number): void {
    const dialogRef = this.dialog.open(EditResultComponent, {
      width: "500px",
      disableClose: true,
     data: { idGame: id },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this.listarEquiposPorTorneo(this.torneo_id)
        this.listarFechasPorTorneo(this.torneo_id)
        console.log("aca");
       // this.listarTorneo(this.torneo_id)
      }
    });

  }
}


// const fechaPrograma: fechaIdDto ={
//   id: this.game.program.id
// }
// const equipo1: equipoIdDto= {
// id: this.game.team_1.id
// }
// const equipo2: equipoIdDto= {
// id: this.game.team_2.id
// }
//  const gameUpdate: gameDTO= {
//    fecha:  this.form.value.lugar,
//    lugar: this.datepipe.transform(
//     this.form.value.fecha,
//     "dd/MM/yyyy")!,
//    horario: this.datepipe.transform(this.form.value.hora,"shortTime")!,
//    score_1: 0,
//    score_2: 0,
//    program: fechaPrograma,
//    team_1: equipo1,
//    team_2: equipo2
//  }
