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
        ///valida latitud -90,90
        if(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(latitud)){
          ///validad longitud -180,180
          if (/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(longitud)) {
            ///valida que nombrePropiedad solo tenga letras
            if (/^[A-Za-z ]+$/.test(nombrePropiedad)) {
              /// valida que departamento solo tenga letras
              if (/^[A-Za-z ]+$/.test(departamento)) {
                /// valida que municipio solo letras
                if (/^[A-Za-z ]+$/.test(municipio)) {
                  ///valida que vereda solo letras
                  if (/^[A-Za-z ]*$/.test(vereda)) {
                    /// guardad datos
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

                    /// limpiar campos
                    this.set('nombrePropiedad', '');
                    this.set('latitud', '');
                    this.set('longitud', '');
                    this.set('departamento', '');
                    this.set('municipio', '');
                    this.set('vereda', '');
                    alert('Se agrego la propiedad');
                  }else {
                    alert('Vereda debe tener solo letras');
                  }
                }else {
                  alert('Municipio debe tener solo letras');
                }
              }else{
                alert('Departamento debe tener solo letras');
              }
            }else{
              alert('Nombre de propiedad debe tener solo letras');
            }
          }else {
            alert('Longitud no valido');
          }
        }else{
          alert('Latitud no valido');
        }

      }
    }
  }
});
