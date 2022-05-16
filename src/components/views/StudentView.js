/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import '../../index.css';
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  if(!student.campus)
  {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <img src={student.imageUrl} alt="student"></img>
        <h2>Email: {student.email}</h2>
        <h2>GPA: {student.gpa.toFixed(1)}</h2>
        <h2>This student does not belong to a campus</h2>
      </div>
    );
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl} alt="student"></img>
      <h2>Email: {student.email}</h2>
      <h2>GPA: {student.gpa.toFixed(1)}</h2>
      <div key={student.campus.id}>
        <h2> Campus: 
        <Link to={`/campuses/${student.campus.id}`}>
           {student.campus.name}
        </Link>      
        </h2>       
      </div>
    </div>
  );

};

export default StudentView;