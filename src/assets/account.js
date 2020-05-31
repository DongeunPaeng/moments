import axios from "axios";

const deleteAccountBtn = document.getElementById("deleteAccount");

const handleClick = (e) => {
  if (confirm("Are you sure to delete your account?")) {
    axios.get("/users/delete");
  }
};

const deleteAccount = () => {
  deleteAccountBtn.addEventListener("click", handleClick);
};

if (deleteAccountBtn) {
  deleteAccount();
}
