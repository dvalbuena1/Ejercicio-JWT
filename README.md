# Ejercicio JWT

La aplicación contiene en total 4 endpoints

- /signUp - POST
- /login - POST
- /data - POST
- /data - GET

En endpoint /login generara el token que deberá de añadirse como header a los últimos dos endpoints.
El endpoint /data - POST solo tendrá acceso un usuario con role igual a "admin".
El endpoint /data - GET solo obtendrá la información a la que el usuario tenga acceso.
