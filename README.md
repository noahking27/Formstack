# Formstack

### About
Formstack assignment #2 written with React, Redux, Ant Design (pre built components), and Node.js. The application makes a request to the Node.js backend which returns a json list of wines which is used for the front end.

### To run this project...

#### In your terminal do the following steps...
1. Clone the repo
2. CD into repo on local machine
3. Run `npm install`
4. Run `npm start` and proceed to localhost:8080
5. The project will now be running. Take a look around, add a wine, delete a wine, sort a wine.

#### Testing...
1. Run `npm test`
2. This will run puppeteer and jest. If you would like to see puppeteer open the chromium browser and walk through the tests,
  go into the src/client/tests/Wines.test.js and uncomment the headless and slowmo options. If they are commented out then chromium
  will run in the background and display the test results in the terminal.
