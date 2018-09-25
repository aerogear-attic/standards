#!/usr/bin/env node

const octokit = require('@octokit/rest')();
const exec = require('await-exec')
const { join } = require('path');
const org = "aerogear"
const branch = "update-github"

/**
 * Define here the repos which you would like to update the github files.
 * @type {string[]}
 */
var reposToClone = ["aerogear-android-cookbook"]

const buildPath = join(__dirname, '../build');

async function execScript() {
    for (repo of reposToClone) {
        console.log(`Clone ${org}/${repo}.git`)
        await exec(`git clone git@github.com:${org}/${repo}.git`, { cwd: buildPath });
        console.log(`Copy github ${org}/${repo}.git`)
        const repoPath = join(buildPath, repo)
        await exec(`cp -Rf ../../.github ./.github`, { cwd: repoPath });
        console.log(`Create PR github`)
        await exec(`git checkout -b ${branch}`, { cwd: repoPath });
        await exec(`git add --all`, { cwd: repoPath });
        await exec(`git commit -m"Update github files"`, { cwd: repoPath });
        console.log(`git push origin +${branch}:${branch}`)
        await exec(`git push origin +${branch}:${branch}`, { cwd: repoPath });
        await exec(`open https://github.com/${org}/${repo}/compare/${branch}?expand=1`)
    }
}

execScript();






