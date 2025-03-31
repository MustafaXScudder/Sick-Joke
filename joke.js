// JokeFetcher class is responsible for fetching jokes from the API
class JokeFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;  // The URL of the joke API
    }

    // fetchJoke() method to fetch a random joke from the API
    fetchJoke() {
        // Start the fetch request to the API
        return fetch(this.apiUrl)
            .then(response => {
                // When the fetch request is successful, parse the response into JSON format
                return response.json();
            })
            .then(data => {
                // Once the data is parsed, format the joke
                return this.formatJoke(data);
            })
            .catch(error => {
                // If an error occurs during fetch, log it to the console
                console.error("Error fetching joke:", error);
            });
    }

    // formatJoke() method to format the joke based on its type
    formatJoke(data) {
        // If the joke is a "single" type (one-liner)
        if (data.type === "single") {
            return data.joke;  // Return the single joke text
        } else {
            // If it's a "twopart" joke, return both the setup and the punchline
            return `${data.setup} - ${data.delivery}`;
        }
    }
}

// JokeDisplay class handles the display of the joke on the webpage
class JokeDisplay {
    constructor(elementId) {
        // Grab the HTML element where the joke will be displayed using its ID
        this.element = document.getElementById(elementId);
    }

    // displayJoke() method updates the HTML element with the fetched joke
    displayJoke(joke) {
        // Set the inner text of the HTML element to the joke
        this.element.innerText = joke;
    }
}

// JokeApp class orchestrates the joke-fetching process
class JokeApp {
    constructor(apiUrl, jokeElementId) {
        // Create instances of JokeFetcher and JokeDisplay
        this.jokeFetcher = new JokeFetcher(apiUrl);
        this.jokeDisplay = new JokeDisplay(jokeElementId);
    }

    // getJoke() method fetches the joke and then displays it
    getJoke() {
        // Call the fetchJoke() method from JokeFetcher
        this.jokeFetcher.fetchJoke()
            .then(joke => {
                // When the joke is fetched, display it using JokeDisplay
                this.jokeDisplay.displayJoke(joke);
            });
    }
}

// Initialize the app with the JokeAPI URL and the ID of the joke element in the HTML
const jokeApp = new JokeApp('https://v2.jokeapi.dev/joke/Any', 'joke');

// Attach an event listener to the button in HTML
document.querySelector('button').addEventListener('click', () => {
    // When the button is clicked, get and display a new joke
    jokeApp.getJoke();
});
