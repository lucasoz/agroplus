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
});

export default Router;
