function editarArticulos(){
    var articulos = JSON.parse(localStorage.articulos);
    for(let i=0;i<articulos.length;i++){
        var row = document.createElement("div")
        var id_articulo = document.createElement("p");
        var nombre = document.createElement("input");
        var precio = document.createElement("input");
        var tipo = document.createElement("select");
        
    }
}

        menos.innerHTML = "-";
        menos.setAttribute("onclick", `restar("${articulos[i].id_articulo}")`);
        menos.style.backgroundColor = "#e4685d";
        var display = document.createElement("p");
        display.setAttribute("class", "m_display");
        //Asigno al elemento P que muestra la cantidad de articulos la misma id que el articulo que imprime.
        display.setAttribute("id", `${articulos[i].id_articulo}`);
        display.innerHTML = 0;
        var mas = document.createElement("button");
        mas.setAttribute("onclick", `sumar("${articulos[i].id_articulo}")`);
        mas.innerHTML = "+";
        mas.style.backgroundColor = "#77b55a";
        var contenido = document.createTextNode(`${articulos[i].nombre}`);
        texto.appendChild(contenido);
        row.setAttribute("class", "m_filaDesplegable")
        row.appendChild(texto)
        row.appendChild(menos)
        row.appendChild(display)
        row.appendChild(mas)