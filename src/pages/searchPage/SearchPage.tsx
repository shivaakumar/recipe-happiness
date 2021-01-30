import React, { Component } from  'react';
import SearchComponent from '../../components/searchComponent/searchComponent';
import './searchPage.css';

class SearchPage extends Component {
    constructor(props: any) {
        super(props);
    }
    componentDidCatch(error: any) {
        console.log('Error in searchPage', error);
    }
    render () {
        return (
            <div className='container'>
                <SearchComponent></SearchComponent>
            </div>
        )
        
    }
}
export default SearchPage;