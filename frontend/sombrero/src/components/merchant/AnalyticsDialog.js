import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { getVisitCount } from '../../services/ProductService';
import { getWishlistCount } from '../../services/WishlistService';
import { useEffect, useState } from 'react';
import React from 'react';

const AnalyticsDialog = ({open,setOpen,products}) => {
    const [wishlistCounts, setWishlistCounts] = useState({});
    const [visitCounts, setVisitCounts] = useState({});

    useEffect(() => {
        const fetchWishlistCounts = async () => {
            const localWishListCounts = {};
            const localVisitCounts = {};
            await Promise.all(
                products.map(async (product) => {
                    if (product && product.productId) { // Check if product and product.id are defined
                        try {
                            const wishCount = await getWishlistCount(product.productId);
                            const visitCount = await getVisitCount(product.productId);
                            localWishListCounts[product.productId] = wishCount;
                            localVisitCounts[product.productId] = visitCount;
                        } catch (error) {
                            localWishListCounts[product.productId] = 'N/A';
                            localVisitCounts[product.productId] = 'N/A';
                        }
                    }
                })
            );
            setWishlistCounts(localWishListCounts);
            setVisitCounts(localVisitCounts);

        };

        if (products.length > 0) {
            fetchWishlistCounts();
        }
    }, [products]);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Analytics</DialogTitle>
                <DialogContent dividers style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {products.map((product) => (
                    <Card key={product.productId} style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <div style={{ display: "flex", alignItems: "center" }}>
                        {product.image ? (
                            <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="rounded-md object-cover"
                            style={{
                                height: "80px",
                                width: "80px",
                                marginRight: "20px",
                            }}
                            />
                        ) : (
                            <ShoppingBasketIcon />
                        )}

                        <Typography variant="h5" component="div">
                            {product.name}
                        </Typography>
                        </div>
                        <Typography color="text.secondary">
                        Price: ${product.price}
                        </Typography>
                        <Typography color="text.secondary">
                        WishListCount: {wishlistCounts[product.productId]}
                        </Typography>
                        <Typography color="text.secondary">
                        VisitCount: {visitCounts[product.productId]}
                        </Typography>
                    </CardContent>
                    </Card>
                    ))}
                    <Grid item xs={12} align="right">
                    <Button onClick={handleClose}>Cancel</Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AnalyticsDialog;