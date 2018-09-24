#!/usr/bin/env node

const octokit = require('@octokit/rest')();
const exec = require('await-exec')
const { join } = require('path');
const org = "aerogear"
const branch = "update-github"

// This could be populated manually or by getAllOrgs - we probably want to skip some repositories
const reposToClone = ["aerogear-android-cookbook"]

// Helper function
function getAllOrgs() {
    // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
    octokit.repos.getForOrg({
        org: 'aerogear',
        type: 'public'
    }).then(({ data, headers, status }) => {
        // handle data
        if (data && data instanceof Array) {
            data.forEach((repo) => {
                console.log(repo.ssh_url)
            })
        }
    })
}

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
        await exec(`git push origin +${branch}:${branch}`, { cwd: repoPath });
        await exec(`open https://github.com/${org}/${repo}/compare/${branch}?expand=1`)
        //const result = await octokit.pullRequests.create({ owner: "wtrocki", repo: repo, title: "Update github files", head: branch, base: "master", body: "Update github files" })
    }

}

execScript();






