import $ from 'jquery'

import sayHello from './hello.js';

sayHello();

import {getMovies} from './api';

$('#edit-button').hide();

let clearForm = () => {
    $('#movie-title-input').val('');
    $('#movie-rating-input').val('');
};

let clearEdit = () => {
    $('#edit-button').attr('data-id', '');
    // $('.row-button').attr('data-id', '')
};

function deleteThis() {
    $('.row-delete').on("click", function () {
        let id = $(this).attr('data-id');
        console.log('delete clicked');
        console.log(id);
        fetch(`/api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            generateTable();
        });
    });
}


let editButton = () => {
    // $('#edit-button').on("click", function (e) {
    //     e.preventDefault();
    //     let title = $('#movie-title-input').val();
    //     let rating = $('#movie-rating-input').val();
    //     let movie = {
    //         title: title,
    //         rating: rating,
    //         id: id
    //     };
    //     console.log(`row button id: ${id}`);
    //
    //     fetch(`/api/movies/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({title, rating})
    //     }).then(() => {
    //         clearForm();
    //         clearEdit();
    //         $('#edit-button').hide();
    //         $('#submit-button').show();
    //         $('#movie-title-input').attr('placeholder', 'Movie Title');
    //     }).then(() => {
    //         generateTable();
    //     });
    // })
};

function editThis() {
    $('.row-edit').on("click", function () {
        // $('#movie-title-input').attr('placeholder', 'Edit Movie');
        $('#submit-button').hide();
        $('#edit-button').show();

        let getId = $(this).attr("data-id");
        let getInfo = $.ajax({
            url: '/api/movies/' + getId,
            method: 'GET',
            data: getId
        });
        getInfo.done((movie) => {
            $('#movie-title-input').val(movie.title);
            $('#movie-rating-input').val(movie.rating);
            $('#edit-button').attr('data-id', movie.id);
            console.log(movie.id);
        });
        $('#edit-button').on("click", function () {
            let title = $('#movie-title-input').val();
            let rating = $('#movie-rating-input').val();
            let movie = {
                title: title,
                rating: rating,
                id: $('#edit-button').attr('data-id')
            };
            // console.log(`row button id: ${id}`);
            fetch('/api/movies/' + movie.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, rating})
            }).then(() => {
                clearForm();
                clearEdit();
                $('#edit-button').hide();
                $('#submit-button').show();
                $('#movie-title-input').attr('placeholder', 'Movie Title');
                generateTable();
            })
        });
    });
}

// function editThis() {
//     $('.row-edit').on("click", function () {
//         let id = $(this).attr('data-id');
//         console.log(`row ${id} edit clicked`);
//             $('#movie-title-input').attr('placeholder', 'Edit Movie');
//             $('#submit-button').hide();
//             $('#edit-button').show();
//
//
// $('#edit-button').on("click", function (e) {
//     e.preventDefault();
//     let title = $('#movie-title-input').val();
//     let rating = $('#movie-rating-input').val();
//     let movie = {
//         title: title,
//         rating: rating,
//         id: id
//     };
//     console.log(`row button id: ${id}`);
//
//     fetch(`/api/movies/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({title, rating})
//     }).then(() => {
//         clearForm();
//         clearEdit();
//         $('#edit-button').hide();
//         $('#submit-button').show();
//         $('#movie-title-input').attr('placeholder', 'Movie Title');
//     }).then(() => {
//         generateTable();
//     });
// });
//     });
// }


const generateTable = () => {
    getMovies().then((movies) => {
        // Add table to container
        let movieTable = '<table class="movies highlight centered" id="movie-list">';
        movieTable += '<thead>';
        movieTable += '<tr>';
        movieTable += '<th>Movie</th>';
        movieTable += '<th>Rating</th>';
        movieTable += '<th>Options</th>';
        movieTable += '</tr>';
        movieTable += '</thead>';
        // console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            // console.log(`id#${id} - ${title} - rating: ${rating}`);
            //renders movie and rating in table rows
            movieTable += `<tr><td id="row-title">${title}</td><td id="row-rating">${rating}</td>`;
            movieTable += `<td><i data-id="${id}" class="fas fa-edit row-edit"></i> <i data-id="${id}" class="fas fa-trash-alt row-delete" ></i></td></tr>`
            // add table edit and delete

        });

        //closes table after content is rendered
        movieTable += '</table>';
        // adds fetched table info to HTML
        $('.container').html(movieTable);
        editThis();
        deleteThis();

    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        })
};


generateTable();
//Submit form
$('#submit-button').click((e) => {
    e.preventDefault();
    console.log("clicked");
    if ($('#movie-title-input').val() !== "") {

        let title = $('#movie-title-input').val();
        let rating = $('#movie-rating-input').val();
        let movie = {
            title: title,
            rating: rating
        };

        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options).then((response) => {
            console.log(response.json());
        }).then(() => {
            generateTable();
        });
    }
});

//Delete button




