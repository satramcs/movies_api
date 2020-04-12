### Show Movies API
> Store and display movies using external API. Technologies: Node.js, Express.js, MariaDB 
> External API: https://www.themoviedb.org/

### Installation
```bash
# Create movies database
# Import the movies.sql file

# Install dependencies
npm install

# Run the server
npm start
```
### API list

i) Store Genres in database <br />
http://localhost:5000/movies/store_genres <br />
 <br />
ii) Store Movies in database by year (2018, 2019) <br />
http://localhost:5000/movies/store_movies?year=2018 <br />
http://localhost:5000/movies/store_movies?year=2019 <br />
Note: This API will continue to store the data (It will not store from beginning if any interruption) <br />
 <br />
iii) Show Movies count by genre and year <br />
http://localhost:5000/movies/movies_count?genre=Action&year=2019 <br />
 <br />
iv) Display movies list by genre, year and name <br />
http://localhost:5000/movies/get_movies?genre=Action&year=2018&name=Asuran&page=1 <br />
 <br />
v) Show Movies count by genre, year and language <br />
http://localhost:5000/movies/movies_count?genre=Action&year=2018&language=en <br />
