import uuidv4 from 'uuid/v4';
import moment from 'moment';
import GetItems from '../middlewares/GetItems';
import errors from '../data/errors.json';
import trimValues from '../helpers/trimValues';

/**
 * @exports
 * @class Controller
 */
class Controller {
  /**
   * @constructor
   * @param {array} database
   * @param {string} type
   */
  constructor(database, type) {
    this.database = database;
    this.type = type;
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Returns a list of Items
   * @method list
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  list(req, res) {
    return GetItems.items(req, res, this.database, `${this.type}s`);
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  create(req, res, data) {
    const trimmedData = trimValues(data);
    // generate random id and created/updated date
    trimmedData[`${this.type}Id`] = uuidv4();
    trimmedData.created = moment().format();
    trimmedData.updated = moment().format();

    this.database.push(trimmedData);

    return res.status(201).send(trimmedData);
  }

  /**
   * Updates an existing item
   * @method update
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  update(req, res, data) {
    const itemIndex = this.database
      .findIndex(item => item[`${this.type}Id`] === req.params[`${this.type}Id`]);

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    const oldItem = this.database[itemIndex];

    // delete id from data
    delete data[`${this.type}Id`];

    const trimmedData = trimValues(data);
    trimmedData.updated = moment().format();

    // update old meal with trimmed new meal and assign it to it's position in the array
    this.database[itemIndex] = Object.assign({}, oldItem, trimmedData);

    return res.status(200).send(this.database[itemIndex]);
  }

  /**
   * Deletes an existing item
   * @method delete
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  delete(req, res) {
    const itemIndex = this.database
      .findIndex(item => item[`${this.type}Id`] === req.params[`${this.type}Id`]);

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    this.database.splice(itemIndex, 1);

    return res.status(204).send();
  }
}

export default Controller;
