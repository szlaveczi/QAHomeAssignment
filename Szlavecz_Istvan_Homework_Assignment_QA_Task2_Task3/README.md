SETUP STEPS:

    //playwright installation
    npm init playwright@latest 
    //Using online demo site
    On playwright.config.ts file set baseURL to: https://demo.realworld.show/
    //precondition
    Have an existing user profile on https://demo.realworld.show (or register one)

RUN TEST:

    //run in headless mode
    npx playwright test

    //run in UI mode
    npx playwright test --ui  

TASK-2: 

    CODE OF SUPPORT FILE
        support/LoginSupport.ts
    CODE OF TEST SUITE
        tests/login.spec.ts
TASK-3:

    CODE OF TEST SUITE
        tests/apitesting.spec.ts
        
    Expected status codes
        CASE_1: 201 Created - Returns JSON object of the created task including a generated 'id'
        CASE_2: 200 OK - Returns JSON object of the requested task matching the ID
        CASE_3: 200 OK - Returns JSON object with the updated task fields
        CASE_4: 200 OK or 204 No Content - Deletes the task (subsequent GET returns 404 Not Found)
