import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books';

class BooksApp extends React.Component {


  constructor(props){
    super(props);


    this.state = {

        shelfValue: '',
        books: [],
        showSearchPage: false
      }
  }




  componentWillMount(){
    this.getBooks();
  }

  getBooks = () =>{
    return BooksAPI.getAll().then((books)=>{
      //const fetchedBooks = books.filter(book => book.shelf === type);
      this.setState({books}); //mesmo que {readingBooks: readingBooks}
    })
  };


  updateBookShelf = (bookToUpdate, shelf) =>{
    BooksAPI.update(bookToUpdate, shelf).then((resp)=>{
        this.setState((prevState) => {
          prevState.books.forEach(book =>{
            if(book.id === bookToUpdate.id){
                book.shelf = shelf;
            }
          });

          return {
            books: prevState.books
          }
        });
      }
    )
  };

  render() {
    const showBooks = this.state.books;


    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Books showBooks={showBooks.filter(book => book.shelf === 'currentlyReading') } updateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                   <Books showBooks={showBooks.filter(book => book.shelf === 'wantToRead')} updateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   <Books showBooks={showBooks.filter(book => book.shelf === 'read')} updateBookShelf={this.updateBookShelf}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
