import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let proyectos = this.modelFor('proyectos');
    function proyectosFinalizados(proyectos){
      let proyectosFinalizados = [];
      proyectos.forEach((proyecto)=>{
        if (proyecto.get('finalizado')) {
          proyectosFinalizados.push(proyecto);
        }
      });
      return proyectosFinalizados
    }
    return proyectosFinalizados(proyectos);
  }
});
