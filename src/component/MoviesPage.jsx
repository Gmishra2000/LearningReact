import React, { Component } from 'react'
import { getMovies } from '../temp/MovieService'

export default class MoviesPage extends Component {
    state = {
        movies : getMovies()
    }
    render() {
        console.log(this.state.movies);
        return (
            <div>
                <MovieAdd add Movie= {this.addMovie}></MovieAdd>
                
            </div>
        )
    }
}



