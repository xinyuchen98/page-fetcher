const fs = require('fs');
const request = require('request');
const readline = require('readline');

const url = process.argv[2];
const localFilePath = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});





if (fs.existsSync(localFilePath)) {
  rl.question("File already exists, do you want to overwrite? (Y) ", (answer) => {
    if (answer.toLowerCase() === "y") {
      request(url, (error, response, body) => {
        fs.writeFile(localFilePath, body, function (err) {
          if (err) throw err;
          console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}`);
        });
      });
    }
    rl.close();
  });
} else {
  request(url, (error, response, body) => {
    fs.writeFile(localFilePath, body, function (err) {
      if (err) throw err;
      console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}`);
    });
  });
}