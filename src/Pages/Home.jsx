import React from 'react'
import Hero from '../Components/Hero'
import Services from '../Components/Services'
import OurLawyers from '../Components/OurLawyers'
import Testimonial from '../Components/Testimonial'

import Faq from '../Components/Faq'
import BlogSection from '../Components/BlogSection'
import ContactUs from '../Components/ContactUs'

const Home = () => {
    return (
        <div className='flex flex-col w-full'>
            <Hero />
            <Services />
            <OurLawyers />
            <Testimonial />
            <BlogSection />
            <Faq />
            <ContactUs/>


        </div>
    )
}

export default Home
