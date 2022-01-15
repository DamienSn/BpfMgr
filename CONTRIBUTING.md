# Contribute
## Clone the project
```
git clone https://github.com/DamienSn/
```
## Start API
### Environement variables (.env)
```
PORT={port to launch api}
DB_HOST={host.docker.internal (if using db in local machine)} 
DB_USER=
DB_PASSWORD=
DB_NAME=
TOKEN_SECRET={token for password encrypting}
CLIENT_URL={url of the client with port}
UPLOAD_DIR=public/uploads
SIB_API_KEY={sendinblue api key for newsletter}
BPFMGR_API_KEY={API key used in bpfmgr_api}
```
### Development
```
cd api
code .
```
It will open the project in vscode, then click "Reopen in container" (needs remote dev extension installed)
Open a terminal in the container and run
```
npm install (or yarn, pnpm...)
npm run dev
```
Forward the ports to your local machine by using the built-in vscode feature in taskbar
### Just run api
Build the docker image and run it with the dockerfile
```
docker build -t {tag of the image} .
/* Get image id and then */
docker run -p {port of the api defined in .env}:{the same} {image id}
```
## Start client
### Environement varibles (.env) :
```
VITE_API_URL={url of the api}
VITE_API_KEY={api key declared in BPFMGR_API_KEY}
VITE_UPLOAD_DIR=http://localhost:5000/static/uploads/
```
### Development
```
cd client
code .
```
It will open the project in vscode, then click "Reopen in container" (needs remote dev extension installed)
Open a terminal in the container and run
```
npm install (or yarn, pnpm...)
npm run dev
```
Forward the ports to your local machine by using the built-in vscode feature in taskbar
### Just run client
Build the docker image and run it with the dockerfile
```
docker build -t {tag of the image} .
/* Get image id and then */
docker run -p 80:80 {image id}
```
# Important note
If you want to run a container in mode "just run ..." alongside a dev container, consider adding flag `-e VARIABLE={value}`
Example : you want to run the api not in development mode and connect it to your DB in your host machine.
```docker run -d -p 5000:5000 -e DB_HOST=host.docker.internal {api image id}```
Example : you want to run the client not in dev mode alongside with pi in dev mode
``
