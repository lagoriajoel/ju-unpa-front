import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { equipo } from "../Entities/equipo";
import { equipoDTO } from "../Entities/dto/equipoDTO";
import { fecha } from "../Entities/fecha";



@Injectable({
    providedIn: 'root'
  })
  export class fechaService {
  
    ContenidoURL = environment.apiURL+'/programs/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<equipo[]> {
      return this.httpClient.get<equipo[]>(this.ContenidoURL + 'list');
    }

   
    public listaPorTorneo(id:Number): Observable<fecha[]> {
      return this.httpClient.get<fecha[]>(this.ContenidoURL + `listOfTourment/${id}`);
    }
 
  
    public detail(id: number): Observable<equipo> {
      return this.httpClient.get<equipo>(this.ContenidoURL + `list/${id}`);
    }
}