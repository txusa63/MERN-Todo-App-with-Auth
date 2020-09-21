import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginResponse = await axios.post('http://localhost:3001/users/login', loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem('auth-token', loginResponse.data.token);
            history.push('/');
        }

        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for='loginEmail' >Email</Label>
                    <Input id='loginEmail' type='email' name='email' onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='loginPassword' >Password</Label>
                    <Input id='loginPassword' type='password' name='password' onChange={e => setPassword(e.target.value)} />
                </FormGroup>

                <Button color='success'>Login</Button>
            </Form>
        </div>
    )
}
