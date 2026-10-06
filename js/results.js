//    RESULTS MANAGEMENT




//    LOGIN CHECK


if (localStorage.getItem("schoolLoggedIn") !== "true") {

    window.location.href = "index.html";

}



//    DOM ELEMENTS


const resultModal =
    document.getElementById("resultModal");

const resultForm =
    document.getElementById("resultForm");

const addResultBtn =
    document.getElementById("addResultBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const modalTitle =
    document.getElementById("modalTitle");

const studentSelect =
    document.getElementById("studentSelect");

const examSelect =
    document.getElementById("examSelect");

const subjectDisplay =
    document.getElementById("subjectDisplay");

const totalMarksDisplay =
    document.getElementById("totalMarksDisplay");

const passingMarksDisplay =
    document.getElementById("passingMarksDisplay");

const marksObtained =
    document.getElementById("marksObtained");

const previewPercentage =
    document.getElementById("previewPercentage");

const previewGrade =
    document.getElementById("previewGrade");

const previewStatus =
    document.getElementById("previewStatus");

const searchResult =
    document.getElementById("searchResult");

const resultClassFilter =
    document.getElementById("resultClassFilter");

const resultStatusFilter =
    document.getElementById("resultStatusFilter");

const resultTableBody =
    document.getElementById("resultTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalResults =
    document.getElementById("totalResults");

const passedResults =
    document.getElementById("passedResults");

const failedResults =
    document.getElementById("failedResults");

const averagePercentage =
    document.getElementById("averagePercentage");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");



//    DATA


let students =
    JSON.parse(
        localStorage.getItem("schoolStudents")
    ) || [];


let exams =
    JSON.parse(
        localStorage.getItem("schoolExams")
    ) || [];


let results =
    JSON.parse(
        localStorage.getItem("schoolResults")
    ) || [];


let editResultId = null;



//    SAVE RESULTS


function saveResults() {

    localStorage.setItem(
        "schoolResults",
        JSON.stringify(results)
    );

}



//    LOAD STUDENTS


function loadStudents() {

    studentSelect.innerHTML = `
        <option value="">
            Select Student
        </option>
    `;


    students.forEach(student => {

        const option =
            document.createElement("option");


        option.value =
            student.id;


        option.textContent =
            `${student.name} - ${student.studentId} - ${student.class}`;


        studentSelect.appendChild(option);

    });

}



//    LOAD EXAMS


function loadExams() {

    examSelect.innerHTML = `
        <option value="">
            Select Examination
        </option>
    `;


    exams.forEach(exam => {

        const option =
            document.createElement("option");


        option.value =
            exam.id;


        option.textContent =
            `${exam.name} - ${exam.className} - ${exam.subject}`;


        examSelect.appendChild(option);

    });

}



//    GET GRADE


function getGrade(percentage) {

    if (percentage >= 90) {
        return "A+";
    }

    if (percentage >= 80) {
        return "A";
    }

    if (percentage >= 70) {
        return "B+";
    }

    if (percentage >= 60) {
        return "B";
    }

    if (percentage >= 50) {
        return "C";
    }

    if (percentage >= 40) {
        return "D";
    }

    return "F";

}



//    CALCULATE RESULT


function calculateResult() {

    const examId =
        examSelect.value;


    const marks =
        Number(
            marksObtained.value
        );


    const exam =
        exams.find(
            item =>
                item.id === examId
        );


    if (!exam) {

        previewPercentage.textContent =
            "0%";

        previewGrade.textContent =
            "-";

        previewStatus.textContent =
            "-";

        return;

    }


    subjectDisplay.value =
        exam.subject;


    totalMarksDisplay.value =
        exam.totalMarks;


    passingMarksDisplay.value =
        exam.passingMarks;


    if (
        marksObtained.value === ""
    ) {

        previewPercentage.textContent =
            "0%";

        previewGrade.textContent =
            "-";

        previewStatus.textContent =
            "-";

        return;

    }


    if (marks > exam.totalMarks) {

        previewPercentage.textContent =
            "Invalid";

        previewGrade.textContent =
            "-";

        previewStatus.textContent =
            "-";

        return;

    }


    const percentage =
        (
            marks /
            exam.totalMarks
        ) * 100;


    const roundedPercentage =
        percentage.toFixed(2);


    const grade =
        getGrade(percentage);


    const status =
        marks >= exam.passingMarks
            ? "Pass"
            : "Fail";


    previewPercentage.textContent =
        `${roundedPercentage}%`;


    previewGrade.textContent =
        grade;


    previewStatus.textContent =
        status;

}



//    EXAM CHANGE


examSelect.addEventListener(
    "change",
    () => {

        marksObtained.value = "";

        calculateResult();

    }
);



//    MARKS CHANGE


marksObtained.addEventListener(
    "input",
    calculateResult
);



//    OPEN MODAL


function openModal() {

    resultModal.classList.add("show");

}



//    CLOSE MODAL


function closeResultModal() {

    resultModal.classList.remove("show");

    resultForm.reset();

    subjectDisplay.value = "";

    totalMarksDisplay.value = "";

    passingMarksDisplay.value = "";

    previewPercentage.textContent =
        "0%";

    previewGrade.textContent =
        "-";

    previewStatus.textContent =
        "-";

    editResultId = null;

    modalTitle.textContent =
        "Add Student Result";

}



//    ADD RESULT BUTTON


addResultBtn.addEventListener(
    "click",
    () => {

        editResultId = null;

        resultForm.reset();

        subjectDisplay.value = "";

        totalMarksDisplay.value = "";

        passingMarksDisplay.value = "";

        modalTitle.textContent =
            "Add Student Result";

        openModal();

    }
);



//    EMPTY BUTTON


emptyAddBtn.addEventListener(
    "click",
    () => {

        editResultId = null;

        resultForm.reset();

        modalTitle.textContent =
            "Add Student Result";

        openModal();

    }
);



//    CLOSE BUTTON


closeModal.addEventListener(
    "click",
    closeResultModal
);


cancelBtn.addEventListener(
    "click",
    closeResultModal
);



//    SAVE RESULT


resultForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const studentId =
            studentSelect.value;


        const examId =
            examSelect.value;


        const marks =
            Number(
                marksObtained.value
            );


        const student =
            students.find(
                item =>
                    item.id === studentId
            );


        const exam =
            exams.find(
                item =>
                    item.id === examId
            );


        if (!student) {

            alert(
                "Please select a student."
            );

            return;

        }


        if (!exam) {

            alert(
                "Please select an examination."
            );

            return;

        }


        if (
            marks < 0 ||
            marks > exam.totalMarks
        ) {

            alert(
                `Marks must be between 0 and ${exam.totalMarks}.`
            );

            return;

        }


        const percentage =
            (
                marks /
                exam.totalMarks
            ) * 100;


        const grade =
            getGrade(percentage);


        const status =
            marks >= exam.passingMarks
                ? "Pass"
                : "Fail";




        const duplicate =
            results.find(item =>

                item.studentId === studentId &&

                item.examId === examId &&

                item.id !== editResultId

            );


        if (duplicate) {

            alert(
                "This student's result for this examination already exists."
            );

            return;

        }



        //    EDIT


        if (editResultId) {

            const resultIndex =
                results.findIndex(
                    item =>
                        item.id === editResultId
                );


            if (resultIndex !== -1) {

                results[resultIndex] = {

                    ...results[resultIndex],

                    studentId,

                    examId,

                    studentName:
                        student.name,

                    studentCode:
                        student.studentId,

                    className:
                        student.class,

                    examName:
                        exam.name,

                    subject:
                        exam.subject,

                    totalMarks:
                        exam.totalMarks,

                    passingMarks:
                        exam.passingMarks,

                    marksObtained:
                        marks,

                    percentage:
                        Number(
                            percentage.toFixed(2)
                        ),

                    grade,

                    status

                };

            }


            alert(
                "Result updated successfully."
            );

        }



        //    ADD


        else {

            const newResult = {

                id:
                    Date.now().toString(),

                studentId,

                examId,

                studentName:
                    student.name,

                studentCode:
                    student.studentId,

                className:
                    student.class,

                examName:
                    exam.name,

                subject:
                    exam.subject,

                totalMarks:
                    exam.totalMarks,

                passingMarks:
                    exam.passingMarks,

                marksObtained:
                    marks,

                percentage:
                    Number(
                        percentage.toFixed(2)
                    ),

                grade,

                status,

                createdAt:
                    new Date().toISOString()

            };


            results.push(newResult);


            alert(
                "Result added successfully."
            );

        }


        saveResults();

        renderResults();

        updateStats();

        closeResultModal();

    }
);



