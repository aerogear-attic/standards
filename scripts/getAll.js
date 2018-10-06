#!/usr/bin/env node
const writeFile = require('write-file')
const octokit = require('@octokit/rest')();
let repos = []

/**
 * Add here the repos that you would like to exclude
 * @type {string[]}
 */
let excludeRepos = ["standards"]

/**
 * Get All repo from the org
 * @returns {Promise<void>}
 */
async function execScript() {
  // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
  let dt = new Date();
  dt.setFullYear(dt.getFullYear() -1);
  console.info('This search will return just the repos updated after' + dt);
  paginate(() => octokit.repos.getForOrg({
    org: 'aerogear',
    archived: false
  })).then(data => {
    // handle data
    if (data && data instanceof Array) {
      data.forEach((repo) => {
        if ( excludeRepos.indexOf(repo.name) === -1 && !repo.archived && new Date(repo.updated_at) > dt){
          repos.push(repo.name)
        }
      });
    }
  }).catch(function(e) {
    console.log(e); // "oh, no!"
  }).then(function(){
    console.info("Quantity Total of repositories:" + repos.length);
    writeFile('allRepos.txt', repos, function (err) {
      if (err) return console.error(err)
      console.info('The file allRepos.txt is written with this content')
    })
  });
}

async function paginate(method) {
  let response = await method({ per_page: 100 })
  let { data } = response
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response)
    data = data.concat(response.data)
  }
  return data
}



execScript();

