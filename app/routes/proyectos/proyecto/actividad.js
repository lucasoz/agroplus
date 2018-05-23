import Route from '@ember/routing/route';

export default Route.extend({
  model({id4}) {
    const proyecto = this.modelFor('proyectos.proyecto').proyecto;
    const actividades = proyecto.get('actividades');
    const actividad = actividades.findBy('id',id4);
    return actividad;
  }
});
