import axios from "axios";

const editVideoTagsBtn = document.getElementsByClassName("editVideoTags");
const overlay = document.getElementById("modal-overlay");
const tagBoxDOM = document.querySelector(".simple-tags");
const tagSubmitBtn = document.getElementById("submitTags");
const DOMList = document.getElementById("listArea");

let tagsArray;

const postNewTags = (e) => {
  e.preventDefault();
  // const videoId = e.target.name;
  // axios.post(`/contents/${videoId}/tagsupdate`, {
  // tags: tagsArray,
  // });
};

const onDelete = (tagsArray) => {
  const tagListItemBtn = document.getElementsByClassName("tagListItemBtn");
  for (each of tagListItemBtn) {
    tagListItemBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target);
      // if (e.offsetX === 0 && e.offsetY === 0) {
      // e.preventDefault();
      // return false;
      // } else {
      // e.preventDefault();
      // console.log(e.target);
      // tagsArray = tagsArray.filter((currentValue, index) => {
      // if (index == i) {
      // return false;
      // }
      // return currentValue;
      // });
      // }
    });
  }
  DOMRender(tagsArray);
};

const DOMRender = (tagsArray) => {
  DOMList.innerHTML = "";
  tagsArray.forEach((eachTag) => {
    let li = document.createElement("li");
    li.innerHTML = `${eachTag} <input type='hidden' name='tags[]' value=${eachTag}><a><button class="tagListItemBtn">&times;</button></a>`;
    DOMList.appendChild(li);
  });

  const eventFunction = (e) => {
    e.preventDefault();
    console.log(`tagSubmitBtn clicked: ${tagsArray}`);
  };
  tagSubmitBtn.addEventListener("click", eventFunction);
  // onDelete();
};

const toggleModal = (e) => {
  e.preventDefault();
  const videoId = e.target.id;
  const videoBox = e.target.parentNode.parentNode;
  const videoTitle = videoBox.querySelector(".videoTitle").innerText;
  const videoOldTags = videoBox.querySelectorAll(".videoTags");

  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  const modalTitle = modal.querySelector(".modalTitle");

  body.classList.toggle("modal-active");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");

  if (Array.isArray(tagsArray) && tagsArray.length) {
    tagsArray = [];
    console.log(tagsArray);
  } else {
    tagsArray = Array.from(videoOldTags);
    tagsArray = tagsArray.map((each) => each.innerText.replace("#", ""));
    console.log(tagsArray);
  }

  if (modalTitle.innerText !== "") {
    modalTitle.innerText = "";
  } else {
    modalTitle.innerText = videoTitle;
  }

  DOMRender(tagsArray);
  onDelete(tagsArray);
};

const closeModal = (e) => {
  e.preventDefault();
  const videoId = e.target.id;
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  const modalTitle = modal.querySelector(".modalTitle");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");

  if (Array.isArray(tagsArray) && tagsArray.length) {
    tagsArray = [];
    console.log(tagsArray);
  } else {
    tagsArray = Array.from(videoOldTags);
    tagsArray = tagsArray.map((each) => each.innerText.replace("#", ""));
    console.log(tagsArray);
  }

  if (modalTitle.innerText !== "") {
    modalTitle.innerText = "";
  } else {
    modalTitle.innerText = videoTitle;
  }

  if (tagSubmitBtn.name !== "") {
    tagSubmitBtn.name = "";
  } else {
    tagSubmitBtn.name = videoId;
  }
};

const editTags = () => {
  for (let i of editVideoTagsBtn) {
    i.addEventListener("click", toggleModal);
  }
  overlay.addEventListener("click", closeModal);
};

const getTagsArray = () => {
  let dataAttribute = tagBoxDOM.getAttribute("value");
  dataAttribute = dataAttribute.split(",");
  tagsArray = dataAttribute.map((eachTag) => {
    return eachTag.trim();
  });
  DOMRender(tagsArray);
};

const onKeyUp = () => {
  document.getElementById("inputArea").addEventListener("keyup", (e) => {
    e.preventDefault();
    let text = e.target.value.trim();
    if (text.includes(",") || e.keyCode === 32) {
      e.preventDefault();
      try {
        if (text.search(" ") !== -1) {
          alert("An empty space not allowed.");
        } else if (tagsArray.indexOf(text) !== -1) {
          alert("Can't use duplicate tags");
        } else if (text.replace(",", "") != "") {
          tagsArray.push(text.replace(",", ""));
          e.target.value = "";
        }
      } catch (err) {
        console.log(err);
      }
    }
    DOMRender(tagsArray);
  });
};

// let's make onDelete just like onKeyup, why don't I?

if (editVideoTagsBtn && overlay) {
  editTags();
  onKeyUp();
} else if (tagBoxDOM) {
  getTagsArray();
  onKeyUp();
}
