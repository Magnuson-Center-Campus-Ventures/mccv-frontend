# Magnuson Campus Ventures

Magnuson Campus Ventures is an online platform for matching Dartmouth student volunteers with local startups. A student can create a profile showcasing their interests, skills, and experiences. A startup can create a profile explaining their company's mission, and can post job opportunities explaining what skills they are looking for in student volunteers. Students and startups receive recommendations for job pairings, students can apply directly to job postings, and both parties can contact each other to talk further about opportunities.

now live at https://dartmouthmccv.com
was live during 20S at http://cs52-mcv.surge.sh/

![](https://i.imgur.com/w7FVtXj.png)
![](https://i.imgur.com/sHekLkE.png)
![](https://i.imgur.com/hzHY2xJ.png)
![](https://i.imgur.com/Nas0UEV.png)

![](https://i.imgur.com/36UE3Tk.jpg)

## Architecture

### Tech Stack 🥞

We chose to build the front-end of our app with [React ](https://reactjs.org/), using the Node.js framework. We use Axios to enable us to make API calls to our database and eslint and babel as other libraries to help us build our application.

We've built a MongoDB database which we access from out frontend with Mongoose and an express.js server. 
Find our backend repo [here](https://github.com/dartmouth-cs52-20S/project-mcv-backend) and the heroku-hosted database [here](https://project-mcv.herokuapp.com/)

## Setup

To set up this repo on your local environment, clone the repo using the git url, install Docker for the appropriate OS from [here](https://docs.docker.com/get-docker/), and run `docker-compose up` in the terminal.

## Deployment

Install the AWS CLI, login to it, and then run `yarn deploy` after running `yarn build` in order to push the compiled app to the s3 bucket we host the site on.

## Authors 📝

* Anne Bailey '22
* Sarah Hong '21
* Mustafa Nasir-Moin '20
* Juliette Pouchol '20
* Donia Tung '22
* Dylan Whang '21
* Rehoboth Okorie '23
* Julian George '24

## Acknowledgments ❤️

We'd like to thank Tim Tregubov for all his help and support in this class, as well as Thomas Monfre, Morgan Sorbaro, and rest of the CS52 TAs for their help! 

