import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  longitud: DS.attr('number'),
  latitud: DS.attr('number'),
  departamento: DS.attr('string'),
  municipio: DS.attr('string'),
  vereda: DS.attr('string'),
  //Relaciones
  lotes: DS.hasMany('lote', { async: true, inverse: null }),
  usuario: DS.belongsTo('usuario'),
});
