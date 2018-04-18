import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    agregarPropiedad(){
      var nombrePropiedad = this.nombrePropiedad;
      var latitud = this.latitud;
      var longitud = this.longitud;
      var departamento = this.departamento;
      var municipio = this.municipio;
      var vereda = this.vereda;

      ///verificar que los campos no esten vacios
      if (nombrePropiedad == '' || nombrePropiedad == undefined) {

      }
    }
  }
});
