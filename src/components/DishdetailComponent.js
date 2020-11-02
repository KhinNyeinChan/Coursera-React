import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, BreadcrumbItem, Breadcrumb,
    Row, Label, Col,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

    function RenderDish({dish}){
        if(dish != null){
            return(
                 <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }else{
            return(<div></div>);
        }
    }

    function RenderComments({comment}){
        if(comment != null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comment.map(c => {
                            return(
                            <li key={c.id}>{c.comment} <br /> --{c.author}, 
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>
                            );}
                         )}
                    </ul>
                <CommentComponent />    
                </div>       
            );
        }else{
            return(<div></div>);
        }
    }

    const DishDetail = (props) => {

        if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home' >Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/menu' >Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comment={props.comments} /> 
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
    
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentComponent extends Component{
        constructor(props){
            super(props);
            this.state ={
                isModalOpen : false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.submitComment = this.submitComment.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen : !this.state.isModalOpen
            });
        }

        submitComment(values){
            alert("Current State is : " + JSON.stringify(values));
            this.toggleModal();
        }

        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submmit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.submitComment(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>                          
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".name" id="name" name="name"
                                            placeholder="Your Name" className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors 
                                            className="text-danger" show="touched" model=".name"
                                            messages={{
                                                minLength : "Must be greater than 2 characters",
                                                maxLength : "Must be 15 characters or less"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            className="form-control" rows="6" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>             
            );
        }
    }
export default DishDetail;