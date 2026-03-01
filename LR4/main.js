let loadedUsers = [];

function init() {
    const main = document.getElementById('main');

    const header = document.createElement('header');
    const mainEl = document.createElement('main');
    const footer = document.createElement('footer');

    main.appendChild(header);
    main.appendChild(mainEl);
    main.appendChild(footer);

    const leftPanel = document.createElement('div');
    leftPanel.id = 'leftPanel';
    const content = document.createElement('div');
    content.id = 'content';
    const rightPanel = document.createElement('div');
    rightPanel.id = 'rightPanel';

    mainEl.appendChild(leftPanel);
    mainEl.appendChild(content);
    mainEl.appendChild(rightPanel);

    [leftPanel, content, rightPanel].forEach(panel => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        panel.appendChild(loader);
    });

    ['User Rating','News','Contacts','About'].forEach(text => {
        const btn = document.createElement('button');
        btn.innerText = text;
        btn.onclick = () => contentHeader(text);
        header.appendChild(btn);
    });

    const currentUsers = document.createElement('div');
    currentUsers.innerText = `Current users: ${loadedUsers.length}`;
    const newUsers = document.createElement('div');
    newUsers.innerText = `New users: ${getNewUsers().map(u => u.firstname).join(', ')}`;

    footer.appendChild(currentUsers);
    footer.appendChild(newUsers);

    setTimeout(() => {
        leftPanel.innerHTML = '<input type="text" id="searchInput" placeholder="Search..."><button id="searchBtn">Search</button>';
        document.getElementById('searchBtn').onclick = searchTable;

        rightPanel.innerHTML = `<div id="scoreSum">Loading score...</div>
        <label><input type="checkbox" id="editTable"> Edit table</label>`;

        document.getElementById('editTable').onchange = toggleEditTable;

        contentLoaderHide();
    }, 1000);
}

function contentHeader(text) {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>${text}</h2>`;
}

function contentLoaderHide() {
    const content = document.getElementById('content');
    content.innerHTML = '<p>No users</p><button id="getUsersBtn">Get Users</button>';
    document.getElementById('getUsersBtn').onclick = loadUsersTable;
}

async function loadUsersTable() {
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loader"></div>';
    loadedUsers = await fetchUsers();

    let html = `<table id="usersTable"><thead><tr>
        <th class="sortable">Lastname</th>
        <th>Firstname</th>
        <th>Score</th>
        <th class="deleteCol" style="display:none;">Delete</th>
        </tr></thead><tbody>`;

    loadedUsers.forEach((u,i) => {
        html += `<tr>
            <td>${u.lastname}</td>
            <td>${u.firstname}</td>
            <td>${u.score}</td>
            <td class="deleteCol" style="display:none;"><button onclick="deleteRow(${i})">Delete</button></td>
        </tr>`;
    });

    html += '</tbody></table>';
    content.innerHTML = html;

    document.getElementById('scoreSum').innerText = `Total score: ${loadedUsers.reduce((a,b)=>a+b.score,0)}`;

    document.querySelector('th.sortable').onclick = sortTable;
}


function searchTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('#usersTable tbody tr').forEach(row => {
        row.classList.remove('highlight');
        if ([...row.children].some(td => td.innerText.toLowerCase().includes(input))) {
            row.classList.add('highlight');
        }
    });
}


function deleteRow(index) {
    loadedUsers.splice(index,1);
    loadUsersTable();
}


function toggleEditTable() {
    const checked = document.getElementById('editTable').checked;
    document.querySelectorAll('.deleteCol').forEach(col => col.style.display = checked ? 'table-cell' : 'none');
}


function sortTable() {
    loadedUsers.sort((a,b)=> a.lastname.localeCompare(b.lastname));
    loadUsersTable();
}