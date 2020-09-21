import React, {useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {Link} from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/login');
    };

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-5' >
                <Container>
                    <NavbarBrand tag={Link} to={'/'} >
                        <h1 className='title'>MERN TODO with Auth</h1>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar >
                        <Nav className='ml-auto' navbar >
                            {
                                userData.user ? (
                                    <div>
                                        <NavItem>
                                            <span className='navbar-text mr-3' >
                                                <strong>Welcome {userData.user['displayName']}</strong>
                                            </span>
                                        </NavItem>
                                        <NavItem>
                                            <Button color='success' onClick={logout} >Logout</Button>
                                        </NavItem>
                                    </div>
                                ): (
                                    <ButtonGroup>
                                        <Button color='success' onClick={register} >Register</Button>
                                        <Button color='success' onClick={login} >Login</Button>
                                    </ButtonGroup>
                                )
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
