const form = document.getElementById("form");
const resultDiv = document.getElementById("result");

const numberAttribute = [
  "age",
  "marriageStatus",
  "weight",
  "bmi",
  "follicleNoR",
  "follicleNoL",
  "amh",
  "regularCycle",
  "cycleLength",
];

const checkBoxAttribute = [
  "skinDarkening",
  "hairGrowth",
  "weightGain",
  "fastFood",
  "pimples",
];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let params = {};

  for (const attribute of numberAttribute) {
    params[attribute] = Number.parseFloat(form[attribute].value);
  }

  for (const attribute of checkBoxAttribute) {
    params[attribute] = form[attribute].checked;
  }

  console.log(JSON.stringify(params));
  
  const response = await fetch(
    "https://pcos-prediction-backend.onrender.com/",
    {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(params),
    }
  );

  const prediction = await response.json();

  console.log(prediction);

  if (prediction.atRisk) {
    resultDiv.innerHTML = "You are at risk";
  } else {
    resultDiv.innerHTML = "You are not at risk";
  }
});
