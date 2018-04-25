// import request from 'supertest';
// import { expect } from 'chai';
// import app from '../../src/app';

// const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

// describe('Meals Routes', () => {
//   describe('Get all meals', () => {
//     it('should get all meals for authenticated user', (done) => {
//       request(app)
//         .get('/api/v1/meals')
//         .set('Accept', 'application/json')
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(200);
//           expect(res.body.meals.length).to.equal(3);

//           if (err) return done(err);
//           done();
//         });
//     });

//     it('should not get meals for unauthenticated user', (done) => {
//       request(app)
//         .get('/api/v1/meals')
//         .set('Accept', 'application/json')
//         .set('authorization', token)
//         .end((err, res) => {
//           expect(res.statusCode).to.equal(401);
//           expect(res.body.error).to.equal('Unauthorized');

//           if (err) return done(err);
//           done();
//         });
//     });
//   });
// });
