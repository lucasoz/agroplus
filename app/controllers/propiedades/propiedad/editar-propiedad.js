import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    editarPropiedad(){
      var propiedad = this.model;
      var nuevoNombrePropiedad = this.nombrePropiedad;

      if(nuevoNombrePropiedad == '' || nuevoNombrePropiedad == undefined){
        alert('Llene el campo');
      }else{
        if(/^[A-Za-z ]+$/.test(nuevoNombrePropiedad)){
          //actualiza nombre
          propiedad.set('nombre', nuevoNombrePropiedad);
          propiedad.save();
          ///limpiar campo
          this.set('nombrePropiedad', '');
          alert('Se ha editado la propiedad');
        }else {
          alert('El nuevo nombre debe ser solo letras');
        }
      }
    }
  }
});
