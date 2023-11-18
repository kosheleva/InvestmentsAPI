const request = require('supertest');
const { server } = require('../../server');

describe('Auth routes', () => {
  describe('POST /users', () => {
    const id = Date.now();
    const userName = `${id}_test_user`;
    const userEmail = `${id}_test_email`;
    const userPass = "000000";

    test('should return 200 and successfully register user', async () => {
      const user = {
        "name": userName,
        "email": userEmail,
        "password": userPass
      };

      const res = await request(server).post('/users/register').send(user).expect(200);
    });

    test('should NOT login user with invalid email, should return 404', async () => {
      const user = {
        "email": `not_existing_email`,
        "password": "not_existing_password"
      };

      const res = await request(server).post('/users/login').send(user).expect(404);
    });

    test('should NOT login user with invalid password, should return 400', async () => {
      const user = {
        "email": userEmail,
        "password": "not_existing_password"
      };

      const res = await request(server).post('/users/login').send(user).expect(400);
    });

    test('should successfully login user with valid credentials', async () => {
      const user = {
        "email": userEmail,
        "password": userPass
      };

      const res = await request(server).post('/users/login').send(user).expect(200);
    });
  });
});
