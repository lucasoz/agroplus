import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  apellido: DS.attr('string'),
  municipio: DS.attr('string'),
  departamento: DS.attr('string'),
  telefono: DS.attr('number'),
  //Relaciones
  propiedades: DS.hasMany('propiedad', { async: true, inverse: null }),
  contactos: DS.hasMany('contacto', { async: true, inverse: null }),
  proyectos: DS.hasMany('proyecto', { async: true, inverse: null }),
});