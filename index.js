const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wizarddb:wizarddeejay@nodeapp.drvyry3.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model('User', {
  username: String,
  edad: Number,
})

/* funcionalidades CRUD user */

/* 
    crear un usuario 
*/
const crear = async () => {
  const user = new User({ username:'chan chito feliz', edad:15 })
  const savedUser = await user.save()
  console.log(savedUser)
}
// crear()


/* 
    buscar todos los usuarios creados 
*/
const buscarTodo = async () => {
  const users = await User.find()
  console.log(users)
}
// buscarTodo()


/* 
    buscar un usuario, pero busca todos los que coincida 
*/
const buscar = async () => {
  const user = await User.find({ username: 'chanchito feliz' })
  console.log(user)
}
// buscar()


/* 
    buscar un usuario que coincida con el criterio de busqueda 
*/
const buscarUno = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  console.log(user)
}
// buscarUno()


/* 
    Actualizar un usuario 
*/

const actualizarUno = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  user.edad = 30
  await user.save()
}
// actualizarUno()


/* 
    Eliminar un usuario 
*/
const eliminar = async () => {
  const user = await User.findOne({ username: 'chanchito feliz' })
  console.log(user)
  if (user) {
    await user.remove()
  }
}
// eliminar()





