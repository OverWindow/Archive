const $button = document.querySelector("#button");
const $howMany = document.querySelector("#howMany");

$button.addEventListener("click", getPeople);

function getPeople() {
  fetch("https://192.168.45.132:5000", {
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", JSON.stringify(data));
      $howMany.innerHTML = `${data.people}명`;
    })
    .catch((error) => {
      $howMany.innerHTML = "Error";
      console.log(error);
    });
}
