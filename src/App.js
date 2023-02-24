import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>

          <h2 className="content__title">Все пиццы</h2>

          <div className="content__items">
            <PizzaBlock title='Mexican' price={499} />
            <PizzaBlock title='Papperoni' price='700' />
            <PizzaBlock title='Italian' price='899' />
            <PizzaBlock title='Kazakh' price='1099'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
