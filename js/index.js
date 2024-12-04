var nameInput = document.getElementById("site-name");
var urlInput = document.getElementById("site-url");
var submitBtn = document.getElementById("submit-btn");
var tableContent = document.getElementById("tableContent");
var bookmarks = [];

if (localStorage.getItem("myBookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("myBookmarks"));
    displayBookmarks();
}

submitBtn.addEventListener("click", function () {
    addBookmark();
});



function deleteBookmark(indexToDelete) {
    bookmarks.splice(indexToDelete, 1);
    localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

function visitSite(url) {
    window.open(url, '_blank');
}

function addBookmark() {
    var flagForRepeatedName = 0;
    if (validateInputs("name-alert", nameInput) && validateInputs("url-alert", urlInput)) {
        for (var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].name === capitalizeFirstLetter(nameInput.value)) {
                flagForRepeatedName = 1;
            }
        }
        if (flagForRepeatedName === 0) {
            var bookmarkObject = {
                name: capitalizeFirstLetter(nameInput.value),
                url: urlInput.value
            }
            bookmarks.push(bookmarkObject);
            localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
            displayBookmarks();
            nameInput.value = null;
            urlInput.value = null;
            nameInput.classList.remove("is-valid");
            urlInput.classList.remove("is-valid");
        }
    }
}

function displayBookmarks() {
    var bookmarkContent = "";
    for (var i = 0; i < bookmarks.length; i++) {
        bookmarkContent += `
        <tr>
                                 <td>${i + 1}</td>
                                 <td>${bookmarks[i].name}</td>
                                 <td>
                                     <button class="btn btn-visit" data-index="0" onclick="visitSite('${bookmarks[i].url}')">
                                         <i class="fa-solid fa-eye pe-2"></i>Visit
                                     </button>
                                 </td>
                                 <td>
                                     <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" data-index="0">
                                         <i class="fa-solid fa-trash-can"></i>
                                         Delete
                                     </button>
                                 </td>
                             </tr>`;
    }

    tableContent.innerHTML = bookmarkContent;
}

function validateInputs(alertId, element) {
    var regexObject = {
        "site-name": /^\w{3,}(\s+\w+)*$/,
        "site-url": /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    }
    var alertMsg = document.getElementById(alertId);
    if (regexObject[element.id].test(element.value)) {
        // console.log("Match");
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        alertMsg.classList.add("d-none");
        return true;

    } else {
        // console.log("No-Match");
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        alertMsg.classList.remove("d-none");
        return false;
    }

}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}