
document.addEventListener('DOMContentLoaded', init);

async function init() {
    const mainDiv = document.getElementById('main');

    
    const header = document.createElement('header');
    header.style.height = '100px';
    header.style.display = 'flex';
    header.style.gap = '10px';
    header.style.alignItems = 'center';
    header.style.padding = '0 20px';
    header.style.backgroundColor = '#ccc';

    const mainSection = document.createElement('main');
    mainSection.style.height = '500px';
    mainSection.style.display = 'flex';

    const footer = document.createElement('footer');
    footer.style.height = '100px';
    footer.style.padding = '0 20px';
    footer.style.backgroundColor = '#ddd';

    mainDiv.append(header, mainSection, footer);

    
    const leftPanel = document.createElement('div');
    const content = document.createElement('div');
    const rightPanel = document.createElement('div');

    [leftPanel, content, rightPanel].forEach((div, i) => {
        div.style.width = '33%';
        div.style.height = '100%';
        div.style.position = 'relative';
    });

    leftPanel.style.backgroundColor = '#f8d7da';
    content.style.backgroundColor = '#d1ecf1';
    rightPanel.style.backgroundColor = '#d4edda';

    mainSection.append(leftPanel, content, rightPanel);

    
    [leftPanel, content, rightPanel].forEach(panel => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.position = 'absolute';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        panel.appendChild(loader);
    });

    
    const menuItems = ['User Rating', 'News', 'Contacts', 'About', 'Gallery'];
    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.textContent = item;
        btn.addEventListener('click', () => {
            content.innerHTML = `<h2>${item}</h2>`;
            if (item === 'User Rating') loadUsers();
            if (item === 'Gallery') loadGallery();
        });
        header.appendChild(btn);
    });

    
    const currentUsersDiv = document.createElement('div');
    currentUsersDiv.textContent = 'Current users: 0';
    const newUsersDiv = document.createElement('div');
    newUsersDiv.textContent = 'New users: ';
    footer.append(currentUsersDiv, newUsersDiv);

    
    setTimeout(() => {
        const input = document.createElement('input');
        input.placeholder = 'Search users...';
        const searchBtn = document.createElement('button');
        searchBtn.textContent = 'Search';
        leftPanel.append(input, searchBtn);

        searchBtn.addEventListener('click', () => {
            const query = input.value.toLowerCase();
            const rows = content.querySelectorAll('table tr');
            rows.forEach((row, i) => {
                if (i === 0) return; 
                row.style.backgroundColor = row.textContent.toLowerCase().includes(query) ? '#ffff99' : '';
            });
        });
    }, 1000);

    
    const weatherDiv = document.createElement('div');
    const scoreDiv = document.createElement('div');
    rightPanel.append(weatherDiv, scoreDiv);
    updateWeather();
    setInterval(updateWeather, 60000); 

    async function loadUsers() {
        content.innerHTML = '<div class="loader"></div>';
        try {
            const res = await fetch('/api/fetchUsers');
            const users = await res.json();

            content.innerHTML = '';
            const table = document.createElement('table');
            table.border = '1';
            table.style.width = '100%';
            const thead = document.createElement('tr');
            ['First Name', 'Last Name', 'Score'].forEach(h => {
                const th = document.createElement('th');
                th.textContent = h;
                if (h === 'Last Name') {
                    th.style.cursor = 'pointer';
                    th.addEventListener('click', () => {
                        const sorted = [...users].sort((a,b) => a.lastname.localeCompare(b.lastname));
                        populateTable(sorted);
                    });
                }
                thead.appendChild(th);
            });
            table.appendChild(thead);

            function populateTable(list) {
                table.innerHTML = '';
                const headRow = document.createElement('tr');
                ['First Name', 'Last Name', 'Score'].forEach(h => {
                    const th = document.createElement('th');
                    th.textContent = h;
                    headRow.appendChild(th);
                });
                table.appendChild(headRow);

                list.forEach(u => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${u.firstname}</td><td>${u.lastname}</td><td>${u.score}</td>`;
                    table.appendChild(tr);
                });
            }

            populateTable(users);
            content.appendChild(table);

            currentUsersDiv.textContent = `Current users: ${users.length}`;

            const newUsersRes = await fetch('/api/getNewUsers');
            const newUsers = await newUsersRes.json();
            newUsersDiv.textContent = `New users: ${newUsers.map(u => u.firstname).join(', ')}`;

            
            const totalScore = users.reduce((sum, u) => sum + u.score, 0);
            scoreDiv.textContent = `Total Score: ${totalScore}`;

        } catch(err) {
            content.innerHTML = 'Error loading users';
            console.error(err);
        }
    }

    async function loadGallery() {
        content.innerHTML = '<div class="loader"></div>';
        try {
            const res = await fetch('/api/gallery');
            const imgs = await res.json();
            content.innerHTML = '';
            const galleryDiv = document.createElement('div');
            galleryDiv.style.display = 'flex';
            galleryDiv.style.flexWrap = 'wrap';
            imgs.forEach(src => {
                const img = document.createElement('img');
                img.src = `gallery/${src}`;
                img.style.width = '100px';
                img.style.height = '100px';
                img.style.margin = '5px';
                galleryDiv.appendChild(img);
            });
            content.appendChild(galleryDiv);
        } catch(err) {
            content.innerHTML = 'Error loading gallery';
            console.error(err);
        }
    }

    async function updateWeather() {
        try {
            const res = await fetch('/api/weather');
            const data = await res.json();
            weatherDiv.textContent = `${data.city}: ${data.temperature}°C`;
        } catch(err) {
            weatherDiv.textContent = 'Weather unavailable';
        }
    }
}