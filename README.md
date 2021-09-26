# Magnuson Campus Ventures

Magnuson Campus Ventures is an online platform for matching Dartmouth student volunteers with local startups. A student can create a profile showcasing their interests, skills, and experiences. A startup can create a profile explaining their company's mission, and can post job opportunities explaining what skills they are looking for in student volunteers. Students and startups receive recommendations for job pairings, students can apply directly to job postings, and both parties can contact each other to talk further about opportunities.

now live at http://dartmouth-mccv.surge.sh/
was live during 20S at http://cs52-mcv.surge.sh/

![](https://i.imgur.com/w7FVtXj.png)
![](https://i.imgur.com/sHekLkE.png)
![](https://i.imgur.com/hzHY2xJ.png)
![](https://i.imgur.com/Nas0UEV.png)

![](https://i.imgur.com/36UE3Tk.jpg)

## Architecture

### Tech Stack 🥞

We chose to build the front-end of our app with [React ](https://reactjs.org/), using the Node.js framework. We use axios to enable us to make API calls to our database and eslint and babel as other libraries to help us build our application.

We've built a MongoDB database which we access from out frontend with Mongoose and an express.js server. 
Find our backend repo [here](https://github.com/dartmouth-cs52-20S/project-mcv-backend) and the heroku-hosted database [here](https://project-mcv.herokuapp.com/)

### Style

We are using the ESLint Airbnb style guide for this project. See the style guide (rules) linked [here](https://github.com/airbnb/javascript).

### File Structure

```
├──[MCV]/                            # root directory
|  └──[app.js]                       # loads resources and base render
|  └──[nav.js]                       # loads resources and base render
|  └──[components]/                  # contains basic components and screens
|     └──[student-components]/       # contains screens and components used on the student side of the app
|     └──[startup-components]/       # contains screens and components used on the startup side of the app
|     └──[admin-modals]/             # contains admin-specific modals that overlay on general view pages
|  └──[actions]/                     # redux store
|  └──[reducers]/                    # redux store
|  └──[services]/                    # contains functions for interacting with the backend database
|  └──[styles]/                      # styling specs for various components
|  └──[assets]/                      # images/graphics
```

For more detailed documentation on our file structure and specific functions in the code, feel free to check the project files themselves.

## Setup
To set up this repo on your local environment, follow these steps:
1. Install Docker for your OS
2. In the command line, run `docker-compose build` to build the repo
3. Run `docker-compose up` to initialize the repo and its dev server


## Deployment

This repo is currently set up to auto-deploy from master with travis ci and surge integration.
The site can otherwise be deployed by running `yarn deploy` from a local terminal in the project directory. 
Live project can be found [here](http://dartmouth-mccv.surge.sh/)

## Authors 📝

* Anne Bailey '22
* Sarah Hong '21
* Mustafa Nasir-Moin '20
* Juliette Pouchol '20
* Donia Tung '22
* Dylan Whang '21

## Acknowledgments ❤️

We'd like to thank Tim Tregubov for all his help and support in this class, as well as Thomas Monfre, Morgan Sorbaro, and rest of the CS52 TAs for their help! 

