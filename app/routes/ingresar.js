import Route from '@ember/routing/route';

export default Route.extend({
  firebaseApp: Ember.inject.service(),
  model(){
    var user = this.get('firebaseApp').auth().currentUser;
      if (user) {
        this.transitionTo('index');
      } else {
        // No user is signed in.
        console.log("mal");
      }
  }
});
