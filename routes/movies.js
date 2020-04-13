const express = require("express");
const router = express.Router();
const externalApi = require("../models/movie_api");
const movieModel = require("../models/movie_model");
const { validationResult } = require('express-validator');
const { api_per_page, search_limit } = require("../config/keys");

const helper = require("../helpers");

router.get("/store_genres", (req, res) => {

	externalApi.getGenresApi().then(get_res => {
		let formatted_data = helper.formatGenresData(get_res);
		save_genres_data(formatted_data);
	}).catch(err => {
		res.status(403).json({status_code: 3, message: 'Can\'t get result from API'});
	});

	var save_genres_data = function(save_data){
		movieModel.saveGenres(save_data).then(data => {
			res.status(200).json({status_code: 1, message: 'Genres saved in database'});
		}).catch(err => {
			res.status(500).json({status_code: 4, message: 'Can\'t store in database'});
		});
	}
});

router.get("/store_movies", helper.storeMoviesValidation, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({status_code: 2, errors: helper.convertErrors(errors.array()), message: 'error' });
	}
	let year = req.query.year;
	
	movieModel.getGenres().then( get_genres => {
		if(get_genres){
			getLastCount(get_genres);
			res.status(200).json({status_code: 1, message: 'Save process started, please watch your terminal'});
		}else{
			return res.status(400).json({status_code: 2, message: 'Please run genres api to save the genres data'});
		}
	}).catch(err => {
		res.status(500).json({status_code: 4, message: 'Can\'t get genres from database'});
	});

	const getLastCount = function(get_genres){
		movieModel.getLastCount(year).then( total_pages => {
			let cur_page = Math.ceil(total_pages / api_per_page);
			cur_page++;
			save_movies(get_genres, cur_page);
		});
	}

	const save_movies = async(get_genres, cur_page) => {
		let total_pages = 10; //just for dummy, It will reasign in while function
		do{
			try{
				let get_result = await externalApi.getMoviesApi(year, cur_page);
				let formatted_data = helper.formatMoviesData(get_result, get_genres);
				let get_res = JSON.parse(get_result)
				total_pages = get_res.total_pages;
				try{
					let store_result = await movieModel.storeMovies(formatted_data);
					cur_page++;
					console.log(`${cur_page} page saved out of ${total_pages}`);
				}catch(err){

				}
			}catch(error){
				// console.log(error);
			}
		}while(cur_page<=total_pages);
		console.log('completed');
	};
});

router.get("/movies_count", helper.moviesCountValidation, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({status_code: 2, errors: helper.convertErrors(errors.array()), message: 'error' });
	}

	let genre = req.query.genre;
	let year = req.query.year;
	let language = req.query.language;

	movieModel.getMoviesCount(genre, year, language).then( get_result => {
		res.status(200).json({status_code: 1, message: 'success', count: get_result});
	}).catch(err => {
		res.status(500).json({status_code: 4, message: 'Something went wrong'});
	});
});

router.get("/get_movies", helper.getMoviesValidation, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({status_code: 2, errors: helper.convertErrors(errors.array()), message: 'error' });
	}

	let page = (req.query.page) ? req.query.page : 1;
	let search = {genre:req.query.genre.trim(), year:req.query.year.trim(), name:req.query.name.trim()};
	/*Get count*/
	movieModel.getMovies(search, 1).then( get_count => {
		if(get_count > 0){
			dis_movies(get_count);
		}else{
			res.status(200).json({status_code: 1, message: 'no data found'});
		}
	});

	/*Get result*/
	dis_movies = function(get_count){
		let limit = search_limit;
		let offset = (page * limit) - limit;
		movieModel.getMovies(search, 0, limit, offset).then( get_rows => {
			if(get_rows.length){
				let total_pages = Math.ceil(get_count / limit);
				res.status(200).json({status_code: 1, message: 'success', total_pages:total_pages, total_results: get_count, data:get_rows});
			}else{
				res.status(200).json({status_code: 1, message: 'no data found'});
			}
		});
	}
});

module.exports = router;
