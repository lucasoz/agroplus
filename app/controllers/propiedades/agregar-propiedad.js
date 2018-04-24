import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{
    agregarPropiedad(){
      //Para mostrar un error
      const nombrePropiedad = this.get('nombrePropiedad');
      const latitud = this.get('latitud');
      const longitud = this.get('longitud');
      const departamento = this.get('departamento');
      const municipio = this.get('municipio');
      const vereda = this.get('vereda');

      ///verificar que los campos no esten vacios
      if (nombrePropiedad == '' || nombrePropiedad == undefined ||
      latitud == '' || latitud == undefined ||
      longitud == '' || longitud == undefined ||
      departamento == '' || departamento == undefined ||
      municipio == '' || municipio == undefined) {
        //alert('Completa todo los campos');
        this.get('flashMessages').warning('Completa todos los campos', {
          timeout: 10000,
        });
      }else {
        ///valida latitud -90,90
        if(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(latitud)){
          ///validad longitud -180,180
          if (/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(longitud)) {
            ///valida que nombrePropiedad solo tenga letras
            if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombrePropiedad)) {
              /// valida que departamento solo tenga letras
              if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(departamento)) {
                /// valida que municipio solo letras
                if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(municipio)) {
                  ///valida que vereda solo letras
                  if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]*$/.test(vereda)) {
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
                    this.get('flashMessages').warning('Vereda debe tener solo letras', {
                      timeout: 10000,
                    });
                  }
                }else {
                  this.get('flashMessages').warning('Municipio debe tener solo letras', {
                    timeout: 10000,
                  });

                }
              }else{
                this.get('flashMessages').warning('Departamento debe tener solo letras', {
                  timeout: 10000,
                });

              }
            }else{
              this.get('flashMessages').warning('Nombre de propiedad debe tener solo letras', {
                timeout: 10000,
              });
            }
          }else {

            this.get('flashMessages').warning('Longitud no valido, solo números entre -180 y 180', {
              timeout: 10000,
            });
          }
        }else{
          this.get('flashMessages').warning('Latitud no valido, solo números entre -90 y 90', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
