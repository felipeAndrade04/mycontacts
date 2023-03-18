class ContactController {
  index(request, response) {
    response.send('Contact Controller');
  }

  show() {
    // Obter um registro
  }

  store() {
    // Criar um registro
  }

  update() {
    // Editar um resgitro
  }

  delete() {
    // Editar um registro
  }
}

module.exports = new ContactController();
