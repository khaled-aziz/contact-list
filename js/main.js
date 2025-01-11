let add= document.querySelector('.add i');
let contact= document.querySelector('.cantact');
let searchInput= document.querySelector('.search input');
let contactList=document.querySelector('.cantact-list');
let lettersList=document.querySelector('.letters div');
let cancel= document.querySelector('.cancel');
let addBtn= document.querySelector('.add-btn');
let addContact= document.querySelector('.add-contact');
let fristName= document.querySelector('.frist-name');
let lastName= document.querySelector('.last-name');
let phoneCode= document.querySelector('.phone-code');
let phoneNumber= document.querySelector('.phone');
let email= document.querySelector('.email');
let confirmDelete= document.querySelector('.confirmDelete');
let currentLetter = null;
let currentIndex = null;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
const phoneRegex = /^(\d{7,15}|(\d{1,4}[-.\s])?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{3,4})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let checkFName=false;
let checkLName=false;
let checkphone=false;
let checkemail=false;
let usersInfo= new Map();
if (usersInfo.size==0) {
    getDataLocal()
    displayData()
}
add.addEventListener('click',openNewContact);
cancel.addEventListener('click',openContact);
addBtn.addEventListener('click',()=>{
    if (addBtn.innerHTML=='update') {
        deleteContact()
        currentLetter = null;
        currentIndex = null; 
    }
    storeData()
    setDataLocal()
    usersInfo=new Map([...usersInfo].sort())
    openContact()
    displayData()
    setFormValue()
    addBtn.innerHTML='Add Contact'
});
document.querySelector('.confirmDelete').addEventListener('click', deleteContact);

function setDataLocal() {
    localStorage.setItem('userInformation',JSON.stringify([...usersInfo]))
}
function getDataLocal() {
    usersInfo= new Map(JSON.parse(localStorage.getItem('userInformation')));
}
function displayData() {
    let cartona=``;
    let letter=``;
    usersInfo.forEach((value, key) => {
        cartona+=`
        <div id=${key} class="row bg-light ">
            <div class="col-12">
                <p class="my-1">${key}</p>
            </div>
        </div>`;
        letter+=`<a href="#${key}" class="text-decoration-none text-dark">${key.toLowerCase()}</a>`;
        for (let i = 0; i < value.length; i++) {
            cartona+=`
            <div class="row border-bottom">
                <div class="col-2 m-auto">
                    <div class="photo overflow-hidden ms-auto ">
                        <img class="w-100" src="image/profile image stock photo.jpg" alt="dd">
                    </div>
                </div>
                <div class="col-10 d-flex justify-content-between">
                    <div>
                        <h2 class="m-0">${value[i].firstName} ${value[i].lastName}</h2>
                        <p class="m-0">${value[i].email}</p>
                        <p class="m-0">${value[i].phoneCode} ${value[i].phoneNumber}</p>
                    </div>
                    <div class="me-4 d-flex flex-column justify-content-evenly">
                        <i class="fa-solid fa-square-xmark fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='confirmDelateContact("${key}",${i})'></i>
                        <i class="fa-solid fa-square-pen fs-5" onclick='updateContact("${key}",${i})'></i>
                    </div>
                </div>
            </div>`   
        }
    });
    contactList.innerHTML=cartona;
    lettersList.innerHTML=letter;
}
function storeData(){
    if (usersInfo.has(fristName.value.at(0).toUpperCase())) {
        usersInfo.get(fristName.value.at(0).toUpperCase()).push({
            'firstName':fristName.value,
            'lastName':lastName.value,
            'phoneCode':phoneCode.value,
            'phoneNumber':phoneNumber.value,
            'email':email.value
        })
    } else {
        usersInfo.set(`${fristName.value.at(0).toUpperCase()}`,[{
            'firstName':fristName.value,
            'lastName':lastName.value,
            'phoneCode':phoneCode.value,
            'phoneNumber':phoneNumber.value,
            'email':email.value
        }])
    }
}
function openNewContact() {
    contact.classList.add('d-none');
    addContact.classList.remove('d-none');
}
function openContact() {
    contact.classList.remove('d-none');
    addContact.classList.add('d-none');
    setFormValue()
    addBtn.innerHTML='Add Contact'
    
}
function updateContact(letterInmap, index) { 
    currentLetter = letterInmap;
    currentIndex = index;
    let contactletter = usersInfo.get(letterInmap);
    let persone = contactletter[index];
    setFormValue(persone.firstName, persone.lastName, persone.phoneCode, persone.phoneNumber, persone.email );
    addBtn.innerHTML='update';
    openNewContact()
}
function setFormValue(fName='',lName='',phCode='+20',phone='',em='') {
    fristName.value=fName;
    lastName.value=lName;
    phoneCode.value=phCode;
    phoneNumber.value=phone;
    email.value=em;
}
function confirmDelateContact(letterInmap, index) {
    currentLetter = letterInmap;
    currentIndex = index;
}
function deleteContact(){
    if (currentLetter !== null && currentIndex !== null) {
        let deleted = usersInfo.get(currentLetter);
        deleted.splice(currentIndex, 1);
        if (usersInfo.get(currentLetter).length === 0) {
            usersInfo.delete(currentLetter);
        }
        setDataLocal();
        displayData();
        currentLetter = null;
        currentIndex = null; 
        document.querySelector('.btn-close').click()
    }
}
searchInput.onkeyup = ()=>{
    let cartona =""
    if (searchInput.value.trim() === "") {
        displayData();
        return; 
    }
    usersInfo.forEach((value, key) => {
        for (let i = 0; i < value.length; i++) {
            if (value[i].firstName.toLowerCase().includes(searchInput.value.toLowerCase()) || value[i].lastName.toLowerCase().includes(searchInput.value.toLowerCase())) {
                cartona+=`
                <div class="row border-bottom">
                    <div class="col-2 m-auto">
                        <div class="photo overflow-hidden ms-auto ">
                            <img class="w-100" src="image/profile image stock photo.jpg" alt="dd">
                        </div>
                    </div>
                    <div class="col-10 d-flex justify-content-between">
                        <div>
                            <h2 class="m-0">${value[i].firstName} ${value[i].lastName}</h2>
                            <p class="m-0">${value[i].email}</p>
                            <p class="m-0">${value[i].phoneCode} ${value[i].phoneNumber}</p>
                        </div>
                        <div class="me-4 d-flex flex-column justify-content-evenly">
                            <i class="fa-solid fa-square-xmark fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='confirmDelateContact("${key}",${i})'></i>
                            <i class="fa-solid fa-square-pen fs-5" onclick='updateContact("${key}",${i})'></i>
                        </div>
                    </div>
                </div>`   
                
            }
        }
    });
    if (cartona === "") {
        cartona = `<p class="text-center">No contacts found.</p>`;
    }
    contactList.innerHTML=cartona
}
fristName.onkeyup = () => {
    checkFName = validation(fristName, nameRegex);
    toggleAddButton();
};
lastName.onkeyup = () => {
    checkLName = validation(lastName, nameRegex);
    toggleAddButton();
};
phoneNumber.onkeyup = () => {
    checkphone = validation(phoneNumber, phoneRegex);
    toggleAddButton();
};
email.onkeyup = () => {
    checkemail = validation(email, emailRegex);
    toggleAddButton();
};

function validation(input, regex) {
    if (regex.test(input.value.trim())) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true; 
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false; 
    }
}

function toggleAddButton() {
    if (checkFName && checkLName && checkphone && checkemail) {
        addBtn.removeAttribute('disabled');
    } else {
        addBtn.setAttribute('disabled', 'true');
    }
}