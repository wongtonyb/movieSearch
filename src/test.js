import React, {Component} from 'react'
import axios from 'axios'

export class Test extends Component {
    constructor() {
        super()
        this.state = {
            response : false,
            result : []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault()

        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: evt.target.movie_title.value, page: '1', r: 'json'},
            headers: {
              'x-rapidapi-key': '{logintorapidapi}',
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
          };
          
          const that = this
          axios.request(options).then(function (response) {
              console.log(response.data);
              that.setState({
                  response : response.data.Response,
                  results : response.data.Search
              })
          }).catch(function (error) {
              console.error(error);
          });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="movie_title"></input>
                    <button type="submit">Search</button>
                </form>
                {
                this.state.response ? 
                <div>
                    {this.state.results.map((movieData, idx) => (
                        <div key={movieData.imbdID + String(idx)}>
                            <div>{movieData.Title}</div>
                            <div>{movieData.Director || "No Director Found"}</div>
                            <div>{movieData.Year}</div>
                            <img src={movieData.Poster} alt="posterError"/>
                            <button>Thumbs Up</button>
                            <button>Thumbs Down</button>
                        </div>
                    ))}
                </div> 
                : 
                <div>NO MOVIES FOUND</div>
                }
            </div>
        )
    }
}