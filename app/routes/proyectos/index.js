import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  model(){
    let user = this.get('firebaseApp').auth().currentUser;
    if (!user) {
      //this.transitionTo('ingresar');
    }else{
      return this.modelFor('proyectos');
    }
  },
});
