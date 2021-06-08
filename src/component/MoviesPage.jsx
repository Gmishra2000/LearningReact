import React, { Component } from 'react'
import { getMovies } from '../temp/MovieService'

export default class MoviesPage extends Component {
    state = {
        movies: getMovies(),
        currSearchText: ""
        
    }
    deleteEntry = (id) => {
        let filtereMovies = this.state.movies
            .filter( (movieObj) => {
                return movieObj._id !== id;
            })
        this.setState({
            movies: filtereMovies
        })
    }

    setCurrentText = (e) => {
        let task = e.target.value;
        
        this.setState({
            currSearchText: task

        })
    }
    render() {
        // console.log(this.state.movies);
        let { movies, currSearchText } = this.state;
        let filteredArr = movies.filter((movieObj) => {
            let title = movieObj.title.trim().toLowerCase();
            return title.includes(currSearchText.trim().toLowerCase());
        })
        
        if (currSearchText === "") {
            filteredArr = this.state.movies;
        }
        // console.log(currSearchText);
        return (
            <div className="row">
                <div className="col-3">
                    hello
                </div>
                <div className="col-9">
                    <input type="search" value={currSearchText} onChange= {this.setCurrentText} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Delete</th>
                            
                            </tr>
                            
                        </thead>
                        <tbody>
                            {filteredArr.map((movieObj) =>{

                                return (<tr scope="row" key={movieObj._id} >
                                <td>{movieObj.title}   </td>
                                
                                <td>{movieObj.genre.name}</td>
                                <td>{movieObj.numberInStock}</td>
                                <td>{movieObj.dailyRentalRate}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => { this.deleteEntry(movieObj._id); }}>Delete</button></td>
                                
                            </tr>

                                
                                )
                        
                            } )}
                        </tbody>
                    </table>
                </div>
                
                
            </div>
        )
    }
}



