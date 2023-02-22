const updateForm = document.getElementById("update");
const del = document.getElementById("delete");
const postId = updateForm.dataset.postId;
const title = document.getElementById("title");
const content = document.getElementById("content");

updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postObj = {
        title: title.value,
        content: content.value,
    };
    console.log(postObj);
    fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                console.log("logged in.");
                location.href = "/dashboard";
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

del.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    }).then((res) => {
        if (res.ok) {
            console.log("logged in.");
            location.href = "/dashboard";
        }
    });
});
