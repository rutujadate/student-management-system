import { useEffect, useState } from "react";
import "./StudentList.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function StudentList() {
    const [searchText, setSearchText] = useState();
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const [filteredList, setFilteredList] = useState([]);

    function handleNewButton() {
        navigate("/")

    }


    function handleSearchChange(event) {
        setSearchText(event.target.value);

    }
    function handleToSearch() {
        console.log(student)
        const filteredList = student.filter((singleElement) => {
            console.log('singleElement:', singleElement);
            if (singleElement.name === searchText) {
                return singleElement;
            }


        });
        console.log('filteredList:', filteredList);
        setFilteredList(filteredList);

    }



    useEffect(() => {
        getAllStudentData();
    }, []);

    function getAllStudentData() {
        axios.get("http://localhost:4200/StudentDetails")
            .then((response) => {
                // console.log(response.data);
                setStudent(response.data);
                setFilteredList(response.data);


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
                // console.log(response);
                getAllStudentData();
            })
            .catch((error) => console.error("Delete error:", error));

    }
    return (
        <div className="outerBody">
            <div className="studentDetailsBox" >
                {/* Search button */}
                <div>
                    <input type="text" value={searchText} placeholder="Search Student Details" onChange={handleSearchChange} className="studentlistInput" />
                    <button onClick={handleToSearch} className="searchButton">
                        <i class="fa fa-search" aria-hidden="true"></i> Search</button>
                </div>

                <table border="1">

                    {/* table Heading */}
                    <tr className="tableHeading">
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

                    {/* using map on table row */}
                    {filteredList.map((singleElement, index) =>

                        <tr
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff",
                                color: index % 2 === 0 ? "lightgreen" : "Black" // alternate row colors
                            }}>
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

                            {/* Edit and Delete buttons */}
                            <td className="buttons">
                                {/* Edit Button */}
                                <button onClick={() => handleToEdit(singleElement.id)} className="editButton">
                                    <i class="fa fa-pencil writingIcon" aria-hidden="true"></i> Edit</button>
                                {/* Delete Button */}
                                <button onClick={() => handleToDelete(singleElement.id)} className="deleteButton">
                                    <i class="fa fa-trash-o writingIcon" aria-hidden="true"></i> Delete</button>
                            </td>
                        </tr>
                    )}
                </table>
                <div>
                    <button onClick={handleNewButton} className="newButton">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Student</button>
                </div>
            </div>

        </div>
    );
}