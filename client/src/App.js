import React, {Fragment, useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import UserContext from './context/UserContext';
import axios from 'axios';
import {Container} from 'reactstrap';
import AuthOptions from './components/auth/AuthOptions'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if(token === null ) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const tokenResponse = await axios.post('http://localhost:3001/users/tokenIsValid', null, {headers: {'x-auth-token': token}});
            if(tokenResponse.data) {
                const userResponse = await axios.get('http://localhost:3001/users/', {headers: {'x-auth-token': token}});
                setUserData({
                    token,
                    user: userResponse.data
                });
            }
        };
        

        checkLoggedIn();
    }, [])

    return (
        <Fragment >
            <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                    <div className='App'>
                        <AuthOptions />
                        <Container>
                            <Route exact path='/' component={Home} />
                            <Route path='/login' component={Login} />
                            <Route path='/register' component={Register} />
                        </Container>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </Fragment>
    )
}
