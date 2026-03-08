// =========================
// REGISTRO
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

registerForm.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch("/register", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name,
email,
password
})

});

const data = await response.json();

alert(data.message);

});

}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const response = await fetch("/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await response.json();

if (data.message === "Login realizado com sucesso 🚀") {

window.location.href = "dashboard.html";

} else {

alert(data.message);

}

});

}


// =========================
// PASSWORD MANAGER
// =========================

const passwordForm = document.getElementById("passwordForm");

if (passwordForm) {

const passwordList = document.getElementById("passwordList");

let passwords = [];

passwordForm.addEventListener("submit", (e) => {

e.preventDefault();

const site = document.getElementById("site").value;
const username = document.getElementById("username").value;
const sitePassword = document.getElementById("sitePassword").value;

// criptografia da senha
const encryptedPassword = CryptoJS.AES.encrypt(
sitePassword,
"chave-secreta"
).toString();

const passwordData = {
site,
username,
password: encryptedPassword
};

passwords.push(passwordData);

renderPasswords();

passwordForm.reset();

});

function renderPasswords() {

passwordList.innerHTML = "";

passwords.forEach((item, index) => {

const decryptedPassword = CryptoJS.AES.decrypt(
item.password,
"chave-secreta"
).toString(CryptoJS.enc.Utf8);

const li = document.createElement("li");

li.innerHTML = `
<b>${item.site}</b> - ${item.username} - ${decryptedPassword}
<button onclick="deletePassword(${index})">Excluir</button>
`;

passwordList.appendChild(li);

});

}

window.deletePassword = function (index) {

passwords.splice(index, 1);

renderPasswords();

};

}