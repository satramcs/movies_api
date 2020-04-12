const my_conn  = require('../db');

module.exports.saveGenres = (save_data) => {
	return new Promise((resolve, reject) => {
		my_conn.query('INSERT INTO genres (id, name) VALUES ?', [save_data], function(err, result) {
			if (err) {
				console.log(err)
				reject(err);
			} else {
				resolve(1);
			}
		});
	});
};

module.exports.getGenres = () => {
	return new Promise((resolve, reject) => {
		my_conn.query("SELECT id, name FROM genres", (err, rows) => {
			if(err){
				console.log(err);
				reject("Can't get genres");
			}else{
				if(rows.length){
					let genres = {};
					for(data of rows){
						genres[data.id] = data.name;
					}
					resolve(genres);
				}
				else
					resolve(false);
			}
		});
	})
};

module.exports.getLastCount = (year) => {
	return new Promise((resolve, reject) => {

		my_conn.query(`SELECT COUNT(*) AS total from movie_list WHERE YEAR(release_date) = '${year}'`, (err, [row]) => {
			if(err){
				console.log(err);
				reject("Can't get movies");
			}else{
				resolve(row.total);
			}
		});
	});
};

module.exports.storeMovies = (formatted_movies) => {
	return new Promise((resolve, reject) => {
		my_conn.query('INSERT INTO movie_list (popularity, vote_count, video, poster_path, id, adult, backdrop_path, original_language, original_title, genre_names, title, vote_average, overview, release_date) VALUES ?', [formatted_movies], function(err, result) {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(1);
			}
		});
	})
};

module.exports.getMoviesCount = (genre, year, language) => {
	return new Promise((resolve, reject) => {
		let lag_wr = '';
		if(language){
			lag_wr = ` AND original_language = '${language}'`;
		}
		my_conn.query(`SELECT COUNT(*) AS count from movie_list WHERE JSON_CONTAINS(genre_names, '"${genre}"', '$') AND YEAR(release_date) = '${year}' ${lag_wr}`, (err, [row]) => {
			if(err){
				console.log(err);
				reject(err);
			}else{
				resolve(row.count);
			}
		});
	});
};

module.exports.getMovies = (search, count, limit, offset) => {
	return new Promise((resolve, reject) => {
		if(count){
			var slct = ` COUNT(*) AS total `;
			var limits = ``;
		}else{
			var slct = ` popularity, vote_count, video, poster_path, id, adult, backdrop_path, original_language, original_title, genre_names, title, vote_average, overview, release_date `;
			var limits = ` LIMIT ${limit} OFFSET ${offset} `;
		}

		my_conn.query(`SELECT ${slct} from movie_list WHERE JSON_CONTAINS(genre_names, '"${search.genre}"', '$') AND YEAR(release_date) = '${search.year}' AND title LIKE '%${search.name}%' ${limits}`, (err, rows) => {
			if(err){
				console.log(err);
				reject("Can't get movies");
			}else{
				if(count){
					resolve(rows[0].total);
				}else{
					resolve(rows);
				}
			}
		});
	});
};