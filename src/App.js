import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Albums from "./Pages/Albums"
import Photos from "./Pages/Photos"
import { ChakraProvider } from "@chakra-ui/react"


function App() {
    return (
        <ChakraProvider>
            <Router>
                <Switch>
                    <Redirect path="/" to="/albums" exact/>
                    <Route path="/albums" component={Albums} />
                    <Route path="/photos/:id" component={Photos} />
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
