import Route from '@ember/routing/route';

export default Route.extend({
  model({id}) {
    let Usuario;
    if (this.modelFor('index') != null) {
      Usuario = this.modelFor('index');
    }else{
      Usuario = this.modelFor('application');
    }
    let propiedadUsuario = Usuario.get('propiedades').findBy('id', id);
    if (propiedadUsuario == undefined) {
      this.transitionTo('index');
    }else {
      return propiedadUsuario;
    }
  }
});
