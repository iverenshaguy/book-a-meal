export default (sequelize) => {
  const MenuMeal = sequelize.define('MenuMeal', {}, {});
  return MenuMeal;
};
