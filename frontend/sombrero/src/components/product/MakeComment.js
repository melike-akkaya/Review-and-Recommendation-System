import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function MakeComment() {
    const [value, setValue] = React.useState(0);
    const [text, setText] = React.useState(" ")


    //const handleComment = () 

  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Box
        sx={{
            '& > legend': { mt: 2 },
        }}
        >
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />
        </Box>
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '55ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
}