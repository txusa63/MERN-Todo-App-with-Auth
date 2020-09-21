import React from 'react'
import {Button, ButtonGroup} from 'reactstrap';

export default function ErrorNotice(props) {
  return (
    <div className='remove-btn'>
        <ButtonGroup>
        	<Button color='danger' onClick={props.clearError}>&times; </Button>
        </ButtonGroup>
        <span>{props.message}</span>
    </div>
  )
}
