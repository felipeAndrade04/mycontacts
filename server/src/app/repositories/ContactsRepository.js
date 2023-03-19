const { uuid } = require('uuidv4');

let contacts = [
  {
    id: uuid(),
    name: 'Felipe',
    email: 'felipe@gmail.com',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Felipe 1',
    email: 'felipe1@gmail.com',
    category_id: uuid(),
  },
];

class ContactController {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactController();
