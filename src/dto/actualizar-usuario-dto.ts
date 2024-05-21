export class ActualizarUsuarioDTO {
  constructor(
    public id: string ='',

    public nombre: string = '',
     public fotoPerfil:string = '',

    public nickname: string = '',
    
    public ciudadResidencia: string = '',
  ) {
    
  }
}
