import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/ListPage/Main";
import Header from "./components/Header";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import EditPage from "./components/EditPage/Edit";
import DetailPage from "./components/DetailPage/Detail";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <PageContainer>
                        <Header />
                        <MainPage />
                        <GlobalStyle />
                    </PageContainer>
                </Route>
                <Route exact path="/detail/:id">
                    <PageContainer>
                        <Header />
                        <DetailPage />
                    </PageContainer>
                </Route>
                <Route exact path="/edit/">
                    <EditPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
