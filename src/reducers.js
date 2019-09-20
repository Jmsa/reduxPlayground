export const initialState = {
    past: [],
    present: [{ value: 0 }],
    future: []
  };
  
  export function reducer(state = initialState, action) {
    const { past, present, future } = state;
  
    switch (action.type) {
      case "ADD":
        return {
            past: [...past, present],
            present: {value: action.payload},
            future: []
        };
      case "UNDO":
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
      case "REDO":
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      default:
        // (?) How do we handle other actions?
        return state;
    }
  }