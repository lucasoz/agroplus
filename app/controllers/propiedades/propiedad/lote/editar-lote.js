import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions: {
    editarLote(){
      const area = this.get('area');
      const descripcion = this.get('descripcion');
      const id = this.get('model.id');
      if(area == '' || area == undefined
        || descripcion == '' || descripcion == undefined){
          this.get('flashMessages').warning('Completa todos los campos', {
            timeout: 10000,
          });
        }else{
          this.store.findRecord('lote', id).then(function(lote) {
              lote.set('area', area);
              lote.set('descripcion', descripcion);
              lote.save();
          });
          this.transitionToRoute('propiedades.propiedad');
          this.get('flashMessages').success('Lote actualizado correctamente!', {
            timeout: 10000,
          });
        }
    },
  },
});
