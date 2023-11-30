describe('Verificar Duoc Plus', () => {

//LOGIN: correo, password, inicio 
  it('Verificar Login incorrecto', () => {
    cy.visit('http://localhost:8100/').then(()=>{
      cy.get('#correo').type('no-correo@duocuc.cl');
      cy.get('#password').type('1234');
      cy.contains('Ingresa').click();
      cy.intercept('/inicio').as('route').then(()=>{
        cy.get('ion-title').should('contain.text','')
      });
    });
  })

   it('Verificar Login correcto', () => {
    cy.visit('http://localhost:8100/').then(()=>{
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.contains('Ingresa').click();
      cy.intercept('/inicio').as('route').then(()=>{
        cy.get('ion-title').should('contain.text','')
        cy.contains('Cerrar sesión').click();
      });
    });
   })

 //FORO
  describe('Prueba de foro', () => {
    it('Crear publicacion', () => {
      // Iniciar sesión o realizar cualquier acción necesaria para llegar a la página del foro.
      cy.visit('http://localhost:8100/');
      cy.viewport('samsung-s10');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.contains('Ingresa').click();
  
      // Esperar a que la página de inicio cargue completamente
      cy.url().should('include', '/inicio');
      cy.get('[value="foro"]').should('be.visible').click();
      cy.get('app-foro').should('be.visible');
  
      // Esperar a que los elementos del formulario estén disponibles
      cy.get('#titulo').should('be.visible').type('Título de la publicación');
      cy.get('#texto').should('be.visible').type('Contenido de la publicación');
  
      cy.intercept('POST', '/api/publicaciones').as('guardarPublicacion');
      cy.get('#guardar-foro').should('be.visible').click();    

      cy.contains('Cerrar sesión').click();
    });

    it(`Verificar edicion ${10}`, () => {
      cy.visit('http://localhost:8100/ingreso').then(() => {
        cy.get('#correo').invoke('val', '');
        cy.get('#correo').type('atorres@duocuc.cl');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.contains('Ingresar').click();
        cy.intercept('/inicio').as('route').then(() => {
          cy.get('[ng-reflect-value="foro"]').click();
          cy.contains('Editar').click()
          cy.wait(3000);
          cy.get('#titulo').should('be.visible').type('Título de la publicación 2');
          cy.get('#texto').should('be.visible').type('Contenido de la publicación 2');

          cy.get('#guardar-foro').should('be.visible').click();    

          cy.contains('Cerrar sesión').click();
        });
      });
    })

    it(`Verificar eliminación en foro de la última publicación con el título que contiene ${10}`, () => {
      cy.visit('http://localhost:8100/ingreso').then(() => {
        cy.get('#correo').invoke('val', '');
        cy.get('#correo').type('atorres@duocuc.cl');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.contains('Ingresar').click();
        cy.intercept('/inicio').as('route').then(() => {
          cy.get('[ng-reflect-value="foro"]').click();
          cy.contains('Eliminar').click();
          cy.wait(3000);
          cy.wait(3000);
          cy.contains(`Título de prueba ${10}`).should('not.exist');
          cy.contains('Cerrar sesión').click();
        });
      });
    })
  });

// //MIS DATOS

describe('Prueba de mis datos', () => {
  it('Crear publicacion', () => {
    // Iniciar sesión o realizar cualquier acción necesaria para llegar a la página del foro.
    cy.visit('http://localhost:8100/');
    cy.viewport('samsung-s10');
    cy.get('#correo').type('atorres@duocuc.cl');
    cy.get('#password').type('1234');
    cy.contains('Ingresa').click();

    // Esperar a que la página de inicio cargue completamente
    cy.url().should('include', '/inicio');
    cy.get('[value="misdatos"]').should('be.visible').click();
    cy.get('app-misdatos').should('be.visible');

    // Esperar a que los elementos del formulario estén disponibles
    cy.get('#nombre').invoke('val', '');

    cy.get('#Actualizar').should('be.visible').click();    

    cy.contains('Cerrar sesión').click();
  });

  it(`Verificar edicion ${10}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.viewport(1000,1500);
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();

      cy.intercept('/inicio').as('route').then(() => {
        cy.get('[ng-reflect-value="misdatos"]').click();

        cy.wait(3000);
        cy.get('#password-d').invoke('val', '');
        cy.get('#password-d').type('12345');
        cy.get('#password2-d').invoke('val', '');
        cy.get('#password2-d').type('12345');

        cy.get('#Actualizar').should('be.visible').click();    

        cy.contains('Cerrar sesión').click();

        cy.get('#correo').invoke('val', '');
        cy.get('#correo').type('atorres@duocuc.cl');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('12345');
        cy.contains('Ingresar').click();

        cy.intercept('/inicio').as('route').then(() => {
          cy.get('[ng-reflect-value="misdatos"]').click();
  
          cy.wait(3000);
          cy.get('#password-d').invoke('val', '');
          cy.get('#password-d').type('1234');
          cy.get('#password2-d').invoke('val', '');
          cy.get('#password2-d').type('1234');
  
          cy.get('#Actualizar').should('be.visible').click();    
  
          cy.contains('Cerrar sesión').click(); })
      });
    });
  })
});
})

