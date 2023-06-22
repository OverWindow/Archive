const $button = document.querySelector("#button");
const $date = document.querySelector("#date");
const $estimation = document.querySelector("#estimation");
const $slots = document.querySelectorAll(".slot");
// slots[0] = starting_price
// slots[1] = predicted_price
// slots[2] = balance

$button.addEventListener("click", GetData);

/* Airtable */
function GetData() {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keyLWe1cpGwL7HfFa" }).base(
    "applEsdrNCI75pjhR"
  );

  base("Table 1")
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 1,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          console.log("Retrieved", record.get("date"), record.get("Open"));
          $date.innerHTML = record.get("date");
          $slots[0].innerHTML = `Open: ${record.get("Open")} (W)`;
          $slots[1].innerHTML = `Estimation: ${record.get("Predict")} (W)`;
          $slots[2].innerHTML = `Balance: ${Math.ceil(
            record.get("Balance")
          )} (W)`;
          $estimation.innerHTML = `${
            Math.ceil((Number(record.get("MARR")) - 100) * 100) / 100
          }%`;
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
