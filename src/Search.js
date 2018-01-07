import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeString from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI';
import Books from './Books';
import PropType from 'prop-types'

class Search extends Component{

    static propType = {
        updateBookShelf: PropType.func.isRequired,
        booksAtShelf: PropType.array.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            query: '',
            books: []
        }
    }


    updateQuery = (queryToUpdate)=>{
        this.setState(()=>{
            return {
                query: queryToUpdate
            }
        });

        this.searchBooksAndAuthors(queryToUpdate);

    };

    getShelfOfBook(books){
        books.forEach((book) => {
           this.props.booksAtShelf.forEach((bookAtShelf) =>{
               if(book.id === bookAtShelf.id){
                   book.shelf = bookAtShelf.shelf;
               }
           })
        });

        return books;
    }

    searchBooksAndAuthors(query){
        if(query.trim() !== ''){
            BooksAPI.search(query).then((books) => {
                if(!books.error){
                    const match = new RegExp(escapeString(query, 'i'));

                    books = this.getShelfOfBook(books);

                    const findedBooks =  books.filter((book)=>{
                        if(match.test(book.title)){
                            return match.test(book.title)
                        }else{
                            if(Array.isArray(book.authors)){
                                return book.authors.map(author => match.test(author) );
                            }else{
                                return match.test(book.authors);
                            }
                        }
                    } );

                    this.setState({books: findedBooks});
                }else{
                    if(books.error === 'empty query'){
                        console.log('Ops! I\' it was not foung nothing until now...');
                    }else{
                        console.error('Response of Books: '+books.error);
                    }
                    this.setState({books: []});
                }


            });
        }else{
            console.log('Empty Search');
            this.setState({books: []});
        }
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
                        <input type="text" placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Books showBooks={this.state.books} updateBookShelf={this.props.updateBookShelf}/>

                    </ol>
                </div>
            </div>
        );
    }
}


export default Search