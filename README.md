# Fourth Year Applied Project and Dissertation - Ultan Kearns G00343745
## This project was made as a final year project as part of a level 8(Bsc Hons) course in Software Development at GMIT(Galway Mayo Institute of Technology

## Important notes for Twilio while running app
+ When signing up with app please do not append area code so for example: 08555555555 and not +3538555555555
+ When updating user phone number on user info page append the +353 to number
+ When using the forgot page append +353
+ Please use a real number for signing up as 2fa codes will be sent to your phone
+ For obvious security reasons the authcode for Twilio in this repo is a dud, to use the app use GCP version( https://34.68.75.97:3000/) and do not host locally 
+ Please allow security exceptions for app to run as I used self-signed certificates.

## Overviews

## IMPORTANT NOTICE: I have two overviews one which is more extensive and an older one which is not, the only reason I have kept the older one was because it showcased voice commands at the specified time t=249 please be careful as the voice commands are quite loud but they do show the Annyang library working.

+ New more extensive overview: https://www.youtube.com/watch?v=jLp_paiELCg - You can also download this video from the main repo, I chose to put these videos on Youtube as it would be a pain for externals to have to download dozens of 70MB videos, hope other students had the same concern.
+ Old Overview Video of Application: https://youtu.be/AiM4veddx70?t=249 - please skip to the specified time for voice commands as I did not want to remake a video when there was already a showcase of the voice commands

## Details of Branches:
+ master: This branch serves as the homebase for the project all tested and working code will be merged into master from the Feature branch, any merge with master will automatically trigger a docker build. **THIS BRANCH HAS THE MOST UP TO DATE README & CODE**
+ Feature: This branch was used to test new features, this branch was deemed redundant once all desired features were implmented
+ server: This branch was used to get the project setup for Google Cloud Platform, the main difference between code on the server branch and that of feature is that the server branch does not host the application locally and instead uses the address of the VM 
## Structure of Github Repository:
- banking-app: This folder contains all the code for the application, here you can see all the files which make up the application.
- dissertation - ultan kearns.pdf: This is the main documentation for the application, it contains all the latex files as well as the dissertation PDF, this PDF may also be added to the main repo structure on final commit
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

## Conclusion of Project
+ Created full CRUD(Create,Read,Update & Delete) functionality
+ Gesture based navigation on Chrome
+ Allows the user to register, take out loans, get latest stock info, transfer money, delete account, update account & the application is secure utilizing 2FA(although limited to Irish numbers), HTTPS, TLS for both the app and server.
+ Hosted on Google Cloud Platform(Decided on GCP due to previous work with Azure and AWS, think it is good to diversify cloud platform knowledge)
+ Dockerized image of the main application is available
+ The app was developed using Agile methodlogies such as Kanban and features were implemented using sprints which you can find in the sprints MD file.
+ The development of this applicaiton is documented extensively in both the dissertation and on the Github issues page and kanban board.
+ Implemented continuous integration and deployment by utilizing docker to rebuild the application everytime the master branch is updated.
+ To see full conclusion please refer to the system evaluation and conclusion sections of the dissertation.

## What I learned
+ I learned how to use react during the course of this project as I had no experience utilizing this framework before.
+ I learned a lot about implementing security measures such as 2FA using Twillio and utilizing the SHA256 algorithm to encrypt sensitive user infromation.
+ I learned how to implement voice recognition via browser for navigation.
+ I learned how to design a minimalistic, accessible and intuitive UI.
+ I learned more about agile methodologies and their usefulness in developing a full stack application.
+ I learned more about Node, Express, Mongo & React Libraries and the framework.
+ I learned the importance of meetings in developing an application.
+ I learned a lot about what it means to be a software engineer and how the title encompasses more than just cracking out code, it encompasses extensive documentation, designing, developing for scalability and coming up with solutions to a diverse set of problems.

## Final words
Thank you so much for taking a look at my Final Year Project, it has been a long four years at GMIT and I have learned so much in a diverse range of topics which encompass what is termed as Computer Science.  I used to see software engineering as just the ability to crack out code but I now know that it is so much more than that, to truly be a software engineer you must be first and foremost a problem solver, to be able to tackle a diverse set of problems and to design elegant applications and solutions and to come up with clever ways to overcome technical, financial and communicative barriers to deliver a final product to the end user.  Software engineering has truly become a passion of mine as opposed to just being a hobbyist / student,  I truly feel that these four years have been life changing and have helped me to change and grow for the better. 

I would like to extend a personal thanks to my supervisor Dr. Dominic Carr for advising me during the development of this project and for offering suggestions which I would not have thought of otherwise for instance the integration of Twillio was brought about at Dr. Carr's suggestion.

I would also like to extend my thanks and gratitude to all of the lecturers at GMIT who have helped me in various ways throughout these long and arduous four years.  It is thanks to the brilliant and talented staff at GMIT that I was able to create an application such as this.

Finally I wish to extend my thanks to the external examiners who will be grading this project, thank you for looking through my code and I hope that you find the documentation and the code itself up to the rigorous academic standards.

## Known Issues
+ The update function may not function correctly and you may have to re login to update your information
+ If the network drops during a crucial point (eg: taking out a loan), it may cause an error     
+ Maybe an issue with NodeMailer as gmail may prevent authentication due to security issues(this is an issue with GMAIL and not the app)
+ Voice Recognition does not work on Firefox or other browsers, this is due to a limitation with the Annyang library
+ Spamming buttons may cause app to crash and you may have to logout and login again.
+ Twilio code on GCP is different so please use GCP to use the actual app
### Important notice: All code detailed in this repo is my own except where referenced otherwise.  I reused some code developed previously for the nodemailer function and login function in the server file which is referenced in the comments.

### IMPORTANT NOTE RUN ALL COMMANDS WITHOUT QUOTATIONS
