import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('ingresar');
  this.route('registrar-usuario');
  this.route('propiedades', function() {
    this.route('agregar-propiedad');
    this.route('propiedad', { path: ':id'}, function() {
      this.route('editar-propiedad');
      this.route('agregar-lote');

      this.route('lote', { path: ':id1'}, function() {
        this.route('editar-lote');
      });
      this.route('lotes');
    });
  });
  this.route('proyectos', function() {
    this.route('proyecto', {path: ':id3'},function() {
      this.route('editar-proyecto');
      this.route('agregar-actividad');

      this.route('actividad', { path: ':id4'}, function() {
        this.route('editar-actividad');
      });
    });
    this.route('agregar-proyecto');
    this.route('historial-proyectos');
  });
  this.route('contactos', function() {
    this.route('contacto',{ path: ':id2'}, function() {
      this.route('editar-contacto');
    });
    this.route('agregar-contacto');
  });
  this.route('editar-usuario');
});

export default Router;
