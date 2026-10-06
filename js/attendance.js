//  ATTENDANCE MANAGEMENT SYSTEM




//  ELEMENTS


const attendanceDate =
    document.getElementById("attendanceDate");

const attendanceClass =
    document.getElementById("attendanceClass");

const loadAttendance =
    document.getElementById("loadAttendance");

const attendanceTableBody =
    document.getElementById("attendanceTableBody");

const attendanceEmpty =
    document.getElementById("attendanceEmpty");

const attendanceTableInfo =
    document.getElementById("attendanceTableInfo");

const saveAttendance =
    document.getElementById("saveAttendance");

const markAllPresent =
    document.getElementById("markAllPresent");


// Statistics

const totalCount =
    document.getElementById("totalCount");

const presentCount =
    document.getElementById("presentCount");

const absentCount =
    document.getElementById("absentCount");

const leaveCount =
    document.getElementById("leaveCount");

const attendancePercentage =
    document.getElementById(
        "attendancePercentage"
    );



// LOAD STUDENTS


let students =
    JSON.parse(
        localStorage.getItem(
            "schoolStudents"
        )
    ) || [];



// ATTENDANCE DATA


let attendanceData =
    JSON.parse(
        localStorage.getItem(
            "schoolAttendance"
        )
    ) || {};


// Current attendance

let currentStudents = [];



// SET TODAY DATE


function setTodayDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    attendanceDate.value =
        `${year}-${month}-${day}`;

}

setTodayDate();



// LOAD STUDENTS BUTTON


loadAttendance.addEventListener(
    "click",
    loadStudentAttendance
);


function loadStudentAttendance() {

    const selectedDate =
        attendanceDate.value;

    const selectedClass =
        attendanceClass.value;


    // Validation

    if (!selectedDate) {

        alert(
            "Please select a date."
        );

        return;

    }


    if (!selectedClass) {

        alert(
            "Please select a class."
        );

        return;

    }


    // Get students of selected class

    currentStudents =
        students.filter(
            function (student) {

                return (
                    student.class ===
                    selectedClass
                );

            }
        );


    // No students

    if (
        currentStudents.length === 0
    ) {

        attendanceTableBody.innerHTML = "";

        attendanceEmpty.style.display =
            "block";

        attendanceTableInfo.textContent =
            `No students found in ${selectedClass}.`;

        resetStatistics();

        return;

    }


    attendanceEmpty.style.display =
        "none";


    attendanceTableInfo.textContent =
        `${selectedClass} • ${formatDate(
            selectedDate
        )} • ${currentStudents.length
        } students`;


    renderAttendanceTable();

}



// RENDER TABLE


