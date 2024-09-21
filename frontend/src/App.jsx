import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import CreateBooking from './pages/CreateBooking'
import DeleteBooking from './pages/DeleteBooking'
import EditBooking from './pages/EditBooking'
import ShowBooking from './pages/ShowBooking'



const App = () => {
  return (
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/booking' element={<CreateBooking/>}/>
  <Route path='/booking/delete/:id' element={<DeleteBooking/>}/>
  <Route path='/booking/edit/:id' element={<EditBooking/>}/>
  <Route path='/booking/details/:id' element={<ShowBooking/>}/>

  
</Routes>
  )
}

export default App