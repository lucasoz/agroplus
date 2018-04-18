import Route from '@ember/routing/route';

export default Route.extend({
  model({id}) {
    var propiedad = this.modelFor('propiedades.propiedad');
    lotes = propiedad.lotes;
    return lotes;
  }
});
