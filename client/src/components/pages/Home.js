import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import {Container, ListGroup, ListGroupItem, Button, Form, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export default function Home() {
    const {userData, setUserData} = useContext(UserContext);
    const [todosData, setTodosData] = useState({
        todos: undefined
    });
    const [title, setTitle] = useState();
    const [error, setError] = useState();
    const [modal, setModal] = useState(false);
    
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newItem = {title};
            const addedItem = await axios.post('/todos/', newItem, {headers: {'x-auth-token': userData.token}});
            
            if(todosData.todos !== undefined) {
                setTodosData((prevState) => {
                    return {
                            todos: [...prevState.todos, addedItem.data]
                    }
                });
            }
            if(todosData.todos === undefined) {
                const todoResponse = await axios.get('/todos/all', {headers: {'x-auth-token': userData.token}});
                if(todoResponse.data.length !== 0) {
                    setTodosData({
                        todos: todoResponse.data
                    });
                }

            }
        }

        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }

    }

    const deleteItem = async (id) => {
        await axios.delete(`/todos/${id}`, {headers: {'x-auth-token': userData.token}});
        setTodosData({
                todos: todosData.todos.filter(item => item._id !== id)
        })
    }

    const deleteUser = async () => {
        await axios.post('/todos/delete', null, {headers: {'x-auth-token': userData.token}});
        const deletedUser = await axios.delete('/users/delete', {headers: {'x-auth-token': userData.token}});
        toggle();
        if(deletedUser) {
            setUserData({
                token: undefined,
                user: undefined
            });
            localStorage.setItem('auth-token', '');
            history.push('/login');
        }
    }

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if(!userData.user) {
            history.push('/login');
        }

        else {
            const loadTodos = async () => {
                const todoResponse = await axios.get('/todos/all', {headers: {'x-auth-token': userData.token}});
                if(todoResponse.data.length !== 0) {
                    setTodosData({
                        todos: todoResponse.data
                    })
                }
            };
            loadTodos();
        }

    }, []);

    return (
        <Container >
             {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}

            <Form onSubmit={submit} >
                <Label for='enterTask' >Enter Task</Label>
                <Input id='enterTask' type='text' onChange={e => setTitle(e.target.value)} />

                <Button color='success'>Submit</Button>
            </Form>
            <br/>
            <ListGroup>
                <TransitionGroup className='shopping-list'>
                    {
                       todosData.todos !== undefined ? (
                           todosData.todos.map(el => (
                            <CSSTransition key={el['_id']} timeout={500} classNames='fade' >
                                <ListGroupItem>
                                    {<Button className='remove-btn' color='danger' size='sm' onClick={() => deleteItem(el['_id'])}>&times;</Button>}
                                    {el['title']}
                                </ListGroupItem>
                            </CSSTransition>
                           ))
                       ): null
                   }
                </TransitionGroup>
            </ListGroup>
            <br/>
            <Button color='danger' onClick={toggle} >Delete Account</Button>
            <Modal isOpen={modal} toggle={toggle} className='' >
                <ModalHeader toggle={toggle} >Delete Account</ModalHeader>
                <ModalBody>
                    Do you want to delete your account?
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={deleteUser} >Accept</Button>
                    <Button color='secondary' onClick={toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
