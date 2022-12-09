const $button = document.querySelector("#button");
const $howMany = document.querySelector("#howMany");
const $message = document.querySelector("#message");
const $li = document.querySelectorAll("li");
const $screen1 = document.querySelector(".screen1");
const $screen2 = document.querySelector(".screen2");
const $elevatorName = document.querySelector(".elevatorName");

let clicked = 0;
let leftCnt = 0;
let rightCnt = 0;

$li[0].addEventListener("click", () => {
  if (clicked) {
    return;
  }
  clicked = 1;
  $screen1.style.display = "none";
  $screen2.style.display = "flex";
  $elevatorName.innerHTML = "정보관: 왼쪽 Elev";
  ElevatorInfo("0023214");
});

$li[1].addEventListener("click", () => {
  if (clicked) {
    return;
  }
  clicked = 1;
  $screen1.style.display = "none";
  $screen2.style.display = "flex";
  $elevatorName.innerHTML = "정보관: 오른쪽 Elev";
  ElevatorInfo("0023215");
});

$li[2].addEventListener("click", () => {
  if (clicked) {
    return;
  }
  $screen1.style.display = "flex";
  $screen2.style.display = "none";
});

$button.addEventListener("click", GetPeople);

function GetPeople() {
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
          let people = record.get("people");
          $howMany.innerHTML = `${people}명`;
          if (people <= 2) {
            $message.innerHTML = "여유";
            $message.style.color = "green";
          } else if (people <= 4) {
            $message.innerHTML = "보통";
            $message.style.color = "rgb(241, 225, 48)";
          } else if (people <= 6) {
            $message.innerHTML = "혼잡";
            $message.style.color = "red";
          } else if (people > 6) {
            $message.innerHTML = "꺅! 사람이 너무 많은 걸요~";
            $message.style.color = "red";
          }
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

const $address1 = document.querySelector(".address1");
const $address2 = document.querySelector(".address2");
const $elevatorNo = document.querySelector(".elevatorNo");
const $elvtrStts = document.querySelector(".elvtrStts");
const $lastInspctDe = document.querySelector(".lastInspctDe");
const $ratedCap = document.querySelector(".ratedCap");
const $container = document.querySelector(".container");

let leftElev = [];
let rightElev = [];

function ElevatorInfo(elevator) {
  let i;
  if (leftCnt && elevator == "0023214") {
    clicked = 0;
    $address1.innerHTML = leftElev[0];
    $address2.innerHTML = leftElev[1];
    $elevatorNo.innerHTML = leftElev[2];
    $elvtrStts.innerHTML = leftElev[3];
    $lastInspctDe.innerHTML = leftElev[4];
    $ratedCap.innerHTML = leftElev[5];
    return;
  } else if (leftCnt == 0 && elevator == "0023214") {
    leftCnt = 1;
  } else if (rightCnt && elevator == "0023215") {
    clicked = 0;
    $address1.innerHTML = rightElev[0];
    $address2.innerHTML = rightElev[1];
    $elevatorNo.innerHTML = rightElev[2];
    $elvtrStts.innerHTML = rightElev[3];
    $lastInspctDe.innerHTML = rightElev[4];
    $ratedCap.innerHTML = rightElev[5];
    return;
  } else if (rightCnt == 0 && elevator == "0023215") {
    rightCnt = 1;
  }
  const loader = document.createElement("div");
  loader.classList.add("lds-ellipsis");
  loader.innerHTML = "<div></div><div></div><div></div><div></div>";
  $screen2.appendChild(loader);
  $container.style.display = "none";
  let serviceKey =
    "Q3kIDZuGXf4%2BErRxTOjnfdKD8owQzR%2F2NVmo5GJf88bFssy5LGhQmV0eHPu%2FMmZgf1FyCDWKGbou1ecKXX2KYA%3D%3D";
  let elevatorNo = elevator;
  let url2 = `http://apis.data.go.kr/openapi/service/ElevatorInformationService/getElevatorViewN?serviceKey=Q3kIDZuGXf4%2BErRxTOjnfdKD8owQzR%2F2NVmo5GJf88bFssy5LGhQmV0eHPu%2FMmZgf1FyCDWKGbou1ecKXX2KYA%3D%3D&elevator_no=${elevatorNo}`;
  fetch(url2, {
    // credentials: "include",
    // mode: "cors",
  })
    .then((response) => response.text())
    .then((data) => new DOMParser().parseFromString(data, "text/xml"))
    .then((xml) => {
      if (elevator == "0023214") {
        leftElev[0] = xml.querySelector("address1").innerHTML;
        leftElev[1] = xml.querySelector("address2").innerHTML;
        leftElev[2] = xml.querySelector("elevatorNo").innerHTML;
        leftElev[3] = xml.querySelector("elvtrStts").innerHTML;
        leftElev[4] = xml.querySelector("lastInspctDe").innerHTML;
        leftElev[5] = xml.querySelector("ratedCap").innerHTML;
        $address1.innerHTML = leftElev[0];
        $address2.innerHTML = leftElev[1];
        $elevatorNo.innerHTML = leftElev[2];
        $elvtrStts.innerHTML = leftElev[3];
        $lastInspctDe.innerHTML = leftElev[4];
        $ratedCap.innerHTML = leftElev[5];
      } else if (elevator == "0023215") {
        rightElev[0] = xml.querySelector("address1").innerHTML;
        rightElev[1] = xml.querySelector("address2").innerHTML;
        rightElev[2] = xml.querySelector("elevatorNo").innerHTML;
        rightElev[3] = xml.querySelector("elvtrStts").innerHTML;
        rightElev[4] = xml.querySelector("lastInspctDe").innerHTML;
        rightElev[5] = xml.querySelector("ratedCap").innerHTML;
        $address1.innerHTML = rightElev[0];
        $address2.innerHTML = rightElev[1];
        $elevatorNo.innerHTML = rightElev[2];
        $elvtrStts.innerHTML = rightElev[3];
        $lastInspctDe.innerHTML = rightElev[4];
        $ratedCap.innerHTML = rightElev[5];
      }
      $container.style.display = "flex";
      $screen2.removeChild(loader);
      clicked = 0;
    });
}
