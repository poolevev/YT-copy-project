import React from "react";
import { categories } from "../../utils/categoriesList";
import styles from "./Categories.module.scss";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div className={styles.categories_container}>
            {categories.map((category) => (
                <button
                    key={category.name}
                    className={`${styles.category_btn} ${selectedCategory === category.name ? styles.selected : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                >
                    <span className={styles.category_name}>
                        {category.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default Categories;
