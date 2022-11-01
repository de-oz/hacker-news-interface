import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import NewsPage from "./components/NewsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:id" component={NewsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
