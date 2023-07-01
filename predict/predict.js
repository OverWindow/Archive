const $date = document.querySelector("#date");
const $estimation = document.querySelector("#estimation");
const $slots = document.querySelectorAll(".slot");
// slots[0] = starting_price
// slots[1] = predicted_price
// slots[2] = balance

/* Airtable */
window.onload = function GetData() {
  var Airtable = require("airtable");
  var base = new Airtable({
    apiKey:
      "pat68pQq7hRwbYku4.a630ec650bbf1b0c80027a5a8f35ea256670461e4edd2ea8682834926a4175b9",
  }).base("applEsdrNCI75pjhR");
  let yPredict = [];
  let lowest;
  base("Table 1")
    .select({
      // Selecting the first 7 records in Grid view:
      maxRecords: 8,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        let today = records[0];
        lowest = Number(records[0].get("Predict"));
        console.log("Retrieved", today.get("date"), today.get("Open"));
        $date.innerHTML = today.get("date");
        $slots[0].innerHTML = `Open: ${today.get("Open")} (W)`;
        $slots[1].innerHTML = `Estimation: ${today.get("Predict")} (W)`;
        $slots[2].innerHTML = `Balance: ${Math.ceil(today.get("Balance"))} (W)`;
        $estimation.innerHTML = `${
          Math.ceil((Number(today.get("MARR")) - 100) * 100) / 100
        }%`;

        for (let i = 7; i >= 0; i--) {
          yPredict.push(records[i].get("Predict"));
          lowest = Math.min(lowest, Number(records[i].get("Predict")));
        }
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetch("https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=8", {
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let xValues = [];
            let yActual = [];
            let yOpen = [];
            for (let i = 7; i >= 0; i--) {
              xValues.push(data[i].candle_date_time_kst.slice(5, 10));
              yOpen.push(data[i].opening_price);
              if (i != 0) {
                yActual.push(data[i].trade_price);
                lowest = Math.min(lowest, Number(data[i].trade_price));
              }
            }
            // console.log(xValues);
            // console.log(yActual);
            new Chart("myChart", {
              type: "line",
              data: {
                labels: xValues,
                datasets: [
                  {
                    label: "Actual Close",
                    data: yActual,
                    borderColor: "red",
                    fill: false,
                  },
                  {
                    label: "Predicted Close",
                    data: yPredict,
                    borderColor: "rgb(234, 155, 75)",
                    fill: false,
                  },
                  {
                    label: "Open",
                    data: yOpen,
                    borderColor: "blue",
                    fill: false,
                  },
                ],
              },
              options: {
                legend: {
                  display: true,
                  position: "bottom",
                },
                scales: {
                  xAxes: [
                    {
                      display: true,
                      scaleLabel: {
                        display: false,
                        labelString: "x축",
                      },
                    },
                  ],
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        suggestedMin: lowest,
                        stepSize: 1000000,
                      },
                      scaleLabel: {
                        display: false,
                        labelString: "y축",
                      },
                      color: "black",
                    },
                  ],
                },
              },
            });
          })
          .catch((e) => console.log(e));
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
};

// new Chart("myChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [
//       {
//         data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
//         borderColor: "red",
//         fill: false,
//       },
//       {
//         data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
//         borderColor: "green",
//         fill: false,
//       },
//       {
//         data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
//         borderColor: "blue",
//         fill: false,
//       },
//     ],
//   },
//   options: {
//     legend: { display: false },
//   },
// });
