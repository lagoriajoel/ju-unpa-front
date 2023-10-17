import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { equipo } from 'src/app/core/Entities/equipo';
import { equipoService } from 'src/app/core/services/equipo.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { unidadAcademicaService } from 'src/app/core/services/unidadAcademica.service';
import { AddEditEquipoComponent } from '../add-edit-equipo/add-edit-equipo.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.css']
})
export class EquiposListComponent implements OnInit {
  loading: boolean = true;
  equipos: equipo[]=[]
  siglas!:string;
  titulo:string=""
  idUnidadAcademica!: number
  displayedColumns: string[] = ["nombre", "disciplina","categoria", "acciones"];
  dataSource = new MatTableDataSource(this.equipos);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private router: Router,
      private unidadAcademicaService: unidadAcademicaService,
      private equiposService: equipoService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      private route: ActivatedRoute
      ) { 
        this.route.queryParamMap.subscribe((params) => {
          this.idUnidadAcademica = Number(params.get("unidad_id"))
          this.siglas = (params.get("siglas"))!
          setTimeout(() => {
            this.titulo=this.siglas.toUpperCase()
          }, 5);
          console.log(this.siglas);
        })
       
          this.dataSource = new MatTableDataSource();
    }
  listarEquipos(){
    this.equiposService.lista().subscribe({
      next: data=>{
        console.log(data);
        const equiposFilter = data.filter(equipo=>equipo.nombre==this.siglas)
        
        this.equipos=equiposFilter
        this.dataSource.data = equiposFilter;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
    ngOnInit(): void {
      this.listarEquipos()
    }
  toFixture(): void {
        this.router.navigate(['disciplinas/fixture'])
  }
  toClasification(name:string): void {
    this.router.navigate(['customers'], {
        queryParams: {
          disciplina: name
        }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  addEditEquipos(id?: number) {
    const dialogRef = this.dialog.open(AddEditEquipoComponent, {
      width: "500px",
      disableClose: true,
     data: { idUnidadAcademica: this.idUnidadAcademica, 
              siglas: this.siglas
    },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarEquipos();
      }
    });
  }
  eliminar(id: number) {
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
   data: {
    title:"Eliminar Estrategia",
    message:"¿Esta seguro de eliminar la estrategia?"
   }
   
  
    }).afterClosed().subscribe((res) => {
  
     if(res){
      this.equiposService.delete(id).subscribe(() => {
        this.listarEquipos();
        
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
     }
  
    });
    this.loading = true;
  }
  mostrarFila(unidad: equipo): void {
    this.router.navigate(['/equipos'], { queryParams: { 
     
    
    }})
  }
  }