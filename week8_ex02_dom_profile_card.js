document.addEventListener("DOMContentLoaded", () => {
  const profileCard = document.getElementById("profileCard");
  const profileImage = document.getElementById("profileImage");
  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");

  const updateNameBtn = document.getElementById("updateNameBtn");
  const updateRoleBtn = document.getElementById("updateRoleBtn");
  const toggleStatusBtn = document.getElementById("toggleStatusBtn");
  const changeImageBtn = document.getElementById("changeImageBtn");

  if (
    !profileCard ||
    !profileImage ||
    !profileName ||
    !profileRole ||
    !updateNameBtn ||
    !updateRoleBtn ||
    !toggleStatusBtn ||
    !changeImageBtn
  ) {
    return;
  }

  updateNameBtn.addEventListener("click", () => {
    const newName = prompt("Enter a new name:");
    if (newName && newName.trim()) {
      profileName.textContent = newName.trim();
    }
  });

  updateRoleBtn.addEventListener("click", () => {
    const newRole = prompt("Enter a new role:");
    if (newRole && newRole.trim()) {
      profileRole.textContent = newRole.trim();
    }
  });

  toggleStatusBtn.addEventListener("click", () => {
    profileCard.classList.toggle("active-status");
  });

  changeImageBtn.addEventListener("click", () => {
    const newImageUrl = prompt("Enter a new image URL:");
    if (newImageUrl && newImageUrl.trim()) {
      profileImage.src = newImageUrl.trim();
    }
  });
});
