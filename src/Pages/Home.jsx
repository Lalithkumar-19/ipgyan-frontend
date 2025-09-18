import React from 'react'
import Hero from '../Components/Home/Hero'
import Services from '../Components/Home/Services'
import OurLawyers from '../Components/Home/OurLawyers'
import Testimonial from '../Components/Home/Testimonial'

import Faq from '../Components/Home/Faq'
import BlogSection from '../Components/Home/BlogSection'
import ContactUs from '../Components/Home/ContactUs'
import NewsletterSubscription from '../Components/Home/NewsletterSubscription'
import ClientShowcase from '../Components/Home/ClientShowcase'

const Home = () => {
    return (
        <div className='flex flex-col w-full'>
            <Hero />
            <Services />
            {/* <ClientShowcase /> */}
            <OurLawyers />
            <Testimonial />
            <BlogSection />
            <Faq />
            <NewsletterSubscription/>
            <ContactUs/>


        </div>
    )
}

export default Home
