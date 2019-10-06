# Name: LesFic Rate Your Reads

## Link to live app: "https://lesfic-rate-your-reads.jeaninehoffman.now.sh/"

### Link to client side repo: "https://github.com/JeanineHoffman/LesFic-Rate-Your-Reads.git"

#### link to  server side repo: "https://github.com/JeanineHoffman/lesfic-server.git"

#### DOCUMENTATION link: "https://documenter.getpostman.com/view/6710319/SVmpX22u"

Lesfic Rate Your Reads

Introduction
finds the books an author on file has published or allows the user to search by genre within the larger genre of lesbian fiction

Overview
mvp version, plenty to add and files are started towards that goal

Authentication
What is the preferred way of using the API? through the app at: https://lesfic-rate-your-reads.jeaninehoffman1970.now.sh/

Error Codes
for now, none-use of drop down menus prevents mispellings once I add the ability to add books I'll use error handling and compare names to what is available on Amazon

Rate limit
100 builds per day on Zeit.

Language
GET https://lesfic.herokuapp.com/books
https://lesfic.herokuapp.com/books
capstone api

##### screenshots:Landing page: <img src="./src/img/landingPage.png" alt="landingpage screenshot" height="300px" /> 

##### Search page: <img src="./src/img/searchpageB4.png" alt="search screenshot before a search happens" height="300px"/> 

###### Search page: <img src="./src/img/searchResults.png" alt="search results screen shot for a selected author and her books listed" height="300px"/> 

###### <p>The user is able to search for something new to read by listing all books by specific authors or if the user prefers they can search for a book based on what sub-genre (under the genre of lesbian fiction) by using the drop down menu and selecting the genre. Future iterations will have a place for users to enter new books and authors to the DB with (hopefully) a check on spelling by confirming against Amazon or GoodReads. There is also a plan for the rating system to go live as well as accounts being set up to save searchs</p>

###### tech stack: html, JS, JQuery, React, Node.js, express, Knex and Psql. Deployed via ZEIT and Heroku.

###### Designed and written by Jeanine Hoffman with assitance by my cohort, instructors, and my mentor
