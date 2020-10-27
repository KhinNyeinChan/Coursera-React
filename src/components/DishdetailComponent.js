import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle} from 'reactstrap';

class DishDetail  extends Component{

    constructor(props){
        super(props);
    }

    renderDish(dish){
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

    renderComments(comment){
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
                </div>       
            );
        }else{
            return(<div></div>);
        }
    }

    render(){
        if(this.props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)} 
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
}
export default DishDetail;