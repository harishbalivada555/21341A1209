import React, { useState ,useEffect} from 'react';
import "../../App.css";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const Filters = ({ 
    company, setCompany, category, setCategory, pages, setPages,
    minPrice, setMinPrice, maxPrice, setMaxPrice, order, setOrder, type, setType,setproducts
    
  }) => {
    const location=useLocation();
    const fetchProducts = async (categoryname, order, option, company,minPrice,maxPrice,pages) => {
        try  {   
    const orderDirection = order === 'asc' ? 'ascending' : order === 'desc' ? 'descending' : '';
        
          const response = await fetch(`http://localhost:5000/categories/${categoryname}/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order:orderDirection, option, company,minPrice,maxPrice,pages })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          if(data){
setproducts(data.products);
          }
          console.log('Fetched Products:', data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      
    const navigate=useNavigate();
    

    const updateURL = (category,company,pages,minPrice,maxPrice,order,type
    
      ) => {
        const queryParams = new URLSearchParams();
        queryParams.set("category", category);
        queryParams.set("company", company);
        queryParams.set("n", pages.toString());
        queryParams.set("min", minPrice.toString());
        queryParams.set("max", maxPrice.toString());
        queryParams.set("sortby", type);
        queryParams.set("order", order);
        navigate(`?${queryParams.toString()}`);

      };
     const searchhandler=()=>{
        fetchProducts(category, order, type, company,minPrice,maxPrice,pages)
      }

      useEffect(()=>{
        updateURL(category,company,pages,minPrice,maxPrice,order,type);
        fetchProducts(category, order, type, company,minPrice,maxPrice,pages)

      },[])

    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const categories = [
        "Phone", "Computer", "TV", "Earphone", "Tablet",
        "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive",
        "Remote", "Speaker", "Headset", "Laptop", "PC"
    ];
    const sortItems = ["asc", "desc"];
    const sortTypes = ["price", "rating", "discount"];

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (
        <div className="filters">
            <div className="header">
                <Typography variant="h4" component="div" gutterBottom>
                    Discover unbeatable deals and exclusive products tailored just for you.<br />
                    Shop smarter, live better with our one-stop online shopping experience!
                </Typography>
            </div>
            <div className="filters_wrapper">
                <Box sx={{ minWidth: 200, mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="company-select-label">Company</InputLabel>
                        <Select
                            labelId="company-select-label"
                            id="company-select"
                            value={company}
                            label="Company"
                            onChange={handleChange(setCompany)}
                        >
                            {companies.map((company, index) => (
                                <MenuItem key={index} value={company}>{company}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 200, mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={handleChange(setCategory)}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-pages"
                        label="No of items per page"
                        variant="outlined"
                        value={pages}
                        onChange={handleChange(setPages)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-min-price"
                        label="Min Price"
                        variant="outlined"
                        value={minPrice}
                        onChange={handleChange(setMinPrice)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-max-price"
                        label="Max Price"
                        variant="outlined"
                        value={maxPrice}
                        onChange={handleChange(setMaxPrice)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ minWidth: 200, mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="sort-order-label">Sort Order</InputLabel>
                        <Select
                            labelId="sort-order-label"
                            id="sort-order"
                            value={order}
                            label="Sort Order"
                            onChange={handleChange(setOrder)}
                        >
                            {sortItems.map((order, index) => (
                                <MenuItem key={index} value={order}>{order}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 200, mb: 2 }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="sort-type-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-type-label"
                            id="sort-type"
                            value={type}
                            label="Sort by"
                            onChange={handleChange(setType)}
                        >
                            {sortTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <button onClick={()=>{searchhandler();        updateURL(category,company,pages,minPrice,maxPrice,order,type);
;}} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
    Search
</button>

        </div>
    );
};

export default Filters;
