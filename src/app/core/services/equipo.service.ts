import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { equipo } from "../Entities/equipo";
import { equipoDTO } from "../Entities/dto/equipoDTO";



@Injectable({
    providedIn: 'root'
  })
  export class equipoService {
  
    ContenidoURL = environment.apiURL+'/teams/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<equipo[]> {
      return this.httpClient.get<equipo[]>(this.ContenidoURL + 'list');
    }

    public listaPorDisciplina(id:Number): Observable<equipo[]> {
      return this.httpClient.get<equipo[]>(this.ContenidoURL + `listOfSport/${id}`);
    }
    public listaPorTorneo(id:Number): Observable<equipo[]> {
      return this.httpClient.get<equipo[]>(this.ContenidoURL + `listOfTourment/${id}`);
    }
 
  
    public detail(id: number): Observable<equipo> {
      return this.httpClient.get<equipo>(this.ContenidoURL + `list/${id}`);
    }
    
  
   
    public save(equipo: equipoDTO): Observable<any> {
      return this.httpClient.post<any>(this.ContenidoURL + 'save', equipo);
    }
  
    public update(id: number, equipo: equipoDTO): Observable<any> {
      return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, equipo);
    }
  
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
    }
  }
  