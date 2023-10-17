import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { game } from 'src/app/core/Entities/game';
import { equipoService } from 'src/app/core/services/equipo.service';
import { gameService } from 'src/app/core/services/game.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.css']
})
export class EditResultComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  idGame: number;
  horario!:string
  game!: game
  puntosGanador: number=3
  puntosEmpate: number=1


  


  
  

  constructor(
    public dialogRef: MatDialogRef<EditResultComponent>,
    private fb: FormBuilder,
    private equipoService:equipoService,
   
    private notificationService: NotificationService,
    private gameService: gameService,   
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      score_1: ["", [Validators.required, Validators.maxLength(100)]],
      score_2: ["", [Validators.required]],
   
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
  
    let score_1 = this.form.value.score_1
    let score_2 = this.form.value.score_2

    this.game.score_1=this.form.value.score_1
    this.game.score_2=this.form.value.score_2

   
    const equipo1 = this.game.team_1
    const equipo2 = this.game.team_2

   if(score_1>score_2){


          equipo1.point=this.puntosGanador
          equipo1.goalAgainst=score_2
          equipo1.goalFor=score_1
          equipo1.matchWon=1
          equipo1.matchLost=0
          equipo1.matchTied=0

          equipo2.goalAgainst=score_1
          equipo2.goalFor=score_2
          equipo2.matchWon=0
          equipo2.matchLost=1
          equipo2.matchTied=0

       
   }
  else if(score_2>score_1){


    equipo2.point=this.puntosGanador
    equipo2.goalAgainst=score_2
    equipo2.goalFor=score_1
    equipo2.matchWon=1
    equipo2.matchLost=0
    equipo2.matchTied=0

    equipo1.goalAgainst=score_1
    equipo1.goalFor=score_2
    equipo1.matchWon=0
    equipo1.matchLost=1
    equipo1.matchTied=0

 
}
else if (score_1==score_2){

      equipo2.point=this.puntosEmpate
      equipo2.goalAgainst=score_2
      equipo2.goalFor=score_1
      equipo2.matchWon=0
      equipo2.matchLost=0
      equipo2.matchTied=1

      equipo1.point=this.puntosEmpate
      equipo1.goalAgainst=score_1
      equipo1.goalFor=score_2
      equipo1.matchWon=0
      equipo1.matchLost=0
      equipo1.matchTied=1
}

   this.equipoService.update(equipo1.id, equipo1).subscribe(data => {
    console.log(data);
   })
   this.equipoService.update(equipo2.id, equipo2).subscribe(data => {
    console.log(data);
   })


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
