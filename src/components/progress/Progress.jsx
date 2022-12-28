import React, { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaCalendarAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { TaskListByStatus } from '../../APIs/APIs';
import { DeleteToDo } from '../../helpers/DeleteAlert';
import { UpdateDoTo } from '../../helpers/UpdateAlert';

const Progress = () => {

    useEffect(() => {
        TaskListByStatus('progress')
    }, [])

    const progressList = useSelector((state) => state.task.progress)

    const DeleteItem=(id)=>{
        DeleteToDo(id).then((result)=>{
            if(result===true){
                TaskListByStatus("progress");
            }
        })
    }

    const StatusChangeItem = (id, status) => {
        UpdateDoTo(id, status).then((result) => {
            if(result === true){
                TaskListByStatus('progress')
            }
        })
    }
    return (
        <Fragment>
            <Container fluid={true} className="content-body">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 px-3">
                        <h5>Task Progress</h5>
                    </div>
                    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                        <div className="row">
                            <div className="col-8">
                                <input className="form-control w-100" />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary w-100">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-0 m-0">
                    {
                        progressList.map((item, i) =>
                            <div key={i.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="animated fadeInUp">{item.title}</h6>
                                        <p className="animated fadeInUp">{item.description}</p>
                                        <p className="m-0 animated fadeInUp p-0">
                                            <FaCalendarAlt /> {item.createdDate}
                                            <a onClick={StatusChangeItem.bind(this, item._id, item.status)} className="icon-nav text-primary mx-1"><FaEdit /></a>
                                            <a onClick={DeleteItem.bind(this,item._id)} className="icon-nav text-danger mx-1"><FaTrashAlt /></a>
                                            <a className="badge float-end bg-primary">{item.status}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
        </Fragment>
    );
};

export default Progress;