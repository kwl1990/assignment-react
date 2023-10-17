import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from '../components/Nav'
import About from '../pages/About'
import Friends from '../pages/Friends'

function App() : JSX.Element{
  return(
    <>
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<About/>}/>
        <Route path='/friends' element={<Friends/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
