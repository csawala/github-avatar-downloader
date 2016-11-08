'use strict';

require('dotenv').config()                // require hidden .env for sensitive info
const request = require('request')
const fs = require('fs');

// pull from hidden .env to prevent uploading user & token
const gitUser = process.env.GIT_USER
const gitToken = process.env.TOKEN
const input = process.argv.slice(2)



console.log("====== Welcome to the Github Avatar Downloader! ======")

function getRepoContributors(repoOwner, repoName, cb){
  const requestURL = 'https://'+ gitUser + ':' + gitToken
    + '@api.github.com/repos/' + repoOwner + '/'
    + repoName + '/contributors';

  request.get({
    url: requestURL,
    // site requires validation found here under headers
    headers: {
      'User-Agent': 'Ron Burgundy'
    }
  }, function(err, response, body){
      const data = JSON.parse(body)
      cb(data)
  })
}

// only fires if argv input has 2 values, i.e. user && token
if (input.length === 2){
  getRepoContributors(input[0], input[1], function(result) {
    result.forEach(function(user){
      downloadImageByURL(user['avatar_url'], 'avatars/' + user['login'] + '.jpg')
    })
  })
} else {
  console.log("Please try again with the Owner and Repo information")
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloaded: ', url, " to: ", filePath);
       })
       .pipe(fs.createWriteStream(filePath));
}