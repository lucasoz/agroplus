import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  beforeModel(){
    this.get('firebaseApp').auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user.email);
        console.log(user.uid);
        this.transitionTo('index');
      }
    });

  }
});
