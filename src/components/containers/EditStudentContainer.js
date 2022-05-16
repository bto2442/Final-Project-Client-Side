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
        id: null,
        campusId: null,
      };
    }

    // componentDidMount(){
    //     this.setState({
    //         firstname: this.props.student.firstname,
    //         lastname: this.props.student.lastname,
    //         email: this.props.student.email,
    //         imageUrl: this.props.student.imageUrl,
    //         gpa: this.props.student.gpa,
    //         id: this.props.student.id,
    //         campusId: this.props.student.campusId
    //     });
    // }
  
    // Capture input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    // Take action after user click the submit button
    handleSubmit = async event => {
      let validate=true;
      if(this.state.firstname===""){
        alert("firstname cannot be empty");
        validate=false;
      }
      if(this.state.lastname===""){
        alert("lastname cannot be empty");
        validate=false;
      }
      if(this.state.email===""){
        alert("email cannot be empty");
        validate=false;
      }
      if(validate){
        event.preventDefault();  // Prevent browser reload/refresh after submit.
      
        let edit_info = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            id: this.state.id,
            campusId: this.state.campusId
            
        };
        if(this.state.imageUrl!== ""){
          edit_info.imageUrl=this.state.imageUrl;
        };
        if(this.state.gpa!==""){
          edit_info.gpa=this.state.gpa;
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
          id:null,
          campusId: null, 
          redirect: true, 
        });
      }
      else{
        event.returnValue = false
      }
      
    }
  
    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
  
    // Render edit student input form
    render() {
      // Redirect to edited student's page after submit
      if(this.state.redirect) {
        return (<Redirect to={`/students/${this.state.redirectId}`}/>)
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
          addStudent: (student) => dispatch(editStudentThunk(student)),
      })
  }
  
  // Export store-connected container by default
  // EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
  // (and re-read the values when the Store State updates).
  export default connect(null, mapDispatch)(EditStudentContainer);