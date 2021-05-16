// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    //cleases the table
    tbody.html("");
    //loops through each object present
    data.forEach((dataRow) => {
        //append row to table
        let row = tbody.append("tr");
        //loops through each value in said row
        Object.values(dataRow).forEach((val) => {
            //append rowData to cell
            let cell = row.append("td");
            cell.text(val);
        });
    });
}
function handleClick() {
    //assigning our choosen filter to a variable, that being datetime
    let date = d3.select("#datetime").property("value");
    //variable creation for manipulation
    let filteredData = tableData;
    //if a date was entered, filter the data accordingly
    if (date) {
        //filtering data to only have the data that fits the filter requirements, that being the date
        filteredData = filteredData.filter(row => row.datetime === date);
      };
    //rebuild the table with new filtered data
    buildTable(filteredData);
}

//creates an event to listen for a button click
d3.selectAll("#filter-btn").on("click", handleClick);

//builds the table on the page on load
buildTable(tableData);
