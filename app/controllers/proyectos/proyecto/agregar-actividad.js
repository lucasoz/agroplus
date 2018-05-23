import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{
    setEleccionContacto(idContacto) {
      const self = this;
      this.set('selectedOption', idContacto);
      this.get('store').findRecord('contacto', idContacto).then((contacto)=>{
          self.set('contacto',contacto);
      });
    },
    agregarActividad(){
        //definición de las variables
        const nombreActividad = this.get('nombreActividad');
        const fecha = new Date();
        const costo = this.get('costo');
        const descripcion = this.get('descripcion');
        const tipoActividad = document.getElementById("tipoActividad").value;
        const contacto = this.get('contacto');
        
        //Verificaciones:
        //Verificación que los campos esten llenos
        if (nombreActividad == '' || nombreActividad == undefined ||
        tipoActividad == '' || tipoActividad == undefined ||
        descripcion == '' || descripcion == undefined ||
        costo == '' || costo == undefined){
            this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
            timeout: 10000,
            });
        }else{
            //Validación de que el nombre del proyecto sean solo letras
            if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombreActividad)){
                    const proyecto = this.get('model.proyecto');
                    var nuevaActividad = this.store.createRecord('actividad',{
                      nombre: nombreActividad,
                      fecha: fecha,
                      tipo: tipoActividad ,
                      descripcion: descripcion,
                      costo: costo,
                      contacto: contacto,
                      proyecto: proyecto,
                    });
                    const balance = proyecto.get('balance');
                    let nuevoBalance = 0;
                    if (tipoActividad == 'Ingreso') {
                      nuevoBalance = balance + parseInt(costo);
                    }else{
                      nuevoBalance = balance - parseInt(costo);
                    }

                    proyecto.set('balance',nuevoBalance);
                    if (nuevoBalance>0) {
                      proyecto.set('positivo',true);
                    }else{
                      proyecto.set('positivo',false);
                    }
                    contacto.get('actividades').addObject(nuevaActividad);
                    proyecto.get('actividades').addObject(nuevaActividad);
                    nuevaActividad.save().then(()=>{
                      contacto.save().then(()=>{
                        proyecto.save();
                      })
                    });

                    this.set('nombreActividad', '');
                    this.set('descripcion', '');
                    this.set('contacto', '');
                    this.set('tipoActividad', '');
                    this.set('costo', '');
                    this.transitionToRoute('proyectos.proyecto');
                    this.get('flashMessages').success('Actividad agregada correctamente!', {
                    timeout: 10000,
                    });

            }else{
                this.get('flashMessages').warning('Nombre no valido, solo letras', {
                  timeout: 10000,
                });
                }
            }
     }
    }
});
