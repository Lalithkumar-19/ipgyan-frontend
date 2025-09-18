import React from 'react'
import Hero from '../Components/About/Hero'
import WhatWeDo from '../Components/About/WhatWeDo'
import WhatToExpect from '../Components/About/WhatToExpect'
// import LawyersGallery from '../Components/About/LawyersGallery'
import Vision from '../Components/About/Vision'
import WhyIPgyan from '../Components/About/WhyIPgyan'
import Strengths from '../Components/About/Strengths'
import OurLawyers from '../Components/Home/OurLawyers'
const AboutUs = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <Hero />
            <OurLawyers />
            <WhyIPgyan />
            <WhatWeDo />
            <WhatToExpect />
            {/* <LawyersGallery /> */}

            <Vision />

            <Strengths />
        </div>
    )
}

export default AboutUs
