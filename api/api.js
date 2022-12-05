const $button = document.querySelector("#button");
const $howMany = document.querySelector("#howMany");

$button.addEventListener("click", getPeople);

function getPeople() {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keyLWe1cpGwL7HfFa" }).base(
    "appgjXaGcMbzfaOnc"
  );

  base("Data")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 1,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          console.log("Retrieved", record.get("people"));
          $howMany.innerHTML = `${record.get("people")}명`;
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}
