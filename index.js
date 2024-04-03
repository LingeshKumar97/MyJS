async function fetchData() {
  const spreadsheetId = '1ySaFUBka2ZrfJszshpJH35HnofDkDv6c5cxHxpwz5Pc';
  const range = 'Sheet1!E2:Q97'; 
  const apiKey = 'AIzaSyD4pmlJKmTvx9rv-eoBXXpW9MUUtyTdCqg'; 
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const values = data.values;
    const highestVotesByDistrict = {};

    values.forEach(row => {
      const district = row[0];  
      const Winner = row[8]; 
      const votes = row[2]; 
      const Party = row[9];

      if (!highestVotesByDistrict[district] || votes > highestVotesByDistrict[district].votes) 
      {
        highestVotesByDistrict[district] = { Winner, votes, Party };
      }
    });
    return highestVotesByDistrict;
  } 
  catch (error) 
  {
    throw error;
  }
}

fetchData()
  .then(highestVotesByDistrict => {
    console.log('Candidate with highest votes by constituency:', highestVotesByDistrict);
  })
  .catch(error => {
    console.error('Error:', error);
  });
