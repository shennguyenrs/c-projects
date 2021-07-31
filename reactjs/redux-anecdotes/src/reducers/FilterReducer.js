const FilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.keyword;
    default:
      return state;
  }
};

export const filterKeyword = (keyword) => {
  return {
    type: 'SET_FILTER',
    data: {
      keyword: keyword === '' ? 'ALL' : keyword,
    },
  };
};

export default FilterReducer;
