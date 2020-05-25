/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');

module.exports = (settings => settings)(require('./nightwatch.json'));
