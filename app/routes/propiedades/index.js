import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  model(){
    var user = this.get('firebaseApp').auth().currentUser;
    if (!user) {
      this.transitionTo('index');
    }else{
      return this.modelFor('propiedades');
    } 
  },
});
