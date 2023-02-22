const addPostButton = document.getElementById("add-post");
const postForm = document.getElementById("post-form");
const title = document.getElementById("title");
const content = document.getElementById("content");

addPostButton.addEventListener("click", () => {
    if (postForm.classList.contains("hide")) {
        postForm.classList.remove("hide");
        addPostButton.innerText = "-";
    } else {
        postForm.classList.add("hide");
        addPostButton.innerText = "+";
    }
    postForm.reset();
});

postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postObj = {
        title: title.value,
        content: content.value,
    };
    console.log(postObj);
    fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            console.log("logged in.");
            location.href = "/dashboard";
        }
    });
});
