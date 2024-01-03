function fetchServerStatus(serverAddress, cardId, statusId) {
    fetch(`https://api.mcsrvstat.us/3/${serverAddress}`)
        .then(response => response.json())
        .then(data => {
            updateCard(data, cardId, statusId);
        })
        .catch(error => console.error('Error fetching server status:', error));
}

function updateCard(data, cardId, statusId) {
    var card = document.getElementById(cardId);
    var statusSpan = document.getElementById(statusId);

    // Custom text based on your preferences
    var customText = "";
    if (statusId === "statusMain") {
        customText = "工业园建筑服";
    } else if (statusId === "statusSurvival") {
        customText = "工业园生存服";
    }


    statusSpan.className = data.online ? "badge badge-pill badge-success" : "badge badge-pill badge-danger";

    // Player list HTML
    var playerListHTML = "";
    if (data.online && data.players.list && data.players.list.length > 0) {
        var playerListHTML = "<p>玩家列表：</p>";
        var maxVisiblePlayers = 5;
        var totalPlayers = data.players.list.length;

        for (var i = 0; i < Math.min(totalPlayers, maxVisiblePlayers); i++) {
            var player = data.players.list[i];
            playerListHTML += `<div class="player">
                   <img src="https://minotar.net/avatar/${player.name}/32" alt="${player.name}">
                   <span>${player.name}</span>
               </div>`;
        }

        if (totalPlayers > maxVisiblePlayers) {
            var hiddenPlayersCount = totalPlayers - maxVisiblePlayers;
            playerListHTML += `<p>等${hiddenPlayersCount}名玩家...</p>`;
        }
    } else {
        playerListHTML = "<p></p>";
    }

    card.innerHTML = `
        <div class="col-9">
            <h5 class="lh-130">${customText}</h5>
            <p class="text-muted mb-0">
                ${data.players.online}/${data.players.max} 位玩家在线
            </p>
            ${playerListHTML}
        </div>
    `;
}


document.addEventListener("DOMContentLoaded", function () {
    fetchServerStatus("alsace.work", "mainCard", "statusMain");
    fetchServerStatus("dx.alsace.work:11281", "survivalCard", "statusSurvival");
});