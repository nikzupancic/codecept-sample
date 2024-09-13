# Usage instructions 
- Clone the repository
- Change working directory to root folder and run `npm install`
- Copy `.env.sample` to `.env` in root folder and enter your Browserstack credentials
- Add this entry to your `/etc/hosts` file: `127.0.0.1 browserstack-local.test`
- Generate self signed certificate that will be used by local server: `cd localServer && openssl req -new -x509 -nodes -keyout server.pem -out server.pem -days 365 -subj "/C=SI/ST=Slovenia/L=Slovenia/O=Tester/OU=QA/CN=browserstack-local.test"`
- While in localServer folder run `python3 startServer.py` and leave it running
- In a separate terminal session start local binary `BrowserstackLocal --key <yourKey> --local-identifier test`
- Run the test with the following command `node --env-file=".env" run.js`