# Adrian_Calero_Back-Final-Project-202205-MAD

## Temática

Aplicación mobil, E-commerce que pone en contacto autonomos con clientes.Hay dos tipos de registros(autonomos y clientes).Cada uno con sus diferentes paginas y funcionalidades.

=======

## Elementos de la aplicación

### -Back

Estructura de la base de datos

#### EndPoints

-   /register
-   /login
-   /client/home
-   /client/search
-   /client/:id (Detail page)
-   /client/setting

#### DataBase

{
"avatar": "url",
"username": "Pepe",
"email": "pepe@isdi.com",
"passwd": "1234",
"favorites": [{ "avatar": "url", "id": "1", "name": "Luisa" }]
},
{
"avatar": "url",
"username": "jose",
"email": "jose@isdi.com",
"passwd": "1234",
"profesion": "mechanic",
"template": {
"description": "description",
"detail": "details",
"price": 10,
"img": ["url"],
"video": ["url"]
}
},
{
"profesional": {
"id": "2",
},
"user": {
"id": "1",
"name": "Pepe"
},
"reviews": [
{
"id": "1",
"img": ["url"],
"video": ["url"],
"comment": ["coment"]
}
]
}

### -Front

### Páginas

#### Bout

-   Register or login.
-   Select automonous or client.
-   Setting page.

#### Client

-   Registro o Login page.
-   Register Client page.
-   Home page.
-   Search page.
-   Detail page.

### Componentes y responsabilidades

-   Register or Login
    -   Header: Mostrar logo.
    -   Buttons: Direccionan al registro o al login
-   Register page
    -   Header: Mostrar logo.
    -   Form: formulario con los campos siguentes:
        -   Add avatar
        -   Username
        -   Email
        -   Password
    -   Button: Lanza el evento de creación de cliente
-   Home page
    -   Header: Frase de ayuda al cliente + icon button para llevarte a tus autonomos favoritos
    -   Categories: botones que direccionan a la categoria marcada
    -   Info: informacion de interes para el cliente con targetas que portaran mas informacion dinamica
    -   Footer: Dos iconos cliclables para volver a la pagina home y el otro para ir a la pagina settings
-   Search page
    -   Header: Boton de volver atras, titulo de la categoria elegida y boton de busqueda.
    -   Body: Targetas pulsables con algo de info del autonomo y boton de añadir a favoritos
    -   Footer: Dos iconos cliclables para volver a la pagina home y el otro para ir a la pagina settings
-   Detail page
    -   Header: Avatar del autonomo con media de puntuacion y cantidad de reseñas
    -   Info: Informacion completa que ofrece el autonomo para los clientes (fotos y videos incluidos)
    -   Comments: Todas las fotos subidas por los clientes y sus comentarios paginados
    -   Button: Boton fijado al final de la pantalla para concertar cita en el select tendras que poner la fecha, saldra un pop-up:
        -   Header: Check y info del contacto
        -   Buttons: Boton de volver a la home page y boton para dejar reseña al autonomo
    -   Footer: Dos iconos cliclables para volver a la pagina home y el otro para ir a la pagina settings
-   Settings page
    -   Header: Ajustes del login
    -   Body: Ajustes del template si eres autonomo, ajuda, terminos de la web, deslogearte.

## Milestones

### Orden de creación de páginas

-   Register and Login page
-   Both home page
-   Notification, calendar and setting page of autonomous
-   All pages of clients

### Prioridad de detalles de implementación

**Básico**: Imprescindible, realizar en primeras etapas. Estado por defecto
**Avanzado**: Añadidos de mejora de funcionalidades, añadir una vez completado básico y su testing al 100%
**Avanzado+**: Mejoras complejas, añadir sólo si el proyecto está ya en una etapa funcional completa
