import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  actions: {
    flashMessages: service,
    editarLote(){
      const area = this.get('area');
      const descripcion = this.get('descripcion');
      const id = this.get('model.id');
      if(area == '' || area == undefined
        || descripcion == '' || descripcion == undefined){
          alert('Completa todos los campos');
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
