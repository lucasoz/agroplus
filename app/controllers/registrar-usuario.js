import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    agregarUsuario(){
      const nombre = this.nombre;
      const apellido = this.apellido;
      const municipio = this.municipio;
      const departamento = this.departamento;
      const telefono = this.telefono;
      const correo = this.correo;
      const contrasena = this.contrasena;

      if(nombre == '' || nombre == undefined
      || apellido == '' || apellido == undefined
      || municipio == '' || municipio == undefined
      || departamento == '' || departamento == undefined
      || telefono == '' || telefono == undefined
      || correo == '' || correo == undefined
      || contrasena == '' || contrasena == undefined){
        alert('Llene todos los campos');
      }else{
        if(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)){
          if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(apellido)) {
            if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(departamento)) {
              if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(municipio)) {
                if (/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(telefono)) {
                  ///
                  this.get('firebaseApp').auth().createUserWithEmailAndPassword(correo, contrasena).then(({uid})=>{

                    var nuevoUsuario = this.store.createRecord('usuario',{
                      id: uid,
                      nombre: nombre,
                      apellido: apellido,
                      municipio: municipio,
                      departamento: departamento,
                      telefono: telefono,
                      correo: correo,
                    });
                    nuevoUsuario.save();
                    this.transitionToRoute('index');
                  }).catch((error) =>{
                    // Handle Errors here.
                    var errorCode = error.code;
                    // var errorMessage = error.message;
                    if(errorCode == 'auth/email-already-in-use'){
                      alert('Correo ya existe');
                    }else if (errorCode == 'auth/invalid-email') {
                      alert('Correo no valido');
                    }else if (errorCode == 'auth/weak-password') {
                      alert('Contraseña no es fuerte');
                      this.set('contrasena', '');
                    }
                  });
                  ///limpiar compos
                  this.set('nombre', '');
                  this.set('apellido', '');
                  this.set('departamento', '');
                  this.set('municipio', '');
                  this.set('telefono', '');
                  this.set('correo', '');
                  this.set('contrasena', '');
                }else {
                  alert('Telefono debe tener solo numeros');
                }
              }else {
                alert('Municipio debe tener solo letras');
              }
            }else {
              alert('Departamento debe tener solo letras');
            }
          }else {
            alert('Apellido debe tener solo letras');
          }
        }else {
          alert('Nombre debe tener solo letras');
        }
      }
    }
  }
});
