import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { torneo } from 'src/app/core/Entities/torneo';
import { NotificationService } from 'src/app/core/services/notification.service';
import { torneoService } from 'src/app/core/services/torneo.Service';
import { AddEditTorneosComponent } from '../add-edit-torneos/add-edit-torneos.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-torneos-list',
  templateUrl: './torneos-list.component.html',
  styleUrls: ['./torneos-list.component.css']
})
export class TorneosListComponent implements OnInit {
  loading: boolean = true;
  torneos: torneo[]=[]
  displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
  dataSource = new MatTableDataSource(this.torneos);
  
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    constructor(private router: Router,
      private torneoService: torneoService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      ) { 
         
          this.dataSource = new MatTableDataSource();
    }
  listarTorneos(){
    this.torneoService.lista().subscribe({
      next: data=>{
        console.log(data);
        this.torneos=data
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:error=>{
        console.log(error);
      }
    })
  }
    ngOnInit(): void {
      this.listarTorneos()
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
  
  addEditTorneo(id?: number) {
    const dialogRef = this.dialog.open(AddEditTorneosComponent, {
      width: "800px",
      disableClose: true,
     data: { id: id },
     
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarTorneos();
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
      this.torneoService.delete(id).subscribe(() => {
        this.listarTorneos();
        
      },
      error => {
        this.notificationService.openSnackBar(error.error);
      })
     }
  
    });
    this.loading = true;
  }

  irAprogramacion(torneo:torneo): void {
    console.log(torneo);
       this.router.navigate(["/programa"], { 
        queryParams:{
          torneo_id: torneo.id
        }
      })
  }
  }