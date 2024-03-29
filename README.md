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

# Task 2 - Reimplement "Rounds" mode in React

In this task I implemented react into the application by creating the react app. Next, I developed the Rounds module (Includes Rounds Listing, Adding rounds, View/Edit rounds) in react using the html that was previously defined. Also I implemented validation on forms when adding and editing the rounds. I defined the architecture of src folder into components (which are inside pages like Add Round and View/Edit Rounds), context (A context files for every module), reducer (A reducer files for every module), screens (Listing pages of main screen) for better developer experience. All these are defined to a div element in index.js which is used in index.html file that is present in public folder.

# Task 3 - Add Distance Field to a Round

Defined a distance filed in Add and Edit pages of Rounds. Used Miles as a primary unit and it is then converted to kms based on the conversion function. Before saving the data, the distance is converted to foot unit and when accessing it in edit, it is converted to miles in useEffect. Added validation as per the requirements to display the error message.

# Task 4 - Support Round Sorting

Implemented responsive sort functionality using array-sort library and also added distance field to the listing page.

# Task 5 - Delete Functionality

Used modal for delete functionality and updated the localstorage in parallel using reducer.

# Task 6 - Search Functionality

Used string matching on all values of rounds object to filter the data based on search key.
