import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { disciplina } from 'src/app/core/Entities/disciplina';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-edit-disciplina',
  templateUrl: './add-edit-disciplina.component.html',
  styleUrls: ['./add-edit-disciplina.component.css']
})
export class AddEditDisciplinaComponent implements OnInit {
  form: FormGroup;

  loading: boolean = false;
  operacion: string = "Agregar ";
  id: number | undefined;
  

  constructor(
    public dialogRef: MatDialogRef<AddEditDisciplinaComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
   private disciplineService: disciplinaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      categoria: ["", [Validators.required]],
    });

    this.id = data.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar ";
      this.getDisciplina(id);
      
    }
  }

  getDisciplina(id: number) {
        
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

  addEditContenido() {
    if (this.form.invalid) {
      return;
    }
   

    const disciplina: disciplina = {
      
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
     
    };

    this.loading = true;
    if (this.id == undefined) {
      // Es agregar
      this.disciplineService.save(disciplina).subscribe(
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
      this.disciplineService.update(this.id, disciplina).subscribe((data) => {
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
