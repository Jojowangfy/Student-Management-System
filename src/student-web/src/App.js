import React from 'react';
import {BrowserRouter, Route, Switch, Link, Routes} from 'react-router-dom';
import System from "./System";
import Register from "./Register";
import Login from "./LoginPage";


const system = () => <div><System/></div>;


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/students" element={<System/>}/>
                {/*<Route path="users" element={<Users />}>*/}
                {/*    <Route path="me" element={<OwnUserProfile />} />*/}
                {/*    <Route path=":id" element={<UserProfile />} />*/}
                {/*</Route>*/}
            </Routes>
        </BrowserRouter>

    );
};

export default App;
