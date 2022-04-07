import { useState, useEffect } from "react";
import Form from "./form";

function Students() {

    // Initial State
    const [students, setStudents] = useState([]);

    // A state to grab the student ID
    const [editingStudentId, seteditingStudentId] = useState(null); 


    useEffect(() => {
        fetch("/api/students")
        .then((response) => response.json())
        .then(students =>{
            //setStudents((students[3]));
            //console.log("Testing", typeof students);
            setStudents(students);       
        })
        
    }, []);

    // A function to add a new student
    const addStudent = (newStudent) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setStudents((students) => [...students, newStudent]);
    }

    // A function to grab the student id of the student that we want to edit
     const onEdit = (student) =>{
       const editingId = student.id;
       console.log(editingId);
       seteditingStudentId(editingId);

     }

     // A function to really update the student 
     const updateStudent = (updatedstudent) =>{

       //console.log("This is the update line 41", student);
       setStudents((students) =>{
         const newlistStudents = [];
         for(let student of students){
           if(student.id === updatedstudent.id){
             newlistStudents.push(updatedstudent);
           } else{
             newlistStudents.push(student);
           }
         }
         return newlistStudents;
       })
       // This line is only to close the form! 
       seteditingStudentId(null);
     }


    return (
      <div className="students">
        <h2> List of Students Cohort 2022 </h2>
        <ul>
          
            {students.map((student) => {
               if(student.id === editingStudentId){
                 return <Form initialStudent={student}  saveStudent={updateStudent} />

               } else {
                 return (<li key={student.id}> {student.firstname} {student.lastname} 
                         <button type="button" onClick={()=> {onEdit(student)}}> EDIT </button>
                         <button type="button"> DELETE </button></li>);
                }}
            )}
        </ul>
        <Form saveStudent={addStudent} />
      </div>
    );
  }
  
  export default Students;