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

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }

    getSortByClass = sortByOption => {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    };

    renderSortByOptions = () => {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li
                    key={sortByOptionValue}
                    className={this.getSortByClass(sortByOptionValue)}
                    onClick={this.handleSortByChange.bind(
                        this,
                        sortByOptionValue
                    )}
                >
                    {sortByOption}
                </li>
            );
        });
    };

    handleSortByChange = sortByOption => {
        this.setState({
            sortBy: sortByOption
        });
    };

    handleTermChange = event => {
        event.preventDefault();
        this.setState({
            term: event.target.value
        });
    };

    handleLocationChange = event => {
        event.preventDefault();
        this.setState({
            location: event.target.value
        });
    };

    handleSearch = event => {
        event.preventDefault();
        if (this.state.term && this.state.location) {
            this.props.searchYelp(
                this.state.term,
                this.state.location,
                this.state.sortBy
            );
        }
    };

    handleEnterClick = event => {
        if (event.key === 'Enter' && this.state.term && this.state.location) {
            this.props.searchYelp(
                this.state.term,
                this.state.location,
                this.state.sortBy
            );
        }
    };

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>{this.renderSortByOptions()}</ul>
                </div>
                <div className="SearchBar-fields">
                    <input
                        onChange={this.handleTermChange}
                        onKeyPress={this.handleEnterClick}
                        placeholder="Search for a Venue e.g. Park, Restaurant, Club"
                    />
                    <input
                        onChange={this.handleLocationChange}
                        onKeyPress={this.handleEnterClick}
                        placeholder="Where?"
                    />
                </div>
                <div className="SearchBar-submit">
                    <button
                        className="searchButton"
                        onClick={this.handleSearch}
                    >
                        Let's Go
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
