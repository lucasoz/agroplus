import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions: {
    agregarLote(){
      const area = this.get('area');
      const descripcion = this.get('descripcion');

      if (area == '' || area == undefined
      || descripcion == '' || descripcion == undefined) {
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      } else {
        if (/^[0-9]+$/.test(area)) {
          const propiedad = this.get('model');
          const nuevoLote = this.store.createRecord('lote', {
            area: area,
            descripcion: descripcion,
          });
          propiedad.get('lotes').addObject(nuevoLote);
          nuevoLote.save().then(function(){
            return propiedad.save();
          });
          //limpiar campos
          this.set('area', '');
          this.set('descripcion', '');
          this.transitionToRoute('propiedades.propiedad');
          this.get('flashMessages').success('Lote agregado correctamente!', {
            timeout: 10000,
          });
        }else {
          this.get('flashMessages').warning('El area debe ser solo numeros', {
            timeout: 10000,
          });
        }
      }
    },
  },
});
