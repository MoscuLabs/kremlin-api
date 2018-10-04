# Kremlin Rest API
API for our i-Semester e-Government project. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- [Node.js](https://nodejs.org/es/)
- LoopBack

```
npm install -g loopback-cli
```

- This project on branch `develop`
```
git clone https://github.com/MoscuLabs/kremlin-api.git
```
```
cd kremlin-api
git checkout develop
```

### Installing

First install all the dependencies

```
npm install
```

Update file `server/datasources.json` with the url keys for the database.

To start running the server
```
node .
```

Look for `http://localhost:3000/explorer/` in your browser.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## Deployment
We will deploy the REST API server into Heroku using git.

## Built With
* [LoopBack](http://loopback.io) - The Node.js API Framework
* [EsLint](https://eslint.org/) - The pluggable linting utility for JavaScript and JSX
* [Heroku](https://www.heroku.com/) - Cloud Application Platmform
* [Postman](https://www.getpostman.com/) - The API Testing Framework

## Authors
See the list of [contributors](https://github.com/orgs/MoscuLabs/people) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Our teacher Zabdiel Zaramillo
