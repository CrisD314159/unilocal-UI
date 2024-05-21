export class CambioPasswordDTO {

  constructor(
    public passwordNuevo:string = '',
    public idUsuario: string = '',
    public email: string =''
  ){}
}
