//    NOTICE BOARD MANAGEMENT




//    LOGIN CHECK


if (
    localStorage.getItem("schoolLoggedIn") !== "true"
) {

    window.location.href = "index.html";

}



//    DOM ELEMENTS


const noticeModal =
    document.getElementById("noticeModal");

const noticeForm =
    document.getElementById("noticeForm");

const addNoticeBtn =
    document.getElementById("addNoticeBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const modalTitle =
    document.getElementById("modalTitle");

const noticeTitleInput =
    document.getElementById("noticeTitle");

const noticeDateInput =
    document.getElementById("noticeDate");

const expiryDateInput =
    document.getElementById("expiryDate");

const audienceInput =
    document.getElementById("audience");

const priorityInput =
    document.getElementById("priority");

const noticeDescriptionInput =
    document.getElementById("noticeDescription");

const searchNotice =
    document.getElementById("searchNotice");

const priorityFilter =
    document.getElementById("priorityFilter");

const audienceFilter =
    document.getElementById("audienceFilter");

const noticeTableBody =
    document.getElementById("noticeTableBody");

const emptyState =
    document.getElementById("emptyState");

const totalNotices =
    document.getElementById("totalNotices");

const activeNotices =
    document.getElementById("activeNotices");

const expiredNotices =
    document.getElementById("expiredNotices");

const highPriorityNotices =
    document.getElementById("highPriorityNotices");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");



//    DATA


let notices =
    JSON.parse(
        localStorage.getItem("schoolNotices")
    ) || [];


let editNoticeId = null;



//    SAVE


function saveNotices() {

    localStorage.setItem(
        "schoolNotices",
        JSON.stringify(notices)
    );

}



//    TODAY


function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];

}



//    STATUS

