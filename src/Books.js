import React, { Component } from 'react';
import PropType from 'prop-types';
import Shelf from './Shelf';

class Books extends Component{

    static propType = {
        showBooks: PropType.func.isRequired,
        updateBookShelf: PropType.func.isRequired
    };




    render(){
        const books = this.props.showBooks;
        return (
            <ol className="books-grid">
            { books.map((book)=>
                { return (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}/>
                                <Shelf updateBookShelf={this.props.updateBookShelf} book={book}/>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.map((author) => author+' ' )}</div>
                        </div>
                    </li>)
                })
            }
            </ol>
        );
    }



}

export default Books;