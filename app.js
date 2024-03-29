var notes = [];

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", event => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
        notes = JSON.parse(storedNotes)
    }
    var currentUrl = window.location.search;
    var urlSearchParams = new URLSearchParams(currentUrl);
    var userValue = urlSearchParams.get('user');
    if (userValue) {
        notes.push(userValue);
        renderNotes();
        save()
    }
    renderNotes();
 
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        const note = document.querySelector("textarea").value;
        if (note.length==0) {
            alert("You didn't input any content");
        } else {
            notes.push(note);
            renderNotes();
            save()
            document.querySelector("textarea").value = "";
        }
    });

    document.querySelector("#btnLearn").addEventListener("click", event => {
        location.href = "https://frontendmasters.com";
    })
    let bipEvent = null

    window.addEventListener("beforeinstallprompt", event => {
        event.preventDefault()
        bipEvent = event

    })

    document.querySelector("#btnInstall").addEventListener("click", event => {
        if (bipEvent) {
            bipEvent.prompt()
        } else {
            // incompatible browser or PWA not passing criteria
            alert('To install app look for Add to Homescreen')
        }
    })
    document.querySelector("#btnShare").addEventListener("click", event => {
        let notesString = ""
        notes.forEach(el => notesString += el + ' | ')
        navigator.share({
            title: "PWA Base",
            text: notesString
        })
    })
})

// Render the notes on the DOM
function renderNotes() {
    const ul = document.querySelector("#notes");
    ul.innerHTML = "";
    notes.forEach( (note, index) => {
        // Create the note LI
        const li = document.createElement("li");
        li.innerHTML = note;
        
        // Delete element for each note
        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = '<button>delete</button>';
        deleteButton.addEventListener("click", event => {
            if (confirm("Do you want to delete this note?")) {
                notes.splice(index, 1);
                renderNotes();
                save()
            }
        });
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
}

function save() {
    localStorage.setItem("notes", JSON.stringify(notes))
}