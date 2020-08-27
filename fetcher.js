const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2);
const URL = input[0];
const path = input[1];

const fetcher = function(URL, path) {
  request(URL, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (response.statusCode !== 200) {
      return;
    }
    fs.writeFile(path, body, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
    });
  });
};

if (!URL || !path) {
  console.log('Invalid inputs');
} else {
  fetcher(URL, path);
}

