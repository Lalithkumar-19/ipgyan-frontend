import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

const Blogs = () => {
  // State for blog posts, filters, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Law-related blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the New Data Protection Bill 2023",
      excerpt: "A comprehensive analysis of the new data protection regulations and their impact on businesses.",
      category: "Data Privacy",
      date: "2023-05-15",
      readTime: "5 min read",
      author: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "The Future of Cryptocurrency Regulations",
      excerpt: "Exploring the evolving legal landscape for digital assets and blockchain technology.",
      category: "Crypto Law",
      date: "2023-05-10",
      readTime: "4 min read",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 3,
      title: "Intellectual Property Rights in the Digital Age",
      excerpt: "How modern technology is challenging traditional IP laws and what it means for creators.",
      category: "IP Law",
      date: "2023-05-05",
      readTime: "6 min read",
      author: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Environmental Law: Recent Developments and Cases",
      excerpt: "Key environmental law cases from the past year and their implications for businesses.",
      category: "Environmental Law",
      date: "2023-04-28",
      readTime: "7 min read",
      author: "David Kim",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 5,
      title: "Labor Law Updates: Remote Work Policies",
      excerpt: "How companies should adapt their HR policies for the new era of hybrid and remote work.",
      category: "Employment Law",
      date: "2023-04-20",
      readTime: "5 min read",
      author: "Lisa Wong",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    },
    {
      id: 6,
      title: "The Legal Implications of AI in Healthcare",
      excerpt: "Examining liability and regulatory challenges in AI-driven medical technologies.",
      category: "Health Law",
      date: "2023-04-15",
      readTime: "8 min read",
      author: "Robert Taylor",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 7,
      title: "International Trade Law: Navigating Tariffs and Sanctions",
      excerpt: "How recent geopolitical changes are affecting international trade agreements and compliance.",
      category: "International Law",
      date: "2023-04-10",
      readTime: "6 min read",
      author: "Maria Garcia",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 8,
      title: "Cybersecurity Law: Protecting Against Data Breaches",
      excerpt: "Legal strategies for businesses to mitigate risks and comply with cybersecurity regulations.",
      category: "Cybersecurity Law",
      date: "2023-04-05",
      readTime: "7 min read",
      author: "James Wilson",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 9,
      title: "The Future of Privacy Laws in a Post-GDPR World",
      excerpt: "How global privacy regulations are evolving and what businesses need to know.",
      category: "Privacy Law",
      date: "2023-03-28",
      readTime: "5 min read",
      author: "Jennifer Lee",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    }
  ];

  // Get unique categories for filter
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on search term, category, and date range
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const postDate = new Date(post.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include the entire end day
      
      matchesDate = postDate >= startDate && postDate <= endDate;
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animation refs
  const titleRef = useRef(null);
  const searchRef = useRef(null);
  const filtersRef = useRef(null);
  const postsRef = useRef([]);

  // Animation on mount
  useEffect(() => {
    let ctx;
    
    const loadAnimations = async () => {
      // Only run on client-side
      if (typeof window === 'undefined') return;
      
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Create a GSAP context
      ctx = gsap.context(() => {
        // Title animation
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
          });
        }
        
        // Search and filters animation
        if (searchRef.current && filtersRef.current) {
          gsap.from([searchRef.current, filtersRef.current], {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out'
          });
        }
        
        // Posts animation - using ScrollTrigger for better performance
        if (postsRef.current.length > 0) {
          postsRef.current.forEach((ref, i) => {
            if (ref) {
              gsap.from(ref, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.1 * (i % 3),
                scrollTrigger: {
                  trigger: ref,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                  // Prevent any layout shifts
                  invalidateOnRefresh: true
                }
              });
            }
          });
        }
      });
    };
    
    // Load animations with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      loadAnimations().catch(console.error);
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert(); // This will kill all GSAP animations and revert to pre-animation state
    };
  }, [currentPosts]); // Only re-run when currentPosts changes

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, dateRange]);

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Legal Insights & News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest legal developments, case studies, and expert analysis
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div ref={searchRef} className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div ref={filtersRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <span className="flex items-center justify-center text-gray-500">to</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  min={dateRange.start}
                  max={new Date().toISOString().split('T')[0]}
                  disabled={!dateRange.start}
                />
              </div>
              {(dateRange.start || dateRange.end) && (
                <button
                  onClick={() => setDateRange({ start: '', end: '' })}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear dates
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <article
                  key={post.id}
                  ref={el => postsRef.current[index] = el}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-3">
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold">
                        {post.category}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                        </div>
                        <button className="text-amber-600 hover:text-amber-700 flex items-center">
                          Read more
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
                      currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } text-sm font-medium`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show first 3 pages, current page with neighbors, and last page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === pageNum
                            ? 'z-10 bg-amber-50 border-amber-500 text-amber-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  )}
                  
                  {totalPages > 5 && (
                    <button
                      onClick={() => paginate(totalPages)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === totalPages
                          ? 'z-10 bg-amber-50 border-amber-500 text-amber-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {totalPages}
                    </button>
                  )}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
                      currentPage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } text-sm font-medium`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setDateRange({ start: '', end: '' });
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;