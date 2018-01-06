import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BooksAtShelf from './BooksAtShelf';
import PropType from 'prop-types';


class ListBooksContent extends Component {
    propType = {
        books: PropType.array.isRequired,
        updateBookShelf: PropType.func.isRequired
    };

    render(){
        const books = this.props.books;


        return (
            <div className="list-books-content">
                <div>
                    <BooksAtShelf books={books} shelf='currentlyReading' updateBookShelf={this.props.updateBookShelf} shelfTitle='Currently Reading'/>
                    <BooksAtShelf books={books} shelf='wantToRead' updateBookShelf={this.props.updateBookShelf} shelfTitle='Want to Read'/>
                    <BooksAtShelf books={books} shelf='read' updateBookShelf={this.props.updateBookShelf} shelfTitle='Read'/>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>

                </div>
            </div>
            );

    }
}

export default ListBooksContent;