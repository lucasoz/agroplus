import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    finalizarProyecto(){
      const proyecto = this.get('model.proyecto');
      const fechaFin = new Date();
      proyecto.set('finalizado',true);
      proyecto.set('fechaFin',fechaFin);
      proyecto.save();
      this.transitionToRoute('proyectos.index');
      this.get('flashMessages').success('Proyecto finalizado correctamente!', {
      timeout: 10000,
      });
    },
  },
});
