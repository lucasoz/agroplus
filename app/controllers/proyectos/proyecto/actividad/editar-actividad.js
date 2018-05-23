import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions: {
    editarActividad(){
      const nombre = this.get('nombreActividad');
      const descripcion = this.get('descripcion');
      const actividad = this.get('model');
      if(nombre == '' || nombre == undefined || descripcion == '' || descripcion == undefined){
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      }else{
        if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)) {
          actividad.set('nombre',nombre);
          actividad.set('descripcion',descripcion);
          actividad.save();

          this.set('nombreActividad', '');
          this.set('descripcion', '');
          this.transitionToRoute('proyectos.proyecto.index');
          this.get('flashMessages').success('Actividad actualizada correctamente!', {
            timeout: 10000,
          });
          alert('Actividad actualizado correctamente!');
        }else {
          this.get('flashMessages').warning('El nombre de la actividad debe ser solo letras', {
            timeout: 10000,
          });
        }

      }
    },
  },
});
