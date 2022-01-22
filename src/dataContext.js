import { createContext, useContext, useReducer } from 'react'

import dataReducer from './dataReducer'

// We have one context for the state and one for the dispatch, so we don't need to take the both if not needed.
const DataContext = createContext()
const DispatchContext = createContext()

// Our initial state.
const reducerInit = {ongoing: [], finished: [], historical: [], gameIds: new Set()}

export default function DataProvider({children}) {
  // Our reducer holding the data (both historical and live).
  const [data, dispatch] = useReducer(dataReducer, reducerInit)

  return (
    <DataContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  return context
}

export function useDispatch() {
  const context = useContext(DispatchContext)
  return context
}
