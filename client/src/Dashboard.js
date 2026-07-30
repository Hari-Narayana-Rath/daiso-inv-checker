
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, List, ListItem, ListItemText, Box, Divider, Grid, Card, CardMedia, CardContent, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import db from './db.json';

const Dashboard = ({ user, onLogout }) => {
  const [jan, setJan] = useState('');
  const [isJanValid, setIsJanValid] = useState(false);
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [cancellationBlock, setCancellationBlock] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const product = db.products.find(p => p.jan === jan);
    setIsJanValid(!!product);
  }, [jan]);

  useEffect(() => {
    const shuffled = db.products.sort(() => 0.5 - Math.random());
    const productsWithLikes = shuffled.slice(0, 10).map(p => ({ ...p, likes: Math.floor(Math.random() * 1000) }));
    setRandomProducts(productsWithLikes);
  }, []);

  const handleSearch = () => {
    const stores = [
      { id: 1, name: 'Daiso Osaka', address: '123 Main St, Osaka', stock: 'In Stock' },
      { id: 2, name: 'Daiso Kyoto', address: '456 Oak Ave, Kyoto', stock: 'Low Stock' },
    ];
    setSearchResults(stores);
  };

  const handleReservation = (store) => {
    if (cancellationBlock && new Date() < new Date(cancellationBlock)) {
      alert(`You cannot make a new reservation until ${new Date(cancellationBlock).toLocaleTimeString()}`);
      return;
    }
    const reservationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const reservationTime = new Date();
    reservationTime.setMinutes(reservationTime.getMinutes() + 60);
    setReservation({ code: reservationCode, store, time: reservationTime });
  };

  const cancelReservation = () => {
    setReservation(null);
    const blockUntil = new Date();
    blockUntil.setMinutes(blockUntil.getMinutes() + 90);
    setCancellationBlock(blockUntil);
  };

  return (
    <Paper elevation={3} style={{ padding: '32px', borderRadius: '12px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" style={{ color: '#e6007e', fontWeight: 'bold' }}>
          Welcome, {user.name}!
        </Typography>
        <Button onClick={onLogout} variant="outlined" color="primary">
          Logout
        </Button>
      </Box>

      {reservation ? (
        <Box textAlign="center">
          <Typography variant="h5" style={{ marginBottom: '16px' }}>Your Reservation</Typography>
          <Paper elevation={1} style={{ padding: '24px', display: 'inline-block' }}>
            <Typography variant="h6">Store: {reservation.store.name}</Typography>
            <Typography style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0', color: '#e6007e' }}>
              {reservation.code}
            </Typography>
            <Typography>Valid Until: {reservation.time.toLocaleTimeString()}</Typography>
          </Paper>
          <Button onClick={cancelReservation} color="secondary" variant="contained" style={{ marginTop: '24px' }}>
            Cancel Reservation
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" style={{ marginBottom: '16px' }}>Find a Product</Typography>
          <TextField
            label="Enter JAN Code"
            fullWidth
            margin="normal"
            variant="filled"
            value={jan}
            onChange={(e) => setJan(e.target.value)}
            helperText={jan && !isJanValid ? "Invalid JAN code" : ""}
            error={jan && !isJanValid}
          />
          {isJanValid && (
            <>
              <TextField
                label="Enter City or Area"
                fullWidth
                margin="normal"
                variant="filled"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '16px', padding: '12px', fontSize: '16px' }}>
                Search for Products
              </Button>
            </>
          )}

          {searchResults.length > 0 && (
            <List style={{ marginTop: '24px' }}>
              <Divider />
              {searchResults.map((store) => (
                <ListItem key={store.id} divider>
                  <ListItemText
                    primary={store.name}
                    secondary={`${store.address} - Stock: ${store.stock}`}
                  />
                  {store.stock === 'In Stock' && (
                    <Button onClick={() => handleReservation(store)} variant="contained">
                      Reserve
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
      <Divider style={{ margin: '32px 0' }} />
      <Typography variant="h5" style={{ marginBottom: '24px' }}>Popular Products</Typography>
      <Grid container spacing={4}>
        {randomProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={product.id}>
            <Card sx={{ '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="140"
                image={`/images/${index + 1}.jpg`}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {product.likes}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Dashboard;