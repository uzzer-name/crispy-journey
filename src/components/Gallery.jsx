import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/photosApi';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos(page, 4);
      setPhotos(data);
      setLoading(false);
    };

    loadPhotos();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="gallery-container">
      <h1>Фотогалерея</h1>
      
      {loading ? (
        <div className="loading">Завантаження...</div>
      ) : (
        <>
          <div className="photos-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <img src={photo.download_url} alt={`Фото від ${photo.author}`} />
                <p className="author">Автор: {photo.author}</p>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button 
              onClick={handlePrevPage} 
              disabled={page <= 1}
              className="pagination-button"
            >
              Попередні
            </button>
            <span className="page-indicator">Сторінка {page}</span>
            <button 
              onClick={handleNextPage}
              className="pagination-button"
            >
              Наступні
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery; 