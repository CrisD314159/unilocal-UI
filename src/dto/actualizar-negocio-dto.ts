import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";

export class ActualizarNegocioDTO {
  constructor(
    public id: string = '',
    public descripcion: string = '',
    public nombre: string = '',
    public telefonos: string[] = [],
    public imagenes: string[] = [],
    public ubicacion: Ubicacion = new Ubicacion(0,0),
    public horarios: Horario[] = []
    ) { }
}
