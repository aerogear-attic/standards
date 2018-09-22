# Standards

## About

The purpose of this repository is to centralize all standards that must be applied to AeroGear projects.

## Common definitions

### Project Names (Recommendation)
* The name of the projects in this organization should follow the standard `aerogear-<project-name>`. 

### Cover Tests
* [Coveralls.io](https://coveralls.io/github/aerogear/)
* [Codecov.io](https://codecov.io/gh/aerogear)

### CI 
* [Shields.io](https://shields.io/#/) - For customizations
* [Circleci](https://circleci.com/)
* [Jenkins](https://jenkins.io/)

### Versionalization
* [Semantic Versioning 2.0.0](https://semver.org/) 

### Internationalization
* [Zanata](http://zanata.org/)

### Allow Data Manipulation
* [GraphQL](https://graphql.org/learn/)
* [Rest API](https://www.restapitutorial.com/)

## Definitions by stack

### NodeJS/Javascript 
* [JavaScript Standard Style](https://standardjs.com/)
* [Npm-run-script](https://docs.npmjs.com/cli/run-script) 
* [Semver npm](https://www.npmjs.com/package/semver)
* [Expressjs](http://expressjs.com/)
* [Yargs](https://www.npmjs.com/package/yargs)
* [MochaJS](https://mochajs.org/)

### Go
<- TODO ->

### Java
<- TODO ->


## Scripts of this repository

### Applying .github file changes to organization repositories

Standards in this repository can be applied to all organization repositories.
To update standards in AeroGear organization please follow steps bellow:

1. Review apply.js script with repositories that you want to update. Check the constant `reposToClone` value to see what repositories we should use to apply the changes.

2. Execute following commands 

```
npm i
npm run apply
```

### Getting all repositories to use in the above script

1. Execute following commands 

```
npm i
npm run getAll
```

2. Check the file `allRepos.txt` created in the root directory of this project. This data can be used in the above command. 

**NOTES**

* This code implementation is using the [octokit](https://github.com/octokit)
* See [here](https://developer.github.com/v3) the GitHub API documentation
* The repos will created ar `../build` directory  

