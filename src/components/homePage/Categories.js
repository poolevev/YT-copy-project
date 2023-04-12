import React from "react";
import { categories } from "../../utils/categoriesList";
import styles from "./Categories.module.scss";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
const selected = selectedCategory;

return (
<div
className={styles.categories_container}
style={{ width: "95%", overflowX: "auto", display: "flex" }}
>
{categories.map((category) => (
<button
key={category.name}
className={ styles.category_btn }
onClick={() => setSelectedCategory(category.name)}
>
<span
className={ styles.category_name }
>
{category.name}
</span>
</button>
))}
</div>
);
};

export default Categories;