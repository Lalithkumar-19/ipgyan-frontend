import './App.css'
import Footer from './Components/Home/Footer';
import Navbar from './Components/Home/Navbar'
import AboutUs from './Pages/AboutUs';
import Blogs from './Pages/Blogs';
import Home from './Pages/Home'
import BlogPost from './Pages/BlogPost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Services from './Pages/Services';
import PracticeAreas from './Pages/PracticeAreas';
import ContactUs from './Pages/ContactUs';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <Router>

      <div className='flex flex-col w-full overflow-x-hidden  '>
        <Navbar />
        <div className='flex flex-col w-full mt-15' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/blog' element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/practiceareas" element={<Services />} />
            {/* <Route path="/practiceareas" element={<PracticeAr />} /> */}
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={

              <AdminDashboard />

            } />
          </Routes>
        </div>
        <Footer />
      </div>

    </Router>
  )
}

export default App;
