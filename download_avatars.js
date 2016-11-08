'use strict';

require('dotenv').config()
const request = require('request')
const fs = require('fs');
const gitUser = process.env.GIT_USER
const gitToken = process.env.TOKEN
const input = process.argv.slice(2)


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

getRepoContributors(input[0], input[1], function(result) {
  result.forEach(function(user){
    // console.log("Result:", user['avatar_url'])
    downloadImageByURL(user['avatar_url'], 'avatars/' + user['login'] + '.jpg')
  })
})

function downloadImageByURL(url, filePath) {
  // const = 'avatars/'
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloaded: ', url, " to: ", filePath);
       })
       .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")