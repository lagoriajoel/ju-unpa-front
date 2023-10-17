import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { equipo } from 'src/app/core/Entities/equipo';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { equipoService } from 'src/app/core/services/equipo.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'pg', 'pp', 'pe', 'puntos'];
  equipos: equipo[] = [];
  dataSource = new MatTableDataSource(this.equipos);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  NombreDeporte: string = ''
  categoriaDeporte: string = ''
  idDeporte!: number
  tipo: string = ''
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
   private equipoService: equipoService,
   private disciplinaService: disciplinaService,
    private route: ActivatedRoute
  ) { 

    this.notificationService.openSnackBar('Tabla de Posiciones');
    this.dataSource.sort = this.sort;
    this.route.queryParamMap.subscribe(params => {
   
     this.idDeporte=Number(params.get('id')!)


    })

  this.disciplinaService.detail(this.idDeporte).subscribe({
    next: data=>{
      this.categoriaDeporte = data.categoria
      this.NombreDeporte=data.nombre
    }
  })

    this.equipoService.listaPorDisciplina(this.idDeporte).subscribe({
      next: data=> {
       this.equipos=data
       this.dataSource.data = data;

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       console.log(data);
      }
    })
  }

  ngOnInit() {
  
   

  }
}

