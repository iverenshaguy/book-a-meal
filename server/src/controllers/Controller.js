import uuidv4 from 'uuid/v4';
import GetItems from '../middlewares/GetItems';
import errors from '../helpers/errors.json';
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
   * Registers a new meal
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
   * Creates a new meal
   * @method create
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  create(req, res, data) {
    const trimmedData = trimValues(data);
    // generate random id
    trimmedData[`${this.type}Id`] = uuidv4();
    this.database.push(trimmedData);

    return res.status(201).send(trimmedData);
  }

  /**
   * Updates an existing meal
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

    // update old meal with trimmed new meal and assign it to it's position in the array
    this.database[itemIndex] = Object.assign(oldItem, trimValues(data));

    return res.status(200).send(this.database[itemIndex]);
  }

  /**
   * Deleted an existing meal
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
