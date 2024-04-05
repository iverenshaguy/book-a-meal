import moment from 'moment';

/**
 * Checks whether shop is open and orders can be made
 * @function isShopOpen
 * @returns {bool} true|false
 */
const checkShopOpen = () => {
  const opening = moment({ hour: process.env.OPENING_HOUR, minute: process.env.OPENING_MINUTE });
  const closing = moment({ hour: process.env.CLOSING_HOUR, minute: process.env.CLOSING_MINUTE });
  const midnight = moment('12:00 AM', 'h:mma');
  const oneAM = moment('1:00 AM', 'h:mma');

  if (
    moment().isBefore(opening)
    || moment().isAfter(closing)
    || moment().isBetween(midnight, oneAM)
  ) {
    return false;
  }

  return true;
};

export default checkShopOpen;
