import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Reducers
import { filterKeyword } from '../reducers/FilterReducer';

const FilteredAnecdotes = ({ filterKeyword }) => {
  return (
    <>
      Filter
      <input
        type="text"
        name="filter_value"
        onChange={(e) => filterKeyword(e.target.value)}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterKeyword: (value) => {
      dispatch(filterKeyword(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(FilteredAnecdotes);

// PropTypes validation
FilteredAnecdotes.propTypes = {
  filterKeyword: PropTypes.func,
};
