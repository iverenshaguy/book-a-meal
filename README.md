# Book A Meal

[![Build Status](https://travis-ci.org/iverenshaguy/book-a-meal.svg?branch=develop)](https://travis-ci.org/iverenshaguy/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/iverenshaguy/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/iverenshaguy/book-a-meal?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee9e3f3a2697b184de58/maintainability)](https://codeclimate.com/github/iverenshaguy/book-a-meal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ee9e3f3a2697b184de58/test_coverage)](https://codeclimate.com/github/iverenshaguy/book-a-meal/test_coverage)

An application that allows customers to make food orders and helps the food vendor to know what the customers want to eat.

## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [API Endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    * [Development](#development)
    
    

### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2165637](https://www.pivotaltracker.com/n/projects/2165637)

### Template
Template is hosted at [https://iverenshaguy.github.io/book-a-meal/UI/index.html](https://iverenshaguy.github.io/book-a-meal/UI/index.html)

### API Deployment
API is deployed at [https://book-a-meal-sivy.herokuapp.com](https://book-a-meal-sivy.herokuapp.com)

### Documentation
Documentation is hosted at [https://book-a-meal-sivy.herokuapp.com/api/v1/docs]
(https://book-a-meal-sivy.herokuapp.com/api/v1/docs)

## Technologies

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
* Signup and Login
* Create Meals
* Modiy Meals
* Delete Meals
* Setup Menu for Particular Day
* Get All Orders for a Specific Day
* Get All Caterer's Orders on the platform
* Get Order Notifications

### Users
* Signup and Login
* Make an Order
* Modify an Order
* Get Menu for the Day
* Get Meal Order History
* Get New Menu Notifications

## API Endpoints

###

<table>

<tr><th>VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th><th>SAMPLE DATA</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td>Signup</td><td>

Users:
`{
  username: Favour,
  email: favour@shaguy.com,
  password: favourshaguy,
  passwordConfirm: favourshaguy,
  role: user
}`

For Caterers:
`{
  businessName: FoodCircle,
  businessAddress: 4, Church Street, Yaba, Lagos,
  businessPhoneNo: +2348123456789,
  email: food@circle.com,
  password: foodcircle,
  passwordConfirm: foodcircle
  role: caterer
}`
</td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td> <td>Signin</td><td>

`{
  email: iveren@shaguy.com,
  password: iverenshaguy
}`
</td></tr>

<tr><td>GET</td> <td>api/v1/meals</td> <td>Get All Meal Options</td><td>None</td></tr>

<tr><td>POST</td> <td>api/v1/meals</td> <td> Add a Meal Option</td><td>

`{
  title: Wheat and Ogbono
  description: Meal contains 2 pieces of beef and other assorted meat and fish products
  price: 3000
  imageURL: http://koalaghana.com/wp-content/uploads/DSC02053.jpg
  forVegetarians: false
}`
</td></tr>

<tr><td>PUT</td> <td>api/v1/meals/:mealId</td>  <td>Modify an Existing Meal Option</td><td>

`{
  description: Meal contains 3 pieces of beef and other assorted meat and fish products
  price: 4000
}`
</td></tr>

<tr><td>DELETE</td> <td>api/v1/meals/:mealId</td> <td>Delete an Existing Meal Option</td><td>None</td></tr>

<tr><td>GET</td> <td>api/v1/menu</td> <td>Get Menu for Today</td><td>None</td></tr>

<tr><td>GET</td> <td>api/v1/menu?date={YYYY-MM-DD}</td><td>Get Menu for a Specific Day</td><td>None</td></tr>

<tr><td>POST</td> <td>api/v1/menu</td> <td>Add Meal Options to Menu for the Day</td>
<td>

For a Future Date
`{
  date: 2018-05-17,
  meals: [
    81211c24-51c0-46ec-b1e0-18db55880958,
    36d525d1-efc9-4b75-9999-3e3d8dc64ce3
    baa0412a-d167-4d2b-b1d8-404cb8f02631
  ]
}`

For Today:
`{
  meals: [
    81211c24-51c0-46ec-b1e0-18db55880958,
    36d525d1-efc9-4b75-9999-3e3d8dc64ce3
    baa0412a-d167-4d2b-b1d8-404cb8f02631
  ]
}`
</td></tr>

<tr><td>PUT</td> <td>api/v1/menu/:menuId</td> <td>Modify an Existing Menu</td>
<td>

`{
  meals: [
    36d525d1-efc9-4b75-9999-3e3d8dc64ce3
    baa0412a-d167-4d2b-b1d8-404cb8f02631
  ]
}`
</td></tr>

<tr><td>GET</td> <td>api/v1/orders</td> <td>Get All Orders</td><td>None</td></tr>

<tr><td>POST</td> <td>api/v1/orders</td> <td>Order Meals</td>
<td>

`{
  meals: [
    36d525d1-efc9-4b75-9999-3e3d8dc64ce3
    baa0412a-d167-4d2b-b1d8-404cb8f02631
    81211c24-51c0-46ec-b1e0-18db55880958
    baa0412a-d167-4d2b-b1d8-404cb8f02631
    81211c24-51c0-46ec-b1e0-18db55880958
  ]
  deliveryAddress: 4, Church Street, Yaba
  deliveryPhoneNo: +2348134567890
}`

_No of Occurence of MealId is the Quantity if Meal Ordered_
</td>
</tr>

<tr><td>PUT</td> <td>api/v1/orders/:orderId</td> <td>Modify an Open Order</td>
<td>

`{
  meals: [
    81211c24-51c0-46ec-b1e0-18db55880958
    baa0412a-d167-4d2b-b1d8-404cb8f02631
  ]
  deliveryAddress: 6, Church Street, Yaba
}`
</td></tr>

</table>

## Getting Started

### Installation

* git clone
  [Book A Meal](https://github.com/iverenshaguy/book-a-meal.git)
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

### Development
You can run `yarn start:dev` or `npm run start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your code. 
