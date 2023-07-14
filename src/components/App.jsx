import React, { useEffect, useState } from 'react';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spiner from './loader/Loader';
import { fetchPosts } from 'service/api';
import LoadMoreButton from './button/Button';
import Modal from './modal/Modal';
export function App () {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0)
  const [error] = useState(null);


  
  

  const handleFormSubmit = data => {
    if (searchQuery === data) {
      return;
    }
    resetState();
    setSearchQuery(data)
  };

  const resetState = () => {
    setSearchQuery(null);
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
    
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl)
    setAlt(tags)
  };

  const loadMore = () => {
    setPage(page+1)
  };

  const closeModal = () => {
    setSelectedImage(null)
  };
  useEffect(() => {
    if (!searchQuery) return 
    const FetchData = async () => {
      setStatus('pending');
          try {
            const imageData = await fetchPosts(searchQuery, page);
            setTotalHits(imageData.total)
            const imagesHits = imageData.hits;
            if (!imagesHits.length) {
              toast.warning(
                'No results were found for your search, please try something else.',
                { transition: Zoom, position: 'top-center' }
              );
            }
            setImages(prevImg => [...prevImg, ...imagesHits]);
            setStatus('resolved');
          } catch (error) {
            toast.error(`Sorry something went wrong. ${error.message}`);
            setStatus('rejected');
          }
    }
     FetchData()
  },[page,searchQuery])
    
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={handleSelectedImage}
          />
        )}
        {status === 'pending' && <Spiner />}
        {images.length > 0 && images.length !== totalHits && (
          <LoadMoreButton onClick={loadMore} />
        )}
        {selectedImage && (
          <Modal
            handleBackdropClick={handleBackdropClick}
            selectedImage={selectedImage}
            tags={alt}
            onClose={closeModal}
          />
        )}
      </>
    );
  }
