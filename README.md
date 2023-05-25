## Client Migration Commands
* php artisan make:migration-client `<migration-name>`
* php artisan migrate:client list

###### Import Keystore

`keytool -importkeystore -srckeystore eqsr-beta.keystore -destkeystore eqsr-beta.keystore -deststoretype pkcs12`

----------
###### Windows

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eqsr-beta.keystore D:/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr-beta`

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eqsr-beta.keystore ~/Sites/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr-beta.apk`

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eqsr-prod.keystore D:/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr-prod

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eqsr-beta.keystore ~/Sites/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr-beta

`C:\Users\Harsh\AppData\Local\Android\Sdk\build-tools\30.0.2\zipalign -v 4 D:/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr.apk`

/Users/harshpatel/Library/Android/sdk/build-tools/30.0.3/zipalign -v 4 ~/Sites/eqsr-app/Frontend/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk eqsr-beta.apk

# EQSR on Docker

## Prerequisites
Docker

## Getting started
To run this project locally using Docker, follow these steps:

1.Clone the repository:\
git clone https://gitlab.com/hrsh2112/eqsr-app.git

2.Nevigate to the project root directory:\
To run the project on Docker, run following command:\
docker-compose up --build

3.Access the project by visiting `http://0.0.0.0:port` in your web browser.\
  frontend : http://0.0.0.0:8100 \
  backend  : http://0.0.0.0:8000 \
  admin    : http://0.0.0.0:4200


## Components

### Dockerfile
Build the containers(frontend , backend , admin , MySql ). \
The containers are built from a Docker images(node , php ,MySql).

### docker-compose.yml
This will spin up four containers:for frontend , backend , admin and MySql
