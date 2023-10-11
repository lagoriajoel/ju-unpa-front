import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { disciplina } from 'src/app/core/Entities/disciplina';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { AddEditDisciplinaComponent } from '../add-edit-disciplina/add-edit-disciplina.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


// const ELEMENT_DATA: disciplinas[] = [
//   {name:"BASQUET",description:"MASCULINO",id:1},
//   {name:"BASQUET",description:"FEMENINO",id:2},
//   {name:"FUTBOL 11",description:"MASCULINO",id:3},
//   {name:"FUTBOL 5",description:"MASCULINO",id:4},
//   {name:"VOLLEY",description:"MIXTO",id:5},
//   {name:"VOLLEY",description:"MASCULINO",id:6},
//   {name:"VOLLEY",description:"FEMENINO",id:7},
//   {name:"HANDBALL",description:"MASCULINO",id:8}
// ]

@Component({
  selector: 'app-disciplinas-list',
  templateUrl: './disciplinas-list.component.html',
  styleUrls: ['./disciplinas-list.component.css']
})

export class DisciplinasListComponent implements OnInit {
  loading: boolean = true;
disciplinas: disciplina[]=[]
displayedColumns: string[] = ["nombre", "descripcion", "acciones"];
dataSource = new MatTableDataSource(this.disciplinas);

@ViewChild(MatSort, { static: true })
sort: MatSort = new MatSort();
@ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router,
    private disciplinaService: disciplinaService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    ) { 
       
        this.dataSource = new MatTableDataSource();
  }
listarDisciplinas(){
  this.disciplinaService.lista().subscribe({
    next: data=>{
      console.log(data);
      this.disciplinas=data
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
  const dialogRef = this.dialog.open(AddEditDisciplinaComponent, {
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
    this.disciplinaService.delete(id).subscribe(() => {
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