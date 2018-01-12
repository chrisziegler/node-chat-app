/* eslint-disable */
const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  // the reason we define users outside of beforeEach is so it's accessible
  // inside of beforeEach() and in each of our test cases down below.
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Chris',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Chris',
      room: 'The Office Fans'
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '1';
    const removedUser = users.removeUser(userId);
    expect(removedUser.id).toBe(userId);
    expect(users.users.length).toEqual(2);
  });

  it('should not remove user', () => {
    const userId = '99';
    const removedUser = users.removeUser(userId);
    expect(removedUser).toBe(undefined);
    expect(users.users.length).toEqual(3);
  });

  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe('2')
  });

  it('should not find user', () => {
    const userId = '99';
    const user = users.getUser(userId);
    expect(user).toBe(undefined);
  });


  it('should return names for Node Course', () => {
    const userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Chris']);
  });

  it('should return names for React Course', () => {
    const userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  })

});