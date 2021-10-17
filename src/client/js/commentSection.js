const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul"); // pug에서 가져오기
  //html element 만들기
  const newComment = document.createElement("li");
  newComment.dataset.id = id; //data-id 저장
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.innerText = `❌`;
  //html structure 만들기
  newComment.appendChild(icon);
  newComment.appendChild(span); //bottom에 element 추가
  newComment.appendChild(span2); //bottom에 element 추가
  videoComments.prepend(newComment); //top에 element 추가
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
      "Content-Type": "application/json", //string처럼 보이지만 json이라고 알려줘야함
    },
    body: JSON.stringify({ text }), //object가 아니라 string으로
  });
  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json(); // reponse 안에서 json 추출
    //Create fake comment
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
