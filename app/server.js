const path = require('path');
const { spawn } = require('child_process');
const express = require('express');

const app = express();

if (process.env.PRODUCTION === "True") {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.set('PORT', process.env.PORT);
  app.set('HOST', '0.0.0.0');

  const server = app.listen(app.get('PORT'),app.get('HOST'), function() {
    console.log('Production server listening on port', server.address().port);
  });
}
else {
    console.log("Initiating development server... \n");
    const child = spawn('yarn',['dev']);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      console.log(chunk);
    });
    child.on('error', (err)=>{
      console.log("Error while initiating development server: \n",err);
    });
    child.on('close', (code) => {
      console.log(`Development server process exited with code ${code}`);
    });
}