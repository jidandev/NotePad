const noteJudul = document.querySelector('.judul');
const noteIsi = document.querySelector('.isi');
const noteList = document.querySelector('.list-group')
const addBtn = document.querySelector('.add-btn');
const noteFind = document.querySelector('.noteFind');
const noteBtn = document.querySelector('.noteBtn');
const modalDiv = document.querySelector('.modalDiv');

function saveNote() {
    let noteArray = [];
    const noteItem = noteList.querySelectorAll('li');

    noteItem.forEach(item => {
        let catatan = {
            judul: item.querySelector('span').textContent,
            isi: item.querySelector('input').value
        };
        noteArray.push(catatan);
    })
    localStorage.setItem('note', JSON.stringify(noteArray));
}

function loadNote() {
    let getNote = localStorage.getItem('note');
    if(getNote) {
        let notedList = JSON.parse(getNote);
        notedList.forEach(item => {
            const note = document.createElement('li');
            note.classList.add('list-group-item')
            note.innerHTML = `<span data-toggle="modal" data-target="#exampleModal" class="noteTeks">${item.judul}</span>
            <button type="button" class="btn btn-danger delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
            <input type="hidden" name="isi" value="${item.isi}">`
            
            const deleteBtn = note.querySelector('.delete-btn');
            const noteTeks = note.querySelector('.noteTeks');
            noteTeks.addEventListener('click', () => {
                showModal(item.judul, item.isi);
            })
            deleteBtn.addEventListener('click', () => {
                noteList.removeChild(note);
                saveNote();
                addNotif(1, "Berhasil menghapus catatan!")
            })
            
            noteList.appendChild(note);
            saveNote();
        })
    }
}

function filterNote(judul) {
    noteList.innerHTML = "";
    let getNote = localStorage.getItem('note');
    if(getNote) {
        let notedList = JSON.parse(getNote);
        let noteFilter = notedList.filter(note => note.judul.includes(judul));
        noteFilter.forEach(item => {
            const note = document.createElement('li');
            note.classList.add('list-group-item')
            note.innerHTML = `<span data-toggle="modal" data-target="#exampleModal" class="noteTeks">${item.judul}</span>
            <button type="button" class="btn btn-danger delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
            <input type="hidden" name="isi" value="${item.isi}">`
            
            const deleteBtn = note.querySelector('.delete-btn');
            const noteTeks = note.querySelector('.noteTeks');
            noteTeks.addEventListener('click', () => {
                showModal(item.judul, item.isi);
            })
            deleteBtn.addEventListener('click', () => {
                noteList.removeChild(note);

                let index = notedList.filter(note => note.judul !== item.judul);

                localStorage.setItem('note', JSON.stringify(index))

            })
            
            noteList.appendChild(note);

        })
    }
}

function addNote(judul, isi) {
    const note = document.createElement('li');
    note.classList.add('list-group-item')
    note.innerHTML = `<span data-toggle="modal" data-target="#exampleModal" class="noteTeks">${judul}</span>
    <button type="button" class="btn btn-danger delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
    <input type="hidden" name="isi" value="${isi}">`
    
    const deleteBtn = note.querySelector('.delete-btn');
    const noteTeks = note.querySelector('.noteTeks');
            noteTeks.addEventListener('click', () => {
                showModal(judul, isi);
            })
    deleteBtn.addEventListener('click', () => {
        noteList.removeChild(note);
        saveNote();
        addNotif(1, "Berhasil menghapus catatan!")
    })
    
    noteList.appendChild(note);
    addNotif(1, "Berhasil menambahkan catatan!")
    saveNote();
}

function showModal(judul, isi) {
    modalDiv.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${judul}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="modalIsi">${isi}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}

addBtn.addEventListener('click', () => {
    addNote(noteJudul.value, noteIsi.value)
    noteJudul.value = "";
    noteIsi.value = "";
})

noteBtn.addEventListener('click', () => {
    filterNote(noteFind.value)
    noteFind.value = "";
})

loadNote();

//NOTIFKKASI
const notifList = document.querySelector('.notif')

function addNotif(type, message){
    const li = document.createElement('li')
    li.innerHTML = `<h6 class="teks">${message}</h6>
            <div class="bulat">!</div>
            <div class="garis"></div>`

    
    const bulat = li.querySelector('.bulat');
    const garis = li.querySelector('.garis');
    if(type === 1) {
        bulat.style.backgroundColor = "green";
        garis.style.backgroundColor = "green";
        bulat.textContent = "✓"
    }
    else if(type === 2) {
        bulat.style.backgroundColor = "red";
        garis.style.backgroundColor = "red";
        bulat.textContent = "x"
    }
    else if(type === 3) {
        bulat.style.backgroundColor = "orange";
        garis.style.backgroundColor = "orange";
        bulat.textContent = "!"
    }
    else {
        bulat.style.backgroundColor = "gray";
        garis.style.backgroundColor = "gray";
        bulat.textContent = "?"
    }

    if (notifList.childElementCount >= 4) {
        notifList.removeChild(notifList.lastElementChild);
    }
            
    notifList.insertBefore(li, notifList.firstChild);
        
    if (!notifList.firstChild) {
        notifList.appendChild(li);
    }       

    setTimeout(() => {
        li.classList.add("show");
    }, 100);

    setTimeout(() => {
        if(notifList.contains(li)) {
            notifList.removeChild(li);
        }
    }, 5000)
}
