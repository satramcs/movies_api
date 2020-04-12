const { check } = require('express-validator');

module.exports.formatGenresData = (raw_data) => {
	let format_data = JSON.parse(raw_data)
	let formatted_data = [];
	for(data of format_data.genres){
		formatted_data.push([
			data.id,
			data.name
			]);
	}
	return formatted_data;
};

module.exports.formatMoviesData = (raw_data, get_genres) => {
	let format_data = JSON.parse(raw_data)
	let formatted_data = [];

	for(data of format_data.results){
		if(data){
			formatted_data.push([
				data.popularity,
				data.vote_count,
				data.video,
				data.poster_path,
				data.id,
				data.adult,
				data.backdrop_path,
				data.original_language,
				data.original_title,
				JSON.stringify(convertGenres(data.genre_ids, get_genres)),
				data.title,
				data.vote_average,
				data.overview,
				data.release_date
				]);
		}
	}
	return formatted_data;
};

convertGenres = (gen_ids, all_genres) => {
	let genres = [];
	if(gen_ids.length){
		for(id of gen_ids){
			genres.push(all_genres[id]);
		}
	}
	return genres;
}

module.exports.getMoviesValidation = [
check('genre').trim().not().isEmpty().withMessage('Genre is required'),
check('year').trim().not().isEmpty().isIn([2018,2019]).withMessage('Valid year is required'),
check('name').trim().not().isEmpty().isLength({min:3}).withMessage('Name is required and name should be minimum 3 characters in length'),
check('page').trim().not().isEmpty().isInt().withMessage('Valid page is required'),
];

module.exports.moviesCountValidation = [
check('genre').trim().not().isEmpty().withMessage('Genre is required'),
check('year').trim().not().isEmpty().isIn([2018,2019]).withMessage('Valid year is required')
];

module.exports.storeMoviesValidation = [
check('year').trim().not().isEmpty().isIn([2018,2019]).withMessage('Valid year is required')
];

module.exports.convertErrors = (errors) => {
	let convAr = [];
	for(er in errors){
		convAr.push(errors[er].msg);
	}
	return convAr;
};
