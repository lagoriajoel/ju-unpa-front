import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { disciplina } from "../Entities/disciplina";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
  export class disciplinaService {
  
    ContenidoURL = environment.apiURL+'/disciplinas/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<disciplina[]> {
      return this.httpClient.get<disciplina[]>(this.ContenidoURL + 'list');
    }
  
 
  
    public detail(id: number): Observable<disciplina> {
      return this.httpClient.get<disciplina>(this.ContenidoURL + `list/${id}`);
    }
  
   
    public save(disciplina: disciplina): Observable<any> {
      return this.httpClient.post<any>(this.ContenidoURL + 'save', disciplina);
    }
  
    public update(id: number, disciplina: disciplina): Observable<any> {
      return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, disciplina);
    }
  
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
    }
  }
  