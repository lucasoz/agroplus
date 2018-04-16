import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  descripcion: DS.attr('string'),
  costo: DS.attr('number'),
  fecha: DS.attr('date'),
  tipo: DS.attr('string'),
  //Relaciones
  contacto: DS.belongsTo('contacto', { async: true, inverse: null }),
  proyecto: DS.belongsTo('proyecto'),

});
