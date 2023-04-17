import SignIn from './components/SignIn'
import './App.css'
import {Route, Routes } from "react-router-dom";
import NotFound from './components/NotFound'
import CreateProduct from './components/CreateProduct'
import { UserContextProvider } from './context/UserContext'
import SignUp from './components/SignUp';
import ProductCard from './components/ProductCard';
function App() {
  // <Route path='/products' element={ <ProductCard/>}/>
  return (
    <div>
     <UserContextProvider>
     <Routes>
        <Route path='/' element={ <SignIn/>}/>
        <Route path='/registro' element={ <SignUp/>}/>
        <Route path='/create' element={ <CreateProduct/>}/>
        <Route path='/products' element={ <ProductCard/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
     </UserContextProvider>
    </div>
  )
}

export default App
