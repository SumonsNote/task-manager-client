import React, { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { newTaskRequest } from '../../APIs/APIs';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';

const Create = () => {
    let titleRef, desRef = useRef()
    let navigate = useNavigate()

    const createNew = () => {
        let title = titleRef.value;
        let description = desRef.value;
        if(IsEmpty(title)){
            ErrorToast('Please give a title')
        }
        else if(IsEmpty(description)){
            ErrorToast('Please give a description')
        }
        else {
            newTaskRequest(title, description).then((res) => {
                if(res === true){
                    navigate('/all')
                }
            })
        }
    }

    return (
        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 >Create New</h4>
                            <br/>
                            <input ref={(input) => titleRef = input} placeholder="Task Name" className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <textarea ref={(input) => desRef = input} rows={5} placeholder="Task Description" className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <button onClick={createNew} className="btn float-end btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Create;