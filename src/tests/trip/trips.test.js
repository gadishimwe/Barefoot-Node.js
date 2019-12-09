import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import newTrip from '../fixtures/trip.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test one way trip:', () => {
  before(async () => {
    await createUsers();
  });
  it('Should return status code of 201 on successful trip creation', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, travelDate: '2020-05-23' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id').equal(1);
        expect(res.body.data).to.have.property('departure').equal(newTrip.departure);
        expect(res.body.data).to.have.property('destination').equal(newTrip.destination);
        expect(res.body.data).to.have.property('travelReasons').equal(newTrip.travelReasons);
        expect(res.body.data).to.have.property('accommodation').equal(newTrip.accommodation);
        done();
      });
  });
  it('Should return status code of 409 with message that trip already created', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, travelDate: '2020-05-23' })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into departure', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, departure: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into destination', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, destination: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into travel date', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, travelDate: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into travel reasons', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, travelReasons: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into accommodation', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken)
      .send({ ...newTrip, accommodation: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
