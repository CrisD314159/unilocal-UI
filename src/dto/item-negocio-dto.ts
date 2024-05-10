import { Ubicacion } from "./ubicacion";
export class ItemNegocioDTO {
constructor(
public codigoNegocio: string = '',
public nombre: string = '',
public imagenDestacada: string = '',
public tipoNegocio: string = '',
public ubicacion: Ubicacion = new Ubicacion(0, 0), // Fix: Pass the required arguments (latitud and longitud)
public calificacionPromedio: number = 0,
public estadoNegocio:string = ''
){}
}