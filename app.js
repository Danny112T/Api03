const express = require("express");
const app = express();
const port = process.env.port || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// arreglo de objetos de categorias
let categorias = [
  { id: 1, nombre: "Cocina", descripcion: "Utensilios de cocina"},
  { id: 2, nombre: "Limpieza", descripcion: "Utensilios de limpieza"},
  { id: 3, nombre: "Herramientas", descripcion: "Utensilios de herramientas"},
  { id: 4, nombre: "Jardineria", descripcion: "Utensilios de jardineria"},
  { id: 5, nombre: "Electricidad", descripcion: "Utensilios de electricidad" },
  { id: 6, nombre: "Licores", descripcion: "licores desde vodka hasta tequila"},
  { id: 7, nombre: "Plomeria", descripcion: "Utensilios de plomeria"},
  { id: 8, nombre: "Mecanica",  descripcion: "Utensilios de mecanica"},
  { id: 9, nombre: "Carpinteria", descripcion: "Utensilios de carpinteria"},
  { id: 10, nombre: "Construccion", descripcion: "Utensilios de construccion"},
];


app.get('/socios/v1/categorias', (req, res) => {
    // 1.- Verificar si existe categoria
    if (categorias.length > 0) {
        res.status(200).json({
            estado:1,
            mensaje:"Categorias encontradas",
            categorias: categorias
        })
    } else {
        res.status(404).json({
            estado: 0,
            message: "No existen categorias"});
            categorias: null
    }
    // 2._ mostrarlas con un estado y mensaje
    // 3.- si no existe mostrar un mensaje de error
    // En formato JSON
    // motrar mensaje de estado del servidor
    
    //res.send('Mostrar todas las categorias');
    // todas las categorias
});

app.get("/socios/v1/categorias/:id", (req, res) => {
    // Solo una categoria 
    const id = req.params.id;
    // programacion funcional
    const categoria = categorias.find(categoria => categoria.id == id);
    /* programacion estructurada
    for (let i = 0; i < Array.length; i++) {
        const element = array[i];
    }*/
    if (categoria) {
        res.status(200).json({
            estado: 1,
            mensaje: "Categoria encontrada",
            categoria: categoria,
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Categoria no encontrada",
            categoria: null,
        })
    //res.send('Mostrar una categoria por id');
    // solo una categoria por id
}});

app.post("/socios/v1/categorias", (req, res) => {
    // Crear un recurso - categoria
    // Requerimientos
    // id = autoincremental o generar un num aleatorio
    // nombre y descripcion = req.body
    const { nombre, descripcion } = req.body;
    const id = categorias.length + 1;
    // comprobar que el cliente (chrome, edge, altair o postman) =  usuario = programador
    if (nombre == undefined || descripcion == undefined) {
      // error en la solicitud por parte del programador o cliente
      res.status(400).json({
        estado: 0,
        mensaje: "Faltan datos",
        categoria: null,
      });
    } else {
      // en javascript  como agregar un nuevo elemento a un arreglo
      const categoria = { id: id, nombre: nombre, descripcion: descripcion };
      const longitudInicial = categorias.length;
      categorias.push(categoria);
      if (categorias.length > longitudInicial) {
        // todo ok de parte del cliente y servidor
        res.status(201).json({
          estado: 1,
          mensaje: "Categoria creada",
          categoria: categoria,
        });
      } else {
        // error en el servidor - creador de la API o de la DB o de quien config el servidor
        res.status(500).json({
          estado: 0,
          mensaje: "Error en el servidor",
          categoria: null,
        });
      }
    }
    //res.send('Crear una categoria');
    // crear una categoria
});

app.put("/socios/v1/categorias/:id", (req, res) => {
    const {id} = req.params
    const { nombre, descripcion } = req.body;
    if(nombre==undefined || descripcion==undefined){
        res.status(400).json({
            estado:0,
            mensaje:"Faltan datos en la solicitud",
            categoria: null
        })
    } else {
        const categoria = categorias.find(categoria => categoria.id == id);
        if(categoria){
            categoria.nombre = nombre;
            categoria.descripcion = descripcion;
            res.status(200).json({
                estado:1,
                mensaje:"Categoria actualizada",
                categoria: categoria
            })
        } else {
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categoria: null
            })
        }
    }
    //res.send('Actualizar una categoria por id');
    // actualizar una categoria por id
});

app.delete("/socios/v1/categorias/:id", (req, res) => {
    const {id} = req.params
    const categoria = categorias.find(categoria => categoria.id == id);
    if(categoria){
        const index = categorias.indexOf(categoria);
        categorias.splice(index,1);
        res.status(200).json({
            estado:1,
            mensaje:"Categoria eliminada",
            categoria: categoria
        })
    } else {
        res.status(404).json({
            estado:0,
            mensaje:"Categoria no encontrada",
            categoria: null
        })
    }
    //res.send('Eliminar una categoria por id');
    // eliminar una categoria por id
});

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
});