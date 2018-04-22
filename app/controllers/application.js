import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    cerrarSesion(){
      this.get('firebaseApp').auth().signOut().then(()=> {
        this.transitionToRoute('ingresar');
      });

    }
  }
});
