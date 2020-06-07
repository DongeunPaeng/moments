import axios from "axios";
import moment from "moment";

const openBtn = document.getElementById("openBtn");
const comments = document.getElementById("comments");
const commentForm = document.getElementById("commentForm");
const deleteCommentBtn = document.getElementsByClassName("deleteCommentBtn");

let isOpen = false;

const handleOpen = () => {
  if (!isOpen) {
    comments.classList.remove("hidden");
    comments.classList.add("block");
    isOpen = true;
    openBtn.innerHTML = "Close Comments 🔼";
  } else {
    comments.classList.remove("block");
    comments.classList.add("hidden");
    isOpen = false;
    openBtn.innerHTML = "Show Comments 🔽";
  }
};

const openComments = () => {
  comments.classList.add("hidden");
  openBtn.addEventListener("click", handleOpen);
};

const deleteCommentLi = (commentLi, commentId) => {
  const videoId = location.href.split("/contents/")[1].split("/detail")[0];
  axios
    .post(`/contents/${videoId}/deleteComment`, {
      commentId,
    })
    .then((res) => {
      if (res.status === 200) {
        const ul = commentLi.parentNode;
        const deletedComment = document.getElementById(commentId);
        ul.removeChild(deletedComment);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDeleteComment = (e) => {
  const commentLi = e.target.parentNode.parentNode;
  const commentId = commentLi.id;
  deleteCommentLi(commentLi, commentId);
};

const deleteComment = () => {
  for (let i = 0; i < deleteCommentBtn.length; i++) {
    deleteCommentBtn[i].addEventListener("click", handleDeleteComment);
  }
};
const createComment = (comment, loggedUser, commentId) => {
  const li = document.createElement("li");
  const commentList = document.getElementById("commentList");
  const date = moment().format("MMM D, YYYY H:mm");
  commentList.prepend(li);
  li.innerHTML = `
  <div class="creatorInfo flex justify-start">
    <p class="mr-1">${loggedUser}</p>
    <p class="mx-1">${date}</p>
    <button class="deleteCommentBtn ml-1">❌</button>
  </div>
  <p class="text-base text-left">${comment}</p>
  `;
  li.classList.add("py-2");
  li.id = commentId;
  deleteComment();
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const commentInput = document.getElementById("commentInput");
  const loggedUser = document.getElementById("loggedUser").innerText;
  const comment = commentInput.value;
  const videoId = location.href.split("/contents/")[1].split("/detail")[0];

  if (comment !== "") {
    axios
      .post(`/contents/${videoId}/addComment`, {
        comment,
      })
      .then((res) => {
        if (res.status === 200) {
          const commentId = res.data._id;
          createComment(comment, loggedUser, commentId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("type something");
  }
  commentInput.value = "";
};

const saveComment = () => {
  commentForm.addEventListener("submit", handleSubmit);
};

if (openBtn) {
  openComments();
}

if (commentForm) {
  saveComment();
}

if (deleteCommentBtn) {
  deleteComment();
}
