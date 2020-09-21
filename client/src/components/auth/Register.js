import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post('http://localhost:3001/users/register', newUser);

            const loginResponse = await axios.post('http://localhost:3001/users/login', {email, password});
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
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for='registerEmail'>Email</Label>
                    <Input id='registerEmail' type='email' name='email' onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='registerPassword'>Password</Label>
                    <Input id='registerPassword' type='password' name='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input id='reenterRegisterPassword' type='password' placeholder='Verify Password' onChange={e => setPasswordCheck(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='registerDisplayName' >Display Name</Label>
                    <Input id='registerDisplayName' type='text' onChange={e => setDisplayName(e.target.value)} />
                </FormGroup>
                <Button color='success'>Submit</Button>
            </Form>
        </div>
    )
}
