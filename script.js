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

            // Extract paragraphs and add them as list items
            const paragraphs = tempDiv.querySelectorAll('p');
            paragraphs.forEach(paragraph => {
                const listItem = document.createElement('li');
                listItem.textContent = paragraph.textContent;
                factsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching facts:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Sorry, we could not load the facts at this time.';
            factsList.appendChild(errorMessage);
        });
});
