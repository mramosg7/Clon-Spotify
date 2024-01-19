
// const requestOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
// };

// fetch(tokenUrl, requestOptions)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
    
    
//     guardarTokenEnLocalStorage(data.access_token, data.expires_in)

//     const token2 = obtenerTokenDesdeLocalStorage()
    
//     console.log(token2)
//   })
//   .catch(error => console.error("Error al obtener el token:", error));

// const token2 = obtenerTokenDesdeLocalStorage()
// console.log(token2)
  



// const redirectUri = 'http://localhost:5500';
// const scope = 'user-read-private user-read-email'; // Por ejemplo: 'user-read-private user-read-email'
// const authorizationEndpoint = 'https://accounts.spotify.com/authorize';

 

// // Aquí necesitas una manera de obtener el código de autorización de la URL después de que el usuario es redirigido

// // Ejemplo de cómo podrías manejar el código de autorización (esto podría depender de tu aplicación y cómo manejas las redirecciones)
// function manejarCodigoDeAutorizacion() {
//     const codigoDeAutorizacion = obtenerCodigoDeAutorizacionDeURL(); // Necesitas implementar esto

//     // Ahora podrías enviar el código de autorización al servidor para el intercambio por un token de acceso
//     intercambiarCodigoPorToken(codigoDeAutorizacion);
// }

// function intercambiarCodigoPorToken(codigoDeAutorizacion) {
//     // Esto debería realizarse en el servidor para mantener seguro el client_secret
//     // Puedes usar una solicitud fetch o cualquier otra forma de hacer solicitudes HTTP
//     // Aquí solo mostramos un ejemplo básico en el lado del cliente, que no debe hacerse en producción

//     const tokenEndpoint = 'https://accounts.spotify.com/api/token';

//     const datosParaEnviar = {
//     grant_type: 'authorization_code',
//     code: codigoDeAutorizacion,
//     redirect_uri: redirectUri,
//     client_id: clientId,
//     client_secret: 'TU_CLIENT_SECRET'  // No debes hacer esto en el lado del cliente en un entorno de producción
//     };

//     fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams(datosParaEnviar)
//     })
//     .then(response => response.json())
//     .then(data => {
//     const accessToken = data.access_token;
//     const refreshToken = data.refresh_token;

//     // Aquí podrías almacenar accessToken y refreshToken según sea necesario
//     })
//     .catch(error => console.error('Error al intercambiar código por token:', error));
// }

const tokenUrl = "https://accounts.spotify.com/api/token";
const clientId = "c36eb743f4a84e8b82e11949ebcf9dc4";
const clientSecret = "78621b9e06144a1d9c58f41ebe196ee0";
const redirectUri = 'http://localhost:5500/prueba/login.html';

function guardarTokenEnLocalStorage(token, expiresIn) {
    const expiracion = Date.now() + expiresIn * 1000; // Convierte a milisegundos
    const objetoConExpiracion = { token, expiracion };
    localStorage.setItem('miToken', JSON.stringify(objetoConExpiracion));
  }

  function obtenerTokenDesdeLocalStorage() {
    const objetoConExpiracion = JSON.parse(localStorage.getItem('miToken'));
  
    // Verificar si el token existe y no ha expirado
    if (objetoConExpiracion && objetoConExpiracion.expiracion > Date.now()) {
      return objetoConExpiracion.token;
    } else {
      // Si el token ha expirado o no existe, devuelve null o realiza alguna acción adicional
      return null;
    }
}
function iniciarSesion() {
    
    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    const codeVerifier = generateRandomString(64);

    const sha256 = async (plain) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }
    
    const prueba = async () => {
         const hashed = await sha256(codeVerifier);
         const codeChallenge = base64encode(hashed);

         const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        console.log(codeChallenge)

        // Almacena el code_verifier en localStorage para usarlo en el intercambio de código por token
        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }
    prueba()
    console.log(hashed,codeChallenge)
        
    }
    
    const getToken = async (code) => {
            // stored in the previous step
            let codeVerifier = localStorage.getItem('code_verifier');
          
            const payload = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'authorization_code',
                code:  code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier,
              }),
            }
          
            const body = await fetch("https://accounts.spotify.com/api/token", payload);
            const response =await body.json();
            console.log(response)
            localStorage.setItem('access_token', response.access_token);
          }
    

    const token = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // Verifica que haya un código en la URL antes de intentar obtener el token
        if (code) {
            getToken(code);
        } else {
            console.error('No se encontró un código en la URL.');
        }
    }

    const user = ()=>{
        // Obtén el token de acceso almacenado en el localStorage
        const accessToken = localStorage.getItem('access_token');
        
        // Verifica si el token de acceso existe
        if (accessToken) {
            fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              }).then(async response => {
                  if (!response.ok) {
                    // Intenta obtener más detalles del cuerpo de la respuesta
                    console.log(response)
                    const errorData = await response.json();
                      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}. Detalles: ${JSON.stringify(errorData)}`);
                  }
                  console.log(response)
                  return response.json();
                })
                .then(data => {
                  console.log('Información del usuario:', data);
                  localStorage.setItem('user', data.id)
                })
                .catch(error => console.error('Error al obtener información del usuario:', error));
        } else {
          console.error('No se encontró un token de acceso en el localStorage.');
        }
    }

    const playlist= ()=>{
        const accessToken = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        const playlistData = {
            name: "New Playlist",
            description: "New playlist description",
            public: false
          };
          
          fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistData)
          })
            .then(response => {
              if (!response.ok) {
                // Puedes manejar errores aquí si es necesario
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              // Maneja la respuesta exitosa aquí
              console.log('Playlist creada con éxito:', data);
            })
            .catch(error => {
              // Maneja errores generales aquí
              console.error('Error al crear la playlist:', error);
            });
    }


  