"use client"
import React, { useState } from 'react';

const BlogCreation = () => {
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        author: '',
        category: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prevBlog => ({
            ...prevBlog,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/blogs/createBlog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(blog)
            });

            if (!response.ok) {
                throw new Error('Blog yayınlanırken bir hata oluştu');
            }

            alert('Blog başarıyla yayınlandı!');
            setBlog({ title: '', content: '', author: '', category: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Teknoloji', 'Seyahat', 'Yemek', 'Spor', 'Sanat', 'Bilim'];

    return (
        <div className="container mx-auto mt-8 px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto" style={{
                background: "#CE671D",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)"
            }}>
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Create New Blog</h1>

                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 text-lg font-bold mb-3">Başlık</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                        style={{
                            background: "#D9D9D9"
                        }}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="category" className="block text-gray-700 text-lg font-bold mb-3">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        value={blog.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                        required
                        style={{
                            background: "#D9D9D9"
                        }}
                    >
                        <option value="">Kategori seçin</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-700 text-lg font-bold mb-3">İçerik</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline h-64"
                        required
                        style={{
                            background: "#D9D9D9"
                        }}
                    />
                </div>

                {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out text-lg"
                        style={{
                            background: "#8B626C"
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Yayınlanıyor...' : 'Yayınla'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogCreation;