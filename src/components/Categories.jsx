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
  const [active, setActive] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            onClick={() => setActive(i)}
            className={active === i ? "active" : ""}
            key={i}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
