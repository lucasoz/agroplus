import Controller from '@ember/controller';

export default Controller.extend({
  actions : {
    delete(id){
      this.store.findRecord('propiedad', id).then(function(post) {
        post.destroyRecord(); 
      });
    },
  },
});
