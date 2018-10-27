export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.events;
    case 'SET_WATCH_EVENT':
      const event = state.find(event => event.id === action.event.id);
      event.favorite = !event.favorite;
      return [...state, event];
    default:
      return state;
  }
};
