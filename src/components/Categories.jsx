import React from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = () => {
  return (
    <div className="categories">
      <ul>
        {
            categories.map((item, i) => (
                <li key={i} >{item}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default Categories;
