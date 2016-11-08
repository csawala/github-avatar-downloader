'use strict';

require('dotenv').config()
const request = require('request')
const gitUser = process.env.GIT_USER
const gitToken = process.env.TOKEN


console.log("Welcome to the Github Avatar Downloader!")
console.log(gitUser, gitToken)

function getRepoContributors(repoOwner, repoName, cb){
  const requestURL = 'https://'+ gitUser + ':' + gitToken
    + '@api.github.com/repos/' + repoOwner + '/'
    + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err)
  console.log("Result:", result)
})