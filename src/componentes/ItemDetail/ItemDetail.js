import React, { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import estilosDetail from './ItemDetail.module.css';
import './itemDetail.css';
import { FormLabel, Radio, RadioGroup, Box, radioClasses, useTheme } from '@mui/material';
import styled from '@emotion/styled';

const ItemDetail = ({ item }) => {


  const useStyles = styled((theme) => ({
    radioBox: {
      position: 'relative',
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '--joy-focus-outlineOffset': '4px',
      [`& .Mui-checked`]: {
        [`& .MuiFormControlLabel-label`]: {
          fontWeight: 'bold',
        },
        [`& .MuiIconButton-root`]: {
          '--variant-borderWidth': '2px',
          borderColor: theme.palette.text.secondary,
        },
      },
      [`& .Mui-focusVisible`]: {
        outlineWidth: '2px',
      },
    },
  }));

  const [sizeSelect, setSizeSelect] = useState('')

  const handleChangeSize = (size) => {
    console.log("prod index", size)
     setSizeSelect(size)
  }

  const [count, setCount] = useState(1);
  const classes = useStyles();
  const theme = useTheme();

  const incrementar = () => {
    setCount(count + 1);
  };

  const disminuir = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-detail">
      <img src={item.imagen} alt={item.nombre} />

      <div className="detail-content">
        <h1>{item.nombre}</h1>
        <h2>${item.precio}</h2>
        <p>Descripción del producto</p>
        <h5>Talles disponibles: {item.talle}</h5>
        <FormLabel id="product-size-attribute">Size</FormLabel>
        <RadioGroup aria-labelledby="product-size-attribute" defaultValue="M" sx={{ gap: 2, mb: 2, flexDirection: 'row' }}>
          {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
            <Box key={size} className={classes.radioBox}>
              <Radio
                color="success"
                size="medium"
                overlay="true"
                value={size}
                label={size}
                onChange={() => handleChangeSize(size)} // Aquí envuelve la llamada a la función en una función anónima
              />
              {size}
            </Box>
          ))}
        </RadioGroup>
        <div className="contador">
          <button onClick={incrementar}>+</button>
          <p> {count}</p>
          <button onClick={disminuir}>-</button>
        </div>
        <ItemCount idProd={item.id} item={item} quantity={count} size={sizeSelect} />
      </div>
    </div>
  );
};

export default ItemDetail;