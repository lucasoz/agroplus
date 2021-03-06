import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  fechaInicio: DS.attr('date'),
  fechaFin: DS.attr('date'),
  tipoProyecto: DS.attr('string'),
  descripcion: DS.attr('string'),
  productoCosecha: DS.attr('string'),
  balance: DS.attr('number'),
  positivo: DS.attr('boolean'),
  finalizado: DS.attr('boolean'),
  //Relaciones
  actividades: DS.hasMany('actividad', { async: true }),
  lote: DS.belongsTo('lote'),
  usuario: DS.belongsTo('usuario'),
});
