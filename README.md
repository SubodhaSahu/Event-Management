# Task

Assume you manage an Event Management company that owns a venue where events can be held. You must build an app that will help you accept applications to use your venue and will suggest an alternative date if the proposed day is already booked.

## Guidelines

- Use React for all pages

- Use NodeJS for all APIs

- Use MongoDB for the database

- Use the Git Workflow as well as any branch naming and commit message structure of your choice, but stay consistent

- Adhere strictly to the Airbnb style guide for ES6

- Use the appropriate data structure to hold data and manipulate data

- Classes / modules MUST respect the SRP (Single Responsibility Principle) and MUST use the  ES6 methods of module imports and exports. Integrate a linter

## Phase 1

### Frontend Work

1. A sign-up and sign-in page
2. A page where an authenticated user can add a new event
3. A page, or page section where an authenticated user can…
    - …modify the event they added
    - …delete the event they added
4. A page where an admin can add a new event center
5. A page, or page section where an admin can modify the details of a center\
6. A page showing the details of a center, and the events slated for that event center.

### Backend Work

1. Setup a NodeJS server and add the Express module
2. Use in-memory data instead of a database at this point
3. Create the following API endpoints…
    1. POST /events/  Adds a new event
    2. PUT /events/[id] Update an existing event
    3. DELETE /events/[id] Delete an existing event
    4. POST /venues/ Add a new venue
    5. GET /venues/  Get the details of all venues
    6. GET /venues/[id] Get the details of an existing venue
    7. PUT /venues/[id] Update an existing venue
4. Test each endpoint using Postman
5. Automate all of your tests
6. Write sample unit tests for functions, middleware and endpoints. You don’t have to aim for high test coverage. I just need to see enough tests to confirm you understand testing. Use Mocha/Chai
7. Integrate BitBucket PIpelines to handle your build
8. Integrate your automated tests into your build and automatically produce a report that includes code coverage
9. Update BitBucket to package your code as a Docker image
10. Update BitBucket to deploy your Docker image to AWS 
