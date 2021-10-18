const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delBtns = document.querySelectorAll(".video__del-comment");

const removeComment = (id) => {
  const comment = document.querySelector(`[data-id="${id}"]`);
  comment.remove();
};
const handleDelComment = async (event) => {
  event.preventDefault();
  const commentId = event.path[1].dataset.id; // X 누른 comment의 data-id 가져오기
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    removeComment(commentId);
  }
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = ".video__del-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (delBtns) {
  for (const delBtn of delBtns)
    delBtn.addEventListener("click", handleDelComment);
}
