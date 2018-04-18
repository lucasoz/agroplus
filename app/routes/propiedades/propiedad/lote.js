import Route from '@ember/routing/route';

export default Route.extend({
  model({id}) {
    var propiedad = this.modelFor('propiedades.propiedad');
    var lotes = propiedad.lotes;
    var lote = lotes.findBy('id',id);
    return lote;
  }
});
