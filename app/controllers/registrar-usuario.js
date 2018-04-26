import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
  actions:{
    agregarUsuario(){
      const nombre = this.get('nombre');
      const apellido = this.get('apellido');
      const municipio = this.get('municipio');
      const departamento = this.get('departamento');
      const telefono = this.get('telefono');
      const correo = this.get('correo');
      const contrasena = this.get('contrasena');

      if(nombre == '' || nombre == undefined
      || apellido == '' || apellido == undefined
      || municipio == '' || municipio == undefined
      || departamento == '' || departamento == undefined
      || telefono == '' || telefono == undefined
      || correo == '' || correo == undefined
      || contrasena == '' || contrasena == undefined){
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
                  this.get('firebaseApp').auth().createUserWithEmailAndPassword(correo, contrasena).then(({uid})=>{

                    let nuevoUsuario = this.store.createRecord('usuario',{
                      id: uid,
                      nombre: nombre,
                      apellido: apellido,
                      municipio: municipio,
                      departamento: departamento,
                      telefono: telefono,
                      correo: correo,
                    });
                    nuevoUsuario.save();
                    this.transitionToRoute('index');
                    ///limpiar compos
                    this.set('nombre', '');
                    this.set('apellido', '');
                    this.set('departamento', '');
                    this.set('municipio', '');
                    this.set('telefono', '');
                    this.set('correo', '');
                    this.set('contrasena', '');
                  }).catch((error) =>{
                    // Handle Errors here.
                    let errorCode = error.code;
                    if(errorCode == 'auth/email-already-in-use'){
                      this.get('flashMessages').danger('El correo ingresado ya existe!', {
                        timeout: 10000,
                      });
                    }else if (errorCode == 'auth/invalid-email') {
                      this.get('flashMessages').warning('Correo no valido', {
                        timeout: 10000,
                      });
                    }else if (errorCode == 'auth/weak-password') {
                      this.get('flashMessages').warning('Contraseña debe tener al menos 6 caracteres', {
                        timeout: 10000,
                      });
                      this.set('contrasena', '');
                    }
                  });
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
