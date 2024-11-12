// Action Types
export const types = {
    SET_LOCATION: "SET_LOCATION",
    RESET_LOCATION: "RESET_LOCATION",
    // Other action types...
  };
  
  // Initial state
  const initialState = {
    location: {
      latitude: null,    // Could also use `undefined` if preferred
      longitude: null,   // Could also use `undefined` if preferred
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  };
  
  // Reducer
  export const locationReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case types.SET_LOCATION: {
        return {
          ...state,
          location: payload, // Update location state with the payload (location data)
        };
      }
  
      case types.RESET_LOCATION: {
        return {
          ...state,
          location: initialState.location, // Reset the location to initial state
        };
      }
  
      // Your existing cases...
  
      default:
        return state;
    }
  };
  
  // Action Creators
  export const setLocation = (location) => ({
    type: types.SET_LOCATION,
    payload: location,
  });
  
  export const resetLocation = () => ({
    type: types.RESET_LOCATION,
  });
  