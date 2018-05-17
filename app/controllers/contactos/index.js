import Controller from '@ember/controller';

export default Controller.extend({
  actions : {
    eliminarContacto(contacto){
      const respuesta = confirm("¿Estás seguro que quieres borrar este contacto?");
      if (respuesta) {
        contacto.destroyRecord();
        this.get('flashMessages').success('El contacto fue eliminado exitosamente', {
          timeout: 10000,
        });
      }
    },
  },
});
