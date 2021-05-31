# Descripcion

Proyecto en ionic 5 + capacitor de una mini app bancaria que permite realizar transferencias entre usuarios usando codigos QR.

## Funcionalidades de la app

- Login: Permite iniciar sesión y solo hacer uso de los demas modulos si estas autenticado
- Estado del clima: Mediante tu localización, se podrá obtener el estado del clima para evitar mojarte
- Listado de cuentas: Puedes ver todas tus cuentas registradas y el monto que tienen actualmente
- Detalle de cuenta: Al seleccionar una cuenta puedes ver el detalle de la cuenta como, tipo de cuenta, monto total disponible, detalle de los ultimos 10 movimientos
    - Generar QR: dentro del detalle de cuenta podrás generar un codigo QR con los datos de la cuenta visualizada, a fin de que se te pueda transferir
- Transferencias: Podrás realizar transferencias entre cuentas, clicando el boton Transfer, lo que activará el lector de codigo QR y cargará los datos de la cuenta destino

# Usuarios

Existen dos usuarios (en el apk del apartado releases):

```jo.smith@todo1.com - 12345678```

```ja.smith@todo1.com - 12345678```


# Compilación

## App (Frontend)
- Clonar el repositorio ```git clone git@github.com:IsaacYAGI/todo1-banking-app.git```
- Instalar las dependencias con ```npm install```
- Crear el archivo de configuración en la ruta ```src/environments/env.ts``` con las credenciales de firebase (usar archivo env.example.ts como guía). 
- Para correr en el navegador ejecutar ```ionic serve```. 
- Para compilar el proyecto nativo 
    - Crear la carpeta ```www``` en la raiz del proyecto y un archivo ```index.html``` vacío (si no existieran ya)
    - ejecutar ```ionic capacitor add android``` y luego ```ionic capacitor copy android```
    - Abrir en Android Studio el proyecto Android generado por capacitor
    - Modificar el archivo ```android/capacitor-cordova-android-plugins/src/main/AndroidManifest.xml```. En la línea 11 se debe cambiar la sección ```android:required="$GPS_REQUIRED"``` por ```android:required="false"```
    - Construir el apk

Nota: Tener en cuenta que el plugin de lectura de codigo QR no funciona en navegador. Si se desea probar se recomienda ir al archivo ```src/app/pages/home/home.page.ts``` y comentar en la funcion ```transfer()``` la invocación a la llamada del plugin y descomentar la data colocada en duro.

```
...
//const resultBarcode = await this.barcodeScanner.scan();
 
 const resultBarcode = {
   format: "QR_CODE",
   cancelled: false,
   text: "ja.smith@todo1.com;0003;Jane;Smith"
};
```

## Firebase (Backend)

- Se debe crear un proyecto en Firebase nuevo
- Obtener las credenciales que se colocarán en el archivo ```env.ts``` en el proyecto del frontend.
- Habilitar en los ```sign in methods ``` el metodo por correo electronico simple.
- Crear usuarios desde el app, para ello seguir los siguientes pasos:
    - En el archivo ```src/app/pages/tabs/tabs.page.html``` se debe descomentar el codigo para ver la opción de registro y así poder registrar usuarios para el inicio de sesión
    ```
    <ion-tab-button tab="register">
      <ion-icon name="person-add-outline"></ion-icon>
      <ion-label>Register</ion-label>
    </ion-tab-button>
    ``` 
    - Registrar usuario desde el app
- Habilitar base de datos ```firestore```
- Crear la colección de datos de la siguiente manera:
```
    clientes{ //coleccion
        jo.smith@todo1.com{ //documento
            birthdate: number (milisegundos),
            email: string,
            lastname: string,
            name: string,

            accounts{ //coleccion
                0001:{//documento
                    account_number: string,
                    account_type: string (SAVINGS || CHECKS),
                    amount: number,
                    currency: string

                    movements{ //coleccion
                        idAleatorio:{ //documento
                            amount: number,
                            date: number (milisegundos),
                            description: string,
                            movement_type: string ("INCOME" | "OUTCOME"),
                            source_account: string,
                            target_account: string
                        }
                    }

                },
                0002: {//documento
                    ...
                }
            }
        },
        ja.smith@todo1.com{ //documento
            ...
        }
    }
```
