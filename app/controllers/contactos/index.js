import Controller from '@ember/controller';

export default Controller.extend({
  actions : {
    delete(id){
      const respuesta = confirm("¿Estás seguro que quieres borrar este contacto?");
      if (respuesta) {
        this.get('store').findRecord('contacto', id).then(function(contacto) {
          contacto.destroyRecord();
        });
      }
    },
  },
});
