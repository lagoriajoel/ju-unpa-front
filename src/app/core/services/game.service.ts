import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { equipo } from "../Entities/equipo";
import { equipoDTO } from "../Entities/dto/equipoDTO";
import { fecha } from "../Entities/fecha";
import { game } from "../Entities/game";
import { gameDTO } from "../Entities/dto/gameDTO";



@Injectable({
    providedIn: 'root'
  })
  export class gameService {
  
    ContenidoURL = environment.apiURL+'/games/';
  
    constructor(private httpClient: HttpClient) { }
  
    public lista(): Observable<game[]> {
      return this.httpClient.get<game[]>(this.ContenidoURL + 'list');
    }

   
    public listaPorTorneo(id:Number): Observable<game[]> {
      return this.httpClient.get<game[]>(this.ContenidoURL + `listOfTourment/${id}`);
    }
 
  
    public detail(id: number): Observable<game> {
      return this.httpClient.get<game>(this.ContenidoURL + `list/${id}`);
    }
    public update(id: number, game:gameDTO): Observable<any> {
      return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, game);
    }
}