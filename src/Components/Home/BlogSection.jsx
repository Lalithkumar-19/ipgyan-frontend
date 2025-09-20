import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;


    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitle,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.4 + (index * 0.1),
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs?limit=9');
        if (response.status == 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
    console.log(blogs, "blogs");
  }, [])

  const handleBlogView = (id) => {
    navigate(`/blog/${id}`);
  }

  return (
    <div ref={sectionRef} className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p ref={titleRef} className="text-orange-400 text-3xl font-bold  mb-2">Latest Blog</p>
          <h2 ref={subtitleRef} className="text-3xl md:text-4xl font-normal font-inria leading-tight mxw-w-[400px]">
            Stay informed with our expert insights, legal updates, and practical tips to navigate the complexities of the law.
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Blog Card 1 */}
          {blogs && blogs.length != 0 && blogs.map((item, ind) => (
            <div ref={addToRefs} key={ind} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                  src={item.image}
                  alt="Business meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-orange-400 mb-2">
                  <span> {new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                  <span className="mx-2">•</span>
                  <span>{item.category}</span>
                </div>
                <h3
                  onClick={() => handleBlogView(item._id)}
                 className="text-lg  cursor-pointer font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
              </div>
            </div>
          )

          )}



        </div>

        {/* See More Button */}
        <div className="text-center" onClick={() => { navigate('/blog') }}>
          <button className="bg-orange-400 cursor-pointer hover:bg-orange-500 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;