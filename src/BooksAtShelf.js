import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Books from './Books'

class BooksAtShelf extends Component{

    static propType = {
        books: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
        shelfTitle: PropTypes.string.isRequired
    };

    render(){

        const showBooks = this.props.books;


        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <Books showBooks={showBooks} updateBookShelf={this.props.updateBookShelf}/>
                </div>
            </div>
        );

    }

}

export default BooksAtShelf;