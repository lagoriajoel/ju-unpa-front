import { DatePipe } from '@angular/common';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { equipoIdDto } from 'src/app/core/Entities/dto/equipoIdDto';
import { fechaIdDto } from 'src/app/core/Entities/dto/fechaIdDto';
import { gameDTO } from 'src/app/core/Entities/dto/gameDTO';
import { game } from 'src/app/core/Entities/game';
import { gameService } from 'src/app/core/services/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';
export interface hora {
  hora: string;
  minutos: string;
}
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  idGame: number;
  horario!:string
  game!: game

   horarios: hora[] = [
    {hora: "00", minutos: "05"},
    {hora: "01", minutos: "10"},
    {hora: "02", minutos: "15"},
    {hora: "03", minutos: "20"},
    {hora: "04", minutos: "25"},
    {hora: "05", minutos: "30"},
    {hora: "06", minutos: "35"},
    {hora: "07", minutos: "40"},


  ];
  
  

  constructor(
    public dialogRef: MatDialogRef<AddProgramComponent>,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private notificationService: NotificationService,
    private gameService: gameService,   
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      lugar: ["", [Validators.required, Validators.maxLength(100)]],
      fecha: ["", [Validators.required]],
      hora: ["", [Validators.required]],
    });

    this.idGame = data.idGame;
    console.log(this.idGame);
    this.getGame(this.idGame);
  }
  
  ngOnInit(): void {
    this.esEditar(this.idGame);
  }

  getGame(idGame: number):void {
     this.gameService.detail(idGame).subscribe({
      next: data=> {
        this.game = data
        console.log(this.game);
      }
     })    
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
    
      
    }
  }

  
  cancelar() {
    this.dialogRef.close(false);
  }

  EditGame() {
    if (this.form.invalid) {
      return;
    }

//   const fechaPrograma: fechaIdDto ={
//     id: this.game.program.id
//   }
// const equipo1: equipoIdDto= {
//   id: this.game.team_1.id
// }
// const equipo2: equipoIdDto= {
//   id: this.game.team_2.id
// }
//    const gameUpdate: gameDTO= {
//      fecha:  this.form.value.lugar,
//      lugar: this.datepipe.transform(
//       this.form.value.fecha,
//       "dd/MM/yyyy")!,
//      horario: this.datepipe.transform(this.form.value.hora,"shortTime")!,
//      score_1: 0,
//      score_2: 0,
//      program: fechaPrograma,
//      team_1: equipo1,
//      team_2: equipo2
//    }

   this.game.lugar = this.form.value.lugar
   this.game.fecha = this.datepipe.transform(
    this.form.value.fecha,
    "dd/MM/yyyy")!
    this.game.horario = this.datepipe.transform(this.form.value.hora,"shortTime")!

    this.gameService.update(this.idGame, this.game).subscribe({
      next: data=> {
        this.mensajeExito("Actulizado")
        this.dialogRef.close()
      },
      error: error=> {
        this.notificationService.openSnackBar(error.error.Mensaje)
      }
    })
   
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El Encuentro fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
