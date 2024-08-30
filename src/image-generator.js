import React, { useState } from 'react';
import axios from 'axios';
import './ImageGenerator.css';

const ImageGenerator = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: { query: query, per_page: 12 },
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
                }
            });
            setImages(response.data.results);
        } catch (error) {
            console.error("Error fetching images:", error);
            alert("Failed to fetch images: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-generator-container">
            <h1 className="title">Image Searcher/Generator</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter a keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={searchImages} disabled={loading} className="search-button">
                    {loading ? "Searching..." : "Search Images"}
                </button>
            </div>
            <div className="image-grid">
                {images.length > 0 && images.map(image => (
                    <div key={image.id} className="image-item">
                        <img src={image.urls.small} alt={image.description || 'Unsplash image'} className="image" />
                    </div>
                ))}
            </div>
            <div>
                <p style={{float: 'left',}}>
                    By <span style={{fontStyle: 'italic', fontSize: '20px'}}>J.N.A</span>
                </p>
            </div>
        </div>
    );
};

export default ImageGenerator;
