import React from 'react'
import { Router, Route } from 'react-router-dom'
import Home from './screens/home'
import Search from './screens/search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  changeShelf = (event, book) => {
    BooksAPI.update(book, event.target.value).then( () => {
      this.getAllBooks();
    })
  }

  getAllBooks = () => {
    BooksAPI.getAll().then( response => {
      this.setState({ allBooks: response });
    })
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => <Home allBooks={this.state.allBooks} changeShelf={this.changeShelf} /> } />
        <Route path="/search" render={ () => <Search changeShelf={this.changeShelf} /> } />
      </div>
    )
  }
}

export default BooksApp
