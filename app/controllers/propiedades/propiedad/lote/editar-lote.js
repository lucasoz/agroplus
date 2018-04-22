import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  actions: {
    flashMessages: inject(),
    editarLote(){
      const area = this.get('model.area');
      const descripcion = this.get('model.descripcion');
      const id = this.get('model.id');
      this.store.findRecord('lote', id).then(function(lote) {
          lote.set('area', area);
          lote.set('descripcion', descripcion);
          lote.save();
      });
      this.transitionToRoute('propiedades.propiedad');
      this.get('flashMessages').success('Lote actualizado correctamente!', {
        timeout: 10000,
      });
    },
  },
});