function renderAttendanceTable() {

    const selectedDate =
        attendanceDate.value;

    const selectedClass =
        attendanceClass.value;


    const attendanceKey =
        `${selectedDate}_${selectedClass}`;


    const savedAttendance =
        attendanceData[
        attendanceKey
        ] || {};


    attendanceTableBody.innerHTML = "";


    currentStudents.forEach(
        function (student, index) {

            const savedStatus =
                savedAttendance[
                student.id
                ] || "Present";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>


                <td>

                    <div class="attendance-student-info">

                        <div class="attendance-avatar">

                            ${getInitials(
                student.name
            )}

                        </div>

                        <div>

                            <strong>
                                ${student.name}
                            </strong>

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

                    <div
                        class="attendance-status-buttons"
                        data-student-id="${student.id}"
                    >

                        <button
                            type="button"
                            class="
                                attendance-status-button
                                present
                                ${savedStatus ===
                    "Present"
                    ? "selected"
                    : ""
                }
                            "
                            onclick="
                                setAttendanceStatus(
                                    '${student.id}',
                                    'Present'
                                )
                            "
                        >
                            ✓ Present
                        </button>


                        <button
                            type="button"
                            class="
                                attendance-status-button
                                absent
                                ${savedStatus ===
                    "Absent"
                    ? "selected"
                    : ""
                }
                            "
                            onclick="
                                setAttendanceStatus(
                                    '${student.id}',
                                    'Absent'
                                )
                            "
                        >
                            ✕ Absent
                        </button>


                        <button
                            type="button"
                            class="
                                attendance-status-button
                                leave
                                ${savedStatus ===
                    "Leave"
                    ? "selected"
                    : ""
                }
                            "
                            onclick="
                                setAttendanceStatus(
                                    '${student.id}',
                                    'Leave'
                                )
                            "
                        >
                            • Leave
                        </button>

                    </div>

                </td>

            `;


            attendanceTableBody.appendChild(row);

        }
    );


    updateStatistics();

}



// SET ATTENDANCE STATUS


function setAttendanceStatus(
    studentId,
    status
) {

    const selectedDate =
        attendanceDate.value;

    const selectedClass =
        attendanceClass.value;


    const attendanceKey =
        `${selectedDate}_${selectedClass}`;


    // Create object if not exists

    if (
        !attendanceData[
        attendanceKey
        ]
    ) {

        attendanceData[
            attendanceKey
        ] = {};

    }


    attendanceData[
        attendanceKey
    ][studentId] = status;


    // Update selected buttons

    const container =
        document.querySelector(
            `[data-student-id="${studentId}"]`
        );


    if (!container) {

        return;

    }


    const buttons =
        container.querySelectorAll(
            ".attendance-status-button"
        );


    buttons.forEach(
        function (button) {

            button.classList.remove(
                "selected"
            );

        }
    );


    const selectedButton =
        container.querySelector(
            `.${status.toLowerCase()}`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "selected"
        );

    }


    updateStatistics();

}



// MARK ALL PRESENT


markAllPresent.addEventListener(
    "click",
    function () {

        if (
            currentStudents.length === 0
        ) {

            alert(
                "Please load students first."
            );

            return;

        }


        const selectedDate =
            attendanceDate.value;

        const selectedClass =
            attendanceClass.value;


        const attendanceKey =
            `${selectedDate}_${selectedClass}`;


        attendanceData[
            attendanceKey
        ] = {};


        currentStudents.forEach(
            function (student) {

                attendanceData[
                    attendanceKey
                ][student.id] =
                    "Present";

            }
        );


        renderAttendanceTable();

    }
);



// SAVE ATTENDANCE


saveAttendance.addEventListener(
    "click",
    function () {

        if (
            currentStudents.length === 0
        ) {

            alert(
                "Please load students first."
            );

            return;

        }


        const selectedDate =
            attendanceDate.value;

        const selectedClass =
            attendanceClass.value;


        const attendanceKey =
            `${selectedDate}_${selectedClass}`;


        // Make sure every student has status

        if (
            !attendanceData[
            attendanceKey
            ]
        ) {

            attendanceData[
                attendanceKey
            ] = {};

        }


        currentStudents.forEach(
            function (student) {

                if (
                    !attendanceData[
                    attendanceKey
                    ][student.id]
                ) {

                    attendanceData[
                        attendanceKey
                    ][student.id] =
                        "Present";

                }

            }
        );


        localStorage.setItem(
            "schoolAttendance",
            JSON.stringify(
                attendanceData
            )
        );


        alert(
            "Attendance saved successfully!"
        );


        updateStatistics();

    }
);



// STATISTICS


function updateStatistics() {

    const total =
        currentStudents.length;


    if (total === 0) {

        resetStatistics();

        return;

    }


    const selectedDate =
        attendanceDate.value;

    const selectedClass =
        attendanceClass.value;


    const attendanceKey =
        `${selectedDate}_${selectedClass}`;


    const currentAttendance =
        attendanceData[
        attendanceKey
        ] || {};


    let present = 0;

    let absent = 0;

    let leave = 0;


    currentStudents.forEach(
        function (student) {

            const status =
                currentAttendance[
                student.id
                ] || "Present";


            if (
                status === "Present"
            ) {

                present++;

            } else if (
                status === "Absent"
            ) {

                absent++;

            } else if (
                status === "Leave"
            ) {

                leave++;

            }

        }
    );


    const percentage =
        total > 0
            ? Math.round(
                (present / total) * 100
            )
            : 0;


    totalCount.textContent =
        total;

    presentCount.textContent =
        present;

    absentCount.textContent =
        absent;

    leaveCount.textContent =
        leave;

    attendancePercentage.textContent =
        `${percentage}%`;

}



// RESET STATISTICS


function resetStatistics() {

    totalCount.textContent = "0";

    presentCount.textContent = "0";

    absentCount.textContent = "0";

    leaveCount.textContent = "0";

    attendancePercentage.textContent =
        "0%";

}



// FORMAT DATE


function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



// GET INITIALS


function getInitials(name) {

    const words =
        name.trim().split(" ");


    if (
        words.length === 1
    ) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}



// MOBILE SIDEBAR


const sidebar =
    document.getElementById(
        "sidebar"
    );

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


menuToggle.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "show"
        );

    }
);



// LOGOUT


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


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

}