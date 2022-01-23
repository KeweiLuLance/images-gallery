import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import ImageCard from './components/layout/ImageCard';
import axios from 'axios';
import NavigationHeader from './components/layout/Navigation';
import Search from './components/Search';

import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Welcome from './components/Welcome';

import Spinner from './components/utils/Spinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      toast.success('Saved images downloaded');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch(`${API_URL}/new-image?query=${searchInput}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('adding found image to the state');
    //     setImages([{ ...data, title: searchInput }, ...images]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    // });
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${searchInput}`);
      setImages([{ ...res.data, title: searchInput }, ...images]);
      toast.info(`New Image ${searchInput.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setSearchInput('');
  };

  const handleDeleteImage = async (id) => {
    // setImages(images.filter((image) => image.id !== id));
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <NavigationHeader title="Image Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSubmit={handleSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      key={i}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
