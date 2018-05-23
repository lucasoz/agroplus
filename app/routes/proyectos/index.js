import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let proyectos = this.modelFor('proyectos');
    function proyectosActivos(proyectos) {
      let proyectosActivos = [];
      proyectos.forEach((proyecto)=>{
        if (!proyecto.get('finalizado')) {
          proyectosActivos.push(proyecto);
        }
      });
      return proyectosActivos;
    }
    return proyectosActivos(proyectos);
  }
});
