export class ComentarioDTO {
  constructor(
    public idNegocio:string ='',
    public idUsuario:string ='',
    public titulo:string ='',
    public contenido:string ='',
    public calificacion:string ='',
  ) {
    
  }
}
