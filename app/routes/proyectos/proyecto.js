import Route from '@ember/routing/route';

export default Route.extend({
    model({id4}) {
        let Usuario;
        if (this.modelFor('index') != null) {
          Usuario = this.modelFor('index');
        }else{
          Usuario = this.modelFor('application');
        }
        return Usuario.get('proyectos').findBy('id', id4);
      }    
});
