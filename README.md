# Book A Meal

[![Build Status](https://travis-ci.org/iverenshaguy/book-a-meal.svg?branch=develop)](https://travis-ci.org/iverenshaguy/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/iverenshaguy/book-a-meal/badge.svg?branch=ft-user-signup-dummy-api-157007955)](https://coveralls.io/github/iverenshaguy/book-a-meal?branch=ft-user-signup-dummy-api-157007955)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee9e3f3a2697b184de58/maintainability)](https://codeclimate.com/github/iverenshaguy/book-a-meal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ee9e3f3a2697b184de58/test_coverage)](https://codeclimate.com/github/iverenshaguy/book-a-meal/test_coverage)

An application that allows customers to make food orders and helps the food vendor to know what the customers want to eat.

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [Yarn](https://www.yarnpkg.com/) - Dependency Manager

### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Supertest](https://github.com/visionmedia/supertest) - Super-agent driven
  library for testing node.js HTTP servers
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

## Features

### Caterer
* Create Meals
* Modiy Meals
* Delete Meals
* Setup Menu for Particular Day
* Get All Orders for a Specific Day
* View Order Summary for Specific Day

### Users
* Signup and Login
* Make an Order
* Modify an Order
* View Menu for the Day
* View Menu Order History

### API Endpoints

####

* Signup - POST
  [http://localhost:8000/api/v1/auth/signup](http://localhost:8000/api/v1/auth/signup)
* Signin - POST
  [http://localhost:8000/api/v1/auth/signin](http://localhost:8000/api/v1/users/signin)
* Get All Meal Options - GET
  [http://localhost:8000/api/v1/meals](http://localhost:8000/api/v1/meals)
* Add a Meal Option - POST
  [http://localhost:8000/api/v1/meals](http://localhost:8000/api/v1/meals)
* Modify an Existing Meal Option  - PUT
  [http://localhost:8000/api/v1/meals/:mealId](http://localhost:8000/api/v1/meals/:mealId)
* Delete an Existing meal Option - DELETE
  [http://localhost:8000/api/v1/meals/:mealId](http://localhost:8000/api/v1/meals/:mealId)
* Get Menu for Today - GET
  [http://localhost:8000/api/v1/menu](http://localhost:8000/api/v1/menu)
* Get Menu for a Specific Day - GET
  [http://localhost:8000/api/v1/menu?date={YYYY-MM-DD}](http://localhost:8000/api/v1/menu?date={YYYY-MM-DD})
* Add Meal Options to Menu for a Specific Day - POST
  [http://localhost:8000/api/v1/menu](http://localhost:8000/api/v1/menu)
* Modify an Existing Menu - PUT
  [http://localhost:8000/api/v1/menu/:menuId](http://localhost:8000/api/v1/menu/:menuId)
* Get All Caterer Orders - GET
  [http://localhost:8000/api/v1/orders](http://localhost:8000/api/v1/orders)
* Get All User Orders - GET
  [http://localhost:8000/api/v1/orders](http://localhost:8000/api/v1/orders?user={userId})
* Order a Menu - POST
  [http://localhost:8000/api/v1/orders](http://localhost:8000/api/v1/orders)
* Modify an Open Order  - PUT
  [http://localhost:8000/api/v1/orders/:orderId](http://localhost:8000/api/v1/orders/:orderId)
* Delete an Order - DELETE
  [http://localhost:8000/api/v1/orders/:orderId](http://localhost:8000/api/v1/orders/:orderId)
* Get All Notifications - GET
  [http://localhost:8000/api/v1/notifications](http://localhost:8000/api/v1/notifications)

## Getting Started

### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2165637](https://www.pivotaltracker.com/n/projects/2165637)

### Template
Template is hosted at [https://iverenshaguy.github.io/UI/index.html](https://iverenshaguy.github.io/UI/index.html)

### API (Non-Persistent)
API is hosted at [https://book-a-meal-sivy.herokuapp.com](https://book-a-meal-sivy.herokuapp.com)

### Installing

* git clone
  [More Recipes](https://github.com/iverenshaguy/book-a-meal.git)
* Run `yarn install` or `npm install` to install packages
* Run `yarn build` or `npm run build` to build the project
* Run `yarn start` or `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Testing with Coverage Data

* After installing as shown 

* Run `yarn test` or `npm test`
* It will lint code, run test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc)

### Deployment

### Development
You can run `yarn start:dev` or `npm run start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your code. 