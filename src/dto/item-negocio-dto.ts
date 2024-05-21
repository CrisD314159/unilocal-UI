import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";
export class ItemNegocioDTO {
constructor(
public codigoNegocio: string = '',
public nombre: string = '',
public descripcion: string = '',
public imagenes: string[] = [''],
public telefonos: string[] = [''],
public tipoNegocio: string = '',
public ubicacion: Ubicacion = new Ubicacion(0, 0), // Fix: Pass the required arguments (latitud and longitud)
public horarios: Horario[] = [], // Fix: Pass the required arguments (dia and horario)
public calificacionPromedio: number = 0,
public nombreUsuario: string = '',
public estadoNegocio:string = ''
){}
}