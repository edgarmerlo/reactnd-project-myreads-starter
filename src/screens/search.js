import React, { Component } from 'react'
import Book from '../components/book'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class Search extends Component {
    state = {
        results: [],
        query: '',
    }
    matchWithShelf = (books, myBooks) => {
        const booksInShelf = {}
        for(let myBook of myBooks){
            booksInShelf[myBook.id] = myBook.shelf
        }
        const responseWithShelf = []
        for(let book of books){
            if(booksInShelf[book.id]){
                book.shelf = booksInShelf[book.id]
            }
            responseWithShelf.push(book)
        }
        return responseWithShelf
    }
    searchForBook = (event) => {
        console.log('value: ', event.target.value)
        event.persist()
        this.setState({ query: event.target.value }, () => {
            event.target.value ?
                BooksAPI.search(this.state.query).then(response => {
                    BooksAPI.getAll().then(myBooks => {
                        this.setState({results: this.matchWithShelf(response, myBooks)})
                    })
                }) 
            : 
                this.setState({ results: [] });
        })
    }
    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={this.searchForBook} defaultValue={this.state.query}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.state.results.map(book => (
                            <Book book={book} shelf={book.shelf || 'none'} changeShelf={this.props.changeShelf} key={book.id}/>
                        )) }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search