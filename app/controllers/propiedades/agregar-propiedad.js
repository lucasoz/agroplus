import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{
    agregarPropiedad(){
      //Para mostrar un error
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
        //alert('Completa todo los campos');
        this.get('flashMessages').danger('Completa todos los campos', {
          timeout: 10000,
        });
        //this.transitionToRoute('propiedades');
        ///
        /*
        window.setTimeout(function() {
          $(".alert").fadeTo(500, 0).slideUp(500, function(){
            //$(this).remove();
            $(this).empty().removeAttr('style');
            $(this).removeClass('alert alert-success');
          });
        }, 4000);
        */
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
                    this.transitionToRoute('propiedades');
                    this.get('flashMessages').success('Propiedad agregada correctamente!', {
                      timeout: 10000,
                    });
                  }else {
                    this.get('flashMessages').danger('Vereda debe tener solo letras', {
                      timeout: 10000,
                    });
                  }
                }else {
                  this.get('flashMessages').danger('Municipio debe tener solo letras', {
                    timeout: 10000,
                  });

                }
              }else{
                this.get('flashMessages').danger('Departamento debe tener solo letras', {
                  timeout: 10000,
                });

              }
            }else{
              this.get('flashMessages').danger('Nombre de propiedad debe tener solo letras', {
                timeout: 10000,
              });
            }
          }else {

            this.get('flashMessages').danger('Longitud no valido, solo números entre -180 y 180', {
              timeout: 10000,
            });
          }
        }else{
          this.get('flashMessages').danger('Latitud no valido, solo números entre -90 y 90', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
