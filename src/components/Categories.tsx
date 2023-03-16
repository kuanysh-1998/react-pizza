import React from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, setCategoryId }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((item, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
