import { disciplina } from "./disciplina";
import { torneo } from "./torneo";
import { torneoIdDTO } from "./torneoIdDTO";
import { unidadAcademica } from "./unidadAcademica";

export interface equipo {
    id:number
    nombre: string;
    sport:disciplina;
    unidadAcademica: unidadAcademica;
    matchWon:number
    matchLost:number
    matchTied:number
    goalFor:number
    goalAgainst:number
    point:number
    tourment: torneo 


}