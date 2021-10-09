const path = require('path');
const fs = require('fs')
const { spawn } = require('child_process');
const express = require('express');

const app = express();
console.log(process.env)
if (process.env.NODE_ENV === "production") {
  const child = spawn('yarn',['heroku-postbuild']);
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    console.log(chunk);
  });
  child.on('error', (err)=>{
    console.log("Error while initiating production server: \n",err);
  });
  child.on('close', (code) => {
    console.log(`Production server process exited with code ${code}`);
    
  });
  let port = process.env.PORT || 3000;
    let host = '0.0.0.0'
    app.use(express.static(path.join(__dirname, 'dist')));
    console.log(__dirname)
    fs.readdir(__dirname, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file); 
      });
    });
    const server = app.listen(port,host, function() {
      console.log('Production server listening on port', port);
    });
  
}
else {
    console.log("Initiating development server... \n");
    const child = spawn('yarn',['dev'], {shell: true});
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      console.log(chunk);
    });
    child.on('error', (err)=>{
      console.log("Error while initiating development server: \n",err);
      throw err
    });
    child.on('close', (code) => {
      console.log(`Development server process exited with code ${code}`);
    });
}