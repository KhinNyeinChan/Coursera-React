import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, BreadcrumbItem, Breadcrumb,
    Row, Label, Col,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}){
        if(dish != null){
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }else{
            return(<div></div>);
        }
    }

    function RenderComments({comment, postComment, dishId}){
        if(comment != null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comment.map(c => {
                                return(
                                    <Fade in>
                                        <li key={c.id}>{c.comment} <br /> --{c.author}, 
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>
                                    </Fade>
                                );}
                            )}
                         </Stagger>
                    </ul>
                <CommentComponent dishId={dishId} postComment={postComment} />    
                </div>       
            );
        }else{
            return(<div></div>);
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if(props.dish != null){
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
                            <RenderComments comment={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            />
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
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name" className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors 
                                            className="text-danger" show="touched" model=".author"
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