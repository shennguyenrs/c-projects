const initialNoti = 'No notification at the moment';

const NotiReducer = (state = initialNoti, action) => {
  let content = '';

  switch (action.type) {
    case 'VOTE':
      content = action.data.content;
      return 'You voted: ' + content;
    case 'NEW_ANECDOTE':
      content = action.data.notification;
      return 'You created: ' + content;
    default:
      return state;
  }
};

export default NotiReducer;
