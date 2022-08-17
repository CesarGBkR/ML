# Uso de script con Frontend
### Abrimos el archivo index.html en un servidor local
### Vista:
![[index_ss.png]]
### Clickeamos en cualquiera de los dos botones
### Vista con buscar:
![[buscar_ss.png]]
##### Muestra los primeros 50 resultados del item en la búsqueda
### Vista con top 1000:
![[top1000_ss.png]]
##### Muestra mil resultados, cada uno por scroll


# Entender el backend :
## Conceptos
Se sigue el proceso de **Autentucación y Autorización.** De esta manera se puede trabajar con los recuros privados del usuario cuando la aplicación lo autorice.
**Los Tokens deben ser enviados por header cada que se realice una llamada a la API.**

Ejemplo: *curl -H 'Authorization: Bearer APP_USR-12345678-031820-X-12345678' \ https://api.mercadolibre.com/users/me*

#### Autenticación: 
Proceso para cerifiacar la identidad de una persona con motivo de mantener los envíos de forma correcta, Mercado Libre usa el método basado en contraseñas.
#### Autorización:
Proceso por el cual se delimita el acceso y tipo de acceso de recursos a un usuario autenticado.
Se logra a travéz del protocolo ***OAuth 2.0*** Este protocolo brinda:
- Confidencialidad
- Intecgridad
- Disponibilidad

#### Creación de token
Para generar un token debemos vincular una cuenta de mercadolibre en https://developers.mercadolibre.com.mx/devcenter y posteriormente  registrar la aplicación. 

```javascript
curl -X POST \
-H 'accept: application/json' \
-H 'content-type: application/x-www-form-urlencoded' \
'https://api.mercadolibre.com/oauth/token' \
-d 'grant_type=authorization_code' \
-d 'client_id=477396673281552' \
-d 'client_secret=1lrJzTUQ41d8ChxdtOmjfrRaZUWaqpTL' \
-d 'code=TG-62fbe1ee08dca600015f2307-453166377' \
-d 'redirect_uri=https://www.ibushak.com/'
```
#### Actualización de token
```javascript
curl -X POST \
-H 'accept: application/json' \
-H 'content-type: application/x-www-form-urlencoded' \
'https://api.mercadolibre.com/oauth/token' \
-d 'grant_type=refresh_token' \
-d 'client_id=477396673281552' \
-d 'client_secret=1lrJzTUQ41d8ChxdtOmjfrRaZUWaqpTL' \
-d 'refresh_token=TG-62fbe2ace943e80001f65304-453166377'
```

## Consultas
### Consulta de SellerID
Esto será necesario para conocer el **SellerID**, requerido para acciones posteriores.
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/$SITE_ID/search?nickname=$NICKNAME
```

 Ejemplo para IBUSHAK: 
 ```javascript 
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?nickname=IBUSHAK+OFICIALES
 ```
**SELLERID = 154901871**


### Consultar información publica de un usuario con SellerID
Acción adicional para tener más información sobre el vendedor.

```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/users/$USER_ID
```

Ejemplo con User ID de IBUSHAK:
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/users/154901871
```


### Consultar Items por SellerID
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/$SITE_ID/search?seller_id=$SELLER_ID
```

Ejemplo para IBUSHAK:
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?seller_id=154901871
```

### Consultar items por nickname
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/$SITE_ID/search?nickname=$NICKNAME
```

Ejemplo para IBUSHAK:
```javascript
	curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?nickname=IBUSHAK OFICIALES
```

### Consulta de prducto
 ```javascript
 curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6
```

Ejemplo con celulares:
 ```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?q=Celular
```

### Ordenar
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/$SITE_ID/search?seller_id=$SELLER_ID&sort=price_asc
```

Ejemplo para el ejercicio:
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?q=Celular&sort=price_asc
```

### Offset
Seleccióna el indice del que parte la consulta de items, si queremos que nos muestre a partir del índice 51 se vería así:
```javascript
curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/sites/MLM/search?q=Celular&offset=1&sort=price_asc
```

