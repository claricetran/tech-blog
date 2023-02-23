const button = document.getElementById("button");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginWarn = document.getElementById("login-warning");
const signupWarn = document.getElementById("signup-warning");

signupLink.addEventListener("click", () => {
    signupForm.classList.remove("hide");
    signupForm.reset();
    loginForm.classList.add("hide");
    loginForm.reset();
});

loginLink.addEventListener("click", () => {
    signupForm.classList.add("hide");
    loginForm.classList.remove("hide");
    signupForm.reset();
    loginForm.reset();
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const loginObj = {
            username: document.getElementById("login-un").value,
            password: document.getElementById("login-pw").value,
        };
        console.log(loginObj);
        const createRes = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(loginObj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (createRes.status == 200) {
            console.log("logged in.");
            location.href = "/";
        } else if (createRes.status == 400) {
            loginWarn.textContent = "Invalid login or password.";
            setTimeout(() => {
                loginWarn.textContent = "";
            }, 5000);
        }
    } catch (error) {
        console.log(error);
    }
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const signupObj = {
        username: document.getElementById("signup-un").value,
        password: document.getElementById("signup-pw").value,
    };
    console.log(signupObj);
    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            console.log(res.status);
            if (res.status == 200) {
                location.href = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
