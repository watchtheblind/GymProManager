// main.ts
import Fetch from '../FetchData'
import {useSession} from '../SessionContext'

const fetchInstance = Fetch('https://gympromanager.com')
const {user} = useSession()

// Datos a enviar
const token = 'Contraseña...'
const userid = user?.ID

if (userid === undefined) {
  console.error('Error: userid es undefined')
} else {
  const urlEncodedData = `token=${encodeURIComponent(token)}&userid=${encodeURIComponent(userid)}`

  // Realizar la solicitud POST
  fetchInstance
    .post('/app-notif.php', urlEncodedData)
    .then((response) => {
      console.log('Respuesta:', response)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
