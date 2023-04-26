class Category {
  constructor(name, userName) {
    this.name = name;
    this.userName = userName;
  }
}

class CategoriesManager {
  constructor() {
    if (!localStorage.getItem("AllCategories")) {
      localStorage.setItem("AllCategories", JSON.stringify(this.allCategories));
    } else {
      this.allCategories = JSON.parse(localStorage.getItem("AllCategories"));
    }
  }

  allCategories = [
    { name: "All" },
    { name: "React JS" },
    { name: "IT Talents" },
    { name: "Javascript" },
    { name: "Music" },
    { name: "Education" },
    { name: "Movie" },
    { name: "Live" },
    { name: "Nature" },
    { name: "Cars" },
    { name: "Bulgaria" },
    { name: "Programming" },
    { name: "Happiness" },
    { name: "Interesting" },
    { name: "Universe" },
  ];

  addCategory = (name, username) => {
    let existingCategory = this.allCategories.find((category) => category.name === name || category.name === "shorts break");

    if (this.allCategories.length < 20 && !existingCategory) {
      this.allCategories.splice(5, 0, new Category(name, username));
      localStorage.setItem("AllCategories", JSON.stringify(this.allCategories));
    } else if (!existingCategory) {
      this.allCategories.splice(6, 1, new Category(name, username));
      localStorage.setItem("AllCategories", JSON.stringify(this.allCategories));
    }
  };
}

const categoriesManager = new CategoriesManager();

export default categoriesManager;
