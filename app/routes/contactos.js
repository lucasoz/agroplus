import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let Usuario;
    if (this.modelFor('index') != null) {
      Usuario = this.modelFor('index');
    }else{
      Usuario = this.modelFor('application');
    }
    if(Usuario !=null){
      return Usuario.get('contactos');
    }else {
      this.transitionTo('ingresar');
    }
  }
});
