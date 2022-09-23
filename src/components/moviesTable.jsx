import React, { Component } from "react";
import { Link } from "react-router-dom";
import Liked from "./common/liked";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        this.props.user ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          <p>{movie.title}</p>
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Liked liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) =>
        this.props.user && (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
