import { equipoIdDto } from "./equipoIdDto"
import { fechaIdDto } from "./fechaIdDto"

export interface gameDTO {
   
    fecha: string
    lugar: string
    horario: string
    score_1: number
    score_2: number
    program: fechaIdDto
    team_1: equipoIdDto
    team_2:equipoIdDto
}