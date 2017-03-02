export function createHandlerReducer(handlers, initialState = {}) {
  return (state = initialState, action = {}) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return handler(state, action);
  };
}
