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
// Values added in the last execution at 08/10/2018
// Values added in the last execution at 08/10/2018
const reposToClone = [
    "aerogear.org",
    "aerogear-otp-java",
    "aerogear-ios-otp",
    "aerogear-unifiedpush-server",
    "aerogear-ios-push",
    "aerogear-simplepush-server",
    "aerogear-parent",
    "aerogear-unifiedpush-nodejs-client",
    "aerogear-android-cookbook",
    "aerogear-crypto-java",
    "aerogear-ios-crypto",
    "aerogear-cordova-push",
    "aerogear-cordova-crypto",
    "aerogear-ios-cookbook",
    "aerogear-js-cookbook",
    "aerogear-android-push",
    "aerogear-android-core",
    "aerogear-android-pipe",
    "aerogear-android-authz",
    "aerogear-android-store",
    "aerogear-android-security",
    "aerogear-ios-http",
    "aerogear-ios-oauth2",
    "aerogear-backend-cookbook",
    "dockerfiles",
    "aerogear-webpush-server",
    "aerogear-cordova-oauth2",
    "unifiedpush-forge-addon",
    "aerogear-windows-oauth2",
    "java-adm",
    "aerogear-windows-otp",
    "aerogear-digger",
    "aerogear-digger-java-client",
    "aerogear-digger-node-client",
    "push-network-proxies",
    "trira",
    "aerogear-digger-installer",
    "digger-android-sdk-image",
    "digger-android-slave-image",
    "kafka-cdi",
    "unifiedpush-admin-ui",
    "mobile-cli",
    "proposals",
    "3scale-apb",
    "fh-sync-server-apb",
    "mobile-core",
    "aerogear-android-sdk",
    "minishift-mobilecore-addon",
    "mobile-docs",
    "aerogear-mobile-intellij-plugin",
    "aerogear-ios-sdk",
    "keycloak-metrics-spi",
    "oc-patch-file-to-configmap-role",
    "grafana-docker",
    "aerogear-app-metrics",
    "origin-web-console",
    "aerogear-js-sdk",
    "mobile-docs-html",
    "aerogear-sdk-e2e-tests",
    "akow",
    "aerogear-xamarin-sdk",
    "ups-config-operator",
    "antora-ui",
    "processes",
    "cordova-showcase-template",
    "docs.aerogear.org",
    "xamarin-showcase-template",
    "android-showcase-template",
    "origin-web-catalog",
    "origin-web-common",
    "ios-showcase-template",
    "mobile-crd-client",
    "cordova-plugin-pincheck",
    "artifact-proxy-operator",
    "mobile-controller",
    "jenkins-sync-plugin",
    "apollo-android",
    "data-sync-server",
    "aerogear-kryptowire-jenkins-plugin",
    "jquery-qrcode",
    "managed-services",
    "keycloak-operator",
    "data-sync-ui",
    "android-sdk-operator",
    "install-socat",
    "ansible-openshift-origin-client-tools",
    "aerogear-ios-example-apps",
    "aerogear-android-example-apps",
    "mobile-security",
    "mobile-developer-console",
    "data-sync-gql-core"
];

const buildPath = join(__dirname, '../build');

async function execScript() {
    for (repo of reposToClone) {
        console.info(`Clone ${org}/${repo}.git`)
        await exec(`git clone git@github.com:${org}/${repo}.git`, { cwd: buildPath });
        console.info(`Copy github ${org}/${repo}.git`)
        const repoPath = join(buildPath, repo)
        await exec(`cp -Rf ../../.github ./.github`, { cwd: repoPath });
        console.info(`Create PR github`)
        await exec(`git checkout -b ${branch}`, { cwd: repoPath });
        await exec(`git add --all`, { cwd: repoPath });
        await exec(`git commit -m"Update github files"`, { cwd: repoPath });
        console.info(`git push origin +${branch}:${branch}`)
        await exec(`git push origin +${branch}:${branch}`, { cwd: repoPath });
        await exec(`open https://github.com/${org}/${repo}/compare/${branch}?expand=1`);
    }
}

execScript();






