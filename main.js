document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    let users = [];

    fetch("https://randomuser.me/api/?results=100")
        .then(response => response.json())
        .then(data => {
            users = data.results;
            renderUsers(users);
        });

    function renderUsers(userArray) {
        userList.innerHTML = "";
        userArray.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            userCard.innerHTML = `
                <img src="${user.picture.large}" alt="${user.name.first}">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>Yosh: ${user.dob.age}</p>
                <p>Telefon: ${user.phone}</p>
                <p>Email: ${user.email}</p>
                <p>Manzil: ${user.location.city}, ${user.location.country}</p>
            `;

            userList.appendChild(userCard);
        });
    }

    searchInput.addEventListener("input", () => {
        const filteredUsers = users.filter(user =>
            `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        renderUsers(filteredUsers);
    });

    sortSelect.addEventListener("change", () => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortSelect.value === "name") {
                return a.name.first.localeCompare(b.name.first);
            } else if (sortSelect.value === "age") {
                return a.dob.age - b.dob.age;
            }
        });
        renderUsers(sortedUsers);
    });
});
