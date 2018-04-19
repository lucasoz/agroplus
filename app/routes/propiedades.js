import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  model(){
    var usuarioAutenticado = this.get('firebaseApp').auth().currentUser;
    //console.log(usuarioAutenticado.uid);
    return this.get('store').findRecord('usuario', usuarioAutenticado.uid);
    /*
    this.get('firebaseApp').auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log(user.uid);
        return this.get('store').findRecord('usuario', user.uid);
      } else {
        // No user is signed in.
      }
    });
    */
  }
});
