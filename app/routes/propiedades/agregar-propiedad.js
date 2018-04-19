import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  model(){
    var usuarioAutenticado = this.get('firebaseApp').auth().currentUser;
    //console.log(usuarioAutenticado.uid);
    var usuario = this.get('store').findRecord('usuario', usuarioAutenticado.uid);
    //console.log(usuario);
    //var usuarios = this.store.findAll('usuario');
    console.log(usuario.id);
    return usuario;
  }
});
