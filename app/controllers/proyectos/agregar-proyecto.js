import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  flashMessages: inject(),
  actions:{
    setEleccionPropiedad(idPropiedad) {
      const self = this;
      this.set('selectedOption', idPropiedad);
      this.get('store').findRecord('propiedad', idPropiedad).then((propiedad)=>{
        propiedad.get('lotes').then((lotes1)=>{
          self.set('lotes',lotes1);
        });
      });
    },
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
        //const id = this.get('idLote');

        //console.log(lote);

        //Verificaciones:
        //Verificación que los campos esten llenos
        if (nombreProyecto == '' || nombreProyecto == undefined ||
        tipoProyecto == '' || tipoProyecto == undefined ||
        descripcion == '' || descripcion == undefined ||
        productoCosecha == '' || productoCosecha == undefined){
            //alert('Completa todo los campos');
            this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
            timeout: 10000,
            });
        }else{
            //Validación de que el nombre del proyecto sean solo letras
            if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombreProyecto)){
                //Validacion de la fecha
                //if(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(fechaInicio)){
                //fin de validacion
                    var usuario = this.model.Usuario;
                    var nuevoProyecto = this.store.createRecord('proyecto',{
                      nombre: nombreProyecto,
                      fechaInicio: fechaInicio,
                      tipoProyecto: tipoProyecto ,
                      descripcion: descripcion,
                      productoCosecha: productoCosecha,
                      usuario: usuario,
                      balance: 0,
                      positivo: false,
                    });
                    //console.log(this.store.findRecord('lote','-LCqAjSJeo9a_LR6taCj').get('proyectos'));
                    //console.log(lote);
                    usuario.get('proyectos').addObject(nuevoProyecto);
                    /*
                    nuevoProyecto.save().then(function(){
                      return usuario.save();
                    });
                    */
                    this.get('store').findRecord('lote', this.get('idLote')).then((lote)=>{
                      lote.get('proyectos').addObject(nuevoProyecto);
                      nuevoProyecto.save().then(function(){
                        lote.save();
                        usuario.save();
                      });
                    });


                    this.set('nombreProyecto', '');
                    this.set('fechaInicio', '');
                    this.set('fechaFin', '');
                    this.set('tipoProyecto', '');
                    this.set('descripcion', '');
                    this.set('productoCosecha', '');
                    this.transitionToRoute('proyectos');
                    this.get('flashMessages').success('Proyecto agregado correctamente!', {
                    timeout: 10000,
                    });
                /*}else{
                    this.get('flashMessages').warning('Fecha de Inicio no valida, Fomato DD-MM-AA', {
                        timeout: 10000,
                      });
                } */
            }else{
                this.get('flashMessages').warning('Nombre no valido, solo letras', {
                  timeout: 10000,
                });
                }
            }
     }
    }
});
