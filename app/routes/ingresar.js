import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  beforeModel(){
    this.get('firebaseApp').auth().onAuthStateChanged((user)=>{
      if (user) {
        this.transitionTo('index');
      }
    });
  }
});
