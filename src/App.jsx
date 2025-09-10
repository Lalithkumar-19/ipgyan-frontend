import './App.css'
import Footer from './Components/Home/Footer';
import Navbar from './Components/Home/Navbar'
import AboutUs from './Pages/AboutUs';
import Blogs from './Pages/Blogs';
import Home from './Pages/Home'
import BlogPost from './Pages/BlogPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='flex flex-col w-full mt-15' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/blog' element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
