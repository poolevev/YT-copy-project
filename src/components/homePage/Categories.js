import React from 'react';
import { Stack } from '@mui/material';
import { categories } from '../../utils/categoriesList'
import "./categories.scss"
const Categories = ({ selectedCategory, setSelectedCategory }) => {

    let selected = selectedCategory;
    return (
        <Stack direction="row"
            sx={{
                gap: "5px",
                overflowX: 'auto',
                width: { sx: "auto", md: '95%' }
            }}>

            {categories.map(category => (
                <button key={category.name}
                    className="category-btn"
                    style={{ background: category.name === selected ? "black" : "#c2c0c0" }}
                    onClick={() => setSelectedCategory(category.name)}
                >
                    <span
                        style={{ color: category.name === selected ? "white" : "black" }}
                    >{category.name}</span>
                </button>
            ))}

        </Stack>
    )
}

export default Categories