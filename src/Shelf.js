import React, { Component } from 'react';

class Shelf extends Component{


    handleChange = (event) => {
        this.props.updateBookShelf(this.props.book, event.target.value);
    };


    render(){
        return(
            <div className="book-shelf-changer">
                <select onChange={this.handleChange} defaultValue='none'>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }

}

export default Shelf;