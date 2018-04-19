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
      if (nombrePropiedad == '' || nombrePropiedad == undefined) {

      }

      ///Guardar la propiedad
      var usuarioAutenticado = this.get('firebaseApp').auth().currentUser;
      //var usuario = this.get('store').findRecord('usuario', usuarioAutenticado.uid);
      var usuario = this.model;
      //console.log(usuarioAutenticado.uid);
      // console.log(usuario);
      //console.log(usuario);
      var nuevaPropiedad = this.store.createRecord('propiedad',{
        nombre: nombrePropiedad,
        longitud: longitud,
        latitud: latitud,
        departamento: departamento,
        municipio: municipio,
        vereda: vereda,
        usuario: usuario
      });
      //console.log(nuevaPropiedad.nombre);
      usuario.get('propiedades').addObject(nuevaPropiedad);
      nuevaPropiedad.save().then(function(){
        return usuario.save();
      });
    }
  }
});
