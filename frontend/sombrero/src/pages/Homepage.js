import React, { useState } from 'react';
import { Card, CardContent, IconButton, Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import Header from "./Header";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import furnitureImage from '../assets/furniture.jpg';

const topProducts = [
    { id: 1, imageURL: 'path/to/image1.jpg', productName: 'Top Product 1', productPrice: '$10' },
    { id: 2, imageURL: 'path/to/image2.jpg', productName: 'Top Product 2', productPrice: '$20' },
    { id: 3, imageURL: 'path/to/image3.jpg', productName: 'Top Product 3', productPrice: '$30' },
    { id: 4, imageURL: 'path/to/image4.jpg', productName: 'Top Product 4', productPrice: '$40' },
];

const newProducts = [
    { id: 1, imageURL: 'path/to/image5.jpg', productName: 'New Product 1', productPrice: '$15', description: 'Description for New Product 1' },
    { id: 2, imageURL: 'path/to/image6.jpg', productName: 'New Product 2', productPrice: '$25', description: 'Description for New Product 2' },
    { id: 3, imageURL: 'path/to/image7.jpg', productName: 'New Product 3', productPrice: '$35', description: 'Description for New Product 3' },
    { id: 4, imageURL: 'path/to/image8.jpg', productName: 'New Product 4', productPrice: '$45', description: 'Description for New Product 4' },
];

const GradientBox = styled(Box)({
  width: '100%',
  height: '450px',
  marginTop: '-15px',
  backgroundImage: `linear-gradient(45deg, rgba(200, 214, 229, 0.8), rgba(77, 133, 216, 0.6)), url(${furnitureImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GradientBox2 = styled(Box)({
  width: '100%',
  height: '250px',
  marginTop: '70px',
  backgroundImage: 'linear-gradient(45deg, rgba(200, 214, 229, 0.8), rgba(77, 133, 216, 0.6))',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
});

const Homepage = () => {
  const [currentProductIndexTop, setCurrentProductIndexTop] = useState(0);
  const [currentProductIndexNew, setCurrentProductIndexNew] = useState(0);

  const handleNextTop = () => {
    setCurrentProductIndexTop((prevIndex) => (prevIndex + 1) % topProducts.length);
  };

  const handlePrevTop = () => {
    setCurrentProductIndexTop((prevIndex) => (prevIndex - 1 + topProducts.length) % topProducts.length);
  };

  const handleNextNew = () => {
    setCurrentProductIndexNew((prevIndex) => (prevIndex + 1) % newProducts.length);
  };

  const handlePrevNew = () => {
    setCurrentProductIndexNew((prevIndex) => (prevIndex - 1 + newProducts.length) % newProducts.length);
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  return (
    <div>
      <Header />
      <GradientBox/>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh" sx={{marginTop: '20px'}}>
        <Typography variant="h5" gutterBottom>
          Top Products
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={handlePrevTop}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        {[0, 1, 2, 3].map((index) => {
          const productIndex = (currentProductIndexTop + index) % topProducts.length;
          const { id, imageURL, productName, productPrice } = topProducts[productIndex];
          return (
            <Link href={`/product/${id}`} key={productIndex} sx={{ textDecoration: 'none' }}>
              <Card sx={{ width: 195, padding: 2, textAlign: 'center', margin: '0 10px' }}>
                <CardContent>
                  <img src={imageURL} alt="Product" style={{ width: '100%' }} />
                  <Typography variant="h6" gutterBottom>{productName}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>{productPrice}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <IconButton onClick={handleNextTop}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh" sx={{marginTop: '30px'}}>
        <Typography variant="h5" gutterBottom>
          New Products
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={handlePrevNew}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        {[0, 1, 2].map((index) => {
          const productIndex = (currentProductIndexNew + index) % newProducts.length;
          const { id, imageURL, productName, productPrice, description } = newProducts[productIndex];
          return (
            <Link href={`/product/${id}`} key={productIndex} sx={{ textDecoration: 'none' }}>
              <Card sx={{ width: 310, display: 'flex', flexDirection: 'row', margin: '0 10px' }}>
                <img src={imageURL} alt="Product" style={{ width: '50%' }} />
                <CardContent style={{ width: '50%' }}>
                  <Typography variant="h6" gutterBottom>{productName}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>{description}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>{productPrice}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        <IconButton onClick={handleNextNew}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <GradientBox2>
        <Typography variant="h5"  gutterBottom>
          Explore more and join as a part of the community!
        </Typography>
        <Link 
         onClick={handleSignUpClick}
        sx={{ color: 'white', textDecoration: 'none', fontSize: 20 }}>Sign In</Link>
      </GradientBox2>
    </div>
  );
};

export default Homepage;
