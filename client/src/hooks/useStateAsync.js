import { useState, useEffect, useRef } from "react"

export default function useStateAsync(initialState, givenState, givenSetState) {
  let [state, setState] = useState(initialState)
  if (givenState && givenSetState)
    [state, setState] = [givenState, givenSetState]

  let isStateChanged = useRef(false)
  let resolve = useRef(null)

  function setStateAsync(newState) {
    return new Promise((_resolve, _reject) => {
      resolve.current = _resolve;
      isStateChanged.current = true;
      setState(newState);
    })
  }

  useEffect(() => {
    if (isStateChanged.current) {
      isStateChanged.current = false;
      resolve.current(state);
    }
  }, [state])

  return [state, setStateAsync];
}