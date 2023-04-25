import React, { useRef } from "react";
import categoriesManager from "../../models/CategoriesManager";
import styles from "./Categories.module.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const allCategories = JSON.parse(localStorage.getItem("AllCategories") || categoriesManager.allCategories);
  const userCategories = allCategories.filter((category) => category.username === loggedUser?.username || category.username === undefined);

  const containerRef = useRef(null);

  const handleScroll = (delta) => {
    const container = containerRef.current;
    container.scrollLeft += delta;
  };

  return (
    <div className={styles.categories_container}>
      <div className={styles.scroll_button_container_left}>
        <button className={styles.scroll_button} onClick={() => handleScroll(-100)} style={{ left: 0 }}>
          {<AiOutlineArrowLeft />}
        </button>
      </div>
      <div className={styles.categories_scroll} ref={containerRef}>
        {userCategories.map((category) => (
          <button
            key={category.name}
            className={`${styles.category_btn} ${selectedCategory === category.name ? styles.selected : ""}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <span className={styles.category_name}>{category.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.scroll_button_container_right}>
        <button className={styles.scroll_button} onClick={() => handleScroll(100)} style={{ right: 0 }}>
          {<AiOutlineArrowRight />}
        </button>
      </div>
    </div>
  );
};

export default Categories;
