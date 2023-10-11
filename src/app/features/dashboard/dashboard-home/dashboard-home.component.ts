import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { disciplinaService } from 'src/app/core/services/disciplina.service';
import { disciplina } from 'src/app/core/Entities/disciplina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  disciplinas: disciplina[] =[]

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
   private disciplinaService:disciplinaService,
   private router: Router,
    private titleService: Title,
    private logger: NGXLogger) {
      this.listarDisciplinas()
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }

  listarDisciplinas(){
    this.disciplinaService.lista().subscribe({
      next: data=>{
        console.log(data);
        this.disciplinas=data
      }
    })
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
}
