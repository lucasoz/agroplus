import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions: {
    editarLote(){
      const area = this.get('area');
      const descripcion = this.get('descripcion');
      const id = this.get('model.id');
      if(area == '' || area == undefined || descripcion == '' || descripcion == undefined){
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      }else{
        if (/^[0-9]+$/.test(area)) {
          this.store.findRecord('lote', id).then(function(lote) {
              lote.set('area', area);
              lote.set('descripcion', descripcion);
              lote.save();
          });
          this.set('area', '');
          this.set('descripcion', '');
          this.transitionToRoute('propiedades.propiedad');
          this.get('flashMessages').success('Lote actualizado correctamente!', {
            timeout: 10000,
          });
          alert('Lote actualizado correctamente!');
        }else {
          this.get('flashMessages').warning('El area debe ser solo numeros', {
            timeout: 10000,
          });
        }

      }
    },
  },
});
