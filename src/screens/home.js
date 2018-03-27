import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/book'

class Home extends Component {
    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            { this.props.allBooks.filter(book => book.shelf === 'currentlyReading').map(book => (
                                <Book book={book} shelf="currentlyReading" changeShelf={this.props.changeShelf} key={book.id}/>
                            )) }
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            { this.props.allBooks.filter(book => book.shelf === 'wantToRead').map(book => (
                                <Book book={book} shelf="wantToRead" changeShelf={this.props.changeShelf} key={book.id}/>
                            )) }
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            { this.props.allBooks.filter(book => book.shelf === 'read').map(book => (
                                <Book book={book} shelf="read" changeShelf={this.props.changeShelf} key={book.id}/>
                            )) }
                        </ol>
                        </div>
                    </div>
                    </div>
                </div>
            <div className="open-search">
                <Link to="/search" >Add a book</Link>
            </div>
            </div>
        )
    }
}

export default Home
