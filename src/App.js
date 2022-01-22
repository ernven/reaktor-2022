import DataProvider from './dataContext'

import Header from './components/Header'
import Main from './components/Main'

import './App.css'

function App() {
  return (
    <div id='app-container'>
      <Header />
      <DataProvider>
        <Main />
      </DataProvider>
    </div>
  )
}

export default App
