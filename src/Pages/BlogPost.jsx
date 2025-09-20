import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, User, ArrowLeft, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BlogPost = () => {
  const { id } = useParams();
  const contentRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const [blogPost, setBlogPost] = useState("");
  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await api.get(`/blogs/${id}`);
        if (response.status == 200) {
          setBlogPost(response.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    }
    fetchBlog();
  }, [id])
  console.log(blogPost, "blogPost");

  // Sample blog post data - in a real app, this would come from an API
  // const blogPost = {
  //   id: id || 'sample-post',
  //   title: 'Understanding the Latest Changes in Intellectual Property Law',
  //   author: 'John Doe',
  //   date: '2025-09-10',
  //   readTime: '5 min read',
  //   category: 'Intellectual Property',
  //   image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //   content: `
  //     <p class="mb-4">The landscape of intellectual property law is constantly evolving, and 2025 has brought significant changes that every business owner and creator should be aware of. In this comprehensive guide, we'll explore the latest developments and what they mean for protecting your intellectual assets.</p>
      
  //     <h2 class="text-2xl font-bold mt-8 mb-4">Key Legislative Updates</h2>
  //     <p class="mb-4">The Intellectual Property Modernization Act of 2025 has introduced several important changes that affect how intellectual property is registered, protected, and enforced. These changes aim to streamline processes while providing stronger protections for creators and businesses alike.</p>
      
  //     <h3 class="text-xl font-semibold mt-6 mb-3">1. Streamlined Patent Application Process</h3>
  //     <p class="mb-4">The new legislation has reduced the average patent approval time from 24 months to just 12 months for qualified applications. This is particularly beneficial for tech startups and pharmaceutical companies that rely on patent protection for their innovations.</p>
      
  //     <h3 class="text-xl font-semibold mt-6 mb-3">2. Enhanced Copyright Protections</h3>
  //     <p class="mb-4">Digital content creators will be pleased to know that the new law includes provisions for better protection against online piracy and unauthorized use of digital content. The legislation also introduces a simplified process for filing DMCA takedown notices.</p>
      
  //     <blockquote class="border-l-4 border-amber-500 pl-4 my-6 italic text-gray-600">
  //       "The new intellectual property laws represent a significant step forward in protecting the rights of creators while fostering innovation and fair competition in the digital age."
  //     </blockquote>
      
  //     <h2 class="text-2xl font-bold mt-8 mb-4">What This Means for Your Business</h2>
  //     <p class="mb-4">Businesses of all sizes should review their intellectual property portfolios in light of these changes. Here are some key actions to consider:</p>
  //     <ul class="list-disc pl-6 mb-6 space-y-2">
  //       <li>Conduct a comprehensive IP audit to identify all protectable assets</li>
  //       <li>Update internal policies to reflect the new legal requirements</li>
  //       <li>Train employees on the importance of IP protection and compliance</li>
  //       <li>Consider registering additional trademarks or patents that may now be more accessible</li>
  //     </ul>
      
  //     <h2 class="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>
  //     <p class="mb-4">As we move further into 2025, we can expect to see additional guidance and regulations from the USPTO and other regulatory bodies. Staying informed about these developments will be crucial for maintaining strong IP protections.</p>
  //   `,
  //   relatedPosts: [
  //     { id: 'trademark-tips', title: '5 Essential Trademark Tips for Startups', category: 'Trademark' },
  //     { id: 'copyright-basics', title: 'Understanding Copyright: What Every Creator Should Know', category: 'Copyright' },
  //     { id: 'patent-process', title: 'Navigating the Patent Process: A Step-by-Step Guide', category: 'Patents' }
  //   ]
  // };

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);

    // Only run animations on the client side
    if (typeof window !== 'undefined') {
      // Simple fade-in animation for content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  if (!isClient) {
    // Return a basic loading state or null during SSR/SSG
    return null;
  }
if(!blogPost){
  return <div className='flex flex-col items-center justify-center h-screen'>
    <h2 className='text-3xl font-bold text-center'>loading...</h2>
    <LoaderCircle className='animate-spin'/>
  </div>
}
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Articles
        </Link>
      </div>

      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Featured Image */}
        <div className="h-64 md:h-96 w-full overflow-hidden">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center">
              <User className="w-4 h-4 mr-1" />
              {blogPost.author}
            </span>
            <span>•</span>
            <span className="inline-flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(blogPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {/* <span>•</span> */}
            {/* <span className="inline-flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {blogPost.readTime}
            </span> */}
          </div>

          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded mb-4">
            {blogPost.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>

          {/* Article Content */}
          <div
            ref={contentRef}
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </article>

      {/* Related Articles */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPost.relatedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-6">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default BlogPost;
