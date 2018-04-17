import Controller from '@ember/controller';
import {inject} from '@ember/service';

export default Controller.extend({
  firebaseApp: inject(),
  actions:{
    AgregarUsuario(){
      this.get('firebaseApp').auth().createUserWithEmailAndPassword(this.correo, this.contrasena).then(({uid})=>{
        var nombre = this.nombre;
        var apellido = this.apellido;
        var municipio = this.municipio;
        var departamento = this.departamento;
        var telefono = this.telefono;
        var correo = this.correo;
        console.log('antes');

        var nuevoUsuario = this.store.createRecord('usuario',{
          //id: uid,
          nombre: nombre,
          apellido: apellido,
          municipio: municipio,
          departamento: departamento,
          telefono: telefono,
          correo: correo,
        });

        console.log('hi');
        nuevoUsuario.save();
        console.log('despues');
        this.transitionToRoute('index');
      }).catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == 'auth/email-already-in-use'){
          alert('Correo ya existe');
        }else if (errorCode == 'auth/invalid-email') {
          alert('Correo no valido');
        }else if (errorCode == 'auth/weak-password') {
          alert('Contraseña no es fuerte');
        }
      });
    }
  }
});
