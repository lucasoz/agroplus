import Route from '@ember/routing/route';

export default Route.extend({
  model({id1}) {
    console.log(id1);
    var propiedad = this.modelFor('propiedades.propiedad');
    var lotes = propiedad.get('lotes');
    var lote = lotes.findBy('id',id1);
    return lote;
  }
});
