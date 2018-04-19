import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    agregarPropiedad(){
      var nombrePropiedad = this.nombrePropiedad;
      var latitud = this.latitud;
      var longitud = this.longitud;
      var departamento = this.departamento;
      var municipio = this.municipio;
      var vereda = this.vereda;

      ///verificar que los campos no esten vacios
      if (nombrePropiedad == '' || nombrePropiedad == undefined ||
      latitud == '' || latitud == undefined ||
      longitud == '' || longitud == undefined ||
      departamento == '' || departamento == undefined ||
      municipio == '' || municipio == undefined) {
        alert('Completa todo los campos');
      }else {
        ///Guardar la propiedad
        var usuario = this.model;
        var nuevaPropiedad = this.store.createRecord('propiedad',{
          nombre: nombrePropiedad,
          longitud: longitud,
          latitud: latitud,
          departamento: departamento,
          municipio: municipio,
          vereda: vereda,
          usuario: usuario
        });
        usuario.get('propiedades').addObject(nuevaPropiedad);
        nuevaPropiedad.save().then(function(){
          return usuario.save();
        });
      }
    }
  }
});
