import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise, resolve } from 'rsvp';

export default Route.extend({
  firebaseApp: service(),
  usuario: null,
  loadUser(numTries) {
    const MAX_NUM_TRIES = 5;
    if (numTries > MAX_NUM_TRIES) {
      return resolve(null);
    }
    console.log('loadUser');
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
      console.log({ currentUser });
      const user = this.get('store').findRecord('usuario', currentUser.uid);
      console.log({ user });
      return user;
    });
  }
});
