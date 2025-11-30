document.addEventListener("DOMContentLoaded", () => {
    const donations = JSON.parse(localStorage.getItem("donations"));
    if (donations) {
        saveToDonationTable(donations);
        updateDonationTotal(donations);
    }
});

document.getElementById("donation-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const donorName = document.getElementById("donorName").value;
    const charityName = document.getElementById("charityName").value;
    const donationAmount = document.getElementById("donationAmount").value;
    const donationDate = document.getElementById("donationDate").value;
    const donorComment = document.getElementById("donorComment").value;

    const donation = {
        donorName: donorName,
        charityName: charityName,
        donationAmount: donationAmount,
        donationDate: donationDate,
        donorComment: donorComment
    };

    let donations = JSON.parse(localStorage.getItem("donations"));
    
    if(!donations) {
        donations = [];
    }
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations))

    saveToDonationTable(donations);
    updateDonationTotal(donations);
    
    
    document.getElementById("donorName").value = "";
    document.getElementById("charityName").value = "";
    document.getElementById("donationAmount").value = "";
    document.getElementById("donationDate").value = "";
    document.getElementById("donorComment").value = "";
});

function saveToDonationTable(donations) {
    const donationTable = document.querySelector("#donation-table tbody");
    donationTable.innerHTML = "";

    donations.forEach((donation, index) => {
        const row = document.createElement("tr");

        const donorNameCell = document.createElement("td");
		donorNameCell.textContent = donation.donorName;
        row.append(donorNameCell);

        const charityNameCell = document.createElement("td");
		charityNameCell.textContent = donation.charityName;
        row.append(charityNameCell);

        const amountCell = document.createElement("td");
		amountCell.textContent = `$${parseInt(donation.donationAmount).toFixed(2)}`;
        row.append(amountCell);

        const dateCell = document.createElement("td");
		dateCell.textContent = donation.donationDate;
        row.append(dateCell);

        const commentCell = document.createElement("td");
		commentCell.innerHTML = donation.donorComment;
        row.append(commentCell);

        const deleteCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";

        button.addEventListener("click", () => {
            const updatedDonation = JSON.parse(localStorage.getItem("donations"));
            updatedDonation.splice(index, 1);
            localStorage.setItem("donations", JSON.stringify(updatedDonation));

            saveToDonationTable(updatedDonation);
            updateDonationTotal(updatedDonation);
        });

        deleteCell.appendChild(button);
        row.appendChild(deleteCell);
        donationTable.appendChild(row);
    });
  
}

function updateDonationTotal(donations) {
    let total = 0;
    donations.forEach(donation => {
        total += parseInt(donation.donationAmount);
    });
    document.getElementById("donation-total").textContent = `$${total.toLocaleString()}`;
}
  
    const charityName = document.getElementById("charity-name").value.trim();
    const donationAmount = parseFloat(document.getElementById("donation-amount").value);
    const donationDate = document.getElementById("donation-date").value;
    const donorComment = document.getElementById("donor-comment").value.trim();
    const feedbackEl = document.getElementById("form-feedback");
  
    if (!charityName || isNaN(donationAmount) || donationAmount <= 0 || !donationDate) {
      feedbackEl.textContent = "Please fill out all required fields with valid information.";
    }
  
    const donation = {
      charityName,
      donationAmount,
      donationDate,
      donorComment,
    };
  
    console.log("Donation saved:", donation);
    feedbackEl.textContent = "Donation added successfully!";
    document.getElementById("donation-form").reset();

