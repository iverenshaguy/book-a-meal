// import { assert } from 'chai';
// import sinon from 'sinon';
// import orderEmitter from '../../src/events/Orders';

// const order = {
//   reload: () => 'yeah',
//   status: 'pending'
// };

// describe('Order Emitter', () => {
//   describe('#emit()', () => {
//     it('should invoke the callback', () => {
//       const spy = sinon.spy();

//       orderEmitter.on('create', () => {
//         // expiry is 15 minutes
//         setTimeout(async () => {
//           await order.reload();
//           if (order.status !== 'canceled') {
//             await order.update({ status: 'delivered' });
//           }
//         }, process.env.EXPIRY);
//       });

//       emitter.emit('create', );
//       assert(status.calledWith(400));
//     });

//     it('should pass arguments to the callbacks', () => {
//       const spy = sinon.spy();
//       const emitter = new EventEmitter();

//       emitter.on('foo', spy);
//       emitter.emit('foo', 'bar', 'baz');
//       sinon.assert.calledOnce(spy);
//       sinon.assert.calledWith(spy, 'bar', 'baz');
//     });
//   });
// });
