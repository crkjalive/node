# NodeJs by Hola Mundo 
modulo 1   

### Dependencias e inicializacion de proyecto 
1. npm init -y
2. npm install -S express

# v2 explicacion de rutas API REST
Verbos  
1. Create == ***post***
2. read == ***get*** 
3. actualizar == ***put***
4. actualizar == ***patch***
5. eliminar == ***delete***

~~~
const express = require('express');
const app = express();
const port = 3000;


/* enpoint url localhost:3000/ */
app.get('/', (req, res) => {
  res.status(200).send('Chanchito Feliz');
});


/* enpoint crear */
app.post('/', (req, res) => {
  res.status(201).send('Creado Chanchito');
});


/* enpoint traer datos url con parametro id */
app.get('/:id', (req, res) => {
  res.status(200).send(req.params); // devuelve los parametros de la url
});


/* enpoint meter datos url con parametro id */
app.put('/:id', (req, res) => {
  console.log(req.url) // devuelve los parametros de la url en consola
  console.log(req.params) // devuelve los parametros de la url en consola
  res.sendStatus(204);
});


/* enpoint actualizar datos url con parametro id */
app.patch('/:id', (req, res) => {
  res.sendStatus(204);
});


/* enpoint eliminar datos url con parametro id */
app.delete('/:id', (req, res) => {
  res.sendStatus(204);
});


/* levantamiento del servidor en el puerto de escucha 3000*/
app.listen(port, () => {
  console.log(`Arrancando la app on port http://localhost:${port}`);
});
~~~

# Modulo 2
creando modulo para controllar las funciones de estados

## Modulo User.controller
~~~
const User = {
  get: (req, res) => {
    res.status(200).send('Este es un Chanchito')
  },
  list: (req, res) => {
    res.status(200).send('Hola Chanchitos!')
  },
  create: (req, res) => {
    res.status(201).send('Creando un Chanchito')
  },
  update: (req, res) => {
    res.status(204).send('Actualizando un Chanchito')
  },
  destroy: (req, res) => {
    res.status(204).send('Eliminando un Chanchito')
  }
}

module.exports = User
~~~

## importación del módulo para simplificar el código

~~~
const user = require('./user.controller.js')
const express = require('express');
const app = express();
const port = 3000;

app.get('/', user.list);
app.post('/', user.create);
app.get('/:id', user.get);
app.put('/:id', user.update);
app.patch('/:id', user.update);
app.delete('/:id', user.destroy);

app.listen(port, () => {
  console.log(`Arrancando la app on port http://localhost:${port}`);
});
~~~
Hacemos las pruebas con ***POSTMAN***
1. enviamos GET localhost:3000/  ***muestra la lista de todos los chanchitos***
2. enviamos GET localhost:3000/1 ***muestra un chanchito referente al id 1***
3. enviamos POST localhost:3000/1 ***creando un chanchito***
4. enviamos PUT localhost:3000/1 ***codigo 204 Not Content, significa que esta correcto***
4. enviamos PATCH localhost:3000/1 ***codigo 204 Not Content, significa que esta correcto***
4. enviamos DELETE localhost:3000/1 ***codigo 204 Not Content, significa que esta correcto***

# v7 capturando todas las peticiones
manejo a todas las rutas y subrutas que no tenemos definidas dentro de la aplicacion   
que se quiere decir, es que si la ruta get no existe o post vamos a poder manejar este error  

### al final de las peticiones existentes
con está instrucción manejamos todas las rutas y subrutas que no existan  

~~~
app.get('*', (req, res) => {
  res.status(404).send('Está página no existe se maneja con él código 404')
})
~~~

con POST, no es relevante, ya que nosotros estamos manejando las rutas que si existen dentro de nuestra aplicación  
por lo tanto no es necesario para una persona común que envie datos por POST.  

____

# MongoDB 
1. base de datos orientada a documentos
  
de que se componen?  
- colecciones (listado de documentos)
- documentos
- propiedades 

### JSON -> Documento
~~~
{
  "propiedad" : 'valor'
}
~~~

Se debe usar schemas para manejar unos documentos con las mismas propiedades, asi poder escalar nuestro proyecto  
los schemas se van a manejar con Mongoose  

### ALternativas de MongoDB 
1. Community Server -> instalacion local
  - Products -> Community Edition -> Community Server 
2. Enterprise Server -> versión de pago
3. Mongo Atlas -> solucion en la nube x 500 mb 
  - url para conexion
  - sin gestionar, sin mantener
  - 500 MB Free
  - práctica

### Pasos de instalación Mongo Atlas
1. creamos cuenta
2. sign in
3. built a database
4. free Shared -> create 
5. AWS + Región + Cluster 
6. UseraName + Password (debemos tener estas credenciales, para ingreso)
7. 0.0.0.0/0 + world (ip de la maquina de despliegue)
8. finish and close 

### Creando un Cluster 
1. DataBase Deployments 
2. Connetc to Cluster -> buscamos ***Connects your Application***
4. Node.Js and 4.1 or Later
5. url + copy
6. remplazaremos en username y el password
7. podemos ver una version de conexion que nos entregan, pero vamos a user Mongoose

URL de connection
~~~
mongodb+srv://<username>:<password>@cluster0atlasnodejs.chq0c9z.mongodb.net/?retryWrites=true&w=majority
~~~

Ejemplo de conection completo
~~~
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0atlasnodejs.chq0c9z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
~~~

***Aquí hice backup de nuestro avance en el código, en version1_backup***

### Creando Modelos y guardando datos 
1. dependencia de mongoose
2. npm i -S mongoose

~~~
{
  "name": "api",
  "version": "1.0.0",
  "description": "api Nicolas con NodeJs",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "wzr",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "mongoose": "^6.6.5"
  }
}
~~~

### Archivo de conexion
archvo que nos brinda MongoDB en la pagina ***index.js***  

# API REST
funcionalidades CRUD que podemos hacer con NodeJs sobre nuestros documentos 

~~~
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wizarddb:********clave********@nodeapp.drvyry3.mongodb.net/?retryWrites=true&w=majority')

const User = mongoose.model('User', {
  username: String,
  edad: Number,
})
~~~
# Funcionalidades CRUD user

### crear un usuario 
~~~
const crear = async () => {
  const user = new User({ username:'chan chito feliz', edad:15 })
  const savedUser = await user.save()
  console.log(savedUser)
}
// crear()
~~~

### buscar todos los usuarios creados 
~~~
const buscarTodo = async () => {
  const users = await User.find()
  console.log(users)
}
buscarTodo()
~~~

### buscar un usuario, pero busca todos los que coincida 
~~~
const buscar = async () => {
  const user = await User.find({ username: 'chanchito feliz' })
  console.log(user)
}
buscar()
~~~

### buscar un usuario que coincida con el criterio de busqueda 
~~~
const buscarUno = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  console.log(user)
}
buscarUno()
~~~

### Actualizar un usuario 
~~~
const actualizarUno = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  user.edad = 30
  await user.save()
}
actualizarUno()
~~~

### Eliminar un usuario 
~~~
const eliminar = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  console.log(user)
  if (user) {
    await user.remove()
  }
}
eliminar()
~~~


