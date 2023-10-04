const $prompt = document.querySelector(".prompt");
const $url = document.querySelector(".url");
const $form = document.querySelector(".inputForm");
const $box = document.querySelector(".box");

$form.addEventListener(
  "submit",
  (Submit = (event) => {
    event.preventDefault();
    user_prompt = $prompt.value;
    url = $url.value;

    //img remove
    $images = document.getElementsByClassName("img");
    console.log($images.length);
    for (let i = $images.length - 1; i >= 0; i--) {
      console.log($images[i]);
      $images[i].remove();
    }

    let img = document.createElement("img");
    img.src = url;
    img.className = "img";
    $box.appendChild(img);

    console.log(url);
    if (user_prompt == "" || url == "") {
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjlkNjdjYzctODM5ZS00MTI3LWE1MTktOWE4Njc3MzVjNTNmIiwidHlwZSI6ImFwaV90b2tlbiJ9.k7kK6IVUdSGcfqZ0Qa_ShC8W7yX4C3qt8eniawk3OKw",
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        providers: "google",
        file_url: url,
      }),
    };

    fetch("https://api.edenai.run/v2/image/object_detection", options)
      .then((response) => response.json())
      .then((response) => {
        data = response.google.items;
        dict = {};
        for (let i = 0; i < data.length; i += 4) {
          let tmp = "" + data[i].label;
          console.log(tmp);
          if (dict.hasOwnProperty(data[i].label)) {
            dict[tmp] += 1;
          } else {
            dict[tmp] = 1;
          }
        }

        let yolo_prompt = "";
        for (let i in dict) {
          let tmp = `There is ${dict[i]} ${i}. `;
          yolo_prompt += tmp;
        }
        let concat_prompt = yolo_prompt + user_prompt;
        console.log(concat_prompt);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          key: "cNUQoUgMIQAxBr0ySuod1QbAbRpo6kav6A9ltdHgHGJMV0ztaC5wY1jocbBa",
          prompt: concat_prompt,
          negative_prompt: null,
          init_image: url,
          width: "512",
          height: "512",
          samples: "1",
          num_inference_steps: "30",
          safety_checker: "no",
          enhance_prompt: "yes",
          guidance_scale: 7.5,
          strength: 0.8,
          seed: null,
          webhook: null,
          track_id: null,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://stablediffusionapi.com/api/v3/img2img", requestOptions)
          .then((response) => response.json())
          .then((response) => {
            link = response.output[0];
            console.log(link);

            let img = document.createElement("img");
            img.src = link;
            img.className = "img";
            $box.appendChild(img);
            // fetch(link)
            //   .then((response) => response.json())
            //   .then((data) => console.log(data));
          })
          .catch((error) => console.log("error", error));
      })
      .catch((err) => console.error(err));
  })
);
