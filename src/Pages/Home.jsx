import React from 'react'
import Hero from '../Components/Hero'
import Services from '../Components/Services'
import OurLawyers from '../Components/OurLawyers'
import Testimonial from '../Components/Testimonial'
import BlogSection from '../Components/Blogsection'
import Faq from '../Components/Faq'

const Home = () => {
    return (
        <div className='flex flex-col w-full'>
            <Hero />
            <Services />
            <OurLawyers />
            <Testimonial />
            <BlogSection />
            <Faq />


        </div>
    )
}

export default Home
