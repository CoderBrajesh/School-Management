
// TEACHER MANAGEMENT SYSTEM




// ELEMENTS


const teacherModal =
    document.getElementById("teacherModal");

const openTeacherModal =
    document.getElementById("openTeacherModal");

const closeTeacherModal =
    document.getElementById("closeTeacherModal");

const cancelTeacher =
    document.getElementById("cancelTeacher");

const emptyAddTeacher =
    document.getElementById("emptyAddTeacher");

const teacherForm =
    document.getElementById("teacherForm");

const teacherTableBody =
    document.getElementById("teacherTableBody");

const teacherEmptyState =
    document.getElementById("teacherEmptyState");

const searchTeacher =
    document.getElementById("searchTeacher");

const filterSubject =
    document.getElementById("filterSubject");


// Form fields

const teacherName =
    document.getElementById("teacherName");

const teacherDOB =
    document.getElementById("teacherDOB");

const teacherSubject =
    document.getElementById("teacherSubject");

const teacherGender =
    document.getElementById("teacherGender");

const teacherPhone =
    document.getElementById("teacherPhone");

const teacherEmail =
    document.getElementById("teacherEmail");

const teacherQualification =
    document.getElementById("teacherQualification");

const teacherExperience =
    document.getElementById("teacherExperience");

const teacherAddress =
    document.getElementById("teacherAddress");

const editTeacherId =
    document.getElementById("editTeacherId");



// LOAD DATA


let teachers =
    JSON.parse(
        localStorage.getItem("schoolTeachers")
    ) || [];



// OPEN MODAL


function openTeacherForm() {

    teacherModal.classList.add("show");

    document.body.style.overflow = "hidden";

    teacherName.focus();

}



// CLOSE MODAL


function closeTeacherForm() {

    teacherModal.classList.remove("show");

    document.body.style.overflow = "";

    resetTeacherForm();

}



// RESET FORM


function resetTeacherForm() {

    teacherForm.reset();

    editTeacherId.value = "";

    document.getElementById(
        "teacherModalTitle"
    ).textContent =
        "Add New Teacher";


    document.getElementById(
        "teacherNameError"
    ).textContent = "";

    document.getElementById(
        "teacherSubjectError"
    ).textContent = "";

    document.getElementById(
        "teacherGenderError"
    ).textContent = "";

}



// EVENTS


openTeacherModal.addEventListener(
    "click",
    openTeacherForm
);

emptyAddTeacher.addEventListener(
    "click",
    openTeacherForm
);

closeTeacherModal.addEventListener(
    "click",
    closeTeacherForm
);

cancelTeacher.addEventListener(
    "click",
    closeTeacherForm
);


// Close outside modal

teacherModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === teacherModal
        ) {

            closeTeacherForm();

        }

    }
);



// GENERATE TEACHER ID


function generateTeacherId() {

    let highestNumber = 0;


    teachers.forEach(
        function (teacher) {

            const number =
                parseInt(
                    teacher.teacherId
                        .replace("TCH", "")
                );


            if (number > highestNumber) {

                highestNumber = number;

            }

        }
    );


    return "TCH" +
        String(
            highestNumber + 1
        ).padStart(4, "0");

}



// VALIDATE FORM


function validateTeacherForm() {

    let valid = true;


    document.getElementById(
        "teacherNameError"
    ).textContent = "";

    document.getElementById(
        "teacherSubjectError"
    ).textContent = "";

    document.getElementById(
        "teacherGenderError"
    ).textContent = "";


    // Name

    if (
        teacherName.value.trim() === ""
    ) {

        document.getElementById(
            "teacherNameError"
        ).textContent =
            "Teacher name is required.";

        valid = false;

    }


    // Subject

    if (
        teacherSubject.value === ""
    ) {

        document.getElementById(
            "teacherSubjectError"
        ).textContent =
            "Please select a subject.";

        valid = false;

    }


    // Gender

    if (
        teacherGender.value === ""
    ) {

        document.getElementById(
            "teacherGenderError"
        ).textContent =
            "Please select gender.";

        valid = false;

    }


    return valid;

}



// SAVE TEACHER


teacherForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validateTeacherForm()) {

            return;

        }


        const editingId =
            editTeacherId.value;



        // EDIT


        if (editingId !== "") {

            const index =
                teachers.findIndex(
                    function (teacher) {

                        return (
                            teacher.id ===
                            editingId
                        );

                    }
                );


            if (index !== -1) {

                teachers[index].name =
                    teacherName.value.trim();

                teachers[index].dob =
                    teacherDOB.value;

                teachers[index].subject =
                    teacherSubject.value;

                teachers[index].gender =
                    teacherGender.value;

                teachers[index].phone =
                    teacherPhone.value.trim();

                teachers[index].email =
                    teacherEmail.value.trim();

                teachers[index].qualification =
                    teacherQualification.value.trim();

                teachers[index].experience =
                    teacherExperience.value.trim();

                teachers[index].address =
                    teacherAddress.value.trim();


                saveTeachers();

                closeTeacherForm();

                renderTeachers();


                alert(
                    "Teacher updated successfully!"
                );

            }

            return;

        }



        // ADD


        const newTeacher = {

            id:
                Date.now().toString(),

            teacherId:
                generateTeacherId(),

            name:
                teacherName.value.trim(),

            dob:
                teacherDOB.value,

            subject:
                teacherSubject.value,

            gender:
                teacherGender.value,

            phone:
                teacherPhone.value.trim(),

            email:
                teacherEmail.value.trim(),

            qualification:
                teacherQualification.value.trim(),

            experience:
                teacherExperience.value.trim(),

            address:
                teacherAddress.value.trim(),

            status:
                "Active",

            createdAt:
                new Date().toISOString()

        };


        teachers.push(newTeacher);


        saveTeachers();

        closeTeacherForm();

        renderTeachers();


        alert(
            "Teacher added successfully!"
        );

    }
);



