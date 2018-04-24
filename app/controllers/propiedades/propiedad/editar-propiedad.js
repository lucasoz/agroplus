import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{
    editarPropiedad(){
      const propiedad = this.get('model');
      const nuevoNombrePropiedad = this.get('nombrePropiedad');

      if(nuevoNombrePropiedad == '' || nuevoNombrePropiedad == undefined){
        this.get('flashMessages').warning('Ingrese el nuevo nombre de la propiedad', {
          timeout: 10000,
        });
      }else{
        if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nuevoNombrePropiedad)){
          //actualiza nombre
          propiedad.set('nombre', nuevoNombrePropiedad);
          propiedad.save();
          ///limpiar campo
          this.set('nombrePropiedad', '');
          this.transitionToRoute('propiedades');
          alert('La propiedad fue actuaizada correctamente!'),
          this.get('flashMessages').success('La propiedad fue actuaizada correctamente!', {
            timeout: 10000,
          });
        }else {
          this.get('flashMessages').warning('El nuevo nombre debe ser solo letras', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
