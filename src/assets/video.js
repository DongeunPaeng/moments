import axios from "axios";

const videoContent = document.getElementById("videoContent");
const editVideoTitleButton = document.getElementById("editVideoTitle");
const videoTitle = document.getElementById("videoTitle");

const handleEnded = () => {
  const videoUrl = videoContent.src.split("/")[4];
  axios.post(`/contents/${videoUrl}/view`, { url: videoUrl });
};

const addView = () => {
  videoContent.addEventListener("ended", handleEnded);
};

const handleEditVideoTitle = () => {
  videoTitle.contentEditable = true;
  videoTitle.focus();
  videoTitle.classList.add("overflow-hidden");
  const confirmButton = document.createElement("button");
  confirmButton.setAttribute("id", "newVideoTitle");
  confirmButton.setAttribute("class", "text-sm font-bold text-blue-500 mb-2");
  confirmButton.innerHTML = "OK";
  editVideoTitleButton.parentNode.replaceChild(
    confirmButton,
    editVideoTitleButton
  );
};

const handleNewVideoTitle = () => {
  newTitle = videoTitle.value;
  console.log(newTitle);
};

const editVideoTitle = () => {
  editVideoTitleButton.addEventListener("click", handleEditVideoTitle);
};

if (videoContent) {
  addView();
}

if (editVideoTitle) {
  editVideoTitle();
}
