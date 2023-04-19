import React from "react";
import categoriesManager from "../../models/CategoriesManager";
import styles from "./Categories.module.scss";

const Categories = ({ selectedCategory, setSelectedCategory }) => {

    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allCategories = JSON.parse(localStorage.getItem('AllCategories') || categoriesManager.allCategories);
    const userCategories = allCategories.filter(category => category.username === loggedUser?.username || category.username === undefined);
    return (
        <div className={styles.categories_container}>
            {userCategories.map((category) => (
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
