const path = require('path');
const { spawn } = require('child_process');
const express = require('express');

const app = express();
if (process.env.PRODUCTION === "True") {
  const child = spawn('yarn',['build']);
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
  app.use(express.static(path.join(__dirname, 'dist')));

  let port = process.env.PORT || 3000;
  let host = '0.0.0.0'

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