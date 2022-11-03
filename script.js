
//Inicializamos datos basicos para el restaurante: menu, mesa y camareros

function iniciar() {
    if (localStorage.length == 0) {
        var listaCamareros = [];
        for (let i = 1; i < 5; i++) {
            var camarero = {
                id_camarero: `${i}`,
                nombre_camarero: `camarero${i}`,
                password: "1234",
                mesasActuales: {},
                mesasAtendidas: 0
            }
            listaCamareros.push(camarero);
        }
        localStorage.setItem("camarero", JSON.stringify(listaCamareros));
        class Mesa{
            constructor(numero, estado, id_camarero, comanda){
            this.numero = numero;
            this.estado = estado;
            this.id_camarero = id_camarero;
            this.comanda = comanda;
            }
        }
        class Articulo {
            constructor(id_articulo, tipo, nombre, precio) {
                this.id_articulo = id_articulo;
                this.tipo = tipo;
                this.nombre = nombre;
                this.precio = precio;
            }
        }
        var articulos = [];
        var menu = {
            "id_articulo": ["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18", "a19", "a20"],
            "tipo": ["bebida", "bebida", "bebida", "bebida", "bebida", "bebida", "bebida", "comida", "comida", "comida", "comida", "comida", "comida", "comida", "comida", "comida", "postre", "postre", "postre", "postre", "postre"],
            'nombre': ['Vino tinto', 'Vino blanco', 'Cerveza', 'Refresco', 'Zumo', 'Café', 'Café especial', 'Gazpacho', 'Ensalada mixta', 'Ensaladilla', 'Lasaña', 'Puré de verduras', 'Secreto ibérico', 'Escalope de pollo', 'Bacalao a la riojana', 'Hamburguesa', 'Tarta de queso', 'Fruta del tiempo', 'Flan de la casa', 'Tarta de la abuela', 'Varios'],
            'precio': [3, 3, 2.5, 2.5, 2.5, 1.5, 2, 4, 3.5, 3.5, 5, 3, 12, 8.5, 14, 9.5, 2, 3, 4, 5, 1]
        }
        for(let i=0; i<menu.id_articulo.length;i++){
            var articulo = new Articulo(menu.id_articulo[i], menu.tipo[i], menu.nombre[i], menu.precio[i]);
            articulos.push(articulo)
        }
        localStorage.setItem("articulos",JSON.stringify(articulos))
        class Comanda{
            constructor(id_articulo, nombre_articulo,  cantidad, precio){
                this.id_articulo=id_articulo;
                this.nombre_articulo=nombre_articulo;
                this.cantidad=cantidad;
                this.precio=precio;
            }
        }
        //inicio una comanda con todos los articulos en cada mesa para actualizarlos despues
        var comandaInit = [];
        for(let i=0;i<articulos.length;i++){
            comandaInit.push(new Comanda(articulos[i].id_articulo,articulos[i].nombre ,0,articulos[i].precio))
        }
        var listaMesas = [];
        for (let i = 1; i < 11; i++) {
            var mesa = new Mesa (i,"cerrada",0, comandaInit)
            listaMesas.push(mesa);
        }
        localStorage.setItem("mesa", JSON.stringify(listaMesas));
    }
}

