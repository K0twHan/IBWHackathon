"use client"
import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';

const BlogPost = ({ blogId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('/api/blogs/blogDetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ blogId })
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setPost(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [blogId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto mt-8">
            <BackButton />
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default BlogPost;
