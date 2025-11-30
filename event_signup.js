const form = document.getElementById("signup-form");
const eventName = document.getElementById("eventName");
const companyRepName = document.getElementById("companyRepresentativeName");
const repEmail = document.getElementById("repEmail");
const companyRole = document.getElementById("companyRole");

document.addEventListener("DOMContentLoaded", () => {
    populateTable(); 
    updateSummary();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = checkValidInputs();

    if (isValid) {
        const formData = {
            eventName: eventName.value,
            representativeName: companyRepName.value,
            representativeEmail: repEmail.value,
            companyRole: companyRole.value
        };

        existenceCheck = localStorage.getItem(repEmail.value)
        if (!existenceCheck){

            const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

            if(regex.test(repEmail.value)) {
                return false
            } else {
            localStorage.setItem(repEmail.value, JSON.stringify(formData));
            console.log("Form data saved to localStorage:", formData);
            form.submit()
            }
        } else {
            const previouSubmission = document.getElementById("submission-existence-error-message")
            console.error("A form submission associated with this email address already exists.")
            previouSubmission.textContentL = 
                "A submission already exists for " + repEmail.value + ". Try again.";

            console.warn("Duplicate submission found");
        }
    }
});

function checkValidInputs() {
    const eventNameChecker = checkEventName();
    const repNameChecker = checkRepresentativeName();
    const repEmailChecker = checkEmail();

    return eventNameChecker && repNameChecker && repEmailChecker;
}

function checkEventName() {
    const errorMessage = document.getElementById("event-name-error-message");
    if (eventName.value.trim() === "") {
        errorMessage.innerHTML = "Event name cannot be blank.";
        console.error("Event name cannot be blank.");
        return false;
    } else {
        errorMessage.innerHTML = "";
        return true;
    }
}

function checkRepresentativeName() {
    const errorMessage = document.getElementById("representative-name-error-message");
    if (companyRepName.value.trim() === "") {
        errorMessage.innerHTML = "Representative name cannot be blank.";
        console.error("Representative name cannot be blank.");
        return false;
    } else {
        errorMessage.innerHTML = "";
        return true;
    }
}

function checkEmail() {
    const errorMessage = document.getElementById("email-error-message");
    const emailValue = repEmail.value.trim();

    if (emailValue === "") {
        errorMessage.innerHTML = "Representative email cannot be blank.";
        console.error("Representative email cannot be blank.");
        return false;
    } else {
        errorMessage.innerHTML = "";
        return true;
    }
}

function populateTable() {
    const signupTableBody = document.getElementById("signup-table-body");
    signupTableBody.innerHTML = ""; 

    const savedSignups = Object.values(localStorage); 

    savedSignups.forEach((signupString) => {
        const signupData = JSON.parse(signupString);

        const row = document.createElement("tr"); 
        row.innerHTML = `
            <td>${signupData.eventName}</td>
            <td>${signupData.representativeName}</td>
            <td>${signupData.representativeEmail}</td>
            <td>${signupData.companyRole}</td>
            <td><button class="delete-button" data-email="${signupData.representativeEmail}">Delete</button></td>
        `;
        signupTableBody.appendChild(row);

        const deleteButton = row.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            localStorage.removeItem(signupData.representativeEmail);
            updateSummary()
            populateTable();
        });
    });
}

function updateSummary() {
    const summaryList = document.getElementById("summary-list");
    summaryList.innerHTML = ""; 

    const roleCounts = {}; 

    const allSignups = Object.values(localStorage);
    allSignups.forEach((signupString) => {
        const signupData = JSON.parse(signupString);
        const role = signupData.companyRole;

        roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    for (const [role, count] of Object.entries(roleCounts)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${role}: ${count}`;
        summaryList.appendChild(listItem); 
    }
}
