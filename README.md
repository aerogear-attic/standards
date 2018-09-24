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

## Applying changes to organization repositories

Standards in this repository can be applied to all organization repositories.
To update standards in AeroGear organization please follow steps bellow:

1. Execute following commands to prepare repository

```
npm i
npm run clean
```

2. Review apply.js script with repositories that you want to update

Review `reposToClone` value to see what repositories we should use to apply the changes.

3. Execute apply method

```
npm run apply
```
