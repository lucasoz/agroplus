import Controller from '@ember/controller';

export default Controller.extend({
    actions:{
        editarProyecto(){
          // yo propongo hacerlo de esta manera llamar el action del controlador de  proyectos.Controller();
        const proyecto = this.get('model');
        const nombre = this.get('nombre');
        const fechaInicio = this.get('fechaInicio');
        const fechaFin = this.get('fechaFin');
        if (fechaFin == "") {
            console.log(fechaFin);
            
        }
        
        const tipoProyecto = document.getElementById("tipoProyecto").value;
        

        const descripcion = this.get('descripcion');
        const productoCosecha = this.get('productoCosecha');
        console.log(descripcion);
        //Verificaciones:
        //Verificación que los campos esten llenos
        if (nombre == '' || nombre == undefined ||
        fechaInicio == '' || fechaInicio == undefined ||
        fechaFin == '' || fechaFin == undefined ||

        tipoProyecto == '' ||

        descripcion == '' || descripcion == undefined ||
        productoCosecha == '' || productoCosecha == undefined){
            //alert('Completa todo los campos');
            this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
            timeout: 10000,
            });
        }else{
            //Validación de que el nombre del proyecto sean solo letras
            if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)){
                
                   proyecto.set('nombre', nombre);
                   proyecto.set('fechaInicio',fechaInicio);
                   proyecto.set('fechaFin',fechaFin);
                    proyecto.set('tipoProyecto',tipoProyecto);
                   proyecto.set('descripcion',descripcion);
                   proyecto.set('productoCosecha',productoCosecha);
                   proyecto.save();
                   this.transitionToRoute('proyectos');
                    this.get('flashMessages').success('Proyecto Editado correctamente!', {
                    timeout: 10000,
                    });

                    this.set('nombre', '');
                    this.set('fechaInicio', '');
                    this.set('fechaFin', '');
                    this.set('tipoProyecto', '');
                    this.set('descripcion', '');
                    this.set('productoCosecha', '');
               
            }else{
                this.get('flashMessages').warning('Nombre no valido, solo letras', {
                  timeout: 10000,
                });
                }
            }
         }
       }
    
});
