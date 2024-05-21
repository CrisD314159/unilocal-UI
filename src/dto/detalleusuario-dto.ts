export class DetalleusuarioDTO {
  constructor(
    public id :string = '',
        public nombre:string = '',

        public fotoPerfil: string = '',

        public nickname: string = '',

        public email: string = '',

        public password: string = '',

        public ciudadResidencia: string = '',
  ){}
}
