import React, { Component } from 'react';
import PropType from 'prop-types';

class Books extends Component{

    static propType = {
        showBooks: PropType.func.isRequired
    };

    constructor(props){

        super(props);

        this.state = {
             books: [
                 {
                     imageLinks:{
                         smallThumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
                         thumbnail: "none"
                     } ,
                    title: "To Kill a Mockingbird",
                    authors: ["Harper Lee"],
                     id: 1
                },
                 {
                     imageLinks:{
                         smallThumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
                         thumbnail: "none2"
                     },
                     title: "Ender's Game",
                     authors: ["Orson Scott Card", 'H Mnon'],
                     id: 2
                 }
             ]
        };
    }



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
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
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