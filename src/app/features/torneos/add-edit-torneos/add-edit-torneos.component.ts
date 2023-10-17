import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, map, startWith } from "rxjs";

import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { disciplina } from "src/app/core/Entities/disciplina";
import { disciplinaService } from "src/app/core/services/disciplina.service";
import { equipo } from "src/app/core/Entities/equipo";
import { equipoService } from "src/app/core/services/equipo.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { NotificationService } from "src/app/core/services/notification.service";
import { torneo } from "src/app/core/Entities/torneo";
import { torneoService } from "src/app/core/services/torneo.Service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { torneoDTO } from "src/app/core/Entities/dto/torneoDTO";
import { equipoDTO } from "src/app/core/Entities/dto/equipoDTO";

@Component({
  selector: "app-add-edit-torneos",
  templateUrl: "./add-edit-torneos.component.html",
  styleUrls: ["./add-edit-torneos.component.css"],
})
export class AddEditTorneosComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl("");
  filteredFruits: Observable<string[]>;
  fruits: string[] = ["Lemon"];
  allFruits: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  disciplinaSlected!: disciplina;
  disciplinas: disciplina[] = [];
  equipos: equipoDTO[] = [];
  torneo_id!: number;

  @ViewChild("fruitInput") fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
    disciplina: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
    equipos: ["", Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditTorneosComponent>,
    private _formBuilder: FormBuilder,
    private disciplinaService: disciplinaService,
    private equipoService: equipoService,
    private notificationService: NotificationService,
    private torneoService: torneoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cargarDisciplina();
    this.cargarEquipos();
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }
  // private _filter(fruit: string): any {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {}
  cargarEquipos(): void {
    this.equipoService.lista().subscribe({
      next: (data) => {
        this.equipos = data;
        console.log(data);
      },
    });
  }
  cargarDisciplina(): void {
    this.disciplinaService.lista().subscribe({
      next: (data) => {
        this.disciplinas = data;
      },
    });
  }

  cargarEquiposPorDisciplina(id: number): void {
    this.disciplinaSlected = this.disciplinas.find((d) => d.id == id)!;
    console.log(this.disciplinaSlected);
    this.equipoService.listaPorDisciplina(id).subscribe({
      next: (data) => {
        this.equipos = data;
        console.log(data);
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      },
    });
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  cancelar() {
    this.dialogRef.close();
  }
  crearTorneo(): void {
    const torneo: torneoDTO = {
      tipo: "round robin",
      nombre: "CAMPEONATO DE " + this.disciplinaSlected.nombre.toUpperCase() + " " + this.disciplinaSlected.categoria.toUpperCase(),
      numTeams: this.equipos.length,
    };

    this.torneoService.save(torneo).subscribe({
      next: (data) => {

        this.torneoService.addEquipos(this.equipos, data.id).subscribe({
          next: (data) => {
            this.mensajeExito("agregado");
            this.dialogRef.close(true);
          }
        });
      },
      error: (error) => {
        this.notificationService.openSnackBar(error.error.Mensaje);
      },
    });

   
   
  }

  mensajeExito(operacion: string) {
    this._snackBar.open(`El curso fue ${operacion} con exito`, "", {
      duration: 2000,
    });
  }
}
