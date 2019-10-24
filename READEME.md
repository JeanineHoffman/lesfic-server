# LesFic Repository
  Jeanine Hoffman

## Overview
  The Lesfic Repository is the result of years of frustration with search engine designs that claim to handle LGBTQ books but are primarily caches of gay (male/male) fiction. As a lesbian fiction author and reader, I have spent countless hours looking for a new book or new (to me) author to read while wishing to remain in the genre of lesbian fiction-be that romance, intrigue, or, my favorit-paranormal and shifter fiction.

  The original plan was to have this be something similar to GoodReads but only for lesbian fiction. Then I talked it over with other authors and we all agreed that there are plenty of sites that rate or do reviews. My personal frustration is when a reader loyal to a specific publisher or author bbashes what they percieve to be the competition or rate books highly before even reading them. As a reader it isn't helpful in my quest for a new read. As an author it is disheartening because the majority of us simply want to write and read good work and build our genre.

  The end result is that I decided to open source the app with the Golden Crown Literary Society once I deem it ready for launch. I'm a long standing member of this organization and instead of me having to update and add data, I will ask the membership to freely add in lesbian authors and titles as they are listed on Bella Books (a primary distributor for lesbian fiction) or on Amazon as there are micro hourses and self published works available there but not on Bella's website. I hope to build a database full of wonderful authors and titles for our readers and future lesbians looking to find themselves in their reading choices.

  ### Scenario
    Imagine that you have been toiling away as an elementary school teacher for the majority of your year. FInally, summer has come and its not only time to give yourself a break but a chance to spend time at the beach, the lake, or camping in the woods next to a roaring campfire...and all you need is some books to while away your downtime. You go to Amazon as it's easier to load your Kindle app up with books and you enter lesbian fiction in the search bar. You await your results, dismayed when the first two books are "sponsored" books that have half naked men on the covers!

    You figure that there must have been a mistake so you try lesbian mystery in your search bar only to have very similar results with some lesbian works, many Kindle Unlimited authors that you haven't heard of before and therefore don't know for certain that they write what you want to read, or you get a lot of gay or heterosexual choices. 

    What to do? That's where the app comes into play. Marketing will be workd of mouth in the community at first but the GCLS group have a far reach and word will get out. Suddenly, hundreds of choices come through! Pick five, buy or borrow from Kindle and get to relaxing!

#### Non Goals
  * This version does not require a log in but there could be a need in the future if a lot of erronous entries are made.

  ##### The Flow Chart
  How does the user experiance this wonderful app? Its very simple by design. No one wants to waste time so you get a landing page that offers only two options: Search or add books.
  Search takes you to the search view where you can search by Author names using a drop down menu. If we don't have the name you are searching for, there is an add book button available on this page view as well. Otherwise, choose and author and find all the books we have listed for that specific author. 

  Alternitivly, choose the drop down for genres. Perhpas, like me, you have a favorite genre but you feel like you've read all the decent books out there. Well, confirm it or be surprised then a search of your sub-genre (lesbian fiction being the primary) finds a list of books with unfamiliar titles in your favorite genre! Rejoice, download from the seller of your choice and happy reading! It's really that simple yet it doesn't exist anywhere as of yet.

  For the Add a book page there is a simply text input form for the author name, the book title, and a drop down for genre as listed on Amazon or Bella. 

  **Technical Note**

  I went with the drop down menus for two reasons:
    1. by pushing all the authors, new or existing, it keeps things easy as well as avoiding errors. The other part of that, call it 1a, is that you may search the list for one author and find another whom you have heard of but hadn't read yet. a minor free advertisment if you will.
    2. The drop down is also used in the add a book portion of the site to ensure that we have genre continuity. I might view a book as general fiction while the author wrote it as mystery or intrigue. I ask on the site that people use the classification, name, and title as displayed on Amazon for continuity. Also avoids the YA v.s. Young Adult arguments.

###### The Tech Stack:
  The front end is simple: A little HTML, some minor JavaScript, and mostly React with JSX. If I ever include cover pictures I'll host on CLoudinary or another external site.

  The back end: Node.js, Postgresql with Knex and Express. The Database is a simple table with author name, title, and genre columns.
  
####### The demo: Please use the following information for testing purposes:
Author:                     Book:              Genre:
Patty Schramm           Soul's Rescue          Romance
Carsen Taite            Sidebar                Romance
Cari Hunter             Breathe                Action/Adventure
Ali Vali                Double Crossed   Mystery/Suspense/Intrigue
Elena Graf              Lies of Omission    Historical Fiction
E.J. Noyes              Ask Me Again        General Fiction
Heather Jane            Turn Fourty With Me  Poetry

"https://lesfic-rate-your-reads.jeaninehoffman.now.sh/"

    Link to client side repo: "https://github.com/JeanineHoffman/LesFic-Rate-Your-Reads.git"

    Link to  server side repo: "https://github.com/JeanineHoffman/lesfic-server.git"



##### screenshots:Landing page: <img src="./src/img/landingPage.png" alt="landingpage screenshot" height="300px" /> 

##### Search page: <img src="./src/img/searchpageB4.png" alt="search screenshot before a search happens" height="300px"/> 

###### Search page: <img src="./src/img/searchResults.png" alt="search results screen shot for a selected author and her books listed" height="300px"/> 


###### Designed and written by Jeanine Hoffman with assitance by my cohort, instructors, and my mentor
