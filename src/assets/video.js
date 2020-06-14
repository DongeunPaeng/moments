import axios from "axios";

const videoContent = document.getElementsByClassName("videoContent");
const editVideoTitleBtn = document.getElementsByClassName("editVideoTitle");
const editVideoDescBtn = document.getElementsByClassName("editVideoDesc");
const editVideoTagsBtn = document.getElementsByClassName("editVideoTags");
const overlay = document.getElementsByClassName("modal-overlay");

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
  const videoUrl = videoContent.src.split("/")[4];
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

const toggleModal = () => {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0"); // make transparent when modal is closed
  modal.classList.toggle("pointer-events-none"); // do something when modal is clicked
  body.classList.toggle("modal-active"); // enable scroll when modal is open
};

document.onkeydown = (e) => {
  e = e || window.event;
  var isEscape = false;
  if ("key" in e) {
    isEscape = e.key === "Escape" || e.key === "Esc";
  } else {
    isEscape = e.keyCode === 27;
  }
  if (isEscape && document.body.classList.contains("modal-active")) {
    toggleModal();
  }
};

const handleEditVideoTags = (e) => {
  e.preventDefault();
  toggleModal();
};

const editVideo = () => {
  for (let i = 0; i < editVideoTitleBtn.length; i++) {
    editVideoTitleBtn[i].addEventListener("click", handleEditVideoTitle);
    editVideoDescBtn[i].addEventListener("click", handleEditVideoDesc);
    editVideoTagsBtn[i].addEventListener("click", handleEditVideoTags);
    overlay[i].addEventListener("click", handleEditVideoTags);
  }
};

if (videoContent) {
  addView();
}

if (
  editVideoTitleBtn[0] &&
  editVideoDescBtn[0] &&
  editVideoTagsBtn[0] &&
  overlay[0]
) {
  editVideo();
}
