import EventEmitter from 'events';

/**
 * Updates Order Item status to Delivered after the set grace period
 * @exports
 * @class Orders
 * @extends EventEmitter
 */
class Orders extends EventEmitter {}

export default new Orders();