// SAVE DATA


function saveTeachers() {

    localStorage.setItem(
        "schoolTeachers",
        JSON.stringify(teachers)
    );

}



// INITIALS


function getTeacherInitials(name) {

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



// RENDER TEACHERS


function renderTeachers() {

    const searchValue =
        searchTeacher.value
            .trim()
            .toLowerCase();


    const selectedSubject =
        filterSubject.value;


    const filteredTeachers =
        teachers.filter(
            function (teacher) {

                const matchesSearch =

                    teacher.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    teacher.teacherId
                        .toLowerCase()
                        .includes(searchValue) ||

                    teacher.subject
                        .toLowerCase()
                        .includes(searchValue);


                const matchesSubject =
                    selectedSubject === "all" ||
                    teacher.subject ===
                    selectedSubject;


                return (
                    matchesSearch &&
                    matchesSubject
                );

            }
        );


    teacherTableBody.innerHTML = "";


    // Empty state

    if (
        filteredTeachers.length === 0
    ) {

        teacherEmptyState.style.display =
            "block";

    } else {

        teacherEmptyState.style.display =
            "none";

    }


    // Add rows

    filteredTeachers.forEach(
        function (teacher) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="teacher-info">

                        <div class="teacher-avatar">

                            ${getTeacherInitials(
                teacher.name
            )}

                        </div>

                        <div>

                            <strong>
                                ${teacher.name}
                            </strong>

                            <small>
                                ${teacher.email ||
                "No email"
                }
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${teacher.teacherId}
                </td>


                <td>

                    <span class="subject-badge">

                        ${teacher.subject}

                    </span>

                </td>


                <td>
                    ${teacher.gender}
                </td>


                <td>
                    ${teacher.phone || "N/A"}
                </td>


                <td>

                    <span
                        class="teacher-status active"
                    >
                        ${teacher.status}
                    </span>

                </td>


                <td>

                    <div
                        class="teacher-action-buttons"
                    >

                        <button
                            class="teacher-action teacher-edit"
                            onclick="editTeacher('${teacher.id}')"
                            title="Edit"
                        >
                            ✏️
                        </button>


                        <button
                            class="teacher-action teacher-delete"
                            onclick="deleteTeacher('${teacher.id}')"
                            title="Delete"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            teacherTableBody.appendChild(row);

        }
    );


    document.getElementById(
        "teacherResultCount"
    ).textContent =

        `${filteredTeachers.length} teacher${filteredTeachers.length !== 1
            ? "s"
            : ""
        }`;


    updateTeacherStatistics();

}



// EDIT TEACHER


function editTeacher(id) {

    const teacher =
        teachers.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!teacher) {

        return;

    }


    editTeacherId.value =
        teacher.id;

    teacherName.value =
        teacher.name;

    teacherDOB.value =
        teacher.dob;

    teacherSubject.value =
        teacher.subject;

    teacherGender.value =
        teacher.gender;

    teacherPhone.value =
        teacher.phone;

    teacherEmail.value =
        teacher.email;

    teacherQualification.value =
        teacher.qualification;

    teacherExperience.value =
        teacher.experience;

    teacherAddress.value =
        teacher.address;


    document.getElementById(
        "teacherModalTitle"
    ).textContent =
        "Edit Teacher";


    openTeacherForm();

}



// DELETE TEACHER


function deleteTeacher(id) {

    const teacher =
        teachers.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!teacher) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${teacher.name}?`
        );


    if (!confirmed) {

        return;

    }


    teachers =
        teachers.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveTeachers();

    renderTeachers();


    alert(
        "Teacher deleted successfully!"
    );

}



// SEARCH


searchTeacher.addEventListener(
    "input",
    renderTeachers
);



// SUBJECT FILTER


filterSubject.addEventListener(
    "change",
    renderTeachers
);



// STATISTICS


function updateTeacherStatistics() {

    const total =
        teachers.length;


    const active =
        teachers.filter(
            function (teacher) {

                return teacher.status === "Active";

            }
        ).length;


    const male =
        teachers.filter(
            function (teacher) {

                return teacher.gender === "Male";

            }
        ).length;


    const female =
        teachers.filter(
            function (teacher) {

                return teacher.gender === "Female";

            }
        ).length;


    document.getElementById(
        "totalTeachers"
    ).textContent = total;


    document.getElementById(
        "activeTeachers"
    ).textContent = active;


    document.getElementById(
        "maleTeachers"
    ).textContent = male;


    document.getElementById(
        "femaleTeachers"
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



// LOGIN CHECK


if (
    localStorage.getItem(
        "schoolLoggedIn"
    ) !== "true"
) {

    window.location.href =
        "index.html";

} else {

    renderTeachers();

}