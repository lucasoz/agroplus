import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    var propiedad = this.modelFor('propiedades.propiedad');
    var lotes = propiedad.lotes;
    return lotes;
  }
});
