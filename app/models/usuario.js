import DS from 'ember-data';

export default DS.Model.extend({
  //Atributos
  nombre: DS.attr('string'),
  apellido: DS.attr('string'),
  municipio: DS.attr('string'),
  departamento: DS.attr('string'),
  telefono: DS.attr('number'),
  correo: DS.attr('string'),
  //Relaciones
  propiedades: DS.hasMany('propiedad', { async: true}),
  contactos: DS.hasMany('contacto', { async: true, inverse: null }),
  proyectos: DS.hasMany('proyecto', { async: true, inverse: null }),
});
