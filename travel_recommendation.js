
const btnReset = document.getElementById("btnReset");









function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("result").innerHTML = "";
}


// Function to fetch data based on user input
async function fetchData(keyword) {
    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      
      switch(keyword.toLowerCase()) {
        case 'beach':
          return data.beaches;
        case 'temple':
          return data.temples;
        case 'country':
          return data.countries;
        default:
          throw new Error('Invalid keyword. Please enter "beach", "temple", or "country".');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
  }
  


    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
  
        if (results && results.length > 0) {
          results.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
              <h2>${item.name}</h2>
              <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 200px;">
              <p>${item.description}</p>
            `;
            resultsDiv.appendChild(itemDiv);
          });
        } else {
          resultsDiv.textContent = 'No results found.';
        }
      }
  
      // Event listener for search button click
      document.getElementById('searchButton').addEventListener('click', async function() {
        const userInput = document.getElementById('searchInput').value.trim();
        if (userInput) {
          const results = await fetchData(userInput);
          displayResults(results);
        }
      });
  









function addItem(item, resultDiv) {
    const name = item.name;    
    const timeZone = item.timeZone
    const timeOptions = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    const description = item.description;
    const imageUrl = item.imageUrl;
    resultDiv.innerHTML += `<img style="width: 100%" src="./images/${imageUrl}" alt="hjh">`;
    resultDiv.innerHTML += `<h3 style="padding-top: 10px;">${name}</h3>`;
    resultDiv.innerHTML += `<p>${description}</p>`;
    
    resultDiv.innerHTML += `<p>Current time in ${name}: ${time}</p>`;
}

btnReset.addEventListener('click', resetSearch);