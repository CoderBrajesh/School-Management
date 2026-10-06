//    EXAMINATION MANAGEMENT




//    LOGIN CHECK


if (localStorage.getItem("schoolLoggedIn") !== "true") {

    window.location.href = "index.html";

}



//    DOM ELEMENTS


const examModal =
    document.getElementById("examModal");

const examForm =
    document.getElementById("examForm");

const addExamBtn =
    document.getElementById("addExamBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const modalTitle =
    document.getElementById("modalTitle");

const examNameInput =
    document.getElementById("examName");

const examClassInput =
    document.getElementById("examClass");

const examSubjectInput =
    document.getElementById("examSubject");

const examDateInput =
    document.getElementById("examDate");

const examTimeInput =
    document.getElementById("examTime");

const totalMarksInput =
    document.getElementById("totalMarks");

const passingMarksInput =
    document.getElementById("passingMarks");

const examDescriptionInput =
    document.getElementById("examDescription");

const searchExam =
    document.getElementById("searchExam");

const examClassFilter =
    document.getElementById("examClassFilter");

const statusFilter =
    document.getElementById("statusFilter");

const examTableBody =
    document.getElementById("examTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalExams =
    document.getElementById("totalExams");

const upcomingExams =
    document.getElementById("upcomingExams");

const ongoingExams =
    document.getElementById("ongoingExams");

const totalSubjects =
    document.getElementById("totalSubjects");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");



//    DATA


let exams =
    JSON.parse(
        localStorage.getItem("schoolExams")
    ) || [];


let editExamId = null;



//    SAVE DATA


function saveExams() {

    localStorage.setItem(
        "schoolExams",
        JSON.stringify(exams)
    );

}



//    FORMAT DATE


function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



//    GET EXAM STATUS


function getExamStatus(exam) {

    if (!exam.date) {
        return "Upcoming";
    }


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const examDate =
        new Date(
            exam.date + "T00:00:00"
        );


    examDate.setHours(
        0,
        0,
        0,
        0
    );


    if (examDate > today) {

        return "Upcoming";

    }


    if (
        examDate.getTime() ===
        today.getTime()
    ) {

        return "Ongoing";

    }


    return "Completed";

}



//    STATUS CLASS


function getStatusClass(status) {

    if (status === "Upcoming") {

        return "status-upcoming";

    }


    if (status === "Ongoing") {

        return "status-ongoing";

    }


    return "status-completed";

}



//    RENDER EXAMS


function renderExams() {

    const searchValue =
        searchExam.value
            .toLowerCase()
            .trim();


    const classValue =
        examClassFilter.value;


    const statusValue =
        statusFilter.value;


    const filteredExams =
        exams.filter(exam => {

            const status =
                getExamStatus(exam);


            const matchesSearch =

                exam.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                exam.subject
                    .toLowerCase()
                    .includes(searchValue)

                ||

                exam.className
                    .toLowerCase()
                    .includes(searchValue);


            const matchesClass =
                classValue === "" ||
                exam.className === classValue;


            const matchesStatus =
                statusValue === "" ||
                status === statusValue;


            return (
                matchesSearch &&
                matchesClass &&
                matchesStatus
            );

        });


    examTableBody.innerHTML = "";


    if (filteredExams.length === 0) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredExams.forEach(
        (exam, index) => {

            const status =
                getExamStatus(exam);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    <strong>
                        ${exam.name}
                    </strong>
                </td>

                <td>
                    ${exam.className}
                </td>

                <td>
                    ${exam.subject}
                </td>

                <td>
                    ${formatDate(exam.date)}
                    ${exam.time
                    ? `<br>
                           <small>${exam.time}</small>`
                    : ""
                }
                </td>

                <td>
                    ${exam.totalMarks}
                </td>

                <td>
                    ${exam.passingMarks}
                </td>

                <td>

                    <span
                        class="status-badge ${getStatusClass(status)}"
                    >
                        ${status}
                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editExam('${exam.id}')"
                            title="Edit"
                        >
                            ✏️
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteExam('${exam.id}')"
                            title="Delete"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            examTableBody.appendChild(row);

        }
    );

}



//    UPDATE STATISTICS


function updateStats() {

    totalExams.textContent =
        exams.length;


    const upcoming =
        exams.filter(
            exam =>
                getExamStatus(exam) ===
                "Upcoming"
        ).length;


    const ongoing =
        exams.filter(
            exam =>
                getExamStatus(exam) ===
                "Ongoing"
        ).length;


    upcomingExams.textContent =
        upcoming;


    ongoingExams.textContent =
        ongoing;


    const subjects =
        new Set();


    exams.forEach(exam => {

        if (exam.subject) {

            subjects.add(
                exam.subject
                    .toLowerCase()
            );

        }

    });


    totalSubjects.textContent =
        subjects.size;

}



//    OPEN MODAL


function openModal() {

    examModal.classList.add("show");

}



//    CLOSE MODAL


function closeExamModal() {

    examModal.classList.remove("show");

    examForm.reset();

    editExamId = null;

    modalTitle.textContent =
        "Add New Examination";

}



//    ADD EXAM BUTTON


addExamBtn.addEventListener(
    "click",
    () => {

        editExamId = null;

        examForm.reset();

        modalTitle.textContent =
            "Add New Examination";

        openModal();

    }
);



//    EMPTY STATE BUTTON


emptyAddBtn.addEventListener(
    "click",
    () => {

        editExamId = null;

        examForm.reset();

        modalTitle.textContent =
            "Add New Examination";

        openModal();

    }
);



//    CLOSE MODAL


closeModal.addEventListener(
    "click",
    closeExamModal
);


cancelBtn.addEventListener(
    "click",
    closeExamModal
);



//    SAVE EXAMINATION


examForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            examNameInput.value.trim();


        const className =
            examClassInput.value;


        const subject =
            examSubjectInput.value.trim();


        const date =
            examDateInput.value;


        const time =
            examTimeInput.value;


        const totalMarks =
            Number(
                totalMarksInput.value
            );


        const passingMarks =
            Number(
                passingMarksInput.value
            );


        const description =
            examDescriptionInput.value.trim();



        //    MARKS VALIDATION


        if (
            passingMarks >
            totalMarks
        ) {

            alert(
                "Passing marks cannot be greater than total marks."
            );

            return;

        }


        if (totalMarks <= 0) {

            alert(
                "Total marks must be greater than 0."
            );

            return;

        }



        //    EDIT EXAM


        if (editExamId) {

            const examIndex =
                exams.findIndex(
                    exam =>
                        exam.id ===
                        editExamId
                );


            if (examIndex !== -1) {

                exams[examIndex] = {

                    ...exams[examIndex],

                    name,

                    className,

                    subject,

                    date,

                    time,

                    totalMarks,

                    passingMarks,

                    description

                };

            }


            alert(
                "Examination updated successfully."
            );

        }



        //    ADD EXAM


        else {

            const newExam = {

                id:
                    Date.now().toString(),

                name,

                className,

                subject,

                date,

                time,

                totalMarks,

                passingMarks,

                description,

                createdAt:
                    new Date().toISOString()

            };


            exams.push(newExam);


            alert(
                "Examination added successfully."
            );

        }


        saveExams();

        renderExams();

        updateStats();

        closeExamModal();

    }
);



