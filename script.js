document.addEventListener('DOMContentLoaded', () => {
    const factsList = document.getElementById('facts-list');

    // Wikipedia API endpoint for Bain & Company
    const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro&titles=Bain_%26_Company';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            const extract = page.extract;

            // Create a temporary element to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = extract;

            // Extract paragraphs
            const paragraphs = Array.from(tempDiv.querySelectorAll('p'));

            // Shuffle paragraphs to display them in random order
            shuffleArray(paragraphs);

            // Limit the number of facts displayed
            const numberOfFacts = Math.min(paragraphs.length, 3); // Display up to 3 random facts

            for (let i = 0; i < numberOfFacts; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = paragraphs[i].textContent;
                factsList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error('Error fetching facts:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Sorry, we could not load the facts at this time.';
            factsList.appendChild(errorMessage);
        });
});

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
