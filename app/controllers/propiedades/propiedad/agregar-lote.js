import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    agregarLote(){
      $('#mensaje').empty().removeAttr('style');
      $('#mensaje').removeClass();

      const area = this.get('area');
      const descripcion = this.get('descripcion');

      if (area == '' || area == undefined
      || descripcion == '' || descripcion == undefined) {
        mostrarMensaje('Completa todos los campos');
      } else {
        var propiedad = this.model;
        var nuevoLote = this.store.createRecord('lote', {
          area: this.area,
          descripcion: this.descripcion,
        });
        propiedad.get('lotes').addObject(nuevoLote);
        nuevoLote.save().then(function(){
          return propiedad.save();
        });
        //limpiar campos
        this.set('area', '');
        this.set('descripcion', '');
        this.transitionToRoute('propiedades.propiedad',this.get('model').id);
      }
      function mostrarMensaje(mensaje){
        $('#mensaje').addClass("alert alert-danger fade in")
        .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
          +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +mensaje);
      }
    },
  },
});
