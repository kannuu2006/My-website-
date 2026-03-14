let notes = JSON.parse(localStorage.getItem("notes")) || [];

const popup = document.getElementById("popup");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");


function openPopup() {
    popup.style.display = "flex";
    noteInput.value = "";
}


function closePopup() {
    popup.style.display = "none";
}


function saveNote() {

    let text = noteInput.value.trim();

    if (text === "") return;

    notes.push(text);

    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();

    closePopup();

}


function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes(search.value);

}


function renderNotes(filter = "") {

    notesContainer.innerHTML = "";

    notes
        .filter(note => note.toLowerCase().includes(filter.toLowerCase()))
        .forEach((note, index) => {

            let div = document.createElement("div");

            div.className = "note";

            div.innerHTML = `
<button class="delete-btn" onclick="deleteNote(${index})">X</button>
<p class="note-text">${note}</p>
`;

            notesContainer.appendChild(div);

        });

}


search.addEventListener("input", function () {

    renderNotes(this.value);

});


renderNotes();