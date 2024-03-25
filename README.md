# SpeedScore

This repository contains the code for SpeedScore, a single page web application that supports the sport of speedgolf by allowing users to

- log and analyze their speedgolf rounds
- share and discuss their speedgolf rounds with other speedgolfers
- add detailed golf, running, and topographical data on speedgolf-friendly to SpeedScore's course database

SpeedScore is implemented in HTML, CSS, and JavaScript. It presently stores all app data locally in `localStorage`. In the future, it will also store app data in a cloud-based database.

To run SpeedScore from Visual Studio Code, type
`npm run start`
in the terminal.

# Task 1 - About Modal Testing

In this task, I reviewed the Playwright Test and installed it following the installation docs provided in the website. I installed the javascript version and also added github actions workflow. Now I reviewed the previous code in the helpers.js file and got to know how the testing was implemented before adding any user and also at the time of logging. I executed the example test case and checked how the test cases are validated using the Playwright UI mode. Now I wrote to 2 test cases in aboutModal.spec.js file to implement the About modal check. In the first one, I used html attributes to write the test cases mostly as they are in the helper.js file and evaluated them using the expect attribute whereas in second case I used playwright test case generator to record my test cases and modified that code based on my requirements. I commented out the second test case in the code. Using both the test cases, we can assure that the About modal is working perfectly or not.
