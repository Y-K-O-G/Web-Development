const btn = document.querySelector("#send");

btn.addEventListener("click", function(e) {

    e.preventDefault();

    const a = document.querySelector("#ano");

    const ano = a.value;

    function isLeap(ano) {

        if (ano % 4 == 0 && ano / 100 != 0) {
            alert(ano + "é um ano bissexto")
        
        else {
            alert(ano + "nãao é um ano bissexto")
        }
        }

    }
})
