import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    editarContacto(){
      const contacto = this.get('model');
      const tipoContacto = document.getElementById("tipoContacto").value;
      const telefono = this.get('telefono');

      if (telefono == '' || telefono == undefined ||
      tipoContacto == '') {
        this.get('flashMessages').warning('Hay campos obligatorios que no se han llenado. Intentelo de nuevo', {
          timeout: 10000,
        });
      }else {
        if (/^[0-9]+$/.test(telefono)) {
          contacto.set('tipoContacto', tipoContacto);
          contacto.set('telefono', telefono);
          contacto.save();
          this.transitionToRoute('contactos');
          this.get('flashMessages').success('El contacto fue actuaizado correctamente!', {
            timeout: 10000,
          });
          this.set('telefono', '');

        }else {
          this.get('flashMessages').warning('Telefono debe tener solo numeros', {
            timeout: 10000,
          });
        }
      }
    }
  }
});
