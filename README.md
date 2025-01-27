How to use:
- Clone the repository
- Change working directory to root folder and run `npm install`
- Copy `.env.sample` file to `.env` and enter your credentials
- Modify Codecept config in `run.js` depending on which tests you want to run
- Change `test.js` file as required
- Run the test using command `node --env-file .env run.js`