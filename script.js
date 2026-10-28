// Browser History Stack Management System

let backStack = [];
let forwardStack = [];
let currentPage = "";

const visitForm = document.getElementById("visitForm");
const pageInput = document.getElementById("pageInput");
const currentPageDisplay = document.getElementById("currentPage");
const backHistory = document.getElementById("backHistory");
const forwardHistory = document.getElementById("forwardHistory");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");

visitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const page = pageInput.value.trim();

    if (page === "") {
        message.textContent = "Please enter a page name.";
        return;
    }

    if (currentPage !== "") {
        backStack.push(currentPage);
    }

    currentPage = page;

    // Visiting a new page clears forward history.
    forwardStack = [];

    pageInput.value = "";
    message.textContent = "Page visited successfully.";
    displayHistory();
});

backBtn.addEventListener("click", function () {
    if (backStack.length === 0) {
        message.textContent = "There is no previous page.";
        return;
    }

    // Save the current page in the forward stack.
    forwardStack.push(currentPage);

    // Pop the most recent page from the back stack.
    currentPage = backStack.pop();

    message.textContent = "Moved back to the previous page.";
    displayHistory();
});

forwardBtn.addEventListener("click", function () {
    if (forwardStack.length === 0) {
        message.textContent = "There is no forward page.";
        return;
    }

    backStack.push(currentPage);
    currentPage = forwardStack.pop();

    message.textContent = "Moved forward successfully.";
    displayHistory();
});

clearBtn.addEventListener("click", function () {
    backStack = [];
    forwardStack = [];
    currentPage = "";

    message.textContent = "Browser history cleared.";
    displayHistory();
});

function displayHistory() {
    currentPageDisplay.textContent =
        currentPage || "No page visited yet";

    backHistory.innerHTML = "";
    forwardHistory.innerHTML = "";

    // Display the top of each stack first.
    for (let i = backStack.length - 1; i >= 0; i--) {
        const item = document.createElement("li");
        item.textContent = backStack[i];
        backHistory.appendChild(item);
    }

    for (let i = forwardStack.length - 1; i >= 0; i--) {
        const item = document.createElement("li");
        item.textContent = forwardStack[i];
        forwardHistory.appendChild(item);
    }

    backBtn.disabled = backStack.length === 0;
    forwardBtn.disabled = forwardStack.length === 0;
}

displayHistory();