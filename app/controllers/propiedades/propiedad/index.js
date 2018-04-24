import Controller from '@ember/controller';

export default Controller.extend({
  actions : {
    delete(id){
      const respuesta = confirm("¿Estás seguro que quieres borrar este lote?");
      if (respuesta) {
        this.get('store').findRecord('lote', id).then(function(post) {
          post.destroyRecord();
        });
      }
    },
  },
});
