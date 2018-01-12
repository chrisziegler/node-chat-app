// [{
//   id: '/#12pooifddhfsjef',
//   name: 'Andrew',
//   room: 'The Office Fans'
// }];

// addUser(id, name, room)
// removeUser(id) removes user from our People list in the sidebar
// getUser(id) way to fetch user, so we can send messages to them, returns object above
// getUserList(room) figures out which users are in the room, returns an array of names

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(item => item.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { Users };
