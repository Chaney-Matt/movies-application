import $ from 'jquery'
<<<<<<< Updated upstream
/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
=======

import sayHello from './hello';

sayHello();

>>>>>>> Stashed changes
import {getMovies} from './api';

// import loadingGifMain from './hello';

const generateTable = () => {
    getMovies().then((movies) => {
        // Add table to container
        let movieTable = '<table class="movies" id="movie-list">';
        movieTable += '<thead>';
        movieTable += '<tr>';
        movieTable += '<th>Movie</th>';
        movieTable += '<th>Rating</th>';
        movieTable += '<th>Options</th>';
        movieTable += '</tr>';
        movieTable += '</thead>';
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}`);
            //renders movie and rating in table rows
            movieTable += `<tr><td id="row-title">${title}</td><td id="row-rating">${rating}</td>`;
            movieTable += `<td id="row-button">` + `</td></tr>`
            // add table edit and delete
            ;
        });
        //closes table after content is rendered
        movieTable += '</table>';
        // adds fetched table info to HTML
        $('.container').html(movieTable)

    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.')
            console.log(error);
        })
};
generateTable();

//Submit form
$('#submit-button').on("click", function (e) {
    e.preventDefault();

    if ($('#movie-title-input').val() !== "") {

        let title = $('#movie-title-input').val();
        let rating = $('#movie-rating-input').val();
        let movie = {
            title: title,
            rating: rating,
        };

        const url = '/api/movies';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, rating}),
        };
        fetch(url, options).then((response) => {
            response.json();
        }).then(() => {
            generateTable();
        });
    }
});