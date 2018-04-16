import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  area: DS.attr('number'),
  descripcion: DS.attr('string'),
  //Relaciones
  propiedad: DS.belongsTo('propiedad'),
});
