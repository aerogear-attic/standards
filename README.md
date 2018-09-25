# Standards

## About

The purpose of this repository is to centralize all standards that must be applied to AeroGear projects.

## Common definitions

* The name of the projects in this organization should follow the standard `aerogear-<project-name>`. 

## Common definitions by stack

### NodeJS/Javascript 

* [JavaScript Standard Style](https://standardjs.com/)

// TODO: Add definitions for which will be used and how to lint, and manager tasks, and to cover the tests, and implement the tests, etc .. 

### Go

// TODO: Add definitions for which will be used and how to lint, and manager tasks, and to cover the tests, and implement the tests, etc .. 

## Scripts

### Applying .github file changes to organization repositories

Standards in this repository can be applied to all organization repositories.
To update standards in AeroGear organization please follow steps bellow:

1. Review apply.js script with repositories that you want to update. Check the constant `reposToClone` value to see what repositories we should use to apply the changes.

2. Execute following commands 

```
npm i
npm run apply
```

### Getting all repositories to use in the following script

1. Execute following commands 

```
npm i
npm run getAll
```

2. Check that a file with the name allRepos.txt will be created in the root directory of this project. This data can be used in the above command. 

**NOTES**

* This code implementation is using the [octokit](https://github.com/octokit)
* See [here](https://developer.github.com/v3) the GitHub API documentation
* The repos will created ar `../build` directory  
