
// STUDENT MANAGEMENT SYSTEM




// GET HTML ELEMENTS


const studentModal =
    document.getElementById("studentModal");

const openStudentModal =
    document.getElementById("openStudentModal");

const closeStudentModal =
    document.getElementById("closeStudentModal");

const cancelStudent =
    document.getElementById("cancelStudent");

const studentForm =
    document.getElementById("studentForm");

const emptyAddStudent =
    document.getElementById("emptyAddStudent");

const studentTableBody =
    document.getElementById("studentTableBody");

const emptyState =
    document.getElementById("emptyState");

const searchStudent =
    document.getElementById("searchStudent");

const filterClass =
    document.getElementById("filterClass");


// Form fields

const studentName =
    document.getElementById("studentName");

const studentDOB =
    document.getElementById("studentDOB");

const studentClass =
    document.getElementById("studentClass");

const studentGender =
    document.getElementById("studentGender");

const studentPhone =
    document.getElementById("studentPhone");

const studentEmail =
    document.getElementById("studentEmail");

const parentName =
    document.getElementById("parentName");

const studentAddress =
    document.getElementById("studentAddress");

const editStudentId =
    document.getElementById("editStudentId");



// LOCAL STORAGE


let students =
    JSON.parse(
        localStorage.getItem("schoolStudents")
    ) || [];



// OPEN MODAL


function openModal() {

    studentModal.classList.add("show");

    document.body.style.overflow = "hidden";

    studentName.focus();

}



// CLOSE MODAL

function closeModal() {

    studentModal.classList.remove("show");

    document.body.style.overflow = "";

    resetForm();

}



// RESET FORM


function resetForm() {

    studentForm.reset();

    editStudentId.value = "";

    document.getElementById(
        "modalTitle"
    ).textContent = "Add New Student";


    // Clear errors

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "dobError"
    ).textContent = "";

    document.getElementById(
        "classError"
    ).textContent = "";

    document.getElementById(
        "genderError"
    ).textContent = "";

}



// EVENT LISTENERS


openStudentModal.addEventListener(
    "click",
    openModal
);

emptyAddStudent.addEventListener(
    "click",
    openModal
);

closeStudentModal.addEventListener(
    "click",
    closeModal
);

cancelStudent.addEventListener(
    "click",
    closeModal
);


// Close modal when clicking outside

studentModal.addEventListener(
    "click",
    function (event) {

        if (event.target === studentModal) {

            closeModal();

        }

    }
);



// GENERATE STUDENT ID


function generateStudentId() {

    let highestNumber = 0;

    students.forEach(function (student) {

        const number =
            parseInt(
                student.studentId.replace(
                    "STU",
                    ""
                )
            );

        if (number > highestNumber) {

            highestNumber = number;

        }

    });


    const nextNumber =
        highestNumber + 1;


    return "STU" +
        String(nextNumber).padStart(4, "0");

}



// FORM VALIDATION


function validateForm() {

    let valid = true;


    // Clear errors

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "dobError"
    ).textContent = "";

    document.getElementById(
        "classError"
    ).textContent = "";

    document.getElementById(
        "genderError"
    ).textContent = "";


    // Name

    if (studentName.value.trim() === "") {

        document.getElementById(
            "nameError"
        ).textContent =
            "Student name is required.";

        valid = false;

    }


    // Date of birth

    if (studentDOB.value === "") {

        document.getElementById(
            "dobError"
        ).textContent =
            "Date of birth is required.";

        valid = false;

    }


    // Class

    if (studentClass.value === "") {

        document.getElementById(
            "classError"
        ).textContent =
            "Please select a class.";

        valid = false;

    }


    // Gender

    if (studentGender.value === "") {

        document.getElementById(
            "genderError"
        ).textContent =
            "Please select gender.";

        valid = false;

    }


    return valid;

}



// SAVE STUDENT


studentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validateForm()) {

            return;

        }


        const editingId =
            editStudentId.value;



        // EDIT STUDENT


        if (editingId !== "") {

            const studentIndex =
                students.findIndex(
                    function (student) {

                        return student.id === editingId;

                    }
                );


            if (studentIndex !== -1) {

                students[studentIndex].name =
                    studentName.value.trim();

                students[studentIndex].dob =
                    studentDOB.value;

                students[studentIndex].class =
                    studentClass.value;

                students[studentIndex].gender =
                    studentGender.value;

                students[studentIndex].phone =
                    studentPhone.value.trim();

                students[studentIndex].email =
                    studentEmail.value.trim();

                students[studentIndex].parent =
                    parentName.value.trim();

                students[studentIndex].address =
                    studentAddress.value.trim();


                saveStudents();

                closeModal();

                renderStudents();

                alert(
                    "Student updated successfully!"
                );

            }

            return;

        }



        // ADD NEW STUDENT


        const newStudent = {

            id:
                Date.now().toString(),

            studentId:
                generateStudentId(),

            name:
                studentName.value.trim(),

            dob:
                studentDOB.value,

            class:
                studentClass.value,

            gender:
                studentGender.value,

            phone:
                studentPhone.value.trim(),

            email:
                studentEmail.value.trim(),

            parent:
                parentName.value.trim(),

            address:
                studentAddress.value.trim(),

            status:
                "Active",

            createdAt:
                new Date().toISOString()

        };


        students.push(newStudent);


        saveStudents();

        closeModal();

        renderStudents();


        alert(
            "Student added successfully!"
        );

    }
);



