import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ImageCard from './components/layout/ImageCard';
import axios from 'axios';
import NavigationHeader from './components/layout/Navigation';
import Search from './components/Search';

import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
    setSearchInput('');
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <NavigationHeader title="Image Gallery" />
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
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
