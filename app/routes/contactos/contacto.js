import Route from '@ember/routing/route';

export default Route.extend({
  model({id2}){
    let Usuario;
    if (this.modelFor('index') != null) {
      Usuario = this.modelFor('index');
    }else{
      Usuario = this.modelFor('application');
    }
    return Usuario.get('contactos').findBy('id', id2);
  }
});
