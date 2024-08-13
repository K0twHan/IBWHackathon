"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogPost from '../../../components/Blog.jsx';

const ArticleComponent = ({ articles, sortOption, onArticleClick }) => {
    const sortArticles = (articles, sortOption) => {
        return [...articles].sort((a, b) => {
            if (sortOption === 'date') return Number(new Date(b.created_date)) - Number(new Date(a.created_date));
            if (sortOption === 'author') return a.author.localeCompare(b.author);
            if (sortOption === 'category') return a.category.localeCompare(b.category);
            return 0;
        });
    };

    const sortedArticles = sortArticles(articles, sortOption);

    return (
        <div className="w-1/2 px-4">
            {sortedArticles.map((article, index) => (
                <div key={index} onClick={() => onArticleClick(article.id)}>
                    <article className="bg-white-200 p-4 mb-4 cursor-pointer" style={{ borderRadius: "15px", boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.5)" }}>
                        <div className="flex items-center mb-2">
                            <span>{article.author}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <div className="flex space-x-4 text-sm text-gray-600">
                            <span className="mr-2">{new Date(article.created_date).toLocaleDateString()}</span>
                            <span className="mr-2">{article.category}</span>
                            <span className="mr-2">beğeni : {article._count.likes}</span>
                            <span>yorum : {article._count.comments}</span>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
};

const HomePage = () => {
    const [sortOption, setSortOption] = useState('date');
    const [articles, setArticles] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [topLikedBlogs, setTopLikedBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/blogs/fetchBlog', { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }  
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const [blogs, authors] = data;
                const articlesWithAuthors = blogs.map(blog => {
                    const author = authors.find(a => a.id === blog.authorId);
                    return {
                        ...blog,
                        author: author ? `${author.name} ${author.surname || ''}` : 'Bilinmeyen Yazar'
                    };
                });
                setArticles(articlesWithAuthors);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        const fetchTopLikedBlogs = async () => {
            try {
                const response = await fetch('/api/blogs/fetchTopLiked', { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopLikedBlogs(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchArticles();
        fetchTopLikedBlogs();

        const blogId = searchParams.get('blogId');
        if (blogId) {
            setSelectedBlogId(Number(blogId));
        }
    }, [searchParams]);

    const handleSortChange = (event) => setSortOption(event.target.value);
    const handleInputChange = (e) => setSearchTerm(e.target.value);
    const handleArticleClick = (blogId) => {
        setSelectedBlogId(blogId);
        router.push(`?blogId=${blogId}`, undefined);
    };
    const handleBackClick = () => {
        setSelectedBlogId(null);
        router.push('/', undefined);
    };

    if (selectedBlogId) return <BlogPost blogId={selectedBlogId} />;
    else return null;

    return (
        <div className="container mx-auto">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded-md"
                style={{
                    color: 'black',
                    marginRight: '100px',
                    borderWidth: '1px',
                    borderColor: 'black',
                    borderStyle: 'solid',
                    width: '300px'
                }}
                onChange={handleInputChange}
            />
            <main className="flex mt-8">

                <aside className="w-1/4 pr-4">
                    <h3 className="mb-2 text font-semibold text-black">Sort:</h3>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="date">Date</option>
                        <option value="author">Author</option>
                        <option value="category">Category</option>
                    </select>
                </aside>

                <ArticleComponent
                    articles={articles.filter(article => article.title && article.title.includes(searchTerm))}
                    sortOption={sortOption}
                    onArticleClick={handleArticleClick}
                />

                <aside className="w-1/4 pl-4">
                    <div className="bg-gray-200 p-4">
                        <h3 className="text-lg font-bold mb-2">Best of the Week</h3>
                        <ul>
                            {topLikedBlogs.map((blog) => (
                                <li key={blog.id} className="mb-2 text-black flex items-start">
                                    <span className="mr-2 mt-1">&#8226;</span>
                                    <div>
                                        <a href={`?blogId=${blog.id}`} className="text-black hover:underline">
                                            {blog.title}
                                        </a>
                                        <span className="ml-2 text-sm text-gray-600">
                                            ({blog._count.likes} likes)
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default HomePage;
