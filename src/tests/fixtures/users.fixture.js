import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';

const { Users } = models;

export const userPassword = faker.internet.password();
export const signupFixtures = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export default {
  signupFixtures
};

const payload = {
  id: 20,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};
export const activeUser = {
  id: 2,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const wrongToken = 'eyJhbGcihgvasdbjvdskmnhwb erfqr63489u2bnlsdkvqerui2346R5cCJ9';
export const wrongUser = {
  email: 'test1@spinners.com',
  password: 'aspword1234'
};
export const wrongEmail = {
  email: 'testspinners.com',
  password: 'Pass1234'
};
export const tokenWithWrongUser = JwtService.generateToken(payload);
export const resetToken = JwtService.generateToken({ email: activeUser.email });
export const loggedInUser = {
  id: 30,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loggedInToken = JwtService.generateToken({
  id: loggedInUser.id,
  firstName: loggedInUser.firstName,
  lastName: loggedInUser.lastName,
  email: loggedInUser.email,
});

// crete real user to that help receive email
const realUser = 'icyiiddy@gmail.com';

export const createUser = {
  id: 3,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: realUser,
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const user = {
  email: activeUser.email,
  password: userPassword,
};

// password that does not match
export const passMatch = {
  newPassword: faker.internet.password(),
  confirmPass: faker.internet.password()
};

// reseting password
const password = faker.internet.password();
export const resetPass = {
  newPassword: password,
  confirmPass: password
};

export const emailNotExists = {
  email: faker.internet.email()
};

export const createUsers = async () => {
  await Users.destroy({ where: {} });
  await Users.create(activeUser);
  await Users.create(createUser);
  await Users.create({ ...loggedInUser, token: loggedInToken });
};
export const token = JwtService.generateToken(activeUser);