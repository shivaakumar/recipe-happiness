import React, { Component } from 'react';
import RecipeList from '../recipeList/recipeListModel';
import RecipeListComp, { IRecipeprops } from '../recipeList/recipeList';
import './searchComponent.css';
import Loader from '../loaderComponent/loaderComponent';

class SearchComponent extends Component {

    recipeList: IRecipeprops;
    searchKey: string = '';
    loading: boolean = false;
    recentSearch: string[] = [];
    constructor(props: any) {
        super(props);
        this.recipeList = { } as IRecipeprops;
        this.setKeyword = this.setKeyword.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidCatch(error: any) {
        console.log('Error in searchComponent', error);
    }
    setKeyword (event: any) {
        console.log(event.target.value);
        this.searchKey = event.target.value;
    }

    setViewModel (data: any) {
        if (!!data) {
            let model = new RecipeList ();
            model.parseModel(data);

            this.recipeList.recipes = model.recipelist;
            document.title = this.searchKey;
            this.setState({});
        }
    }

    addToRecentSearch () {
        if (this.recentSearch.length > 5) {
            this.recentSearch.shift();
        } else {
            this.recentSearch.push(this.searchKey);
        }
    }

    fetchData = async () => {
        this.loading = true;
        this.setState({});
        await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${this.searchKey}`)
            .then(response => response.json())
            .then(data => {
               console.log(data);
               this.loading = false;
               this.addToRecentSearch();
               this.setViewModel(data);
            })
            .catch((error) => {
                // handle all exceptions here
                // Dispatch to other services if any
                console.log('Error searching recipe', error);
            })
    }
  
    render () {
        return (
            <div className='searchContainer'>
                <input
                    className='barStyle'
                    key="random1"
                    placeholder={"Example- Biryani, Dosa"}
                    onChange={(e) => this.setKeyword(e)}
                />
                <div>
                    <button onClick={this.fetchData}>Search</button>
                </div>
                <div>
                    {this.recentSearch.length > 0 && <p>Last 5 search keywords</p>}
                    {
                        this.recentSearch.map((key, index) => {
                        return <span key={index}>{`${key} `}</span>
                        })
                    }
                    
                </div>
                <h1>Search results below for {this.searchKey}</h1>
                <div className='content'>
                    {this.loading ? <Loader></Loader> : <RecipeListComp {...this.recipeList}></RecipeListComp>}
                </div>
            </div>
        )
    }
}
export default SearchComponent;