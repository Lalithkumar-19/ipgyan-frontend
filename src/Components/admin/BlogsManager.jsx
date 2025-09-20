import React, { useEffect, useState, useRef } from 'react';

import { api } from '../../utils';

// API base (adjust path segments if your backend uses a different route prefix)


// API helpers
const fetchBlogsApi = () => api.get('/blogs');
const createBlogApi = (data) => api.post('/blogs', data);
const updateBlogApi = (id, data) => api.put(`/blogs/${id}`, data);
const deleteBlogApi = (id) => api.delete(`/blogs/${id}`);

const emptyForm = {
  id: null,
  title: '',
  author: '',
  content: '',
  description: '',
  image: '',
  category: '',
  tags: []
};

const isEmptyContent = (html) => {
  if (!html) return true;
  const text = html.replace(/<(.|\n)*?>/g, '').trim();
  return text.length === 0;
};

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('existing'); // 'existing' or 'create'
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const loadBlogs = async () => {
    try {
      setError('');
      setLoading(true);
      const { data } = await fetchBlogsApi();
      setBlogs(Array.isArray(data) ? data : (data?.blogs || []));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Load Quill dynamically after component mounts
    const loadQuill = async () => {
      // Check if Quill is already loaded
      if (window.Quill) {
        initializeQuill();
        return;
      }

      // Load Quill CSS
      const link = document.createElement('link');
      link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Load Quill JS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
      script.async = true;
      script.onload = () => {
        initializeQuill();
      };
      document.body.appendChild(script);
    };

    const initializeQuill = () => {
      if (!editorRef.current || !window.Quill) return;

      // Initialize Quill editor
      const quill = new window.Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ align: [] }],
            ['clean'],
          ]
        },
        placeholder: 'Write your blog content here...',
      });

      // Set initial content if editing
      if (isEditing && form.content) {
        quill.root.innerHTML = form.content;
      }

      // Update form content when editor changes
      quill.on('text-change', () => {
        setForm(prev => ({ ...prev, content: quill.root.innerHTML }));
      });

      quillRef.current = quill;
    };

    // Only initialize Quill when we're on the create tab or editing
    if (activeTab === 'create') {
      loadQuill();
    }

    return () => {
      // Cleanup if needed
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [activeTab, isEditing, form.id]); // Reinitialize when tab changes or editing mode changes

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setNewTag('');
    if (quillRef.current) {
      quillRef.current.root.innerHTML = '';
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || isEmptyContent(form.content) || !form.description || !form.image || !form.category || form.tags.length === 0) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setSaving(true);
      setError('');
      if (isEditing && form.id != null) {
        await updateBlogApi(form.id, form);
      } else {
        await createBlogApi(form);
      }
      await loadBlogs();
      resetForm();
      setActiveTab('existing'); // Switch to existing blogs tab after submission
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save blog.');
    } finally {
      setSaving(false);
    }
  };

  const editBlog = (b) => {
    setForm({ ...b, tags: [...b.tags] });
    setIsEditing(true);
    setActiveTab('create'); // Switch to create tab when editing

    // Set Quill content after a small delay to ensure editor is ready
    setTimeout(() => {
      if (quillRef.current && b.content) {
        quillRef.current.root.innerHTML = b.content;
      }
    }, 100);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      setError('');
      await deleteBlogApi(id);
      await loadBlogs();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete blog.');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm({ ...form, tags: [...form.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setForm({ ...form, tags: form.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management System</h1>
          <p className="mt-2 text-lg text-gray-600">Create and manage your blog posts</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'existing'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('existing')}
          >
            Existing Blog Posts
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'create'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('create')}
          >
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {activeTab === 'create' ? (
            /* Create/Edit Blog Form */
            <div>
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-amber-100">
                <h3 className="text-lg font-semibold text-amber-900">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              </div>
              {error && (
                <div className="rounded-md mt-2 bg-red-50 text-red-700 px-4 py-3 text-sm border border-red-200 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">


                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 outline-none transition"
                    placeholder="Enter blog title"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Author
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 outline-none transition"
                    placeholder="Enter author name"
                    value={form.author}
                    onChange={e => setForm({ ...form, author: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 outline-none transition"
                    placeholder="Enter a short description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Featured Image URL
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 outline-none transition"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 outline-none transition"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Health">Health</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Tags
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-2 outline-none transition"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                    >
                      Add
                    </button>
                  </div>

                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-amber-600 hover:text-amber-900"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Content
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div ref={editorRef} className="h-64"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        {isEditing ? 'Update Post' : 'Create Post'}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition"
                  >
                    {isEditing ? 'Cancel Edit' : 'Clear Form'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Existing Blogs List */
            <div>
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-900">Existing Blog Posts</h3>
                  <span className="text-sm text-blue-700 bg-blue-200 px-3 py-1 rounded-full">
                    {blogs.length} {blogs.length === 1 ? 'Post' : 'Posts'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {blogs.map((b) => (
                      <div key={b.id || b._id} className="rounded-lg border border-gray-200 p-5 hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">{b.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{b.description}</p>

                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {b.category}
                              </span>
                              {b.tags && b.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  {tag}
                                </span>
                              ))}
                              {b.tags && b.tags.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{b.tags.length - 3} more
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mt-3 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                              {b.author || 'Unknown'} • {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => editBlog({
                                id: b.id ?? b._id,
                                title: b.title,
                                author: b.author,
                                content: b.content,
                                description: b.description,
                                image: b.image,
                                category: b.category,
                                tags: b.tags || []
                              })}
                              className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center transition"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => deleteBlog(b.id ?? b._id)}
                              className="px-3 py-1.5 rounded-md bg-red-50 text-red-700 hover:bg-red-100 flex items-center transition"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>

                        {b.image && (
                          <div className="mt-4">
                            <img
                              src={b.image}
                              alt={b.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {b.content && (
                          <div className="prose prose-sm max-w-none mt-4 quill-content" dangerouslySetInnerHTML={{ __html: b.content }} />
                        )}
                      </div>
                    ))}

                    {blogs.length === 0 && (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts yet</h3>
                        <p className="mt-1 text-gray-500">Get started by creating your first blog post!</p>
                        <button
                          onClick={() => setActiveTab('create')}
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Create New Post
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .quill-content {
          max-height: 200px;
          overflow: hidden;
          position: relative;
        }
        
        .quill-content:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(transparent, white);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogsManager;