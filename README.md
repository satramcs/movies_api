# movies_api


### Show Movies API
> Store and display movies using external API. Technologies: Node.js, Express.js, MariaDB 

### Installation
```bash
# Install dependencies
npm install

# Run the server
npm start
```
### API list

1. Store Genres in database <br />
http://localhost:5000/movies/store_genres <br />
 <br />
2. Store Movies in database by year (2018, 2019) <br />
http://localhost:5000/movies/store_movies?year=2018 <br />
Note: This API will continue to store the data (It will not store from beginning if any interruption) <br />
 <br />
3. Show Movies count by genre and year <br />
http://localhost:5000/movies/movies_count?genre=Action&year=2019 <br />
 <br />
4. Display movies list by genre, year and name <br />
http://localhost:5000/movies/get_movies?genre=Action&year=2018&name=Asuran&page=1 <br />
 <br />
5. Show Movies count by genre, year and language <br />
http://localhost:5000/movies/movies_count?genre=Action&year=2018&language=en <br />
