import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    IniciarSesion(){
      var nombreUsuario = this.get('nombreUsuario');
      var contrasena = this.get('contrasena');
      var hola = this;
      this.get('firebaseApp').auth().signInWithEmailAndPassword(nombreUsuario, contrasena).then(function(){
          hola.transitionToRoute('index');
      }).catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == 'auth/invalid-email'){
          alert('Correo no valido');
        }else if (errorCode == 'auth/user-not-found') {
          alert('Correo no existe');
        }else if (errorCode == 'auth/wrong-password') {
          alert('Contraseña no es correcta');
        }else {
          console.log(errorMessage);
        }
      });
    },
    CerrarSesion(){
      this.get('session').close();
    }
  }
});
