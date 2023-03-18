const { uuid } = require('uuidv4');

const contacts = [{
  id: uuid(),
  name: 'Felipe',
  email: 'felipe@gmail.com',
  category_id: uuid(),
}];

class ContactController {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactController();
