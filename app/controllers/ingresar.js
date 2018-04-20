import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    IniciarSesion(){
      //Para mostrar un error
      $('#mensaje').empty().removeAttr('style');
      $('#mensaje').removeClass();

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
          mostrarMensaje('Correo no valido');
        }else if (errorCode == 'auth/user-not-found') {
          mostrarMensaje('Correo no existe');
        }else if (errorCode == 'auth/wrong-password') {
          mostrarMensaje('Contraseña no es correcta');
        }else {
          // console.log(errorMessage);
        }
      });
      function mostrarMensaje(mensaje){
        $('#mensaje').addClass("alert alert-danger fade in")
        .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
          +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +mensaje);
      }
    },
  }
});
