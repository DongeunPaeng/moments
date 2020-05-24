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
