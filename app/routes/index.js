import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
  firebaseApp: inject(),
  beforeModel(){
    this.get('firebaseApp').auth().onAuthStateChanged((user)=>{
      if (!user) {
        this.transitionTo('ingresar');
      }
    });
  },
  actions:{
    CerrarSesion(){
      this.get('firebaseApp').auth().signOut().then(function() {
        this.replaceWith('ingresar');
      }).catch(function(error) {

      });
    }
  }
});
