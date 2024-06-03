// Add an event listener for form submission
document.getElementById('multiplicationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get user input values
    const minColumnValue = document.getElementById('minColumnValue').value;
    const maxColumnValue = document.getElementById('maxColumnValue').value;
    const minRowValue = document.getElementById('minRowValue').value;
    const maxRowValue = document.getElementById('maxRowValue').value;

    // Define the acceptable range
    const minRange = -50;
    const maxRange = 50;

    // Clear previous error messages and table
    document.getElementById('errorMessage').innerText = '';
    document.getElementById('tableContainer').innerHTML = '';

    // Check if inputs are valid numbers and within the acceptable range
    if (isNaN(minColumnValue) || isNaN(maxColumnValue) || isNaN(minRowValue) || isNaN(maxRowValue)) {
        document.getElementById('errorMessage').innerText = "Please enter valid numbers.";
        return; // Exit the function if inputs are not valid numbers
    }

    // Convert input values to integers
    const minColumnNum = parseInt(minColumnValue);
    const maxColumnNum = parseInt(maxColumnValue);
    const minRowNum = parseInt(minRowValue);
    const maxRowNum = parseInt(maxRowValue);

    // Check if the input values are within the defined range
    if (minColumnNum < minRange || minColumnNum > maxRange ||
        maxColumnNum < minRange || maxColumnNum > maxRange ||
        minRowNum < minRange || minRowNum > maxRange ||
        maxRowNum < minRange || maxRowNum > maxRange) {
        document.getElementById('errorMessage').innerText = `Please enter numbers between ${minRange} and ${maxRange}.`;
        return; // Exit the function if inputs are out of range
    }

    // Check if minimum values are less than or equal to maximum values
    if (minColumnNum > maxColumnNum || minRowNum > maxRowNum) {
        document.getElementById('errorMessage').innerText = "Minimum values should be less than or equal to maximum values.";
        return; // Exit the function if minimum values are greater than maximum values
    }

    // Generate the multiplication table with the user input values
    generateTable(minColumnNum, maxColumnNum, minRowNum, maxRowNum);
});

// Function to generate the multiplication table
function generateTable(minColumn, maxColumn, minRow, maxRow) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // Clear any previous table

    // Create table elements
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create the table header row
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader);
    for (let i = minColumn; i <= maxColumn; i++) {
        const th = document.createElement('th');
        th.innerText = i;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    for (let i = minRow; i <= maxRow; i++) {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.innerText = i;
        row.appendChild(th);
        for (let j = minColumn; j <= maxColumn; j++) {
            const td = document.createElement('td');
            td.innerText = i * j;
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableContainer.appendChild(table); // Append the generated table to the container
}
