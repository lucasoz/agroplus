import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let proyectos = this.modelFor('proyectos');
    let proyectosActivos = [];
    proyectos.forEach((proyecto)=>{

      if (!proyecto.get('finalizado')) {
        proyectosActivos.push(proyecto);
      }
    });
    return proyectosActivos;
  }
});
