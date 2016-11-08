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

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")