import axios from "axios";

const deleteAccountBtn = document.getElementById("deleteAccount");

const handleClick = () => {
  if (confirm("Are you sure to delete your account?")) {
    axios
      .get("/users/delete")
      .then((res) => {
        if (res.status === 200) {
          window.location = "/";
        } else {
          window.location = "/users/detail";
        }
      })
      .catch((err) => {
        console.log(err);
        window.location = "/users/detail";
      });
  }
};

const deleteAccount = () => {
  deleteAccountBtn.addEventListener("click", handleClick);
};

if (deleteAccountBtn) {
  deleteAccount();
}
