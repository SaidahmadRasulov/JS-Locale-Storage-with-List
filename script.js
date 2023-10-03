let storedData = localStorage.getItem('data');

const data = storedData ? JSON.parse(storedData) : [
    { id: 1, title: 'Olma', category: 'fruit' },
    { id: 2, title: 'Banan', category: 'fruit' },
    { id: 3, title: 'Torgiz', category: 'fruit' },
    { id: 4, title: 'Sabzi', category: 'vegetable' },
    { id: 5, title: 'Kartoshka', category: 'vegetable' },
    { id: 6, title: 'Piyoz', category: 'vegetable' }
];

let filteredData = data;

const tbody = document.querySelector('.text');
const inputSearch = document.querySelector("#search");
const select = document.getElementById('select');
const form = document.getElementById('form')
let changingWord = document.querySelector('.change');
let editStart = false;

function Wrapp() {
    tbody.innerHTML = '';
    form[0].value = ''
    if (editStart) {
        changingWord.innerHTML = 'Edit'
    } else {
        changingWord.innerHTML = 'Add'
    }
    if(filteredData.length > 0) {
        filteredData.forEach((item, index) => {
            tbody.innerHTML += `
                <tr class='body__row'>
                    <td>${index + 1}</td>
                    <td>${item.title}</td>
                    <td>
                    <button class="table__btn gray" onclick="HandleEdit(${item.id})" data-id="${item.id}">
                    <i class='bx bx-edit'></i>
                    </button>
                    <button class="table__btn red" onclick="HandleDelete(${item.id})">
                        <i class='bx bx-trash'></i>
                    </button>
                    </td>
                </tr>
            `;
        });
        localStorage.setItem('data', JSON.stringify(filteredData));
    } else {
        tbody.innerHTML = '<h1>No data</h1>'
    }
}

function Select() {
    Search();
}

function Search() {
    filteredData = data.filter(item => {
        if (select.value == 'vegetable') {
            if (inputSearch.value == '') {
                return item.category == 'vegetable';
            } else {
                return item.category === 'vegetable' && item.title.toLowerCase().includes(inputSearch.value.toLowerCase());
            }
        } else if (select.value == 'fruit') {
            if (inputSearch.value == '') {
                return item.category == 'fruit';
            } else {
                return item.category === 'fruit' && item.title.toLowerCase().includes(inputSearch.value.toLowerCase());
            }
        } else {
            return item.title.toLowerCase().includes(inputSearch.value.toLowerCase());
        }
    });

    Wrapp();
}

function HandleAdd() {
    if(!editStart) {
        let newObject = {
            id: Date.now(),
            title: form[0].value,
            category: form[1].value
        };
        if (newObject.title !== '') {
            data.push(newObject);
            localStorage.setItem('data', JSON.stringify(filteredData));
            Wrapp()
        } else {
            alert('Fill')
        }
    } else {
        const editedTitle = form[0].value;
        if(editedTitle !== '') {
            const editObj = data.find(item => item.id === editStart)
            if(editObj) {
                editObj.title = editedTitle;
                localStorage.setItem('data', JSON.stringify(data)); // Update 'data', not 'filteredData'
                editStart = false;
                Wrapp();
            } else {
                alert('Fill')
            }
        }
    }
}

function HandleEdit(id) {
    const item = data.find(item => item.id === id);
    editStart = id;
    form[0].value = item.title;
    changingWord.innerHTML = 'Edit';
}

function HandleDelete(id) {
    let confirm = window.confirm('Are you sure that delete this?');
    if(confirm) {
        filteredData = data.filter(item => item.id !== id);
        Wrapp()
    } else {
        alert('You cancel delete this.')
    }
}

Wrapp();