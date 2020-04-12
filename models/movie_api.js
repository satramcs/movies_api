const { api_url, api_key } = require("../config/keys");
const Request = require("request");

module.exports.getGenresApi = () => {
	return new Promise((resolve, reject) => {
		Request.get(`${api_url}genre/movie/list?api_key=${api_key}`, (error, response, body) => {
			if(error) {
				console.log(error);
				reject(error);
			}else{
				resolve(body);
			}
		});
	});
};

module.exports.getMoviesApi = (year, cur_page) => {
	return new Promise((resolve, reject) => {
		Request.get(`${api_url}discover/movie?primary_release_year=${year}&sort_by=title.asc&page=${cur_page}&api_key=${api_key}`, (error, response, body) => {
			if(error) {
				reject(error);
			}else{
				resolve(body);
			}
		});
	});
};