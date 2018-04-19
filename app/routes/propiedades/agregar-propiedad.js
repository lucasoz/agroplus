import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  model(){
    var usuarioAutenticado = this.get('firebaseApp').auth().currentUser;
    return this.get('store').findRecord('usuario', usuarioAutenticado.uid);
  }
});
