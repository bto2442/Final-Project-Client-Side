/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {

    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        firstname: "", 
        lastname: "", 
        email: "",
        imageUrl: "",
        gpa:"",
        id: this.props.match.params.id,
        campusId: null,
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
      event.preventDefault();  // Prevent browser reload/refresh after submit.
    
      let edit_info = {
          id: this.state.id,
      };
      
      // Checks for new value 
      // If there is no new value, then retains old value
      if(this.state.firstname){       // Edit student first name
        edit_info.firstname = this.state.firstname;
      };
      if(this.state.lastname){        // Edit student last name
        edit_info.lastname = this.state.lastname;
      };
      if(this.state.email){           // Edit student email
        edit_info.email = this.state.email;
      };
      if(this.state.campusId){        // Edit student campus
        edit_info.campusId = this.state.campusId;
      };
      if(this.state.imageUrl!== ""){  // Edit student image URL
        edit_info.imageUrl = this.state.imageUrl;
      };
      if(this.state.gpa!==""){        // Edit student GPA
        edit_info.gpa = this.state.gpa;
      }

      // Edit student in back-end database
      await this.props.editStudent(edit_info);
  
      // Update state, and trigger redirect to show the edited student
      this.setState({
        firstname: "", 
        lastname: "",
        email: "",
        imageUrl: "",
        gpa:"",
        id:this.state.id,
        campusId: null, 
        redirect: true, 
      });
      
    }
  
    // Render edit student input form
    render() {
      // Redirect to edited student's page after submit
      if(this.state.redirect) {
        return (<Redirect to={`/students/${this.state.id}`}/>)
      }
  
      // Display the input form via the corresponding View component
      return (
        <div>
          <Header />
          <EditStudentView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}
            student={this.props.student}      
          />
        </div>          
      );
    }
  }
  
  // The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
  // The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
  // The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
  const mapDispatch = (dispatch) => {
      return({
          editStudent: (student) => dispatch(editStudentThunk(student)),
      })
  }
  
  // Export store-connected container by default
  // EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(null, mapDispatch)(EditStudentContainer);