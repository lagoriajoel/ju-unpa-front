import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { disciplina } from "../Entities/disciplina";
import { Observable } from "rxjs";
import { unidadAcademica } from "../Entities/unidadAcademica";
import { unidadAcademicaDTO } from "../Entities/dto/unidadAcademicaDTO";



@Injectable({
    providedIn: 'root'
  })
  export class unidadAcademicaService {
  
    ContenidoURL = environment.apiURL+'/unidadesAcademicas/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<unidadAcademica[]> {
      return this.httpClient.get<unidadAcademica[]>(this.ContenidoURL + 'list');
    }
  
 
  
    public detail(id: number): Observable<unidadAcademica> {
      return this.httpClient.get<unidadAcademica>(this.ContenidoURL + `list/${id}`);
    }
  
   
    public save(disciplina: unidadAcademicaDTO): Observable<any> {
      return this.httpClient.post<any>(this.ContenidoURL + 'save', disciplina);
    }
  
    public update(id: number, disciplina: unidadAcademicaDTO): Observable<any> {
      return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, disciplina);
    }
  
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
    }
  }
  