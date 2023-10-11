import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { unidadAcademica } from 'src/app/core/Entities/unidadAcademica';
import { NotificationService } from 'src/app/core/services/notification.service';
import { unidadAcademicaService } from 'src/app/core/services/unidadAcademica.service';
import { AddEditUnidadComponent } from '../add-edit-unidad/add-edit-unidad.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit {
  loading: boolean = true;
  unidad: unidadAcademica[]=[]
  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.unidad);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private router: Router,
      private unidadAcademicaService: unidadAcademicaService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      ) { 
         
          this.dataSource = new MatTableDataSource();
    }
  listarDisciplinas(){
    this.unidadAcademicaService.lista().subscribe({
      next: data=>{
        console.log(data);
        this.unidad=data
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
    ngOnInit(): void {
      this.listarDisciplinas()
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
  
  addEditDisciplina(id?: number) {
    const dialogRef = this.dialog.open(AddEditUnidadComponent, {
      width: "500px",
      disableClose: true,
     data: { id: id },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarDisciplinas();
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
      this.unidadAcademicaService.delete(id).subscribe(() => {
        this.listarDisciplinas();
        
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
     }
  
    });
    this.loading = true;
  }
  }