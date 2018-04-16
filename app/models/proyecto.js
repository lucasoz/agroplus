import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  fechaInicio: DS.attr('date'),
  fechaFin: DS.attr('date'),
  tipo: DS.attr('string'),
  descripcion: DS.attr('string'),
  productoCosecha: DS.attr('string'),
  //Relaciones
  actividades: DS.hasMany('actividad', { async: true, inverse: null }),
  usuario: DS.belongsTo('usuario'),
});
