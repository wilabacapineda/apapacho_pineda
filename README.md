# **PROYECTO FINAL - REACT JS, Comisión 39045**
Autor: Walter Pineda Ilabaca

[Video - Recorrido Compra completo](https://www.youtube.com/watch?v=nb62lKWy3uY)

## **1. Librerias**
El presente proyecto está realizado en React Js, utilizando las librerias externas Google Firebase, react-hook-form, react-router-dom y sweetalert2.

### **1.1 Firebase**

La libreria de Firebase se utiliza tanto para el inicio de sesión de la tienda como para el control productos, stock y ordenes. 

La configuración de está libreria se encuentra en `/utils/firebase.js`

#### 1.1.1 `firebase/auth`

Para iniciar sesión se utiliza la función `signInWithPopup` a través del Provider de Google, `GoogleAuthProvider`. Para cerrar sesión se utiliza la función `signOut`.

#### 1.1.2 `firebase/firestore`

Dentro de la base de datos No SQL Firestore se implementan dos colecciones
- **items**, colección que aloja los productos de la tienda.
    - Cada documento consta de los campos
        - **categoria**, `string` categoria del producto
        - **description**, `string` descripción del producto
        - **pictureUrl**, `string` url imagen del producto
        - **price_range**, `string` el rango de precios del producto
        - **stock**, `number` stock del producto
        - **title**, `string` nombre del producto
    - Ademas cada documento contiene la colección llamada `productos` donde cada documento contiene la combinación de las variaciones de tallas y colores del producto.
        - **color**, `string` color de viriación del producto
        - **price**, `number` precio del producto en variación
        - **stock**, `number` stock del producto en variación
        - **talla**, `string`talla de viriación del producto
        - **ventas**,`number` venta del producto en variación
- **orders**, colección que aloja las ordenes guardadas y/o realizadas de la tienda
    - Cada documento contiene los siguientes campos
        - **buyer**, objeto con información del comprador
            - **email**, `string` correo electronico del comprador
            - **name**, `string` Nombre del comprador
            - **lastname**, `string` Apellido del comprador
            - **phone**, `string` Telefono del comprador
        - **dateCreate**, `date` día de creación de la orden
        - **dateUpdate**, `date` día de actualización de la orden
        - **dateEnd**, `date` día de finalización de la orden 
        - **end**, `boolean` [true\false] control de compra finalizada.
        - **total**, `number` total de la orden
        - **id**, `string` id de Google identity relacionado a la compra
        - **items**, Arreglo de Objetos que contiene los productos separados por talla/color
            - **id**, id de firebase de la colección items/productos vinculada al producto
            - **cartCount**, `number` cantidad del producto con variación talla/color respectivo. 
            - **categoria**, `string` categoria del producto
            - **color**, `string` color del Producto
            - **talla**, `string` talla del Producto
            - **price**, `number` precio unitario del producto
            - **title**, `string` nombre del prodcuto
            - **pictureUrl**, `string` url imagen del producto

### **1.2 react-hook-form**

Esta libreria se utiliza para validar el formulario para la creación/actualización de un Orden en Firebase debido a su eficiencia y facilidad de uso. 

### **1.3 react-router-dom**

Esta libreria se utiliza para implementar enrutamiento dinámico en nuestra aplicación web, permitiendo la navegación dentro de la nuestra página.

Dentro del archivo `App.js` se importan y crean un `BrowserRouter` para envolver a la aplicación, un `Routes` donde se proyectaran las vistas navegadas, y los `Route` con las distintas navegaciones enlazadas a sus componentes asociados.

Los Route's creados para el presente proyecto son:
- `/`, ruta al Home de la página.
- `/tienda`, ruta hacia página de la tienda que realiza llamado al elemento `ItemListContainer`.
- `/cart`, ruta hacia la página de carrito que realizada llamado al elemento `Cart`.
- `/tienda/categoria/:id`, ruta hacia págína de categoria de producto `id` que realizada llamado al elemento `ItemListContainer`.
- `/tienda/item/:id`, ruta hacia producto con `id` correspondiente, con llamado al elemento `ItemDetailContainer`
- `/users/`, ruta hacia la página de información del usuario con inicio/cierre de sesión, con llamado al elemento `Users`.
- `/order/:id`, ruta haciaa la orden con `id` correspondiente, con llamado al elemento `Order`

### **1.4 sweetalert2**

Esta libreria se utiliza para crear modales, popups y/o alertas emergentes en nuestra página de manera sencilla y con estilos hermosos, responsivos y personalizables. 

## **2. CartContext**

Este archivo se encuentra en la ruta `/context/CartContext.js`. Dentro del archivo de crea el contexto `cartContext` a través de la función `createContext` y la función Provider `cartProvider` que se utiliza en el `Apps.js` para traspasar los valores y funciones globales entre todas las secciones de la página. 

Dentro del CartContext se crean los siguientes estados y sus respectivas funciones de seteo:
- **[loadBol, setLoadBol]**, [true/false] con  estado inicial true. Controla gif de loading en algunas páginas.
- **[totalCartCount, setTotalCartCount]**, con estado inicial 0. variable con el total de elementos en el carrito de compras.
- **[carrito, setCarrito]**, arreglo con detalle del carrito.
- **[userBool, setUserBool]**, [true/false] controla el estado de inicio de sesión de usuario en aplicación
- **[userInfo, setUserInfo]**, objeto con información del Usuario que navega a través de la página. La información se importa a través del inicio de sesión del usuario o de los datos ingresados para la creación/actualización de la Orden.
- **[idOrder, setIdOrder]**, variable que contiene la ID de la orden del documento de la colección `orders` en firestore de firebase.

Ademas podemos encontrar las funciones globales:
- **addItem**, función para agregar un producto al carrito desde la página de Producto individual
- **setNumberOfItem**, función para controlar la cantidad de un producto en el carrito desde la página de carrito.
- **isInCart**, función para saber si un producto está en el carrito o no.
- **removeItem**, función para eliminar un producto completamente del carrito desde la página del carrito.
- **clear**, función para vaciar el carrito.

## **3. Componentes**

El proyecto consta de los siguiente componentes:

### **3.1 Navbar**

Este componente es la barra de navegación de la aplicación y contiene a las componentes Menu y CartWidget. Ademas recibe los valores `titulo`, para el nombre situación al lado del Logo en el Navbar de la página, y `descripcion` para el valor del title de link del logo.

### **3.2 Menu**

Componente que se encarga de administrar los diferentes elementos del menu y sus respectivos links de navegación

### **3.3 CartWidget**

Componente que crea y administra los elementos 'icono de usuario' e 'icono de carro', junto al número de itemes del componente cartNumber, del Navbar.

### **3.4 CartNumer**

Componente que muestra el número total de productos del carro a través de la variable global `totalCartCount`

### **3.5 Bienvenida**

Componente de la página de inicio de la aplicación que muestra un saludo de bienvenida y un mensaje personalizado.

### **3.6 ItemListContainer**

Componente que muestra los articulos en general o por categoria de la tienda, a través de consulta a base de datos en firestore y envío de resultado de consulta a la componente `Itemlist`.

### **3.7 ItemList**

Componente que recibe el resultado de la consulta realizada en la componente `ItemListContainer` y realiza la construcción del html a través de la componente `Item`  en la página de la tienda.

### **3.8 Item**

Componente que construye y retorna tarjeta html por producto con parametros de producto: id de producto, nombre de producto, rango de precio del producto, imagen del producto y stock del producto.

### **3.9 ItemDetailContainer**

Componente que muestra el articulo individual, a través de una consulta realizada a la base de datos en firestore por medio de la `id` del producto y envío de resultado, a través de la variable `item`, a la componente `ItemDetail` 

### **3.10 ItemDetail**

Componente que recibe el resultado de la consulta realizada en la componente `ItemDetailContainer` y realiza la construcción del html del producto. 

Cada producto tiene un control de variables a través de la selección de las variaciones de `color` y `talla` del producto. La elección de estas variaciones en el producto controla el llamado a la componente `ItemCount`.

### **3.11 ItemCount**

Componente que maneja la cantidad de productos a agregar al carrito del producto individualizado en la componente `ItemDetail`, con control de stock de producto y cantidad total de productos en el carro. 

Cuando se agrega un producto, mediante la acción del boton `Agregar Carrito` la aplicación le preguntará si desea continuar comprando o terminar e ir hacia la página del carrito. 

### **3.12 Cart**

Componente que muestra la página del carrito de la aplicación. La visualización de las tarjetas de cada producto de la lista de productos del carro, se realiza agrupando productos iguales a través de sus variaciones `color` y `talla`. Cada tarjeta de producto tiene un control de la cantidad de productos añadidas al carro con control de stock de producto.

Ademas la componente muestra el total del carro de compras y un formulario para la información necesaria para realizar la creación/actualización de una Orden en la colección `orders` en firestore. 

Los campos requeridos para realizar una orden son `Nombre, Apellido, Telefono y Correo Electronico`, cuando un usuario ha realizado un inicio de sesión en la componente `users` de la aplicación el campo requerido para la realizar una orden es solamente el `Telefono`, los demas campos se importan desde la información de usuario de inicio de sesión.

Al crear o actualizar una orden la aplicación le preguntará si desea continuar comprando o terminar la orden. Si usted termina la orden, esta finalizará y ya no podrá agregar mas productos. 

### **3.13 Users**

Componente que administra el inicio de sesión en la aplicación del usuario. 

- Si el usuario no ha iniciado sesión se mostrará un botón para el inicio de sesión. El inicio de sesión se realizada usando solamente el Provider de Google.
- Si el usuaio ha iniciado sesión se mostrará la información de usuario: Imagen de usuario, el nombre para mostrar y el correo de su cuenta de Google. 
- Adicionalmente para los usuario que han iniciado sesión se realiza un llamado a la componente `UserOrders` para mostrar una lista de las ordenes realizadas en la aplicación.

### **3.13 UserOrders**

Componente que realiza una consulta a la base de datos, en firestore, para obtener los documentos creados en la colección `orders` a través de la variable `id` del documento correspondiente a la variable `uid` de la información de usuario de la cuenta de google.  

Cada tarjeta de orden contiene un resumen de las ordenes realizadas por el usuario en la aplicación con su link y estado correspondiente. El link envía hacia la componente `Order` de la aplicación.

### **3.14 Order**

Componente que realiza una consulta a la base de datos, en firestore, para obtener la orden individualizada desde la colección `orders` a través de la id del documento.

La visualización del págína de la orden contiene la información de la ID de la orden, información del comprador, información de fecha, total y estodo de la orden, así como la lista de productos con sus respectivas cantidades, valores y subtotales de cada producto.