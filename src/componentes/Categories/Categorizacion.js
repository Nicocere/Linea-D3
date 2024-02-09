
import * as React from 'react';
import { Breadcrumbs, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { IoShirt } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavLink, useParams } from 'react-router-dom';
import { useState } from 'react';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Categorization() {

  const { categoryName, searchParam, ocasionName } = useParams()
  const [categoryroute, setCategoryRoute] = useState();

  React.useEffect(() => {
    if (categoryName) {
      setCategoryRoute(categoryName)
    } else if (searchParam) {
      setCategoryRoute(searchParam)
    } else if (ocasionName) {
      setCategoryRoute(ocasionName)
    } else {
      setCategoryRoute("Productos")
    }
  }, [categoryName, ocasionName, searchParam]);


  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    color: 'black',
    fontWeight: 700,
    backgroundColor: 'transparent',
    fontSize: isSmallScreen ? '8px' : '12px',
    height: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'grey',

    },
  }));


  return (
    <div role="presentation" onClick={handleClick}>
      <CustomBreadcrumbs separator={<NavigateNextIcon sx={{
        mr: 0, color: 'black', '&:hover': {
          color: 'grey',
        },
      }} fontSize="small" />}>

        <NavLink className="categories-navigation" to="/" >
          <Typography underline='none'
            sx={{
              display: 'flex', alignItems: 'center', color: 'black', '&:hover': {
                color: 'grey',
              },
            }}

          >
            <HomeIcon sx={{ mr: 0 }} fontSize="15px" />

            Inicio
          </Typography>
        </NavLink>
        <Typography
          sx={{
            display: 'flex', alignItems: 'center', color: red[800], '&:hover': {
              color: red[900],

            },
          }}

        >
          <IoShirt style={{ margin: '2px' }} fontSize="inherit" />
          {categoryroute}
        </Typography>

      </CustomBreadcrumbs>
    </div>
  );
}



