import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let proyectos = this.modelFor('proyectos');
    let proyectosFinalizados = [];
    proyectos.forEach((proyecto)=>{

      if (proyecto.get('finalizado')) {
        proyectosFinalizados.push(proyecto);
      }
    });
    return proyectosFinalizados;
  }
});
