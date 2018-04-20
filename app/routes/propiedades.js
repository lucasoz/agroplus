import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    const Usuario = this.modelFor('application');
    return Usuario.get('propiedades');
  }
});
