import { equipo } from "./equipo"
import { fecha } from "./fecha"

export interface game {
    id: number
    fecha: string
    lugar: string
    horario: string
    score_1: number
    score_2: number
    program: fecha
    team_1: equipo
    team_2:equipo
}