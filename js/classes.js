//    CLASSES MANAGEMENT




//    LOGIN CHECK


if (localStorage.getItem("schoolLoggedIn") !== "true") {
    window.location.href = "index.html";
}



//    DOM ELEMENTS


const classModal = document.getElementById("classModal");

const classForm = document.getElementById("classForm");

const addClassBtn = document.getElementById("addClassBtn");

const emptyAddBtn = document.getElementById("emptyAddBtn");

const closeModal = document.getElementById("closeModal");

const cancelBtn = document.getElementById("cancelBtn");

const modalTitle = document.getElementById("modalTitle");

const classNameInput = document.getElementById("className");

const sectionInput = document.getElementById("section");

const roomInput = document.getElementById("room");

const classTeacherInput = document.getElementById("classTeacher");

const subjectsInput = document.getElementById("subjects");

const searchClass = document.getElementById("searchClass");

const classFilter = document.getElementById("classFilter");

const classesTableBody =
    document.getElementById("classesTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalClasses =
    document.getElementById("totalClasses");

const totalStudents =
    document.getElementById("totalStudents");

const totalSubjects =
    document.getElementById("totalSubjects");

const totalClassTeachers =
    document.getElementById("totalClassTeachers");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");



//    DATA


let classes =
    JSON.parse(localStorage.getItem("schoolClasses")) || [];

let students =
    JSON.parse(localStorage.getItem("schoolStudents")) || [];

let teachers =
    JSON.parse(localStorage.getItem("schoolTeachers")) || [];

let editClassId = null;



//    SAVE DATA


function saveClasses() {

    localStorage.setItem(
        "schoolClasses",
        JSON.stringify(classes)
    );

}



//    LOAD TEACHERS


function loadTeachers() {

    classTeacherInput.innerHTML = `
        <option value="">Select Class Teacher</option>
    `;

    teachers.forEach(teacher => {

        const option =
            document.createElement("option");

        option.value = teacher.id;

        option.textContent =
            `${teacher.name} (${teacher.subject})`;

        classTeacherInput.appendChild(option);

    });

}



//    GET STUDENT COUNT


function getStudentCount(className) {

    return students.filter(
        student => student.class === className
    ).length;

}



//    GET TEACHER NAME


function getTeacherName(teacherId) {

    const teacher =
        teachers.find(
            teacher => teacher.id === teacherId
        );

    return teacher ? teacher.name : "Not Assigned";

}



//    RENDER CLASSES


function renderClasses() {

    const searchValue =
        searchClass.value
            .toLowerCase()
            .trim();

    const filterValue =
        classFilter.value;


    const filteredClasses =
        classes.filter(item => {

            const matchesSearch =
                item.className
                    .toLowerCase()
                    .includes(searchValue) ||

                item.section
                    .toLowerCase()
                    .includes(searchValue) ||

                item.room
                    .toLowerCase()
                    .includes(searchValue);


            const matchesFilter =
                filterValue === "" ||
                item.className === filterValue;


            return matchesSearch && matchesFilter;

        });


    classesTableBody.innerHTML = "";


    if (filteredClasses.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    filteredClasses.forEach((item, index) => {

        const studentCount =
            getStudentCount(item.className);

        const teacherName =
            getTeacherName(item.classTeacherId);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>
                <strong>${item.className}</strong>
            </td>

            <td>
                Section ${item.section}
            </td>

            <td>
                ${item.room || "-"}
            </td>

            <td>
                ${teacherName}
            </td>

            <td>
                <span class="subject-count">
                    ${item.subjects.length}
                </span>
                Subjects
            </td>

            <td>
                <strong>${studentCount}</strong>
            </td>

            <td>
                <span class="status-badge">
                    ${item.status}
                </span>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="editClass('${item.id}')"
                        title="Edit"
                    >
                        ✏️
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteClass('${item.id}')"
                        title="Delete"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        classesTableBody.appendChild(row);

    });

}



//    UPDATE STATISTICS


function updateStats() {

    totalClasses.textContent =
        classes.length;


    totalStudents.textContent =
        students.length;


    let subjectSet =
        new Set();


    classes.forEach(item => {

        item.subjects.forEach(subject => {

            subjectSet.add(
                subject.toLowerCase()
            );

        });

    });


    totalSubjects.textContent =
        subjectSet.size;


    const teachersAssigned =
        classes.filter(
            item => item.classTeacherId
        ).length;


    totalClassTeachers.textContent =
        teachersAssigned;

}



//    OPEN MODAL


function openModal() {

    classModal.classList.add("show");

}



//    CLOSE MODAL


function closeClassModal() {

    classModal.classList.remove("show");

    classForm.reset();

    editClassId = null;

    modalTitle.textContent =
        "Add New Class";

}



//    ADD CLASS


addClassBtn.addEventListener(
    "click",
    () => {

        editClassId = null;

        classForm.reset();

        modalTitle.textContent =
            "Add New Class";

        openModal();

    }
);



//    EMPTY STATE ADD BUTTON


emptyAddBtn.addEventListener(
    "click",
    () => {

        editClassId = null;

        classForm.reset();

        modalTitle.textContent =
            "Add New Class";

        openModal();

    }
);



//    CLOSE BUTTONS


closeModal.addEventListener(
    "click",
    closeClassModal
);

cancelBtn.addEventListener(
    "click",
    closeClassModal
);



//    SAVE CLASS


classForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const className =
            classNameInput.value;

        const section =
            sectionInput.value;

        const room =
            roomInput.value.trim();

        const classTeacherId =
            classTeacherInput.value;

        const subjects =
            subjectsInput.value
                .split(",")
                .map(subject => subject.trim())
                .filter(subject => subject !== "");


        if (subjects.length === 0) {

            alert("Please enter at least one subject.");

            return;

        }



        //    DUPLICATE CHECK


        const duplicate =
            classes.find(item =>

                item.className === className &&
                item.section === section &&
                item.id !== editClassId

            );


        if (duplicate) {

            alert(
                `${className} - Section ${section} already exists.`
            );

            return;

        }



        //    EDIT


        if (editClassId) {

            const classIndex =
                classes.findIndex(
                    item => item.id === editClassId
                );


            if (classIndex !== -1) {

                classes[classIndex] = {

                    ...classes[classIndex],

                    className,
                    section,
                    room,
                    classTeacherId,
                    subjects

                };

            }


            alert("Class updated successfully.");

        }



        //    ADD


        else {

            const newClass = {

                id: Date.now().toString(),

                className,

                section,

                room,

                classTeacherId,

                subjects,

                status: "Active",

                createdAt:
                    new Date().toISOString()

            };


            classes.push(newClass);


            alert("Class added successfully.");

        }


        saveClasses();

        renderClasses();

        updateStats();

        closeClassModal();

    }
);



