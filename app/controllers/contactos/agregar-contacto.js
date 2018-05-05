import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    agregarContacto(){
      const nombre = this.get('nombre');
      const apellido = this.get('apellido');
      const tipoContacto = this.get('tipoContacto');
      const telefono = this.get('telefono');

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
      this.transitionToRoute('contactos');
    }
  }
});
