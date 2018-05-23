import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{

    //Seleccion de la propiedad
    setEleccionPropiedad(idPropiedad) {
      const self = this;
      this.set('selectedOption', idPropiedad);
      this.get('store').findRecord('propiedad', idPropiedad).then((propiedad)=>{
        propiedad.get('lotes').then((lotes1)=>{
          self.set('lotes',lotes1);
        });
      });
    },

    //Seleccion de Lote
    setEleccionLote(idLote) {
      this.set('idLote',idLote);
    },
    agregarProyecto(){

        //definición de las variables
        const nombreProyecto = this.get('nombreProyecto');
        const fechaInicio = new Date();
        const tipoProyecto = document.getElementById("tipoProyecto").value;
        const descripcion = this.get('descripcion');
        const productoCosecha = this.get('productoCosecha');
        //const propiedad = document.getElementById('propiedadesc').value;
        //const lote = document.getElementById('loteesc').value;


        //Verificaciones:
        //Verificación que los campos esten llenos
        if (nombreProyecto == '' || nombreProyecto == undefined ||
        tipoProyecto == '' || tipoProyecto == undefined ||
        descripcion == '' || descripcion == undefined ||
        //propiedad == '' || lote == '' ||
        productoCosecha == '' || productoCosecha == undefined){
            
            this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
            timeout: 10000,
            });
        }else{
            //Validación de que el nombre del proyecto sean solo letras
            if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombreProyecto)){
                
                    var usuario = this.model.Usuario;
                    this.get('store').findRecord('lote', this.get('idLote')).then((lote)=>{
                      var nuevoProyecto = this.store.createRecord('proyecto',{
                        nombre: nombreProyecto,
                        fechaInicio: fechaInicio,
                        tipoProyecto: tipoProyecto ,
                        descripcion: descripcion,
                        productoCosecha: productoCosecha,
                        usuario: usuario,
                        lote: lote,
                        balance: 0,
                        positivo: false,
                        finalizado: false,
                      });
                      usuario.get('proyectos').addObject(nuevoProyecto);
                      lote.get('proyectos').addObject(nuevoProyecto);
                      nuevoProyecto.save().then(function(){
                        lote.save();
                        usuario.save();
                      });
                    });


                    this.set('nombreProyecto', '');
                    this.set('fechaInicio', '');
                    this.set('tipoProyecto', '');
                    this.set('descripcion', '');
                    this.set('productoCosecha', '');
                    this.transitionToRoute('proyectos');
                    this.get('flashMessages').success('Proyecto agregado correctamente!', {
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