function getNoticeStatus(notice) {

    const today =
        getToday();


    if (
        notice.expiryDate &&
        notice.expiryDate < today
    ) {

        return "Expired";

    }


    return "Active";

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



//    RENDER NOTICES


function renderNotices() {

    const searchValue =
        searchNotice.value
            .toLowerCase()
            .trim();


    const priorityValue =
        priorityFilter.value;


    const audienceValue =
        audienceFilter.value;


    const filteredNotices =
        notices.filter(notice => {

            const matchesSearch =

                notice.title
                    .toLowerCase()
                    .includes(searchValue)

                ||

                notice.description
                    .toLowerCase()
                    .includes(searchValue);


            const matchesPriority =
                priorityValue === "" ||
                notice.priority === priorityValue;


            const matchesAudience =
                audienceValue === "" ||
                notice.audience === audienceValue;


            return (
                matchesSearch &&
                matchesPriority &&
                matchesAudience
            );

        });


    noticeTableBody.innerHTML = "";


    if (
        filteredNotices.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredNotices.forEach(
        (notice, index) => {


            const status =
                getNoticeStatus(notice);


            let priorityClass =
                "priority-low";


            if (
                notice.priority === "High"
            ) {

                priorityClass =
                    "priority-high";

            }


            if (
                notice.priority === "Medium"
            ) {

                priorityClass =
                    "priority-medium";

            }


            const statusClass =
                status === "Active"
                    ? "notice-active"
                    : "notice-expired";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>


                <td>

                    <strong>
                        ${notice.title}
                    </strong>

                </td>


                <td>
                    ${formatDate(
                notice.noticeDate
            )}
                </td>


                <td>

                    <span
                        class="audience-badge">

                        ${notice.audience}

                    </span>

                </td>


                <td>

                    <span
                        class="priority-badge ${priorityClass}">

                        ${notice.priority}

                    </span>

                </td>


                <td>

                    <span
                        class="notice-status ${statusClass}">

                        ${status}

                    </span>

                </td>


                <td>

                    <div
                        class="action-buttons">


                        <button
                            class="action-btn edit-btn"
                            onclick="editNotice('${notice.id}')"
                            title="Edit">

                            ✏️

                        </button>


                        <button
                            class="action-btn delete-btn"
                            onclick="deleteNotice('${notice.id}')"
                            title="Delete">

                            🗑️

                        </button>


                    </div>

                </td>

            `;


            noticeTableBody.appendChild(row);

        }
    );

}



//    UPDATE STATS


function updateStats() {

    totalNotices.textContent =
        notices.length;


    const active =
        notices.filter(
            notice =>
                getNoticeStatus(notice) ===
                "Active"
        ).length;


    const expired =
        notices.filter(
            notice =>
                getNoticeStatus(notice) ===
                "Expired"
        ).length;


    const high =
        notices.filter(
            notice =>
                notice.priority ===
                "High" &&
                getNoticeStatus(notice) ===
                "Active"
        ).length;


    activeNotices.textContent =
        active;


    expiredNotices.textContent =
        expired;


    highPriorityNotices.textContent =
        high;

}



//    OPEN MODAL


function openModal() {

    noticeModal.classList.add("show");

}



//    CLOSE MODAL


function closeNoticeModal() {

    noticeModal.classList.remove(
        "show"
    );


    noticeForm.reset();


    editNoticeId = null;


    modalTitle.textContent =
        "Add New Notice";

}



//    SET DEFAULT DATE


function setDefaultDate() {

    noticeDateInput.value =
        getToday();

}



//    ADD NOTICE


addNoticeBtn.addEventListener(
    "click",
    () => {

        editNoticeId = null;

        noticeForm.reset();

        modalTitle.textContent =
            "Add New Notice";

        setDefaultDate();

        openModal();

    }
);



//    EMPTY ADD BUTTON


emptyAddBtn.addEventListener(
    "click",
    () => {

        editNoticeId = null;

        noticeForm.reset();

        modalTitle.textContent =
            "Add New Notice";

        setDefaultDate();

        openModal();

    }
);



//    CLOSE


closeModal.addEventListener(
    "click",
    closeNoticeModal
);


cancelBtn.addEventListener(
    "click",
    closeNoticeModal
);



//    SAVE NOTICE


noticeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            noticeTitleInput.value.trim();


        const noticeDate =
            noticeDateInput.value;


        const expiryDate =
            expiryDateInput.value;


        const audience =
            audienceInput.value;


        const priority =
            priorityInput.value;


        const description =
            noticeDescriptionInput.value.trim();



        //    EXPIRY VALIDATION


        if (
            expiryDate &&
            expiryDate < noticeDate
        ) {

            alert(
                "Expiry date cannot be before notice date."
            );

            return;

        }



        //    EDIT


        if (editNoticeId) {

            const noticeIndex =
                notices.findIndex(
                    notice =>
                        notice.id ===
                        editNoticeId
                );


            if (
                noticeIndex !== -1
            ) {

                notices[noticeIndex] = {

                    ...notices[noticeIndex],

                    title,

                    noticeDate,

                    expiryDate,

                    audience,

                    priority,

                    description

                };

            }


            alert(
                "Notice updated successfully."
            );

        }



        //    ADD


        else {

            const newNotice = {

                id:
                    Date.now().toString(),

                title,

                noticeDate,

                expiryDate,

                audience,

                priority,

                description,

                createdAt:
                    new Date().toISOString()

            };


            notices.push(
                newNotice
            );


            alert(
                "Notice added successfully."
            );

        }


        saveNotices();

        renderNotices();

        updateStats();

        closeNoticeModal();

    }
);



//    EDIT NOTICE


window.editNotice = function (id) {

    const notice =
        notices.find(
            item =>
                item.id === id
        );


    if (!notice) {

        return;

    }


    editNoticeId =
        id;


    noticeTitleInput.value =
        notice.title;


    noticeDateInput.value =
        notice.noticeDate;


    expiryDateInput.value =
        notice.expiryDate || "";


    audienceInput.value =
        notice.audience;


    priorityInput.value =
        notice.priority;


    noticeDescriptionInput.value =
        notice.description;


    modalTitle.textContent =
        "Edit Notice";


    openModal();

};



//    DELETE NOTICE


window.deleteNotice = function (id) {

    const notice =
        notices.find(
            item =>
                item.id === id
        );


    if (!notice) {

        return;

    }


    const confirmDelete =
        confirm(
            `Delete notice "${notice.title}"?`
        );


    if (!confirmDelete) {

        return;

    }


    notices =
        notices.filter(
            item =>
                item.id !== id
        );


    saveNotices();

    renderNotices();

    updateStats();


    alert(
        "Notice deleted successfully."
    );

};



//    SEARCH


searchNotice.addEventListener(
    "input",
    renderNotices
);



//    PRIORITY FILTER


priorityFilter.addEventListener(
    "change",
    renderNotices
);



//    AUDIENCE FILTER


audienceFilter.addEventListener(
    "change",
    renderNotices
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


noticeModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            noticeModal
        ) {

            closeNoticeModal();

        }

    }
);



//    INITIAL LOAD


renderNotices();

updateStats();