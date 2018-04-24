import Route from '@ember/routing/route';

export default Route.extend({
  model({id1}) {
    const propiedad = this.modelFor('propiedades.propiedad');
    const lotes = propiedad.get('lotes');
    const lote = lotes.findBy('id',id1);
    return lote;
  }
});
