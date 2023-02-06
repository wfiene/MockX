
<h1 align="center"> 

[MockX](https://mockx.onrender.com)

</h1>

<h2 align="center"> MockX is a StockX/Etsy hybrid clone </h2>

<p align='center'>
A live version of this site can be viewed by clicking the link at the top of this readme. It is being hosted on a free hosing site so it may take a few seconds to load on the first visit.
</p>



<h2 align="center"> Tech Stack </h2>

<div align="center">

<img src="https://camo.githubusercontent.com/222fa9761f81c629e3cb83efa13d8469108c8e6d9c62ae6afcd1dceb4256d8fb/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f707974686f6e2d352e737667" width="75" height="75">   <img src="https://www.seekpng.com/png/detail/875-8753366_flask-framework-logo-svg.png" width="75" height="75">   [<img src="https://user-images.githubusercontent.com/105324675/190725431-5033a82c-51ff-4a9a-b9ff-48ad606a2a5e.svg" width="75" height="75">](https://www.javascript.com/) [<img src="https://user-images.githubusercontent.com/105324675/190726531-63e5fa0c-5e9a-4e12-a4df-ac578bdfefb3.svg" width="75" height="75">](https://whatwg.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727242-21af03e1-b793-4257-bdc5-14996fb8da63.svg" width="75" height="75">](https://www.css3.com/) [<img src="https://user-images.githubusercontent.com/105324675/190727472-da7d5a51-ef2e-4f71-b90c-333debd2d147.svg" width="75" height="75">](https://reactjs.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727697-f61e28b7-1597-4be0-9dc4-dbc443790f86.svg" width="75" height="75">](https://redux.js.org/) [<img src="https://user-images.githubusercontent.com/105324675/190729715-5aeed1a2-0914-413e-ac4b-de23aa7ed802.svg" width="75" height="75">](https://nodejs.org/en) [<img src="https://user-images.githubusercontent.com/105324675/190729918-773ddf18-90d3-4d52-aa81-c02731d413bf.svg" width="75" height="75">](https://www.npmjs.com/)

</div>

<h2 align="center"> Database </h2>

<div align="center">

[<img src="https://user-images.githubusercontent.com/105324675/190727354-8f322958-5b34-4c96-b052-358d06d0d9ef.svg" width="75" height="75">](https://www.postgresql.org/) <img src="https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/_static/flask-sqlalchemy-logo.png" width="75" height="75">

</div>

<h2 align="center"> Home Page </h2>

![home page 2](https://user-images.githubusercontent.com/104230573/216888583-462eeda8-bff2-4d57-affc-41f1f0864946.png)


<h2 align="center"> Current Features </h2>

Any user has the ability to view all items listed on the site
Logged in users have the ability to;
- Post new items
- Leave reviews on items they don't own or have not already left a review on
- They can also edit and delete both their posted items or reviews they have left

<h2 align="center"> Upcoming Features </h2>

- Shopping Cart
- Search Option
- Filter by Category
- Favorites/Following page

<h2 align="center"> To view this locally... </h2>

- Clone the repo
- Make a .env file with the following values...
  - SECRET_KEY=random key here
  - DATABASE_URL=sqlite:///dev.db
- In the terminal run 'pipenv shell' and the pipenv install in the root directory
- cd into the react app directory and run 'npm install'
- back in the root directory and shell run 'flask db init && flask db migrate && flask db upgrade && flask seed all && flask run'
- back in the react app directry run 'npm start'

