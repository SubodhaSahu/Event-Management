# Event-Management

Task
Assume you manage an Event Management company that owns a venue where events can be held. You must build an app that will help you accept applications to use your venue and will suggest an alternative date if the proposed day is already booked.

Guidelines
Use React for all pages

Use NodeJS for all APIs

Use MongoDB for the database

Use the Git Workflow as well as any branch naming and commit message structure of your choice, but stay consistent

Adhere strictly to the Airbnb style guide for ES6

Use the appropriate data structure to hold data and manipulate data

Classes / modules MUST respect the SRP (Single Responsibility Principle) and MUST use the ES6 methods of module imports and exports. Integrate a linter

Phase 1
Frontend Work
A sign-up and sign-in page
A page where an authenticated user can add a new event
A page, or page section where an authenticated user can…
…modify the event they added
…delete the event they added
A page where an admin can add a new event center
A page, or page section where an admin can modify the details of a center\
A page showing the details of a center, and the events slated for that event center.
Backend Work
Setup a NodeJS server and add the Express module
Use in-memory data instead of a database at this point
Create the following API endpoints…
POST /events/ Adds a new event
PUT /events/[id] Update an existing event
DELETE /events/[id] Delete an existing event
POST /venues/ Add a new venue
GET /venues/ Get the details of all venues
GET /venues/[id] Get the details of an existing venue
PUT /venues/[id] Update an existing venue
Test each endpoint using Postman
Automate all of your tests
Write sample unit tests for functions, middleware and endpoints. You don’t have to aim for high test coverage. I just need to see enough tests to confirm you understand testing. Use Mocha/Chai
Integrate BitBucket PIpelines to handle your build
Integrate your automated tests into your build and automatically produce a report that includes code coverage
Update BitBucket to package your code as a Docker image
Update BitBucket to deploy your Docker image to AWS
