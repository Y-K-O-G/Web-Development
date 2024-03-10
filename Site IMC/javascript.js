const btn = document.querySelector("#send");

btn.addEventListener("click", function(e) {

  e.preventDefault();

  const a = document.querySelector("#altura");

  const p = document.querySelector("#peso");

  const altura = a.value;

  const peso = p.value;

  function bmiCalculator(peso, altura) {
    var bmi = peso / (altura * altura);
    return Math.round(bmi);
  }

  var bmi = bmiCalculator(peso, altura);

  if (bmi < 18.5) {
    alert("Seu IMC é " + bmi + ", então você está abaixo do peso.");
  } else if (bmi >= 18.5 && bmi <= 29.9) {
    alert("Seu IMC é " + bmi + ", então você está no peso normal.");
  } else {
    alert("Seu IMC é " + bmi + ", então você está acima do peso.");
  }

})
