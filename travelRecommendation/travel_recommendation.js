// Fetch the travel_recommendation_api.json file
fetch('travel_recommendation_api.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Function to display recommendations based on the search query
        const displayRecommendations = (searchTerm = '') => {
            let recommendationsHTML = '';
            searchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase

            // Loop through the countries and cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    // Check if the search term is in the city name or description
                    if (city.name.toLowerCase().includes(searchTerm) || city.description.toLowerCase().includes(searchTerm)) {
                        recommendationsHTML += `
                            <div class="destination">
                                <h3>${city.name}</h3>
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <p>${city.description}</p>
                            </div>
                        `;
                    }
                });
            });

            // Loop through the temples
            data.temples.forEach(temple => {
                // Check if the search term is in the temple name or description
                if (temple.name.toLowerCase().includes(searchTerm) || temple.description.toLowerCase().includes(searchTerm)) {
                    recommendationsHTML += `
                        <div class="temple">
                            <h3>${temple.name}</h3>
                            <img src="${temple.imageUrl}" alt="${temple.name}">
                            <p>${temple.description}</p>
                        </div>
                    `;
                }
            });

            // Loop through the beaches
            data.beaches.forEach(beach => {
                // Check if the search term is in the beach name or description
                if (beach.name.toLowerCase().includes(searchTerm) || beach.description.toLowerCase().includes(searchTerm)) {
                    recommendationsHTML += `
                        <div class="beach">
                            <h3>${beach.name}</h3>
                            <img src="${beach.imageUrl}" alt="${beach.name}">
                            <p>${beach.description}</p>
                        </div>
                    `;
                }
            });

            // If no matching results, display a "No results found" message
            if (recommendationsHTML === '') {
                recommendationsHTML = '<p>No results found. Please try another search term.</p>';
            }

            // Append the generated HTML to the recommendations container
            document.getElementById('recommendations-container').innerHTML = recommendationsHTML;
        };

        // Display all recommendations initially
        displayRecommendations();

        // Event listener for the search button
        const searchButton = document.querySelector('.search-container button');
        const searchInput = document.querySelector('.search-container input');

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            displayRecommendations(searchTerm);
        });

        // Optional: Event listener for the reset button (to reset search)
        const resetButton = document.querySelector('.search-container button[type="reset"]');
        resetButton.addEventListener('click', () => {
            searchInput.value = ''; // Clear the search input
            displayRecommendations(); // Show all recommendations
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