//    EDIT CLASS


window.editClass = function (id) {

    const item =
        classes.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    editClassId = id;


    classNameInput.value =
        item.className;

    sectionInput.value =
        item.section;

    roomInput.value =
        item.room;

    classTeacherInput.value =
        item.classTeacherId || "";

    subjectsInput.value =
        item.subjects.join(", ");


    modalTitle.textContent =
        "Edit Class";


    openModal();

};



//    DELETE CLASS


window.deleteClass = function (id) {

    const item =
        classes.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete ${item.className} - Section ${item.section}?`
        );


    if (!confirmDelete) {
        return;
    }


    classes =
        classes.filter(
            item => item.id !== id
        );


    saveClasses();

    renderClasses();

    updateStats();


    alert("Class deleted successfully.");

};



//    SEARCH


searchClass.addEventListener(
    "input",
    renderClasses
);



//    FILTER


classFilter.addEventListener(
    "change",
    renderClasses
);



//    MOBILE SIDEBAR


menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("active");

    }
);



//    LOGOUT


logoutBtn.addEventListener(
    "click",
    () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if (!confirmLogout) {
            return;
        }


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
);



//    NOTIFICATION


notificationBtn.addEventListener(
    "click",
    () => {

        alert(
            "You have 3 new notifications."
        );

    }
);



//    CLOSE MODAL WHEN CLICK OUTSIDE


classModal.addEventListener(
    "click",
    function (event) {

        if (event.target === classModal) {

            closeClassModal();

        }

    }
);



//    INITIAL LOAD


loadTeachers();

renderClasses();

updateStats();