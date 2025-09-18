import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// API base (adjust path segments if your backend uses a different route prefix)
const api = axios.create({ baseURL: 'http://localhost:4000' });

// API helpers
const fetchBlogsApi = () => api.get('/blogs');
const createBlogApi = (data) => api.post('/blogs', data);
const updateBlogApi = (id, data) => api.put(`/blogs/${id}`, data);
const deleteBlogApi = (id) => api.delete(`/blogs/${id}`);

const emptyForm = { id: null, title: '', author: '', content: '' };

// React Quill config
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote', 'code-block'],
    [{ align: [] }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'blockquote', 'code-block',
  'align',
];

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

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || isEmptyContent(form.content)) return;
    try {
      setSaving(true);
      setError('');
      if (isEditing && form.id != null) {
        await updateBlogApi(form.id, { title: form.title, author: form.author, content: form.content });
      } else {
        await createBlogApi({ title: form.title, author: form.author, content: form.content });
      }
      await loadBlogs();
      resetForm();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save blog.');
    } finally {
      setSaving(false);
    }
  };

  const editBlog = (b) => {
    setForm(b);
    setIsEditing(true);
  };

  const deleteBlog = async (id) => {
    try {
      setError('');
      await deleteBlogApi(id);
      await loadBlogs();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete blog.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{isEditing ? 'Edit Blog' : 'Create Blog'}</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm border border-red-200">{error}</div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Title<span className="text-red-500">*</span></label>
              <input className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-3 py-2 outline-none" placeholder="Enter blog title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Author</label>
              <input className="w-full border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-3 py-2 outline-none" placeholder="Enter author name" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Content<span className="text-red-500">*</span></label>
              <div className="border border-gray-300 rounded-lg">
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(val) => setForm({ ...form, content: val })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your content here..."
                  className="min-h-[180px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update' : 'Create')}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* List Card */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Existing Blogs</h3>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="space-y-3">
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((b) => (
                  <div key={b.id || b._id} className="rounded-lg border border-gray-200 p-4 hover:shadow-sm transition">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{b.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{(b.author || 'Unknown')} • {b.date ? new Date(b.date).toLocaleString() : ''}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editBlog({ id: b.id ?? b._id, title: b.title, author: b.author, content: b.content, date: b.date })} className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteBlog(b.id ?? b._id)} className="px-3 py-1.5 rounded-md bg-red-50 text-red-700 hover:bg-red-100">Delete</button>
                      </div>
                    </div>
                    {b.content && (
                      <div className="prose prose-sm max-w-none mt-2" dangerouslySetInnerHTML={{ __html: b.content }} />
                    )}
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="text-gray-500 text-sm">No blogs yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsManager;
