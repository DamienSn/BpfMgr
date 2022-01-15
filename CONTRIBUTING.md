# Contribute
## Clone the project
```
git clone https://github.com/DamienSn/
```
## Start API
```
cd api
npm install
npm run dev
```
Environement variables (.env)
```
PORT={port to launch api}
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
TOKEN_SECRET={token for password encrypting}
CLIENT_URL={url of the client with port}
UPLOAD_DIR=public/uploads
SIB_API_KEY={sendinblue api key for newsletter}
BPFMGR_API_KEY={API key used in bpfmgr_api}
```
## Start client
```
cd client
npm install
npm run dev
```
Environement varibles (.env) :
```
VITE_API_URL={url of the api}
VITE_API_KEY={api key declared in BPFMGR_API_KEY}
VITE_UPLOAD_DIR=http://localhost:5000/static/uploads/
```
