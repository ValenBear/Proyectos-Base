# Redux Toolkit en Frontend-Base

El proyecto fue actualizado para utilizar **Redux Toolkit (@reduxjs/toolkit)** reemplazando la base de código obsoleta de `redux` puro.

## ¿Qué cambió?

1. **Store de Redux (`store.js`)**: 
   Pasó de usar el antiguo `createStore` y `applyMiddleware` a utilizar el nuevo `configureStore()` de Redux Toolkit.
   Esto ya tiene integrado el Redux DevTools de forma nativa sin necesitar variables de entorno extrañas en `composeEnhancers`.

2. **Reducers (`reducer.js` en varias carpetas)**:
   Se migró el patrón de `switch/case` manual utilizando la función `createReducer` de RTK.
   - Ya no es necesario instanciar una copia mutada del objeto usando `const newState = { ...state };`. 
   - Gracias a la librería **Immer** incluída en RTK, ahora podés mutar el `state` directamente dentro de los casos.

   **Ejemplo anterior (`switch/case`):**
   ```javascript
   case SHOW_SPINNER:
       newState.spinner.loading += 1;
       break;
   ```

   **Ejemplo actual (`createReducer`):**
   ```javascript
   .addCase(SHOW_SPINNER, (state, action) => {
       state.spinner.loading += 1;
   })
   ```

3. **Compatibilidad ODataFetch**:
   Se dejaron intactos los Middleware y los `actions.js` principales de ODataFetch para no romper los módulos de API ya construidos en la organización (que dependían de un campo `.meta` particular para el paso de parámetros y tokens). Pero las vistas pueden y deben utilizar los reducers simplificados.

## Recomendaciones para módulos nuevos

Para nuevas features o componentes de Lit, la recomendación es utilizar directamente `createSlice()`, donde unificás en un mismo archivo las acciones iniciales y el reducer sin requerir el clásico `actions.js`.
