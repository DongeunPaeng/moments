import axios from "axios";

const videoContent = document.getElementsByClassName("videoContent");
const editVideoTitleBtn = document.getElementsByClassName("editVideoTitle");
const editVideoDescBtn = document.getElementsByClassName("editVideoDesc");

const handleEnded = (e) => {
  const videoUrl = e.target.src.split("/")[3];
  axios.post(`/contents/${videoUrl}/view`, { url: videoUrl });
};

const addView = () => {
  for (let i = 0; i < videoContent.length; i++) {
    videoContent[i].addEventListener("ended", handleEnded);
  }
};

const sendUpdate = (videoContent, newContent, type) => {
  const videoUrl = videoContent.src.split("/")[3];
  axios.post(`/contents/${videoUrl}/update`, {
    url: videoUrl,
    newContent,
    type,
  });
};

const handleEditVideoTitle = (e) => {
  const videoTitle = e.target.parentNode.getElementsByClassName(
    "videoTitle"
  )[0];
  const videoContent = e.target.parentNode.parentNode.parentNode.getElementsByClassName(
    "videoContent"
  )[0];
  if (!videoTitle.isContentEditable) {
    videoTitle.contentEditable = true;
    videoTitle.focus();
    videoTitle.classList.remove("text-xl", "-mr-2");
    videoTitle.classList.add(
      "bg-blue-100",
      "text-sm",
      "p-2",
      "overflow-hidden",
      "mr-2",
      "outline-none"
    );
    e.target.classList.remove("fas", "fa-pencil-alt", "text-gray-500");
    e.target.classList.add(
      "hover:bg-blue-800",
      "bg-blue-600",
      "text-white",
      "py-1",
      "font-body",
      "text-sm",
      "px-1",
      "rounded",
      "w-sm"
    );
    e.target.innerHTML = "Save";
  } else {
    videoTitle.contentEditable = false;
    videoTitle.classList.remove(
      "bg-blue-100",
      "text-sm",
      "p-2",
      "overflow-hidden",
      "mr-2",
      "outline-none"
    );
    videoTitle.classList.add("text-xl", "-mr-2");
    e.target.classList.remove(
      "hover:bg-blue-800",
      "bg-blue-600",
      "text-white",
      "py-1",
      "font-body",
      "text-sm",
      "px-1",
      "rounded",
      "w-sm"
    );
    e.target.classList.add("fas", "fa-pencil-alt", "text-gray-500");
    e.target.innerHTML = "";
    const newContent = videoTitle.innerHTML;
    sendUpdate(videoContent, newContent, "title");
  }
};

const handleEditVideoDesc = (e) => {
  const videoDesc = e.target.parentNode.getElementsByClassName("videoDesc")[0];
  const videoContent = e.target.parentNode.parentNode.parentNode.getElementsByClassName(
    "videoContent"
  )[0];
  if (!videoDesc.isContentEditable) {
    videoDesc.contentEditable = true;
    videoDesc.focus();
    videoDesc.classList.remove("-mr-2");
    videoDesc.classList.add(
      "bg-blue-100",
      "text-sm",
      "p-2",
      "overflow-hidden",
      "mr-2",
      "outline-none"
    );
    e.target.classList.remove("fas", "fa-pencil-alt", "text-gray-500");
    e.target.classList.add(
      "hover:bg-blue-800",
      "bg-blue-600",
      "text-white",
      "py-1",
      "font-body",
      "text-sm",
      "px-1",
      "rounded",
      "w-sm"
    );
    e.target.innerHTML = "Save";
  } else {
    videoDesc.contentEditable = false;
    videoDesc.classList.remove(
      "bg-blue-100",
      "text-sm",
      "p-2",
      "overflow-hidden",
      "mr-2",
      "outline-none"
    );
    videoDesc.classList.add("-mr-2");
    e.target.classList.remove(
      "hover:bg-blue-800",
      "bg-blue-600",
      "text-white",
      "py-1",
      "font-body",
      "text-sm",
      "px-1",
      "rounded",
      "w-sm"
    );
    e.target.classList.add("fas", "fa-pencil-alt", "text-gray-500");
    e.target.innerHTML = "";
    const newContent = videoDesc.innerHTML;
    sendUpdate(videoContent, newContent, "description");
  }
};

const editVideo = () => {
  for (let i = 0; i < editVideoTitleBtn.length; i++) {
    editVideoTitleBtn[i].addEventListener("click", handleEditVideoTitle);
    editVideoDescBtn[i].addEventListener("click", handleEditVideoDesc);
  }
};

if (videoContent) {
  addView();
}

if (editVideoTitleBtn[0] && editVideoDescBtn[0]) {
  editVideo();
}
