import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddNewStudents() {

    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", address: "", email: "", phonenumber: "", dateOfBirth: "", gender: "", course: "", grade: "", year: "" })
    const { id } = useParams();

    function handleNameChange(event) {
        let studentData = { ...student };
        studentData["name"] = event.target.value
        setStudent(studentData);

    }
    function handleAddressChange(event) {
        let studentData = { ...student };
        studentData["address"] = event.target.value
        setStudent(studentData);
    }
    function handleEmailChange(event) {
        let studentData = { ...student };
        studentData["email"] = event.target.value
        setStudent(studentData);

    }
    function handlePhoneNumberChange(event) {
        let studentData = { ...student };
        studentData["phonenumber"] = event.target.value
        setStudent(studentData);

    }
    function handleDateOfBirthChange(event) {
        let studentData = { ...student };
        studentData["dateOfBirth"] = event.target.value
        setStudent(studentData);

    }
    function handleGenderChange(event) {
        let studentData = { ...student };
        studentData["gender"] = event.target.value
        setStudent(studentData);


    }
    function handleYearChange(event) {
        let studentData = { ...student };
        studentData["year"] = event.target.value
        setStudent(studentData);

    }
    function handleGradeChange(event) {
        let studentData = { ...student };
        studentData["grade"] = event.target.value
        setStudent(studentData);

    }
    function handleDropDownChange(event) {
        let studentData = { ...student };
        studentData["course"] = event.target.value
        setStudent(studentData);


    }
    function handleToSave() {
        // console.log("Name :" + name, "Address :" + address, "Email :" + email, "PHNumber :" + phonenumber, "BOD :" + dateOfBirth,
        //     "Gender :" + gender, "Course :" + dropdown, "Year :" + year);

       console.log(student.dropdown)


        if (id) {
            axios.put("http://localhost:4200/StudentDetails/" + id, student)
                .then((Response) => {
                    console.log(Response.data);
                    navigate("/studentlist")


                })
        }

        else {
            axios.post("http://localhost:4200/StudentDetails/", student)
                .then((Response) => {
                    console.log(Response.data);
                    navigate("/studentlist")

                })
        }
    }
    useEffect(() => {
        console.log(id);
        if (id) {
            axios.get("http://localhost:4200/StudentDetails/" + id)

                .then(response => {
                    setStudent(response.data);
                })

                .catch(error => console.error("Error fetching blog:", error));
        }
    }, [id]);

    function handleToCancel() {
        navigate(-1);
    }

    // console.log("gender", gender)
    return (
        <div>
            <div>
                <div>
                    <div>StudentName:</div>
                    <div>
                        <input type="text" value={student.name} placeholder="Enter Full Name" onChange={handleNameChange} />
                    </div>
                </div>
                <div>
                    <div>StudentAddress:</div>
                    <div>
                        <input type="text" value={student.address} placeholder="Enter Address" onChange={handleAddressChange} />
                    </div>
                </div>
                <div>
                    <div>Email:</div>
                    <div>
                        <input type="text" value={student.email} placeholder="Enter Email" onChange={handleEmailChange} />
                    </div>
                </div>
                <div>
                    <div>PhoneNumber:</div>
                    <div>
                        <input type="text" value={student.phonenumber} placeholder="Enter Phone NUmber" onChange={handlePhoneNumberChange} />
                    </div>
                </div>
                <div>
                    <div>Date Of Birth:</div>
                    <div>
                        <input type="date" value={student.dateOfBirth} placeholder="Enter Date Of Birth" onChange={handleDateOfBirthChange} />
                    </div>
                </div>
                <div>
                    <div>Gender:</div>
                    <div>

                        <input type="radio" value={"Male"} onChange={handleGenderChange} checked={student.gender === "Male"} />Male
                        <input type="radio" value={"Female"} onChange={handleGenderChange} checked={student.gender === "Female"} />Female
                    </div>
                </div>
                <div>
                    <div>Course:</div>
                    <div>
                        <select value={student.course} onChange={handleDropDownChange} >
                            <option>BBA</option>
                            <option>B.Com</option>
                            <option>BCS</option>
                            <option>BCA</option>
                            <option>MCA</option>
                            <option>MCS</option>

                        </select>
                    </div>
                </div>
                <div>
                    <div>Year:</div>
                    <div>
                        <input type="text" value={student.year} onChange={handleYearChange} />
                    </div>
                </div>
                <div>
                    <div>Grade:</div>
                    <div>
                        <input type="text" value={student.grade} placeholder="Enter CGPA/SGPA" onChange={handleGradeChange} />
                    </div>
                </div>
                <div>
                    <button onClick={handleToSave}>Save</button>
                    <button onClick={handleToCancel}>Cancel</button>
                </div>

            </div>

        </div>
    );
}