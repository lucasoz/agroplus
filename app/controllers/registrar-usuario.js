import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
  actions:{
    agregarUsuario(){
      const nombre = this.nombre;
      const apellido = this.apellido;
      const municipio = this.municipio;
      const departamento = this.departamento;
      const telefono = this.telefono;
      const correo = this.correo;
      const contrasena = this.contrasena;

      if(nombre == '' || nombre == undefined
      || apellido == '' || apellido == undefined
      || municipio == '' || municipio == undefined
      || departamento == '' || departamento == undefined
      || telefono == '' || telefono == undefined
      || correo == '' || correo == undefined
      || contrasena == '' || contrasena == undefined){
        this.get('flashMessages').warning('Ingrese todos los datos', {
          timeout: 10000,
        });
      }else{
        if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)){
          if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(apellido)) {
            if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(departamento)) {
              if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(municipio)) {
                if (/^d+$/.test(telefono)) {
                  ///
                  this.get('firebaseApp').auth().createUserWithEmailAndPassword(correo, contrasena).then(({uid})=>{

                    var nuevoUsuario = this.store.createRecord('usuario',{
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
                  }).catch((error) =>{
                    // Handle Errors here.
                    var errorCode = error.code;
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
                  ///limpiar compos
                  this.set('nombre', '');
                  this.set('apellido', '');
                  this.set('departamento', '');
                  this.set('municipio', '');
                  this.set('telefono', '');
                  this.set('correo', '');
                  this.set('contrasena', '');
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
