import React, { Component } from 'react'
import { getMovies } from '../temp/MovieService'
import Pagination from './Pagination'
import List from './List'
export default class MoviesPage extends Component {
    state = {
        movies: [],
        genres: [{id:1, name:"All Genres"}],
        currSearchText: "",
        limit: 4,
        currentPage: 1,
        cGenre:"All Genres"

    }
    deleteEntry = (id) => {
        let filtereMovies = this.state.movies
            .filter((movieObj) => {
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

    sortByRatings = (e) => {
        let className = e.target.className;
        let sortedMovies;
        let { movies } = this.state;
        if (className == "fas fa-sort-up") {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate; // used sort function to sort on the basis of rating and stocks
            })
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }

    // alow to change the no of elements in page
    changelimit = (e) => {
        // console.log("hello");
        let currLimit = e.target.value;
        if (currLimit < 1)
            return;
        this.setState({
            limit: currLimit
        })
    }

    sortByStock = (e) => {
        let className = e.target.className;
        let sortedMovies;
        let { movies } = this.state;
        if (className == "fas fa-sort-up") {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.numberInStock - movieObjB.numberInStock; // https://www.w3schools.com/js/js_array_sort.asp
            })
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }

    changeCurrentPage = (pageNumber) => {
        this.setState({
            currentPage:pageNumber
        })
    }

    groupByGenre = (name) => {
        this.setState({
            cGenre: name,
            currSearchText: ""
        })
    }

    async componentDidMount() {
        let resp = await fetch("https://react-backend101.herokuapp.com/movies");
        let jsonMovies = await resp.json()
        this.setState({
            movies: jsonMovies.movies
        });
        resp = await fetch("https://react-backend101.herokuapp.com/genres");
        let jsonGenres = await resp.json();
        this.setState(
            {
                genres: [...this.state.genres, ...jsonGenres.genres]
            });
    }
   
   
    render() {
        // console.log(this.state.movies);
        let { movies, currSearchText, limit, currentPage,genres,cGenre } = this.state;
       // search on genre basis
        let filteredArr = movies;
        if (cGenre != "All Genres") {
            filteredArr = movies.filter((movieObj) => {
                return movieObj.genre.name == cGenre;
            })
        }
        // search term
       

        if (currSearchText!= "") {
            filteredArr = filteredArr.filter((movieObj) => {
                let title = movieObj.title.trim().toLowerCase();
                return title.includes(currSearchText.trim().toLowerCase());
            })

        } 
             

        
        // number of pages 
        let numberofPage = Math.ceil(filteredArr.length / limit);
        


        // console.log(filteredArr);
        // si -> (pageNumber - 1) * limit;
        // ei -> si + limit
        // console.log(currSearchText);
        let si = (currentPage - 1) * limit;
        let eidx = si + limit;
        filteredArr = filteredArr.slice(si, eidx);
        return (
            <div className="row">
                <div className="col-3">
                    <List
                        genres={genres}
                        groupByGenre = {this.groupByGenre}
                    >                     
                   </List>
                </div>
                <div className="col-9">
                    <input type="search" value={currSearchText} onChange={this.setCurrentText} />
                    <input type="number" className="col-1"
                        placeholder="no of elements/page"
                        value={limit}
                        onChange={this.changelimit}
                    />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>

                                <th scope="col">
                                    <i className="fas fa-sort-up" onClick={this.sortByStock}></i>
                                    Stock
                                    <i className="fas fa-sort-down" onClick={this.sortByStock}></i>
                                </th>
                                <th scope="col"><i className="fas fa-sort-up" onClick={this.sortByRatings}></i>
                                    Rate
                                    <i className="fas fa-sort-down" onClick={this.sortByRatings}></i>
                                </th>

                            </tr>

                        </thead>
                        <tbody>
                            {filteredArr.map((movieObj) => {

                                return (<tr scope="row" key={movieObj._id} >
                                    <td></td>
                                    <td>{movieObj.title}   </td>

                                    <td>{movieObj.genre.name}</td>
                                    <td>{movieObj.numberInStock}</td>
                                    <td>{movieObj.dailyRentalRate}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => { this.deleteEntry(movieObj._id); }}>Delete</button></td>

                                </tr>


                                )

                            })}
                        </tbody>
                    </table>
                    

                        {/* <input type="number" className="pageNumber" placeholder="page number" /> */}
                    <Pagination
                        numberofPage={numberofPage}
                        currentPage= {currentPage}
                        changeCurrentPage={this.changeCurrentPage}
                        
                    ></Pagination>
                        
                   
                    

                </div>


            </div >
        )
    }
}