//    RENDER RESULTS


function renderResults() {

    const searchValue =
        searchResult.value
            .toLowerCase()
            .trim();


    const classValue =
        resultClassFilter.value;


    const statusValue =
        resultStatusFilter.value;


    const filteredResults =
        results.filter(result => {

            const matchesSearch =

                result.studentName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                result.studentCode
                    .toLowerCase()
                    .includes(searchValue)

                ||

                result.examName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                result.subject
                    .toLowerCase()
                    .includes(searchValue);


            const matchesClass =
                classValue === "" ||
                result.className === classValue;


            const matchesStatus =
                statusValue === "" ||
                result.status === statusValue;


            return (
                matchesSearch &&
                matchesClass &&
                matchesStatus
            );

        });


    resultTableBody.innerHTML = "";


    if (
        filteredResults.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredResults.forEach(
        (result, index) => {

            const statusClass =
                result.status === "Pass"
                    ? "result-pass"
                    : "result-fail";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    <strong>
                        ${result.studentName}
                    </strong>
                </td>

                <td>
                    ${result.studentCode}
                </td>

                <td>
                    ${result.examName}
                </td>

                <td>
                    ${result.className}
                </td>

                <td>
                    ${result.subject}
                </td>

                <td>
                    ${result.marksObtained}
                    /
                    ${result.totalMarks}
                </td>

                <td>
                    ${result.percentage}%
                </td>

                <td>

                    <span class="grade-badge">
                        ${result.grade}
                    </span>

                </td>

                <td>

                    <span
                        class="result-status ${statusClass}"
                    >
                        ${result.status}
                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editResult('${result.id}')"
                            title="Edit">

                            ✏️

                        </button>


                        <button
                            class="action-btn delete-btn"
                            onclick="deleteResult('${result.id}')"
                            title="Delete">

                            🗑️

                        </button>

                    </div>

                </td>

            `;


            resultTableBody.appendChild(row);

        }
    );

}



//    UPDATE STATISTICS


function updateStats() {

    totalResults.textContent =
        results.length;


    const passed =
        results.filter(
            result =>
                result.status === "Pass"
        ).length;


    const failed =
        results.filter(
            result =>
                result.status === "Fail"
        ).length;


    passedResults.textContent =
        passed;


    failedResults.textContent =
        failed;


    if (results.length === 0) {

        averagePercentage.textContent =
            "0%";

        return;

    }


    const totalPercentage =
        results.reduce(
            (sum, result) =>
                sum + result.percentage,
            0
        );


    const average =
        totalPercentage /
        results.length;


    averagePercentage.textContent =
        `${average.toFixed(2)}%`;

}



//    EDIT RESULT


window.editResult = function (id) {

    const result =
        results.find(
            item =>
                item.id === id
        );


    if (!result) {
        return;
    }


    editResultId = id;


    studentSelect.value =
        result.studentId;


    examSelect.value =
        result.examId;


    subjectDisplay.value =
        result.subject;


    totalMarksDisplay.value =
        result.totalMarks;


    passingMarksDisplay.value =
        result.passingMarks;


    marksObtained.value =
        result.marksObtained;


    previewPercentage.textContent =
        `${result.percentage}%`;


    previewGrade.textContent =
        result.grade;


    previewStatus.textContent =
        result.status;


    modalTitle.textContent =
        "Edit Student Result";


    openModal();

};



//    DELETE RESULT


window.deleteResult = function (id) {

    const result =
        results.find(
            item =>
                item.id === id
        );


    if (!result) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete result of ${result.studentName}?`
        );


    if (!confirmDelete) {
        return;
    }


    results =
        results.filter(
            item =>
                item.id !== id
        );


    saveResults();

    renderResults();

    updateStats();


    alert(
        "Result deleted successfully."
    );

};



//    SEARCH


searchResult.addEventListener(
    "input",
    renderResults
);



//    CLASS FILTER


resultClassFilter.addEventListener(
    "change",
    renderResults
);



//    STATUS FILTER


resultStatusFilter.addEventListener(
    "change",
    renderResults
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


resultModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === resultModal
        ) {

            closeResultModal();

        }

    }
);



//    INITIAL LOAD


loadStudents();

loadExams();

renderResults();

updateStats();