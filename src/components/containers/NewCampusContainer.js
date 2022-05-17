/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "", 
      description: "",
      imageUrl:"",
      redirect: false, 
      redirectId: null
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
    let validate = true;
    let string = "";
    
    // Checks if the required inputs on the form is empty
    // Displays an error message based on what is missing
    if(this.state.name === ""){         
      string += "Name cannot be empty\n";
      validate = false;
    }
    if(this.state.address === ""){
      string += "Address cannot be empty\n";
      validate = false;
    }
    if(this.state.description === ""){
      string += "Description cannot be empty\n";
      validate = false;
    }

    // If the information submitted is valid, then set the campus information
    if(validate){
      event.preventDefault();  // Prevent browser reload/refresh after submit.

      // Set the campus information
      let campus = {  
          name: this.state.name,
          address: this.state.address,
          description: this.state.description
      };

      // If the URL is not blank, then change the image URL
      if(this.state.imageUrl !== ""){
        campus.imageUrl = this.state.imageUrl;
      };
      
      // Add new campus in back-end database
      await this.props.addCampus(campus)
        .then(newCampus => {
          // Update state, and trigger redirect to show the new campus
          this.setState({
            name: "", 
            address: "", 
            description: "",
            imageUrl: "", 
            redirect: true, 
            redirectId: newCampus.id
          });
        })
    }

    // If information is not valid, create an alert message
    else{
      alert(string);
      event.returnValue = false
    }
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campuses/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewCampusContainer);