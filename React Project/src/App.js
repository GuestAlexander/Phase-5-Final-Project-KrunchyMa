import React, {useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, Link, useLocation} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import AddTips from "./components/AddTips";
import AllTips from "./components/getAllTips";
import TodoList from "./components/TodoList";

import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
import {Navigate, useNavigate} from 'react-router-dom';

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import AuthVerify from "./common/AuthVerify";
import MyTipsList from "./components/myTips";

const App = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let location = useLocation();

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());

    }, [dispatch]);

    useEffect(() => {

        if (currentUser) {
        } else {
            logOut();
            navigate("/login")
        }

        EventBus.on("logout", () => {
        });

        return () => {
            EventBus.remove("logout");
        };

    }, [currentUser, logOut]);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    KrunchyMom.com
                </Link>
                {
                    currentUser ? <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/showtips"} className="nav-link">
                               All Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/mytips"} className="nav-link">
                                My Posts
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add a new Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/todo"} className="nav-link">
                               To do list
                            </Link>
                        </li>

                    </div> : ""
                }
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/showtips"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>

                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/mytips" element={<MyTipsList/>}/>

                    <Route path="/showtips" element={<AllTips/>}/>
                    <Route path="/add" element={<AddTips/>}/>
                    <Route path="/update/:id" element={<AddTips/>}/>
                    <Route path="/todo" element={<TodoList/>}/>


                </Routes>
            </div>

            <AuthVerify logOut={logOut}/>
        </div>
    );
};

export default App;
