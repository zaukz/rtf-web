const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png",
        serverName: "RT Network",
        serverIp: "THE RT NETWORK",
        discordServerID: "1356819531204530389"
    },
    userSKinTypeInAdminTeam: "bust",
    atGroupsDefaultColors: {
        administration: "rgba(255, 124, 124, 0.5)",
        other: "rgba(11, 175, 255, 0.5)",
    },
    adminTeamPage: {
        administration: [
            {
                inGameName: "stero skin here",
                ranks: [
                    { name: "Founder", color: "rgba(128, 0, 128, 1)" },
                    { name: "Owner", color: "rgba(255, 3, 3, 1)" }
                ],
                skinUrlOrPathToFile: "",
            },
            {
                inGameName: "zAukz skin here",
                ranks: [
                    { name: "Manager", color: "rgba(255, 99, 71, 1)" },
                    { name: "Head Developer", color: "rgba(255, 20, 147, 1)" }
                ],
                skinUrlOrPathToFile: "",
            },
            {
                inGameName: "xylo name here",
                ranks: [
                    { name: "Admin", color: "rgba(0, 0, 255, 1)" },
                    { name: "Developer", color: "rgba(255, 105, 180, 1)" }
                ],
                skinUrlOrPathToFile: "",
            }
        ],
        other: [
            {
                inGameName: "mod here",
                ranks: [
                    { name: "Moderator", color: "rgba(255, 165, 0, 1)" }
                ],
                skinUrlOrPathToFile: "",
            },
            {
                inGameName: "helper here",
                ranks: [
                    { name: "Helper", color: "rgba(204, 204, 0, 1)" }
                ],
                skinUrlOrPathToFile: "",
            },
            {
                inGameName: "trainee here",
                ranks: [
                    { name: "Trainee", color: "rgba(128, 0, 128, 1)" }
                ],
                skinUrlOrPathToFile: "",
            }
        ]
    },
    contactPage: {
        email: "support@rtnetwork.net"
    }
}

// Discord API endpoint
const discordApiEndpoint = 'https://discord.com/api/guilds/1356819531204530389/widget.json';

// Function to fetch Discord widget data
async function fetchDiscordWidgetData() {
    try {
        const response = await fetch(discordApiEndpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Discord widget data:', error);
        return null;
    }
}



/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
accordionItemHeader.addEventListener("click", () => {
accordionItemHeader.classList.toggle("active");
const accordionItemBody = accordionItemHeader.nextElementSibling;

if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
else accordionItemBody.style.maxHeight = "0px";
});
});



// Function to update Discord online users count
async function updateDiscordOnlineUsersCount() {
    const data = await fetchDiscordWidgetData();
    if (data) {
        const onlineUsersCount = data.presence_count;
        document.getElementById('discord-online-users').innerText = `${onlineUsersCount} users online`;
    }
}

// Update Discord online users count on page load
updateDiscordOnlineUsersCount();

// Update Discord online users count every 5 minutes
setInterval(updateDiscordOnlineUsersCount, 5 * 60 * 1000);

// Minecraft server API endpoint
const minecraftServerApiEndpoint = 'http://your-minecraft-server-ip:8080/query';

// Function to fetch Minecraft server data
async function fetchMinecraftServerData() {
    try {
        const response = await fetch(minecraftServerApiEndpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Minecraft server data:', error);
        return null;
    }
}

// Function to update Minecraft online players count
async function updateMinecraftOnlinePlayersCount() {
    const data = await fetchMinecraftServerData();
    if (data) {
        const onlinePlayersCount = data.players.online;
        document.getElementById('minecraft-online-players').innerText = `${onlinePlayersCount} players online`;
    }
}

// Update Minecraft online players count on page load
updateMinecraftOnlinePlayersCount();

// Update Minecraft online players count every 5 minutes
setInterval(updateMinecraftOnlinePlayersCount, 5 * 60 * 1000);

// Config navbar
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");

// Config header
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");

// Config contact
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

// Function to get Minecraft online player count
const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

// Function to get UUID by username
const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

// Function to get skin by UUID
const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

// Function to copy IP
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);

            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

// Function to set data from config to HTML
const setDataFromConfigToHtml = async () => {
    // Set config data to navbar
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    // Set config data to header
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        // Set config data to header
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        getDiscordOnlineUsers(); // This updates the UI directly
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("staff")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");

            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = user.skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <div class="ranks">
                        ${user.ranks.map(rank => `<p class="rank" style="margin-bottom:10px;align-items:center;margin-left:auto;margin-right:auto;background: ${rank.color}">${rank.name}</p>`).join('')}
                    </div>
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

// Function to get Discord online users
const getDiscordOnlineUsers = async () => {
    const data = await fetchDiscordWidgetData();
    if (data) {
        const onlineUsersCount = data.presence_count;
        return `${onlineUsersCount} users online`;
    }
}

setDataFromConfigToHtml();
