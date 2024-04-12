import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductList = ({ products, onDelete }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center', marginTop: '20px'}}>
            {products.map(product => (
                <Card key={product.id} style={{ width: '300px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography color="text.secondary">
                            Price: ${product.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => onDelete(product.id)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default ProductList;
