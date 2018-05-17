import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    agregarContacto(){
      const nombre = this.get('nombre');
      const apellido = this.get('apellido');
      const tipoContacto = document.getElementById("tipoContacto").value;
      const telefono = this.get('telefono');

      if (nombre == '' || nombre == undefined ||
      apellido == '' || apellido == undefined ||
      tipoContacto == '' ||
      telefono == '' || telefono == undefined) {
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      }else{
        if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)) {
          if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(apellido)) {
            if (/^[0-9]+$/.test(telefono)) {
              const nuevoContacto = this.get('store').createRecord('contacto',{
                nombre: nombre,
                apellido: apellido,
                tipoContacto: tipoContacto,
                telefono: telefono
              });
              let usuario = this.get('model');
              usuario.get('contactos').addObject(nuevoContacto);
              nuevoContacto.save().then(function(){
                return usuario.save();
              });
              this.get('flashMessages').success('El contacto fue agregado exitosamente', {
                timeout: 10000,
              });
              this.set('nombre','');
              this.set('apellido','');
              this.set('telefono','');
              this.transitionToRoute('contactos');
            }else {
              this.get('flashMessages').warning('Telefono debe tener solo numeros', {
                timeout: 10000,
              });
            }
          }else {
            this.get('flashMessages').warning('Apellido debe tener solo letras', {
              timeout: 10000,
            });
          }
        }else{
          this.get('flashMessages').warning('Nombre debe tener solo letras', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
