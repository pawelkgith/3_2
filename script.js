(function () {
    document
        .getElementById("fetchStations")
        .addEventListener("click", async () => {
            const statusMessage = document.getElementById("statusMessage");
            const tableBody = document.getElementById("stationsTableBody");

            const API_TOKEN = "edruHLaboMOzRvvzNtrKWRznvkadsqbi";

            tableBody.innerHTML = "";
            statusMessage.textContent = "Pobieranie danych...";

            try {
                const response = await fetch(
                    "https://www.ncei.noaa.gov/cdo-web/api/v2/stations",
                    {
                        method: "GET",
                        headers: {
                            token: API_TOKEN,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Surowe dane z NOAA:", data);

                const stations = data.results;

                if (!stations || stations.length === 0) {
                    statusMessage.textContent = "Brak stacji do wyświetlenia.";
                    return;
                }

                statusMessage.textContent = "";

                stations.forEach((station) => {
                    const row = document.createElement("tr");

                    const id = station.id || "Brak";
                    const name = station.name || "Brak";
                    const latitude = station.latitude || "Brak";
                    const longitude = station.longitude || "Brak";

                    row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${latitude}</td>
            <td>${longitude}</td>
        `;
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error(error);
                statusMessage.textContent = `Wystąpił błąd: ${error.message}`;
            }
        });
})();
