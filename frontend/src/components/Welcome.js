import { Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <div className="p-4 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1>Images Gallery</h1>
        <p>
          This is simple application that retrieves photos using Unsplash API.
          In order to start enter any search term in the input field.
        </p>
        <Button variant="primary" href="https://unsplash.com" target="_bank">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
