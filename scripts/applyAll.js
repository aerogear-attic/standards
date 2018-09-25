#!/usr/bin/env node

const octokit = require('@octokit/rest')();
const exec = require('await-exec')
const { join } = require('path');
const branch = "update-github"
const buildPath = join(__dirname, '../build');

/**
 * Create a PR for each repo from the org
 * @returns {Promise<void>}
 */
async function execScript() {
  // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
  octokit.repos.getForOrg({
    org: 'aerogear',
    type: 'public'
  }).then(({ data }) => {
    // handle data
    if (data && data instanceof Array) {
      data.forEach((repo) => {
        console.log(repo.ssh_url)
        createPR(repo)
      })
    }
  }).catch(function(e) {
    console.log(e); // "oh, no!"
  }, function () {
    console.log('Finish !!!');
  });

}

/**
 * Process to clone the repo and create the PR
 * @param repo
 */
async function createPR(repo) {
    console.log(`Clone ${repo.ssh_url}`)
    await exec(`git clone ${repo.ssh_url}`, { cwd: buildPath });
    console.log(`Copy github ${repo.ssh_url}`)
    const repoPath = join(buildPath, repo.name)
    await exec(`cp -Rf ../../.github ./.github`, { cwd: repoPath });
    console.log(`Create PR github`)
    await exec(`git checkout -b ${branch}`, { cwd: repoPath });
    await exec(`git add --all`, { cwd: repoPath });
    await exec(`git commit -m"Update github files"`, { cwd: repoPath });
    await exec(`git push origin +${branch}:${branch}`, { cwd: repoPath });
    await exec(`open https://github.com/${org}/${repo.name}/compare/${branch}?expand=1`) //TODO: Change it for a command line
}

execScript();






