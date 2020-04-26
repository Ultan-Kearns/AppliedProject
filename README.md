# Fourth Year Applied Project and Dissertation - Ultan Kearns G00343745
## This project was made as a final year project as part of a level 8(Bsc Hons) course in Software Development at GMIT(Galway Mayo Institute of Technology

+ Overview Video of Application: https://www.youtube.com/watch?v=AiM4veddx70

## Details of Branches:
+ master: This branch serves as the homebase for the project all tested and working code will be merged into master from the Feature branch, any merge with master will automatically trigger a docker build.
+ Feature: This branch was used to test new features
+ server: This branch was used to get the project setup for Google Cloud Platform, the main difference between code on the server branch and that of master and feature is that the server branch does not host the application locally and instead uses the address of the VM **NOTE: MOST UP TO DATE AND ERROR FREE CODE IS ON THE SERVER BRANCH, I CHOSE NOT TO MERGE WITH MASTER DUE TO HOSTING THE APP LOCALLY**
## Structure of Github Repository:
- banking-app: This folder contains all the code for the application, here you can see all the files which make up the application.
- dissertation: This is the main documentation for the application, it contains all the latex files as well as the dissertation PDF, this PDF may also be added to the main repo structure on final commit
- Applied.side: This file contains the Selenium test cases I used to test the application.
- Database.sql: This file contains information about database tables which will be used to create a diagram of the final database structure.
- ListOfThirdPartyApis.md: A markdown file of APIS used in this application
- ProjectDiagram.pdf: A basic layout of the applications structure.
- README.md: This is the file you are currently reading.
- Sprints.md: Contains the collection of sprints that were used for the development of this application for a more visual representation please view the project section of the repository to view the Kanban Board or the issues section to review the bugs that were fixed or the enchancements made during development.
- usefulresources.md: This file contains a collection of resources that I found useful during development of this project.
## Introduction to project - An online banking application with innovative features
This project was made by me(Ultan Kearns) for my fourth year module Applied Project and Dissertation,I have decided on making a baking app using React, Node.js, Express and MongoDB. My goal is to make a secure, fully functioning banking application which will provide the user with a rich UI, multiple banking features such as viewing statements and taking out loans and allow them to view transactions using charts made in chart.js.  It is my hope that these tools will prove useful to the user and provide a satisfying experience. 
## Why I chose this Project? - An analysis of my decision to develop an online banking system
A banking application is broad in scope and allows the developer to gain experience
with UI design, security, functionality and various other concerns related to designing full
stack applications.
## What is a MERN Stack? - An exploration of decisions behind the technology
MERN stands for Mongo(Database), Express(Web server Framework), React(Programming Framework) and Node(Server-side architecture).  When these are used together they can be used
to create a powerful full stack application.
## Why React? - An opportunity to diversify my technical skills
The react framework offers many libraries and is a major framework in today's modern
workplace.  Since I already had experience with Angular I decided I'd learn React
to gain experience with as many frameworks and technologies as possible and diversify
my knowledge.
## How to run this application - How to get this app up and running
Open two terminals or the command prompt windows, depending on OS, then navigate to the banking-app folder and run "npm install" to install the npm packages then run npm start on one terminal. To get the server up and running you must navigate to banking-app/src/Backend then run the command "node server.js".  Now you should be able to navigate to "localhost:8080" for the server and "localhost:3000" for the application
## You can also access this application online - Cloud information for application
- To connect to the application visit: https://34.68.75.97:3000/
- To view the server visit: https://34.68.75.97:8080/
### IMPORTANT NOTE - ON BROWSERS SUCH AS FIREFOX AND CHROME YOU MAY HAVE TO ALLOW SECURITY EXCEPTIONS - THIS IS DUE TO SELF-SIGNED CERTIFICATES THAT I GENERATED WITH OPENSSL, THIS APP IS SECURE BUT THE ISSUE IS WITH THE SELF-SIGNING
## You can also download the docker image and run it - A fully agile methodology
Link to Applied Project: https://hub.docker.com/repository/docker/ultan/applied-project/
## Innovations to traditional banking applications
+ I have included voice navigation in this application which allows the user to enter what I termed voice mode.  In voice mode the navigation bar will disappear and the user can navigate through the application using only their voice, if the user has any queries they can say "help" and a full list of voice commands will be displayed via a javascript alert.
+ I have included charts using chart.js to show users expenditures, transfers and loans.
+ I have integrated a headlines component which will show the user the most up to date financial news.
+ I have utilized AdvantageAPI to pull information from the stock market in real-time(API limitations exist as I am free user)
## Dependencies
For a full list of dependencies see here: https://github.com/Ultan-Kearns/AppliedProject/network/dependencies
### IMPORTANT NOTE RUN ALL COMMANDS WITHOUT QUOTATIONS
