import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { unidadAcademica } from 'src/app/core/Entities/unidadAcademica';
import { NotificationService } from 'src/app/core/services/notification.service';
import { unidadAcademicaService } from 'src/app/core/services/unidadAcademica.service';

@Component({
  selector: 'app-add-edit-unidad',
  templateUrl: './add-edit-unidad.component.html',
  styleUrls: ['./add-edit-unidad.component.css']
})
export class AddEditUnidadComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  operacion: string = "Agregar ";
  id: number | undefined;
  

  constructor(
    public dialogRef: MatDialogRef<AddEditUnidadComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
   private unidadAcademicaService: unidadAcademicaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loading = false;
    this.form = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      localidad: ["", [Validators.required]],
      siglas: ["", [Validators.required]],

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
      this.getUnidad(id);
      
    }
  }

  getUnidad(id: number) {
        
   this.unidadAcademicaService.detail(id).subscribe({ 
    next: data=>{  
      console.log(data);
      this.form.setValue({
    
      nombre: data.nombre,
      localidad: data.localidad,
      siglas: data.siglas
     
    
  
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

  addEditUnidad() {
    if (this.form.invalid) {
      return;
    }
   

    const unidad: unidadAcademica = {
      
      nombre: this.form.value.nombre,
      localidad: this.form.value.localidad,
      siglas: this.form.value.siglas
    };

  
    setTimeout(()=>{  this.loading=true},5)
    if (this.id == undefined) {
      // Es agregar
      this.unidadAcademicaService.save(unidad).subscribe(
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
      this.unidadAcademicaService.update(this.id, unidad).subscribe((data) => {
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
