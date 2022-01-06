import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ImageCard from './components/layout/ImageCard';

import NavigationHeader from './components/layout/Navigation';
import Search from './components/Search';

import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);

    fetch(
      `https://api.unsplash.com/photos/random/?query=${searchInput}&client_id=${UNSPLASH_KEY}`
    )
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
      </Container>
    </div>
  );
};

export default App;
