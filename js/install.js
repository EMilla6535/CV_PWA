let deferred_prompt;
const inst_button = document.getElementById("install");
inst_button.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred_prompt = e;
    inst_button.style.display = "block";

    inst_button.addEventListener("click", (e) => {
        inst_button.style.display = "none";
        deferred_prompt.prompt();
        deferred_prompt.userChoice.then((choice_result) => {
            if (choice_result.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            }
            else {
                console.log("User dismissed the A2HS prompt");
            }
            deferred_prompt = null;
        });
    });
});