# [Book A Meal](https://book-a-meal-prod.herokuapp.com)

[![Build Status](https://travis-ci.org/iverenshaguy/book-a-meal.svg?branch=develop)](https://travis-ci.org/iverenshaguy/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/iverenshaguy/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/iverenshaguy/book-a-meal?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee9e3f3a2697b184de58/maintainability)](https://codeclimate.com/github/iverenshaguy/book-a-meal/maintainability)

An application that allows customers to make food orders and helps the food vendor to know what the customers want to eat.

## Table of Contents

* [Technologies](#technologies)
* [Features Implemented](#features-implemented)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Development](#development)
  * [Testing](#testing)
* [Limitations](#limitations)
* [Contributing Guide](#contributing-guide)
* [FAQs](#faqs)
* [License](#license)

### Pivotal Tracker

Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2165637](https://www.pivotaltracker.com/n/projects/2165637)

### Template

Template is hosted at [https://iverenshaguy.github.io/book-a-meal/UI/index.html](https://iverenshaguy.github.io/book-a-meal/UI/index.html)

### API Deployment

API is deployed at [https://book-a-meal-prod.herokuapp.com/api/v1](https://book-a-meal-prod.herokuapp.com/api/v1)

### Documentation

Documentation is hosted at [https://book-a-meal-prod.herokuapp.com/api/v1/docs](https://book-a-meal-prod.herokuapp.com/api/v1/docs)

## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [PostgreSQL](https://www.postgresql.org/) - Object-Relational Database System
* [Sequelize](http://docs.sequelizejs.com/) - Promise-based ORM for Node.js v4 and up
* [React](https://reactjs.org/) - JavaScript Library for Building User Interfaces
* [Redux](https://redux.js.org/) - Predictable State Container for JavaScript Apps

### Supporting Packages

#### Linter

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Bundler

* [Webpack](https://webpack.js.org/) - Javascript Tool for Bundling Assests

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://github.com/visionmedia/supertest) - Super-agent driven
  library for testing node.js HTTP servers
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator
* [Jest](https://jestjs.io/) - Javascript Testing Platform to test all JavaScript code including React applications (Frontend)
* [Enzyme](http://airbnb.io/enzyme/) - Javscript testing utility for React

## Features Implemented

### Users (Caterers and Customers)

* Users should be able to signin and signup on the app as either a caterer or a customer

### Caterers

* Caterers should be able to create meals
* Caterers should be able to modify meas
* Caterers should be able to delete meals
* Caterers should be able to setup menu for a particular day
* Caterers should be able to modify menu for a particular day
* Caterers should be able to get a particular order
* Caterers should be able to mark a pending order as delivered
* Caterers should be able to get all their orders on the platform
* Caterers should be able to get all their orders for a specific day
* Caterers should be able to get notifications when their meals are ordered

### Customers

* Customers should be able to make an order
* Customers should be able to modify or cancel an order within 100 seconds of creating it
* Customers should be able to get the menu for the day
* Customers should be able to get a particular order
* Customers should be able to get all their orders on the platform
* Customers should be able to get all their orders for a specific day
* Customers should be able to get notifications when caterers set the menu for the day

## Getting Started

### Installation

* Install [NodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) on your computer
* Install [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli) globally
* Clone this repository using `git clone https://github.com/iverenshaguy/book-a-meal.git`
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `npm install` to install all dependencies
* Run `npm run migrate` to setup your database
* You can optionally run `npm run seed` to use the seed data provided
* Run `npm run build` to build the project
* Run `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the application

### Development

You can run `npm run start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your server.

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application
* Use the [API Documentation](https://book-a-meal-prod.herokuapp.com/api/v1/docs) to access the endpoints available

#### Testing with Coverage Data

* After installing as shown
* Run `npm test`
* This will lint code, run test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc) and Jest

## Using the Live App

The live application is hosted at [https://book-a-meal-prod.herokuapp.com](https://book-a-meal-prod.herokuapp.com).

The Menu for each day varies and must be set by any of the registered caterers.

To test the app on any particular day, you can signin to the app as a caterer using the test details below:

Email: `test@test.com`

Password: `testtesttest`

This will allow you to set a menu for the day if no menu is available.

## Limitations

* Application is not integrated with a payment platform
* Application is not real time
* Orders cannot be filtered by status or date

## Contributing Guide

* Fork the repository
* Make your contributions
* Write Test Cases for your contribution with at least **80%** coverage
* Create a pull request against the develop branch

## FAQs

* What language is used to build this application?

  * The application (both frontend and backend) is entirely built with Javascript

* Is this an open-source project?

  * Yes, this is an open-source project.

* Who can contribute ?

  * Anyone can contribute as long as you follow the contribution guide outlined above

* Does the application have an API?

  * Yes, the application has an API with a well documented reference that can be viewed [here](https://book-a-meal-prod.herokuapp.com/api/v1/docs)

* Is the application licensed ?

  * Yes, the application is licensed under the [MIT license](https://github.com/iverenshaguy/book-a-meal/blob/develop/LICENSE)

## License

&copy; Iveren Shaguy

Licensed under the [MIT License](https://github.com/iverenshaguy/book-a-meal/blob/develop/LICENSE)
