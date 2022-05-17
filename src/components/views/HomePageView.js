/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import '../../index.css';
import collegeImage from '../../img/college.png';

const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <img id = "homeImage" src={collegeImage} alt="college"></img>
    </div>
  );    
}

export default HomePageView;