import {useEffect, useState} from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import imagesApi from './services/images-serviceAPI'
import style from './App.module.css'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({});
  //const [largeImageId, setLargeImageId] = useState(null);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query]);

    useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const onChangeQuery = query => {
    setQuery(query);
    setImages([]);
    setPageNumber(1);
    setError(null)

}

const fetchImages = () => {
  const options = {
    query,
    pageNumber,
  };

 setIsLoading(true)

  imagesApi
    .fetchImages(options)
    .then(newImages => {
      setImages([...images, ...newImages])
      setPageNumber(pageNumber + 1);
      })
    
  .catch(error => setError(error))
  .finally(() => setIsLoading(false));

};
  
 const toggleModal = () => {
  setShowModal(!showModal);
};

const openBigPic = largeImage => {
    setLargeImage( largeImage );
    toggleModal();
  };


  
  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
  return (
  <div className = {style.App}>
    <Searchbar onSubmit = {onChangeQuery}></Searchbar>
      <ImageGallery
        onClick={openBigPic}
        images={images}>
        
      </ImageGallery>
      
      {isLoading && <Loader/>}
      {shouldRenderLoadMoreButton && (<Button onClick={fetchImages}></Button>)}
      {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage.largeImageURL} alt={largeImage.tags} />
          </Modal>
        )}
  </div>

  )

}
