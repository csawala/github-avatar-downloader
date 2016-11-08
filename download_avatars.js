'use strict';

require('dotenv').config()
const request = require('request')
const fs = require('fs');
const gitUser = process.env.GIT_USER
const gitToken = process.env.TOKEN


console.log("Welcome to the Github Avatar Downloader!")

function getRepoContributors(repoOwner, repoName, cb){
  const requestURL = 'https://'+ gitUser + ':' + gitToken
    + '@api.github.com/repos/' + repoOwner + '/'
    + repoName + '/contributors';

  request.get({
    url: requestURL,
    headers: {
      'User-Agent': 'Ron Burgundy'
    }
  }, function(err, response, body){
      const data = JSON.parse(body)
      cb(data)
  })
}

getRepoContributors("jquery", "jquery", function(result) {
  result.forEach(function(user){
    console.log("Result:", user['avatar_url'])
  })
})