// SAVE TO LOCAL STORAGE


function saveStudents() {

    localStorage.setItem(
        "schoolStudents",
        JSON.stringify(students)
    );

}



// GET INITIALS


function getInitials(name) {

    const words =
        name.trim().split(" ");


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}



// RENDER STUDENTS


function renderStudents() {

    const searchValue =
        searchStudent.value
            .trim()
            .toLowerCase();


    const selectedClass =
        filterClass.value;


    // Filter students

    const filteredStudents =
        students.filter(
            function (student) {

                const matchesSearch =
                    student.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    student.studentId
                        .toLowerCase()
                        .includes(searchValue) ||

                    student.class
                        .toLowerCase()
                        .includes(searchValue);


                const matchesClass =
                    selectedClass === "all" ||
                    student.class === selectedClass;


                return (
                    matchesSearch &&
                    matchesClass
                );

            }
        );


    // Clear table

    studentTableBody.innerHTML = "";



    // EMPTY STATE


    if (filteredStudents.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }



    // ADD ROWS


    filteredStudents.forEach(
        function (student) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="student-info">

                        <div class="student-table-avatar">

                            ${getInitials(student.name)}

                        </div>

                        <div>

                            <strong>
                                ${student.name}
                            </strong>

                            <small>
                                ${student.email || "No email"}
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${student.studentId}
                </td>


                <td>
                    ${student.class}
                </td>


                <td>
                    ${student.gender}
                </td>


                <td>
                    ${student.phone || "N/A"}
                </td>


                <td>

                    <span class="student-status active">
                        ${student.status}
                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button edit-button"
                            onclick="editStudent('${student.id}')"
                            title="Edit"
                        >
                            ✏️
                        </button>

                        <button
                            class="action-button delete-button"
                            onclick="deleteStudent('${student.id}')"
                            title="Delete"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            studentTableBody.appendChild(row);

        }
    );


    // Update result count

    document.getElementById(
        "studentResultCount"
    ).textContent =
        `${filteredStudents.length} student${filteredStudents.length !== 1
            ? "s"
            : ""
        }`;


    updateStatistics();

}



// EDIT STUDENT


function editStudent(id) {

    const student =
        students.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!student) {

        return;

    }


    editStudentId.value =
        student.id;

    studentName.value =
        student.name;

    studentDOB.value =
        student.dob;

    studentClass.value =
        student.class;

    studentGender.value =
        student.gender;

    studentPhone.value =
        student.phone;

    studentEmail.value =
        student.email;

    parentName.value =
        student.parent;

    studentAddress.value =
        student.address;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Student";


    openModal();

}



// DELETE STUDENT


function deleteStudent(id) {

    const student =
        students.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!student) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    students =
        students.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveStudents();

    renderStudents();


    alert(
        "Student deleted successfully!"
    );

}



// SEARCH


searchStudent.addEventListener(
    "input",
    renderStudents
);



// FILTER


filterClass.addEventListener(
    "change",
    renderStudents
);



// STATISTICS


function updateStatistics() {

    const total =
        students.length;


    const active =
        students.filter(
            function (student) {

                return student.status === "Active";

            }
        ).length;


    const male =
        students.filter(
            function (student) {

                return student.gender === "Male";

            }
        ).length;


    const female =
        students.filter(
            function (student) {

                return student.gender === "Female";

            }
        ).length;


    document.getElementById(
        "totalStudents"
    ).textContent = total;


    document.getElementById(
        "activeStudents"
    ).textContent = active;


    document.getElementById(
        "maleStudents"
    ).textContent = male;


    document.getElementById(
        "femaleStudents"
    ).textContent = female;

}



// MOBILE SIDEBAR


const sidebar =
    document.getElementById("sidebar");

const menuToggle =
    document.getElementById("menuToggle");


menuToggle.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle("show");

    }
);



// LOGOUT


const logoutButton =
    document.getElementById("logoutButton");


logoutButton.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmed) {

            localStorage.removeItem(
                "schoolLoggedIn"
            );

            localStorage.removeItem(
                "schoolUsername"
            );

            localStorage.removeItem(
                "rememberMe"
            );


            window.location.href =
                "index.html";

        }

    }
);



// INITIAL LOAD


if (
    localStorage.getItem(
        "schoolLoggedIn"
    ) !== "true"
) {

    window.location.href =
        "index.html";

} else {

    renderStudents();

}