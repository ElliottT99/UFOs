// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    console.log(filterId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if(elementValue){
        filters[filterId] = elementValue;
    }else{
        delete filters[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values

    //after intense testing, i have zero clue what the difference is between:
    //filteredData = filteredData.filter(row => row.datetime === filters.datetime);
    //the above line works with all filters, not just datetime BUT it has to manually be typed VERSUS

    //filteredData = filteredData.filter((row) => row.newFilter === filters.newFilter);
    //the above line does not change the table at all, despite being almost identical BUT it registers the filters and the loop functions properly

    //console.log(filteredData.filter((row) => row.datetime === filters.datetime));

    //console.log(filteredData.filter(row => row.datetime === filters.datetime));
    //console.log(filters.datetime);


    Object.values(filters).forEach((newFilter) => {
        //console.log(filter) filter returns values, not keys
        //console.log(newFilter);
        //console.log(filteredData.filter((row) => row.newFilter === filters.newFilter));
        if(filteredData.filter((row) => row.newFilter === filters.newFilter)){
            filteredData = filteredData.filter((row) => row.newFilter === filters.newFilter);//why do you refuse to work?
            //console.log(filteredData.filter((row) => row.newFilter === filters.newFilter));
            //console.log("changes applied");
        }
        //this is more testing just to try anything
        /*
        Object.values(filteredData).forEach((rowData) => {
            //console.log(rowData); rowData returns each row of data as an object
            if(rowData.newFilter = filters.newFilter){
              filteredData = filteredData.filter((row) => row.newFilter === filters.newFilter);
            }
            
            Object.values(rowData).forEach((row) =>{
                //console.log(row); row returns each piece of data individually, the values

                if(row == newFilter){
                    console.log("true")
                    filteredData = filteredData.filter(rowData =>  row == newFilter);
                }
            });
            
        });
        */
    });
    //this is just to have the program working cause apperantly the functioning loop doesnt function, works if all 5 fields are filled in
    filteredData = filteredData.filter(row => row.datetime === filters.datetime);
    filteredData = filteredData.filter(row => row.city === filters.city);
    filteredData = filteredData.filter(row => row.state === filters.state);
    filteredData = filteredData.filter(row => row.country === filters.country);
    filteredData = filteredData.filter(row => row.shape === filters.shape);
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
    //console.log("table updated")
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);

  // Build the table when the page loads
  buildTable(tableData);
