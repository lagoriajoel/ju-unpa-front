import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { disciplina } from 'src/app/core/Entities/disciplina';
import { disciplinaIdDTO } from 'src/app/core/Entities/dto/disciplinaIdDTO';
import { equipoDTO } from 'src/app/core/Entities/dto/equipoDTO';
import { unidadAcademicaDTO } from 'src/app/core/Entities/dto/unidadAcademicaDTO';
import { unidadIdDTO } from 'src/app/core/Entities/dto/unidadIdDTO';
import { equipo } from 'src/app/core/Entities/equipo';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { equipoService } from 'src/app/core/services/equipo.service';
import { NotificationService } from 'src/app/core/services/notification.service';

export interface categoria {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-edit-equipo',
  templateUrl: './add-edit-equipo.component.html',
  styleUrls: ['./add-edit-equipo.component.css']
})
export class AddEditEquipoComponent implements OnInit {

  form: FormGroup;
  idDisciplina!:number
  idUnidad!:number
  loading: boolean = false;
  siglas:string = "";
  operacion: string = "Agregar ";
  id: number | undefined;
  disciplinas: disciplina[] = [];
  categoria: categoria[] = [
    {value: 'masculino', viewValue: 'MASCULINO'},
    {value: 'femenino', viewValue: 'FEMENINO'},
    {value: 'mixto', viewValue: 'MIXTO'},
  ];

  constructor(
    public dialogRef: MatDialogRef<AddEditEquipoComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
   private disciplineService: disciplinaService,
   private equipoService: equipoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.listarDisciplinas()
    this.form = this.fb.group({
      disciplina: ["", [Validators.required]],
     
    });

    this.idUnidad = data.idUnidadAcademica;
    this.siglas =data.siglas;
    console.log(this.idUnidad);
  }
  listarDisciplinas():void{
    this.disciplineService.lista().subscribe({
      next:data=>{
        this.disciplinas=data
      }
    })
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getEquipo(id);
      
    }
  }

  getEquipo(id: number) {
        
   this.disciplineService.detail(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
      nombre: data.nombre,
      categoria: data.categoria,
     
    
  
    })
  },
  error: (error) => {
    this.notificationService.openSnackBar(error.error)
  }

   })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditEquipo() {
    if (this.form.invalid) {
      return;
    }
   const disciplina: disciplinaIdDTO = {
    id: this.form.value.disciplina,
   }
   const unidadAcademica: unidadIdDTO = {
    id: this.idUnidad
   }

    const equipo: equipoDTO= {
      
      nombre: this.siglas,
      sport:disciplina,
      unidadAcademica: unidadAcademica,
      matchWon:0,
      matchLost:0,
      matchTied:0,
      goalFor:0,
      goalAgainst:0,
      point:0,
      tourment: null,
    };
       console.log(equipo);
    this.loading = true;
    if (this.id == undefined) {
      // Es agregar
      this.equipoService.save(equipo).subscribe(
        {
          next: () => {
        this.mensajeExito("agregado");
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error)
      }
        }
      );
    } else {
      // Es editar
      this.equipoService.update(this.id, equipo).subscribe((data) => {
        this.mensajeExito("actualizado");
        this.dialogRef.close(true);
      });
    }
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El contenido fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
