$(document).ready(function () {
  $(function () {
    $(document).tooltip();
  });
  $("#enviar").click(function () {
    $("#cuadro").show();

    var persona = document.querySelector("#persona").value;
    var capital = document.querySelector("#capital").value;
    var plazo = document.querySelector("#plazo").value;
    var tasai = document.querySelector("#tasai").value;
    var subtasa = document.querySelector("#subtasa").value;
    var interes = document.querySelector("#interes").value;
    var mesamort = document.querySelector("#mesamort").value;
    var valoramort = document.querySelector("#valoramort").value;
    var resulinteres = document.querySelector("#resulinteres");
    var operainteres = document.querySelector("#operainteres");
    var resulcuota = document.querySelector("#resulcuota");
    var operacuota = document.querySelector("#operacuota");
    var tabla = document.querySelector("#tabla");
    tabla.innerHTML = "";

    if (tasai == 1) {
      var interes = interes / 100;
      var ia = interes / subtasa;
      var i = ia / (1 - ia);
      var valor = Math.pow(1 + i, subtasa / 12) - 1;
      var val = valor.toFixed(9);
      resulinteres.innerHTML = `<p>Interes: ${val}</p>`;
      operainteres.innerHTML = `<p><b>Operacion</b></p>`;
      operainteres.innerHTML += `<p><b>1.</b> ${interes} / ${subtasa} = ${ia} </p>`;
      operainteres.innerHTML += `<p><b>2.</b> ${ia} / (1 - ${ia}) = ${i} </p>`;
      operainteres.innerHTML += `<p><b>3.</b> (1+${i})^(${subtasa}/12))-1 = ${val}</p>`;
    }
    if (tasai == 2) {
      var interes = interes / 100;
      var i = interes / subtasa;
      console.log(i);
      var valor = Math.pow(1 + i, subtasa / 12) - 1;
      console.log(valor);
      var val = valor * 12;
      console.log(val);
    }
      var r = Math.pow(1 + valor, -plazo);
      r = 1 - r;
      var r2 = r / valor;
      var r3 = capital / r2;
      var val2 = r3.toFixed();
      resulcuota.innerHTML = `<p>Cuota: ${val2}</p>`;
      operacuota.innerHTML = `<p><b>Operacion</b></p>`;
      operacuota.innerHTML += `<p><b>1.</b> 1 - (1 + ${val})^${-plazo} = ${r}</p>`;
      operacuota.innerHTML += `<p><b>2.</b> ${r} / ${val} = ${r2}</p>`;
      operacuota.innerHTML += `<p><b>3.</b> ${capital} / ${r2} = ${val2}</p>`;
      var cap = capital;
      var i = 1;
      for (var a = 1; a <= plazo; a++) {
        var int = (cap * val).toFixed();
        var val3 = "";
        var clase = "";
        if (mesamort == a) {
          clase = "bg-success";
          var cuota = "Valor Amortizacion";
          val3 = valoramort;
        } else {
          var cuota = "Cuota";
          val3 = val2;
        }
        var amorti = (val3 - int).toFixed();
        var saldo = cap - amorti;
        if (saldo >= 0) {
          var dato = `
          <tr class="${clase}">
            <td>${a}</td>
            <td><a title="Deuda Actual">${cap}</a></td>
            <td><a title="${cap} / ${val}">${int}</a></td>
            <td><a title="${val3} - ${int}">${amorti}</a></td>
            <td><a title="${cuota}">${val3}</a></td>
            <td><a title="${cap} - ${amorti}">${saldo}</a></td>
          </tr>
          `;
        } else if (i <= 1) {
          i++;
          if (i == 2) {
            val3 = cap;
            amorti = (val3 - int).toFixed();
            saldo = cap - amorti;
          }
          var dato = `
          <tr>
            <td>${a}</td>
            <td><a title="Deuda Actual">${cap}</a></td>
            <td><a title="${cap} / ${val}">${int}</a></td>
            <td><a title="${val3} - ${int}">${amorti}</a></td>
            <td><a title="${cuota}">${val3}</a></td>
            <td><a title="${cap} - ${amorti}">${saldo}</a></td>
          </tr>
          `;
        } else {
          i++;
          var dato = `
          <tr>
          </tr>
          `;
        }
        tabla.innerHTML += dato;
        cap = saldo;
      }
  });
});
