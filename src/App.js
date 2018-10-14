import React, { Component } from 'react';
import './App.css';
import API from './api.js';
import ICON from './icon.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      showModal: false,
      modalData: {}
    }
  }

  async getAllMovie() {
    let movies = await API.fetchMovies();
    console.log(movies);
    this.setState({
      movies: movies
    });
  }

  async handleClickMovie(id) {
    let movie = await API.fetchMovie(id);
    console.log(movie);
    this.setState({
      modalData: movie,
      showModal: true
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
                return <a href="#" className="list-group-item" onClick={() => this.handleClickMovie(movie.id)} key={movie.id}>
                  <h4 className="list-group-item-heading">{movie.title}</h4>
                  <p className="list-group-item-text">
                    <img src={ICON.getUrl(movie.tomatoIcon)} alt={movie.tomatoIcon || ""} /> {movie.tomatoScore}
                    <img src={ICON.getUrl(movie.popcornIcon)} alt={movie.popcornIcon || ""} /> {movie.popcornScore}
                  </p>
                </a>;
              })
            }
          </div>
          { this.state.showModal ? <div className="modal" style={{display: "block"}} >
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">{this.state.modalData.title}</h4>
                </div>
                <div className="modal-body">
                <table>
                <tbody>
                  <tr>
                    <td>
                      <img src={this.state.modalData.posters.thumbnail} />
                    </td>
                    <td>
                      <ul>
                        <li>Studio: {this.state.modalData.studio}</li>
                        <li>Duration: {this.state.modalData.runningTimeStr}</li>
                        <li>Year: {this.state.modalData.year}</li>
                        <li>Status: {this.state.modalData.status}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr><td colSpan="2">{this.state.modalData.synopsis}</td></tr>
                  </tbody>
                </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={() => this.setState({showModal: false})}>Close</button>
                </div>
              </div>
            </div>
        </div> : ""}
      </div>
    );
  }
}

export default App;
