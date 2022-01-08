import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ImageCard from './components/layout/ImageCard';

import NavigationHeader from './components/layout/Navigation';
import Search from './components/Search';

import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);

    fetch(`${API_URL}/new-image?query=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: searchInput }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });

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
