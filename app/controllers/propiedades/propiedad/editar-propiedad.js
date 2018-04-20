import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    editarPropiedad(){
      $('#mensaje').empty().removeAttr('style');
      $('#mensaje').removeClass();

      var propiedad = this.model;
      var nuevoNombrePropiedad = this.nombrePropiedad;

      if(nuevoNombrePropiedad == '' || nuevoNombrePropiedad == undefined){
        mostrarMensaje('Llene el campo');
      }else{
        if(/^[A-Za-z ]+$/.test(nuevoNombrePropiedad)){
          //actualiza nombre
          propiedad.set('nombre', nuevoNombrePropiedad);
          propiedad.save();
          ///limpiar campo
          this.set('nombrePropiedad', '');
          alert('Se ha editado la propiedad');
        }else {
          mostrarMensaje('El nuevo nombre debe ser solo letras');
        }
      }
      function mostrarMensaje(mensaje){
        $('#mensaje').addClass("alert alert-danger fade in")
        .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
          +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +mensaje);
      }
    }
  }
});
