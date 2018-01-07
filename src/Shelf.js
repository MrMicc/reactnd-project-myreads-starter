import React, { Component } from 'react';
import PropType from 'prop-types';

class Shelf extends Component{

    static propType = {
        updateBookShelf: PropType.func.isRequired,
        book: PropType.object.isRequired
    };

    handleChange = (event) => {
        this.props.updateBookShelf(this.props.book, event.target.value);
    };

    getShelfValue = () =>{
        if(this.props.book.shelf){
            return this.props.book.shelf;
        } else {
            return 'none'
        }
    };

    render(){
        return(
            <div className="book-shelf-changer">
                <select onChange={this.handleChange} defaultValue={this.getShelfValue()}>
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