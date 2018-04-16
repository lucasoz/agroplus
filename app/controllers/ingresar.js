import Controller from '@ember/controller';

export default Controller.extend({
  firebaseAp: Ember.inject.service(),
  actions:{
    IniciarSesion(){
      var nombreUsuario = this.get('nombreUsuario');
      var contrasena = this.get('contrasena');
      //console.log('bien');
      /*
      this.get('session').open('firebase', {
        provider: 'password',
        email: nombreUsuario,
        password: contrasena
      });
      console.log(this.get('session'));
      console.log(this.get('session').isAuthenticated);
      */
      this.get('firebaseApp').auth().signInWithEmailAndPassword(nombreUsuario, contrasena).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      this.get('firebaseApp').auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("bien");
        } else {
          // No user is signed in.
          console.log("mal");
        }
      });
    },
    CerrarSesion(){
      this.get('session').close();
    }
  }
});
