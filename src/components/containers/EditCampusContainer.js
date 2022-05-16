/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {

    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        name: "", 
        address: "", 
        description: "",
        imageUrl: "",
        id: this.props.match.params.id,
        redirect: false
      };
    }
  
    // Capture input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    // Take action after user click the submit button
    handleSubmit = async event => {
      let validate=true;
      if(this.state.name===""){
        alert("name cannot be empty");
        validate=false;
      }
      if(this.state.address===""){
        alert("address cannot be empty");
        validate=false;
      }
      if(this.state.description===""){
        alert("description cannot be empty");
        validate=false;
      }
      if(validate){
        event.preventDefault();  // Prevent browser reload/refresh after submit.
      
        let edit_info = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            id: this.state.id
            
        };
        if(this.state.imageUrl!== ""){
          edit_info.imageUrl=this.state.imageUrl;
        };
        // Edit campus in back-end database
        await this.props.editCampus(edit_info);
    
        // Update state, and trigger redirect to show the edited campus
        this.setState({
          name: "", 
          address: "",
          description: "",
          imageUrl: "",
          id:this.state.id,
          redirect: true, 
        });
      }
      else{
        event.returnValue = false
      }
      
    }
  
    // Render edit campus input form
    render() {
      // Redirect to edited campus's page after submit
      if(this.state.redirect) {
        return (<Redirect to={`/campuses/${this.state.id}`}/>)
      }
  
      // Display the input form via the corresponding View component
      return (
        <div>
          <Header />
          <EditCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}
            campus={this.props.campus}      
          />
        </div>          
      );
    }
  }
  
  // The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
  // The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
  // The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
  const mapDispatch = (dispatch) => {
      return({
          editCampus: (campus) => dispatch(editCampusThunk(campus)),
      })
  }
  
  // Export store-connected container by default
  // EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(null, mapDispatch)(EditCampusContainer);