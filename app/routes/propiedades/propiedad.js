import Route from '@ember/routing/route';

export default Route.extend({
  model({id}) {
    let Usuario;
    if (this.modelFor('index') != null) {
      Usuario = this.modelFor('index');
    }else{
      Usuario = this.modelFor('application');
    }
    //const self = this;
    let propiedadUsuario = Usuario.get('propiedades').findBy('id', id);
    if (propiedadUsuario == undefined) {
      this.transitionTo('index');
    }else {
      return propiedadUsuario;
    }
    /*
    let propiedad = this.store.findRecord('propiedad',id).then((propiedadRes)=>{
      if(propiedadRes == propiedadUsuario){
        return propiedadRes;
      }else{
        self.transitionTo('index');
      }
    }).catch(()=>{
      self.transitionTo('index');
    });
    */
    //return propiedad;

  }
});
