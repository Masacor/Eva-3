import { Usuario } from './usuario';

describe('Usuario', () => {
  let usuario: Usuario;

  beforeEach(() => {
    usuario = new Usuario();
  });

  it('Debería crearse la clase correctamente', () => {
    // Verifica que la instancia de Usuario se haya creado correctamente
    expect(usuario).toBeTruthy();
  });

  it('Debería establecer correctamente las propiedades del usuario', () => {
    // Define valores de ejemplo para las propiedades del usuario
    const correo = 'atorres@duocuc.cl';
    const password = '1234';
    const nombre = 'Ana';
    const apellido = 'Torres';
    const preguntaSecreta = 'Nombre de mi mascota';
    const respuestaSecreta = 'Gato';

    // Llama al metodo setUsuario para establecer las propiedades del usuario
    usuario.setUsuario(correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta);

    // Verifica que las propiedades se hayan establecido correctamente
    expect(usuario.correo).toEqual(correo);
    expect(usuario.password).toEqual(password);
    expect(usuario.nombre).toEqual(nombre);
    expect(usuario.apellido).toEqual(apellido);
    expect(usuario.preguntaSecreta).toEqual(preguntaSecreta);
    expect(usuario.respuestaSecreta).toEqual(respuestaSecreta);
  });

  it('Debería obtener un usuario estático correctamente', () => {
    // Obtiene un usuario estatico utilizando el metodo estatico getUsuario
    const usuarioEstatico = Usuario.getUsuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de mi mascota', 'Gato');

    // Verifica que el usuario estatico sea una instancia de Usuario y tiene las propiedades esperadas
    expect(usuarioEstatico instanceof Usuario).toBeTruthy();
    expect(usuarioEstatico.correo).toEqual('atorres@duocuc.cl');
  });

  it('Debe validar correctamente el campo requerido', () => {
    // Define un campo vacio y llama al metodo validarCampoRequerido
    const campoVacio = '';
    const resultado = usuario.validarCampoRequerido('Campo', campoVacio);

    // Verifica que la validación haya devuelto el mensaje esperado
    expect(resultado).toEqual('El campo "Campo" debe tener un valor.');
  });

  it('Debería validar correctamente un correo', () => {
    // Define correos validos e invalidos y llama al metodo validarCorreo
    const correoValido = 'atorres@duocuc.cl';
    const correoInvalido = '';

    const resultadoValido = usuario.validarCorreo(correoValido);
    const resultadoInvalido = usuario.validarCorreo(correoInvalido);

    // Verifica que la validacion haya devuelto los mensajes esperados
    expect(resultadoValido).toEqual('');
    expect(resultadoInvalido).toEqual('El campo "correo" debe tener un valor.');
  });

});
