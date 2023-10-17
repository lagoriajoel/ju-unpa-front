import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { torneo } from "../Entities/torneo";
import { equipo } from "../Entities/equipo";
import { torneoDTO } from "../Entities/dto/torneoDTO";
import { equipoDTO } from "../Entities/dto/equipoDTO";

@Injectable({
    providedIn: 'root'
  })
  export class torneoService {
  
    ContenidoURL = environment.apiURL+'/tourment/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<torneo[]> {
      return this.httpClient.get<torneo[]>(this.ContenidoURL + 'list');
    }
  
 
  
    public detail(id: number): Observable<torneo> {
      return this.httpClient.get<torneo>(this.ContenidoURL + `list/${id}`);
    }
  
   
    public save(disciplina: torneoDTO): Observable<any> {
      return this.httpClient.post<any>(this.ContenidoURL + 'save', disciplina);
    }
    public addEquipos(equipos: equipoDTO[], idTorneo: number): Observable<any> {
      return this.httpClient.post<any>(this.ContenidoURL + `addTeams/${idTorneo}`, equipos);
    }
  
    public update(id: number, disciplina: torneo): Observable<any> {
      return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, disciplina);
    }
  
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
    }
  }
  