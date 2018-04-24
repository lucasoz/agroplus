import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
  actions:{
    iniciarSesion(){
      const correo = this.get('correo');
      const contrasena = this.get('contrasena');

      //validacion
      if (correo == '' || correo == undefined
      || contrasena == '' || contrasena == undefined) {
        this.get('flashMessages').danger('Ingrese datos', {
          timeout: 10000,
        });
      }else{
        this.get('firebaseApp').auth().signInWithEmailAndPassword(correo, contrasena).then(() => {
          this.set('correo', '');
          this.set('contrasena', '');
          this.transitionToRoute('index');
        }).catch((error) =>{
          // Handle Errors here.
          let errorCode = error.code;
          if(errorCode == 'auth/invalid-email'){
            this.get('flashMessages').danger('Correo no valido', {
              timeout: 10000,
            });
          }else if (errorCode == 'auth/user-not-found') {
            this.get('flashMessages').danger('Correo no existe', {
              timeout: 10000,
            });
          }else if (errorCode == 'auth/wrong-password') {
            this.get('flashMessages').danger('Contraseña no es correcta', {
              timeout: 10000,
            });
          }
        });
      }
    },
  }
});
