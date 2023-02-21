const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let postId = commentForm.dataset.postId;
    console.log(postId);
    console.log(document.getElementById("commentInput").value);
    const commentObj = {
        content: document.getElementById("commentInput").value,
        post_id: postId,
    };

    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                console.log("comment submitted");
                location.href = `/post/${postId}`;
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
