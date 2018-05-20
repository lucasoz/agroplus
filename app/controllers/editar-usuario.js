import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
  actions:{
    editarUsuario(){
      const nombre = this.get('nombre');
      const apellido = this.get('apellido');
      const municipio = this.get('municipio');
      const departamento = this.get('departamento');
      const telefono = this.get('telefono');

      if(nombre == '' || nombre == undefined
      || apellido == '' || apellido == undefined
      || municipio == '' || municipio == undefined
      || departamento == '' || departamento == undefined
      || telefono == '' || telefono == undefined){
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      }else{
        if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)){
          if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(apellido)) {
            if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(departamento)) {
              if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(municipio)) {
                if (/^[0-9]+$/.test(telefono)) {
                  ///

                  const usuario = this.get('model');
                  usuario.set('nombre', nombre);
                  usuario.set('apellido', apellido);
                  usuario.set('departamento', departamento);
                  usuario.set('municipio', municipio);
                  usuario.set('telefono', telefono);
                  usuario.save();

                  this.transitionToRoute('index');
                  this.get('flashMessages').success('El usuario ha sido editado exitosamente', {
                    timeout: 10000,
                  });
                  ///limpiar compos
                  this.set('nombre', '');
                  this.set('apellido', '');
                  this.set('departamento', '');
                  this.set('municipio', '');
                  this.set('telefono', '');
                  
                }else {
                  this.get('flashMessages').warning('Telefono debe tener solo numeros', {
                    timeout: 10000,
                  });
                }
              }else {
                this.get('flashMessages').warning('Municipio debe tener solo letras', {
                  timeout: 10000,
                });
              }
            }else {
              this.get('flashMessages').warning('Departamento debe tener solo letras', {
                timeout: 10000,
              });
            }
          }else {
            this.get('flashMessages').warning('Apellido debe tener solo letras', {
              timeout: 10000,
            });
          }
        }else {
          this.get('flashMessages').warning('Nombre debe tener solo letras', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
