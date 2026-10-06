//    FEES MANAGEMENT




//    LOGIN CHECK


if (localStorage.getItem("schoolLoggedIn") !== "true") {

    window.location.href = "index.html";

}



//    DOM ELEMENTS


const feeModal =
    document.getElementById("feeModal");

const feeForm =
    document.getElementById("feeForm");

const addFeeBtn =
    document.getElementById("addFeeBtn");

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

const totalFeeInput =
    document.getElementById("totalFee");

const paidAmountInput =
    document.getElementById("paidAmount");

const pendingAmountInput =
    document.getElementById("pendingAmount");

const paymentDateInput =
    document.getElementById("paymentDate");

const paymentMethodInput =
    document.getElementById("paymentMethod");

const feeTypeInput =
    document.getElementById("feeType");

const feeNotesInput =
    document.getElementById("feeNotes");

const previewTotal =
    document.getElementById("previewTotal");

const previewPaid =
    document.getElementById("previewPaid");

const previewPending =
    document.getElementById("previewPending");

const searchFee =
    document.getElementById("searchFee");

const feeClassFilter =
    document.getElementById("feeClassFilter");

const feeStatusFilter =
    document.getElementById("feeStatusFilter");

const feeTableBody =
    document.getElementById("feeTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalFees =
    document.getElementById("totalFees");

const totalPaid =
    document.getElementById("totalPaid");

const totalPending =
    document.getElementById("totalPending");

const totalRecords =
    document.getElementById("totalRecords");

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


let fees =
    JSON.parse(
        localStorage.getItem("schoolFees")
    ) || [];


let editFeeId = null;



//    SAVE FEES


function saveFees() {

    localStorage.setItem(
        "schoolFees",
        JSON.stringify(fees)
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



//    FORMAT CURRENCY


function formatCurrency(amount) {

    return "₹" +
        Number(amount || 0)
            .toLocaleString("en-IN");

}



//    GET STATUS


function getFeeStatus(total, paid) {

    if (paid <= 0) {

        return "Pending";

    }


    if (paid >= total) {

        return "Paid";

    }


    return "Partial";

}



//    CALCULATE PENDING


function calculatePending() {

    const total =
        Number(totalFeeInput.value) || 0;

    const paid =
        Number(paidAmountInput.value) || 0;


    if (paid > total) {

        pendingAmountInput.value = 0;

        previewPending.textContent =
            formatCurrency(0);

        return;

    }


    const pending =
        total - paid;


    pendingAmountInput.value =
        pending;


    previewTotal.textContent =
        formatCurrency(total);


    previewPaid.textContent =
        formatCurrency(paid);


    previewPending.textContent =
        formatCurrency(pending);

}



//    RENDER FEES


function renderFees() {

    const searchValue =
        searchFee.value
            .toLowerCase()
            .trim();


    const classValue =
        feeClassFilter.value;


    const statusValue =
        feeStatusFilter.value;


    const filteredFees =
        fees.filter(fee => {

            const matchesSearch =

                fee.studentName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                fee.studentCode
                    .toLowerCase()
                    .includes(searchValue);


            const matchesClass =
                classValue === "" ||
                fee.className === classValue;


            const matchesStatus =
                statusValue === "" ||
                fee.status === statusValue;


            return (
                matchesSearch &&
                matchesClass &&
                matchesStatus
            );

        });


    feeTableBody.innerHTML = "";


    if (
        filteredFees.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredFees.forEach(
        (fee, index) => {

            let statusClass =
                "status-pending";


            if (
                fee.status === "Paid"
            ) {

                statusClass =
                    "status-paid";

            }


            if (
                fee.status === "Partial"
            ) {

                statusClass =
                    "status-partial";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    <strong>
                        ${fee.studentName}
                    </strong>
                </td>

                <td>
                    ${fee.studentCode}
                </td>

                <td>
                    ${fee.className}
                </td>

                <td>
                    ${formatCurrency(
                fee.totalFee
            )}
                </td>

                <td>
                    ${formatCurrency(
                fee.paidAmount
            )}
                </td>

                <td>
                    ${formatCurrency(
                fee.pendingAmount
            )}
                </td>

                <td>
                    ${formatDate(
                fee.paymentDate
            )}
                </td>

                <td>
                    ${fee.paymentMethod}
                </td>

                <td>

                    <span
                        class="fee-status ${statusClass}">
                        ${fee.status}
                    </span>

                </td>

                <td>

                    <div
                        class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editFee('${fee.id}')"
                            title="Edit">

                            ✏️

                        </button>


                        <button
                            class="action-btn delete-btn"
                            onclick="deleteFee('${fee.id}')"
                            title="Delete">

                            🗑️

                        </button>

                    </div>

                </td>

            `;


            feeTableBody.appendChild(row);

        }
    );

}



//    FORMAT DATE


function formatDate(dateString) {

    if (!dateString) {

        return "-";

    }


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



//    UPDATE STATISTICS


function updateStats() {

    let total =
        0;

    let paid =
        0;

    let pending =
        0;


    fees.forEach(fee => {

        total +=
            Number(fee.totalFee) || 0;

        paid +=
            Number(fee.paidAmount) || 0;

        pending +=
            Number(fee.pendingAmount) || 0;

    });


    totalFees.textContent =
        formatCurrency(total);


    totalPaid.textContent =
        formatCurrency(paid);


    totalPending.textContent =
        formatCurrency(pending);


    totalRecords.textContent =
        fees.length;

}



//    OPEN MODAL


function openModal() {

    feeModal.classList.add("show");

}



//    CLOSE MODAL


function closeFeeModal() {

    feeModal.classList.remove("show");

    feeForm.reset();

    pendingAmountInput.value =
        "";

    previewTotal.textContent =
        "₹0";

    previewPaid.textContent =
        "₹0";

    previewPending.textContent =
        "₹0";

    editFeeId = null;

    modalTitle.textContent =
        "Add Fee Record";

}



//    ADD FEE


addFeeBtn.addEventListener(
    "click",
    () => {

        editFeeId = null;

        feeForm.reset();

        modalTitle.textContent =
            "Add Fee Record";


        /* Today's date */

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        paymentDateInput.value =
            today;


        openModal();

    }
);



//    EMPTY ADD BUTTON


emptyAddBtn.addEventListener(
    "click",
    () => {

        editFeeId = null;

        feeForm.reset();

        modalTitle.textContent =
            "Add Fee Record";


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        paymentDateInput.value =
            today;


        openModal();

    }
);



//    CLOSE MODAL


closeModal.addEventListener(
    "click",
    closeFeeModal
);


cancelBtn.addEventListener(
    "click",
    closeFeeModal
);



//    AMOUNT INPUT


totalFeeInput.addEventListener(
    "input",
    calculatePending
);


paidAmountInput.addEventListener(
    "input",
    calculatePending
);



//    SAVE FEE


feeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const studentId =
            studentSelect.value;


        const totalFee =
            Number(
                totalFeeInput.value
            );


        const paidAmount =
            Number(
                paidAmountInput.value
            );


        const pendingAmount =
            totalFee - paidAmount;


        const paymentDate =
            paymentDateInput.value;


        const paymentMethod =
            paymentMethodInput.value;


        const feeType =
            feeTypeInput.value;


        const notes =
            feeNotesInput.value.trim();



        //    STUDENT VALIDATION


        const student =
            students.find(
                item =>
                    item.id === studentId
            );


        if (!student) {

            alert(
                "Please select a student."
            );

            return;

        }



        //    AMOUNT VALIDATION


        if (totalFee <= 0) {

            alert(
                "Total fee must be greater than 0."
            );

            return;

        }


        if (paidAmount < 0) {

            alert(
                "Paid amount cannot be negative."
            );

            return;

        }


        if (
            paidAmount >
            totalFee
        ) {

            alert(
                "Paid amount cannot be greater than total fee."
            );

            return;

        }


        const status =
            getFeeStatus(
                totalFee,
                paidAmount
            );



        //    EDIT


        if (editFeeId) {

            const feeIndex =
                fees.findIndex(
                    fee =>
                        fee.id ===
                        editFeeId
                );


            if (feeIndex !== -1) {

                fees[feeIndex] = {

                    ...fees[feeIndex],

                    studentId,

                    studentName:
                        student.name,

                    studentCode:
                        student.studentId,

                    className:
                        student.class,

                    totalFee,

                    paidAmount,

                    pendingAmount,

                    paymentDate,

                    paymentMethod,

                    feeType,

                    notes,

                    status

                };

            }


            alert(
                "Fee record updated successfully."
            );

        }



        //    ADD


        else {

            const newFee = {

                id:
                    Date.now().toString(),

                studentId,

                studentName:
                    student.name,

                studentCode:
                    student.studentId,

                className:
                    student.class,

                totalFee,

                paidAmount,

                pendingAmount,

                paymentDate,

                paymentMethod,

                feeType,

                notes,

                status,

                createdAt:
                    new Date().toISOString()

            };


            fees.push(newFee);


            alert(
                "Fee record added successfully."
            );

        }


        saveFees();

        renderFees();

        updateStats();

        closeFeeModal();

    }
);



//    EDIT FEE


window.editFee = function (id) {

    const fee =
        fees.find(
            item =>
                item.id === id
        );


    if (!fee) {

        return;

    }


    editFeeId =
        id;


    studentSelect.value =
        fee.studentId;


    totalFeeInput.value =
        fee.totalFee;


    paidAmountInput.value =
        fee.paidAmount;


    pendingAmountInput.value =
        fee.pendingAmount;


    paymentDateInput.value =
        fee.paymentDate;


    paymentMethodInput.value =
        fee.paymentMethod;


    feeTypeInput.value =
        fee.feeType;


    feeNotesInput.value =
        fee.notes || "";


    previewTotal.textContent =
        formatCurrency(
            fee.totalFee
        );


    previewPaid.textContent =
        formatCurrency(
            fee.paidAmount
        );


    previewPending.textContent =
        formatCurrency(
            fee.pendingAmount
        );


    modalTitle.textContent =
        "Edit Fee Record";


    openModal();

};



//    DELETE FEE


window.deleteFee = function (id) {

    const fee =
        fees.find(
            item =>
                item.id === id
        );


    if (!fee) {

        return;

    }


    const confirmDelete =
        confirm(
            `Delete fee record of ${fee.studentName}?`
        );


    if (!confirmDelete) {

        return;

    }


    fees =
        fees.filter(
            item =>
                item.id !== id
        );


    saveFees();

    renderFees();

    updateStats();


    alert(
        "Fee record deleted successfully."
    );

};



//    SEARCH


searchFee.addEventListener(
    "input",
    renderFees
);



//    CLASS FILTER


feeClassFilter.addEventListener(
    "change",
    renderFees
);



//    STATUS FILTER


feeStatusFilter.addEventListener(
    "change",
    renderFees
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


feeModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            feeModal
        ) {

            closeFeeModal();

        }

    }
);



//    INITIAL LOAD


loadStudents();

renderFees();

updateStats();