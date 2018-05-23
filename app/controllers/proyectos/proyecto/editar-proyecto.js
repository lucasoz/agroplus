import Controller from '@ember/controller';

export default Controller.extend({
    actions:{
        editarProyecto(){
         // definicion de las variables
        const proyecto = this.get('model');
        const nombre = this.get('nombre');
        const tipoProyecto = document.getElementById("tipoProyecto").value;
        const descripcion = this.get('descripcion');
            
        //Verificaciones:
        //Verificación que los campos esten llenos

        if (nombre == '' || nombre == undefined ||
        tipoProyecto == '' ||
        descripcion == '' || descripcion == undefined){
            this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
            timeout: 10000,
            });
           
        }else{
            //Validación de que el nombre del proyecto sean solo letras
            if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)){
                
                   proyecto.set('nombre', nombre);
                   proyecto.set('tipoProyecto',tipoProyecto);
                   proyecto.set('descripcion',descripcion);
                   proyecto.save();
                   this.transitionToRoute('proyectos');
                    this.get('flashMessages').success('Proyecto Editado correctamente!', {
                    timeout: 10000,
                    });

                    this.set('nombre', '');
                    this.set('tipoProyecto', '');
                    this.set('descripcion', '');
                    
            }else{
                this.get('flashMessages').warning('Nombre no valido, solo letras', {
                  timeout: 10000,
                });
                }
            }
         }
       }
    
});
