import React, { Component } from 'react';
import PropType from 'prop-types';
import Shelf from './Shelf';

class Books extends Component{

    static propType = {
        showBooks: PropType.array.isRequired,
        updateBookShelf: PropType.func.isRequired
    };



    getAuthor = (book) =>{
        if(book.authors !== '' &&  Array.isArray(book.authors)){
            return book.authors.map(author => author+' ');
        }else {
            return book.authors;
        }
    };


    getBookImage = (book) => {

        if(book.imageLinks){
            return book.imageLinks.smallThumbnail;
        }else {
            return 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Twemoji_1f6ab.svg';
        }
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
                                <div className="book-cover" style={{width: 128, height: 188, backgroundImage: `url(${this.getBookImage(book)})`}}/>
                                <Shelf updateBookShelf={this.props.updateBookShelf} book={book}/>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{this.getAuthor(book)}</div>
                        </div>
                    </li>)
                })
            }
            </ol>
        );
    }



}

export default Books;