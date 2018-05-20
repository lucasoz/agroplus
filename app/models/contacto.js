import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  apellido: DS.attr('string'),
  tipoContacto: DS.attr('string'),
  telefono: DS.attr('number'),
  //Relaciones
  actividades: DS.hasMany('actividad', { async: true }),
  usuario: DS.belongsTo('usuario'),
});
