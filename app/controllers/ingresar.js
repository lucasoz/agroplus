import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  firebaseApp: inject(),
  actions:{
    IniciarSesion(){
      var nombreUsuario = this.get('nombreUsuario');
      var contrasena = this.get('contrasena');
      this.get('firebaseApp').auth().signInWithEmailAndPassword(nombreUsuario, contrasena).then(() => {
        this.set('nombreUsuario', '');
        this.set('contrasena', '');
        this.transitionToRoute('index');
      }).catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
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
    },
  }
});
