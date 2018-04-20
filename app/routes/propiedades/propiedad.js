import Route from '@ember/routing/route';

export default Route.extend({
  model({id}) {
    const Usuario = this.modelFor('application');
    return Usuario.get('propiedades').findBy('id', id);
  }
});
