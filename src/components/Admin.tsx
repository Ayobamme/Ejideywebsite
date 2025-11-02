import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  full_content: string;
  category: string;
  image_url: string;
  date: string;
  featured: boolean;
  published: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'news' | 'messages' | 'applications'>('news');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'news') {
      loadNews();
    } else if (activeTab === 'messages') {
      loadMessages();
    }
  }, [activeTab]);

  const loadNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNewsArticles(data);
    }
    setLoading(false);
  };

  const loadMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const handleSaveNews = async () => {
    if (!editingNews) return;

    if (editingNews.id) {
      await supabase
        .from('news_articles')
        .update(editingNews)
        .eq('id', editingNews.id);
    } else {
      await supabase
        .from('news_articles')
        .insert([editingNews]);
    }

    setEditingNews(null);
    setIsAddingNews(false);
    loadNews();
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      loadNews();
    }
  };

  const handleMarkMessageRead = async (id: string) => {
    await supabase
      .from('contact_messages')
      .update({ status: 'read' })
      .eq('id', id);

    loadMessages();
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Portal</h1>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'news'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              News Management
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'messages'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact Messages
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-4 font-semibold ${
                activeTab === 'applications'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Applications
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'news' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">News Articles</h2>
                  <button
                    onClick={() => {
                      setIsAddingNews(true);
                      setEditingNews({
                        id: '',
                        title: '',
                        excerpt: '',
                        full_content: '',
                        category: '',
                        image_url: '',
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        featured: false,
                        published: true
                      });
                    }}
                    className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add News Article
                  </button>
                </div>

                {(editingNews || isAddingNews) && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold mb-4">
                      {isAddingNews ? 'Add New Article' : 'Edit Article'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={editingNews?.title || ''}
                          onChange={(e) => setEditingNews({ ...editingNews!, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={editingNews?.category || ''}
                          onChange={(e) => setEditingNews({ ...editingNews!, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
                        <textarea
                          value={editingNews?.excerpt || ''}
                          onChange={(e) => setEditingNews({ ...editingNews!, excerpt: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Content</label>
                        <textarea
                          value={editingNews?.full_content || ''}
                          onChange={(e) => setEditingNews({ ...editingNews!, full_content: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                          type="text"
                          value={editingNews?.image_url || ''}
                          onChange={(e) => setEditingNews({ ...editingNews!, image_url: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingNews?.featured || false}
                            onChange={(e) => setEditingNews({ ...editingNews!, featured: e.target.checked })}
                            className="mr-2"
                          />
                          Featured
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingNews?.published !== false}
                            onChange={(e) => setEditingNews({ ...editingNews!, published: e.target.checked })}
                            className="mr-2"
                          />
                          Published
                        </label>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveNews}
                          className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingNews(null);
                            setIsAddingNews(false);
                          }}
                          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : newsArticles.length === 0 ? (
                    <p className="text-gray-600">No news articles yet. Add your first article!</p>
                  ) : (
                    newsArticles.map((article) => (
                      <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{article.category} - {article.date}</p>
                            <p className="text-gray-700 mt-2">{article.excerpt}</p>
                            <div className="flex space-x-2 mt-2">
                              {article.featured && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">Featured</span>
                              )}
                              {article.published && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Published</span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => setEditingNews(article)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNews(article.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : messages.length === 0 ? (
                    <p className="text-gray-600">No messages yet.</p>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                              {message.status === 'new' && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">New</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {message.email} | {message.phone} | {message.subject}
                            </p>
                            <p className="text-gray-700 mt-2">{message.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(message.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {message.status === 'new' && (
                            <button
                              onClick={() => handleMarkMessageRead(message.id)}
                              className="ml-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Applications</h2>
                <p className="text-gray-600">Application management will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
