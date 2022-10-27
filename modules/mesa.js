// --------------------------------------- mesa --------------------------------------------------------
//TICKET
class Ticket {
    constructor(id_ticket, fecha, id_mesa, nombre_camarero, comanda, total, pagado) {
        this.id_ticket = id_ticket;
        this.fecha = fecha;
        this.id_mesa = id_mesa;
        this.nombre_camarero = nombre_camarero;
        this.comanda = comanda;
        this.total = total;
        this.pagado = pagado;
    }
}


function mostrarArticulos() {
    var articulos = JSON.parse(localStorage.articulos)
    var div_bebidas = document.getElementById("m_bebidas");
    var div_comidas = document.getElementById("m_comidas");
    var div_postres = document.getElementById("m_postres");
    for (let i = 0; i < articulos.length; i++) {
        //creo una fila con los elementos que quiero mostrar
        var row = document.createElement("div")
        var texto = document.createElement("p");
        var menos = document.createElement("button");
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
        //
        if (articulos[i].tipo == "bebida") {
            div_bebidas.appendChild(row);
        }
        if (articulos[i].tipo == "comida") {
            div_comidas.appendChild(row);
        }
        if (articulos[i].tipo == "postre") {
            div_postres.appendChild(row);

        }
    }
}

function sumar(id) {
    var displays = document.getElementsByClassName("m_display");
    let i = 0;
    while (id != displays[i].id) {
        i++
    }
    var display = displays[i];
    var valorAnterior = parseInt(display.innerHTML)
    display.innerHTML = valorAnterior + 1;
}

function restar(id) {
    var displays = document.getElementsByClassName("m_display");
    let i = 0;
    while (id != displays[i].id) {
        i++
    }
    var display = displays[i];
    var valorAnterior = parseInt(display.innerHTML);
    if (valorAnterior != 0) {
        display.innerHTML = valorAnterior - 1;
    }
}

//---------------------------- guardar comanda -----------------------
class Comanda{
    constructor(id_articulo, cantidad){
        this.id_articulo=id_articulo;
        this.cantidad=cantidad;
    }
}

function guardarComanda() {
    var mesaActual = localStorage.mesaActual;
    var mesas = JSON.parse(localStorage.mesa);
    var displays = document.getElementsByClassName("m_display");
    var comanda = mesas[mesaActual].comanda;
    
    for (let i = 0; i < displays.length; i++) {
        for (let j = 0; j < comanda.length; j++) {
            if (displays[i].innerHTML > 0 && (comanda[j].id_articulo != displays[i].id )) {
                var newComanda = new Comanda (displays[i].id, displays[i].innerHTML)
                comanda.push(newComanda);
                displays[i].innerHTML = 0;
            }
            if (displays[i].innerHTML > 0 && comanda[j].id_articulo == displays[i].id) {
                comanda[j].cantidad = parseInt(comanda[j].cantidad) + parseInt(displays[i].innerHTML);
                displays[i].innerHTML = 0;
            }
        }
    }
   
    mesas[mesaActual].comanda = comanda;

    localStorage.setItem("mesa", JSON.stringify(mesas));
}


//Cerrar Mesa
function cerrarMesa() {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();

    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    var camareroActual = localStorage.getItem("camareroActual")
    var camareroActualN = "";
    for (let i = 0; i < users.length; i++) {
        if (camareroActual == users[i].id_camarero)
            camareroActualN = username[i]
    }
    var total = 0;
    var pagado = false;
    var ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    var inicioTicket = [];
    var mesaActual = localStorage.mesaActual
    var mesa = JSON.parse(localStorage.mesa)
    console.log(mesa)
    if (!ticketsLista) {
        var newTicket = new Ticket(0, fechaticket, mesaActual, camareroActualN, {}, total, pagado);
        inicioTicket.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(inicioTicket))
    } else {
        var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket + 1;
        var newTicket = new Ticket(id_anterior, fechaticket, mesaActual, camareroActualN, {}, total, pagado);
        ticketsLista.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(ticketsLista))
    }
    mesa[mesaActual].estado = 'cerrada';
    mesa[mesaActual].comanda = {};
    localStorage.setItem('mesa', JSON.stringify(mesa));

    window.location = 'camarero.html';


    let mesasAtendidas = JSON.parse(localStorage.camarero)[localStorage.camareroActual].mesasAtendidas;
    users[localStorage.camareroActual - 1].mesasAtendidas = mesasAtendidas + 1;
    localStorage.setItem("camarero", JSON.stringify(users))
}