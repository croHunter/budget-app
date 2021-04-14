const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});
















// const selectedAll = document.querySelectorAll(".selected");

// selectedAll.forEach((selected) => {
//     const optionsContainer = selected.previousElementSibling;

//     const optionsList = optionsContainer.querySelectorAll(".option");

//     selected.addEventListener("click", () => {
//         if (optionsContainer.classList.contains("active")) {
//             optionsContainer.classList.remove("active");
//         } else {
//             let currentActive = document.querySelector(".options-container.active");

//             if (currentActive) {
//                 currentActive.classList.remove("active");
//             }

//             optionsContainer.classList.add("active");
//         }



//     });

//     optionsList.forEach((o) => {
//         o.addEventListener("click", () => {
//             selected.innerHTML = o.querySelector("label").innerHTML;
//             optionsContainer.classList.remove("active");
//         });
//     });


// });