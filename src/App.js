import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuTop from "./components/MenuTop";

//Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NewMovies from "./pages/NewMovies";
import PopularMovies from "./pages/PopularMovies";
import SearchMovies from "./pages/SearchMovies";
import Error404 from "./pages/Error404";

export default function App() {
  const { Header, Content } = Layout;

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop />
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovies />
            </Route>
            <Route path="/popular-movies" exact={true}>
              <PopularMovies />
            </Route>
            <Route path="/search-movies" exact={true}>
              <SearchMovies />
            </Route>
            <Route path="*" exact={true}>
              <Error404 />
            </Route>
            <Route path="/movies/:id" exact={true}>
              <Movies />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}
