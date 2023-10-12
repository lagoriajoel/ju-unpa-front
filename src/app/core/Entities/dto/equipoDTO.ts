import { torneoIdDTO } from "../torneoIdDTO";
import { disciplinaIdDTO } from "./disciplinaIdDTO";
import { unidadIdDTO } from "./unidadIdDTO";

export interface equipoDTO {
    
    nombre: string;
    sport:disciplinaIdDTO;
    unidadAcademica: unidadIdDTO;
    matchWon:number
    matchLost:number
    matchTied:number
    goalFor:number
    goalAgainst:number
    point:number
    tourment: torneoIdDTO | null


}