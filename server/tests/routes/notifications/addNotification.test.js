import request from 'supertest';
import { expect } from 'chai';
import db from '../../../src/models';
import app from '../../../src/app';
import { tokens } from '../../utils/setup';

const { bellyFillToken } = tokens;

describe('Notifications: Add a New Notification', () => {
  it('adds a new notification when a new menu is added', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', bellyFillToken)
      .send({ meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'] })
      .end((err, res) => {
        db.Notification.findOne({ where: { menuId: res.body.id } }).then((notif) => {
          expect(notif.menuId).to.equal(res.body.id);
        });

        if (err) return done(err);
        done();
      });
  });
});
