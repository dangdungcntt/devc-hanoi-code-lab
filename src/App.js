import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import API from './api.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  async getAllMovie() {
    let movies = await API.fetchMovies();
    console.log(movies);
    this.setState({
      movies: movies
    });
  }

  componentDidMount() {
    this.getAllMovie();
  }

  render() {
    return (
      <div className="container">
          <div className="list-group">
            {
              this.state.movies.map(movie => {
                return <a className="list-group-item" key={movie.id}>
                <h4 className="list-group-item-heading">{movie.title}</h4>
                <p className="list-group-item-text">{movie.synopsis}</p>
                </a>;
              })
            }
          </div>
      </div>
    );
  }
}

export default App;
