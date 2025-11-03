import { useEffect, useState } from "react";
import "./StudentList.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function StudentList() {
    const[search,setSearch]=useState();
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();

    function handleSearchChange(event){
        setSearch(event.target.value);

    }

    useEffect(() => {
        getAllStudentData();
    }, []);

    function getAllStudentData() {
        axios.get("http://localhost:4200/StudentDetails")
            .then((response) => {
                console.log(response.data);
                setStudent(response.data);

            })
            .catch((error) => {
                console.error("Error fetching contact list:", error);
            });
    }
    function handleToEdit(id) {
        navigate('/' + id)

    }
    function handleToDelete(id) {
        axios.delete("http://localhost:4200/StudentDetails/" + id)
            .then((response) => {
                console.log(response);
                getAllStudentData();
            })
            .catch((error) => console.error("Delete error:", error));

    }
    return (
        <div>
            <div>
                <div>
                    <input type="text" value={search} onChange={handleSearchChange}/>
                    <button>Search</button>
                </div>

                <table border="1">
                    <tr>
                        <th>Srno.</th>
                        <th>StudentName</th>
                        <th>StudentAddress</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>date Of Birth</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Grade</th>
                        <th>Option</th>

                    </tr>
                    {student.map((singleElement, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{singleElement.name}</td>
                            <td>{singleElement.address}</td>
                            <td>{singleElement.email}</td>
                            <td>{singleElement.phonenumber}</td>
                            <td>{singleElement.dateOfBirth}</td>
                            <td>{singleElement.gender}</td>
                            <td>{singleElement.course}</td>
                            <td>{singleElement.year}</td>
                            <td>{singleElement.grade}</td>
                            <td>
                                <button onClick={() => handleToEdit(singleElement.id)}>Edit</button>
                                <button onClick={() => handleToDelete(singleElement.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </table>
            </div>

        </div>
    );
}