import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    agregarLote(){
      this.set('mensaje', '');
      if (!this.area && !this.descripcion) {
        this.set('mensaje', 'Por favor ingresa datos');
      } else if (this.area && !this.descripcion) {
        this.set('mensaje', 'Por favor ingresa la descripcion');
      } else {
        console.log('asdads');
        // var propiedad = this.model;
        // nuevoLote = this.store.createRecord('lote', {
        //   area: this.area,
        //   descripcion: this.descripcion,
        // });
        // propiedad.get('lotes').addObject(nuevoLote);
        // nuevoLote.save().then(function(){
        //   return propiedad.save();
        // });
        // this.transitionToRoute('propiedades.propiedad',this.get('model').id);
      }
    },
  },
});
