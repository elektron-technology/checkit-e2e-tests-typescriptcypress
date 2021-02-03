Feature:  Verify document management 

    
    Background: User navigates to DocumentManagement App
    Given I am on documentManagment application

    Scenario:  Upload document to document management app positivie scenario
        When I click on the UPLOAD document link
        Then I fill in the upload document form with DocumentName as "Test123" and Description as "TestDesc"