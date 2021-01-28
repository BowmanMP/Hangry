import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange=this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }
    getSortByClass(sortByOption){
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }
    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }
    handleSearch(event) {
        event.preventDefault();
        if (
            this.state.term === '' || this.state.location === ''
        ) {
            alert('Please fill in both search fields.')
        } else {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
        }
    }

    onKeyPress = (event) => {
        if(event.which === 13) {
          this.handleSearch(event);
        }
    }    

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>);
        });
    }
    render () {
        return (
            <div className="SearchBar" searchYelp={this.searchYelp}>
                <div className="SearchBar-sort-options">
                    <ul>
                    {this.renderSortByOptions()}
                    </ul>
                </div>
                <form className="SearchBar-fields">
                    <input placeholder="Search Restaurants (i.e. Mexican / Chick-fil-a)" onChange={this.handleTermChange} onKeyPress={this.onKeyPress} />
                    <input type="text" placeholder="City, State" onChange={this.handleLocationChange} onKeyPress={this.onKeyPress} required/>
                </form>
                <span className="SearchBar-submit">
                    <input type="submit" onClick={this.handleSearch} value="Let's Go" />
                </span>
            </div>
        );
    }
}
export default SearchBar;