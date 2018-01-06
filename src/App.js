import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksContent from './ListBooksContent';
import { Route, Link } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {


  constructor(props){
    super(props);


    this.state = {

        shelfValue: '',
        books: [],
      }
  }




  componentWillMount(){
    this.getBooks();
  }

  componentDidUpdate(){
      this.getBooks();
  }

  getBooks = () =>{
    return BooksAPI.getAll().then((books)=>{
      this.setState({books}); //Same of{readingBooks: readingBooks}
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

  renderListBooks = () =>{
      const showBooks = this.state.books;

      return (
          <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>

              <ListBooksContent books={showBooks} updateBookShelf={this.updateBookShelf}/>

              <div className="open-search">
                  <Link to='/search'>Add a book</Link>

              </div>
          </div>
      );
  };


  renderSearchPage = () =>{
      return <Search updateBookShelf={this.updateBookShelf}/>
  };


  render() {
    return (
      <div className="app">
          <Route exact path='/' render={this.renderListBooks}/>

          <Route path='/search' render={this.renderSearchPage}/>
      </div>
    )
  }
}

export default BooksApp;
