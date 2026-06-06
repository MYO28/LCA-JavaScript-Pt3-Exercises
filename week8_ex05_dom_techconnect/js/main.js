document.addEventListener("DOMContentLoaded", () => {
  let developersArray = [];
  let isCardView = true;

  const cardViewContainer = document.getElementById("cardView");
  const tableViewContainer = document.getElementById("tableView");
  const tableBody = document.getElementById("tableBody");
  const searchBar = document.getElementById("searchBar");
  const devCounter = document.getElementById("devCounter");
  const toggleViewBtn = document.getElementById("toggleViewBtn");
  const addDevForm = document.getElementById("addDevForm");

  fetch("developers.json")
    .then((response) => response.json())
    .then((data) => {
      developersArray = data;
      renderDirectory();
    })
    .catch((error) => console.error("Error retrieving developer logs:", error));

  function renderDirectory() {
    const searchTerm = searchBar.value.toLowerCase().trim();

    const filteredDevs = developersArray.filter((dev) => {
      const matchesName = dev.name.toLowerCase().includes(searchTerm);
      const matchesRole = dev.role.toLowerCase().includes(searchTerm);
      const matchesSkills = dev.skills.some((skill) => skill.toLowerCase().includes(searchTerm));
      return matchesName || matchesRole || matchesSkills;
    });

    devCounter.textContent = filteredDevs.length;

    cardViewContainer.innerHTML = "";
    tableBody.innerHTML = "";

    filteredDevs.forEach((dev) => {
      if (isCardView) {
        cardViewContainer.appendChild(createCardItem(dev));
      } else {
        tableBody.appendChild(createTableRowItem(dev));
      }
    });
  }

  function createCardItem(dev) {
    const col = document.createElement("div");
    col.className = "col";

    const skillsMarkup = dev.skills.map((s) => `<span class="badge skill-badge me-1">${s}</span>`).join("");
    const badgeClass = dev.availableForHire ? "bg-success" : "bg-secondary";
    const badgeText = dev.availableForHire ? "Available For Hire" : "Not Available";

    col.innerHTML = `
            <div class="card h-100 shadow-sm developer-card border-0">
                <div class="card-body text-center p-4">
                    <img src="${dev.avatar || "https://placehold.co/100x100/7F7F7F/ffffff"}" class="rounded-circle mb-3 border" alt="${dev.name}" width="90" height="90">
                    <h5 class="card-title fw-bold mb-1">${dev.name}</h5>
                    <p class="text-muted small mb-2">${dev.location}</p>
                    <span class="badge bg-light text-dark border mb-3 px-3 py-2 fw-semibold">${dev.role}</span>
                    <div class="mb-3 d-flex flex-wrap justify-content-center gap-1">${skillsMarkup}</div>
                    <div class="mt-auto">
                        <span class="badge ${badgeClass} status-badge-toggle py-2 px-3 w-100" data-id="${dev.id}">${badgeText}</span>
                    </div>
                </div>
            </div>
        `;

    col.querySelector(".status-badge-toggle").addEventListener("click", () => {
      toggleHireStatus(dev.id);
    });

    return col;
  }

  function createTableRowItem(dev) {
    const tr = document.createElement("tr");
    const skillsMarkup = dev.skills.map((s) => `<span class="badge skill-badge me-1">${s}</span>`).join("");
    const badgeClass = dev.availableForHire ? "bg-success" : "bg-secondary";
    const badgeText = dev.availableForHire ? "Available For Hire" : "Not Available";

    tr.innerHTML = `
            <td><img src="${dev.avatar || "https://placehold.co/100x100/7F7F7F/ffffff"}" class="rounded-circle border" width="40" height="40"></td>
            <td class="fw-bold">${dev.name}</td>
            <td><span class="badge bg-light text-dark border">${dev.role}</span></td>
            <td>${dev.location}</td>
            <td><div class="d-flex flex-wrap gap-1">${skillsMarkup}</div></td>
            <td><span class="badge ${badgeClass} status-badge-toggle py-2 px-3" data-id="${dev.id}">${badgeText}</span></td>
        `;

    tr.querySelector(".status-badge-toggle").addEventListener("click", () => {
      toggleHireStatus(dev.id);
    });

    return tr;
  }

  function toggleHireStatus(devId) {
    developersArray = developersArray.map((dev) => {
      if (dev.id === devId) {
        dev.availableForHire = !dev.availableForHire;
      }
      return dev;
    });
    renderDirectory();
  }

  searchBar.addEventListener("input", renderDirectory);

  toggleViewBtn.addEventListener("click", () => {
    isCardView = !isCardView;

    if (isCardView) {
      cardViewContainer.classList.remove("d-none");
      tableViewContainer.classList.add("d-none");
      toggleViewBtn.textContent = "Show Table View";
    } else {
      cardViewContainer.classList.add("d-none");
      tableViewContainer.classList.remove("d-none");
      toggleViewBtn.textContent = "Show Card View";
    }
    renderDirectory();
  });

  addDevForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!addDevForm.checkValidity()) {
      event.stopPropagation();
      addDevForm.classList.add("was-validated");
      return;
    }

    const nameVal = document.getElementById("devName").value;
    const roleVal = document.getElementById("devRole").value;
    const locationVal = document.getElementById("devLocation").value;
    const skillsVal = document.getElementById("devSkills").value;
    const isAvailable = document.getElementById("devAvailable").checked;

    const skillsParsed = skillsVal
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const newDeveloper = {
      id: developersArray.length + 1,
      name: nameVal,
      role: roleVal,
      skills: skillsParsed,
      avatar: "https://placehold.co/100x100/4F81BD/ffffff",
      availableForHire: isAvailable,
      location: locationVal,
    };

    developersArray.push(newDeveloper);
    renderDirectory();

    addDevForm.reset();
    addDevForm.classList.remove("was-validated");

    const modalEl = document.getElementById("addDevModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  });
});
