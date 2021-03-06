import Route from '@ember/routing/route';
import {inject} from '@ember/service';
import { Promise, resolve } from 'rsvp';

export default Route.extend({
  firebaseApp: inject(),
  loadUser(numTries) {
    const MAX_NUM_TRIES = 5;
    if (numTries > MAX_NUM_TRIES) {
      return resolve(null);
    }
    return new Promise((resolve) => {
      const currentUser = this.get('firebaseApp').auth().currentUser;
      if (currentUser) {
        resolve(currentUser);
      } else {
        setTimeout(() => {
          resolve(this.loadUser(numTries + 1));
        }, 100);
      }
    });
  },
  model(){
    return this.loadUser(0).then((currentUser) => {
      if(currentUser != null){
        return this.get('store').findRecord('usuario', currentUser.uid);
      }else{
        this.transitionTo('ingresar');
        return null;
      }
    });
  },
});
