import Controller from '@ember/controller';

export default Controller.extend({
  actions : {
    delete(id){
      var respuesta = confirm("¿Estás seguro que quieres borrar este lote?");
      if (respuesta) {
        this.store.findRecord('lote', id).then(function(post) {
          post.destroyRecord();
        });
      }
    },
  },
});