//    EDIT EXAM


window.editExam = function (id) {

    const exam =
        exams.find(
            exam =>
                exam.id === id
        );


    if (!exam) {
        return;
    }


    editExamId = id;


    examNameInput.value =
        exam.name;

    examClassInput.value =
        exam.className;

    examSubjectInput.value =
        exam.subject;

    examDateInput.value =
        exam.date;

    examTimeInput.value =
        exam.time || "";

    totalMarksInput.value =
        exam.totalMarks;

    passingMarksInput.value =
        exam.passingMarks;

    examDescriptionInput.value =
        exam.description || "";


    modalTitle.textContent =
        "Edit Examination";


    openModal();

};



//    DELETE EXAM


window.deleteExam = function (id) {

    const exam =
        exams.find(
            exam =>
                exam.id === id
        );


    if (!exam) {
        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${exam.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    exams =
        exams.filter(
            exam =>
                exam.id !== id
        );


    saveExams();

    renderExams();

    updateStats();


    alert(
        "Examination deleted successfully."
    );

};



//    SEARCH


searchExam.addEventListener(
    "input",
    renderExams
);



//    CLASS FILTER


examClassFilter.addEventListener(
    "change",
    renderExams
);



//    STATUS FILTER


statusFilter.addEventListener(
    "change",
    renderExams
);



//    MOBILE SIDEBAR


menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "active"
        );

    }
);



//    LOGOUT


logoutBtn.addEventListener(
    "click",
    () => {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


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



//    CLOSE MODAL OUTSIDE


examModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            examModal
        ) {

            closeExamModal();

        }

    }
);



//    INITIAL LOAD


renderExams();

updateStats();