import Route from '@ember/routing/route';

export default Route.extend({
    model({id3}) {
        let Usuario;
        if (this.modelFor('index') != null) {
          Usuario = this.modelFor('index');
        }else{
          Usuario = this.modelFor('application');
        }
        const proyecto = Usuario.get('proyectos').findBy('id', id3);
        const fechaInicio = proyecto.get('fechaInicio');
        const dia = fechaInicio.getDate();
        const mes = fechaInicio.getMonth() + 1;
        const ano = fechaInicio.getFullYear();
        return {proyecto,dia,mes,ano};
      }
});
