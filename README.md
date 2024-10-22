# Druid_Partnering_Project_React24k
This is a team project from the company Druid about creating a new website for their business as a final assignment for Business College Helsinki students.

## For development team

### Setup the dev environment
1. Clone the project: ``` git clone https://github.com/Randolph-dev/Druid_Partnering_Project_React24k.git```
2. Change to frontend directory: ```cd Druid_Partnering_Project_React24k/frontend```
3. Install frontend dependencies: ```npm i```
4. Host the frontend in local server: ```npm run dev```
5. Open a new terminal, cd to backend folder ```cd Druid_Partnering_Project_React24k/backend```
6. Install backend dependencies: ```composer i```
7. Build and start a lando docker contaienr ```lando start```
8. To find our the backend port, run ```lando info```

**Remember to pull the latest changes regularly:** ```git pull origin main```

### Working on a ticket
1. Choose a ticket in the current sprint
2. Assign yourself to a ticket
3. Click on the ticket
4. Create a branch using Jira and copy the branch name
5. Checkout the branch in your local env ```git checkout -b BRANCH_NAME```
6. Commit your changes
7. Push the changes to your branch **never push to main** ```git push origin BRANCH_NAME```
9. Add a PR description like using the template
10. Wait for the PR to merge, if not, checkout the branch and continue working on it

### To review a PR
1. Fetch the branch ```git fetch origin BRANCH_NAME```
2. Checkout the branch ```git checkout -b BRANCH_NAME```
3. Follow PR instructions to update dependencies, update configuration and db
4. Test the page to see if it match the feature descriptions
5. 
- If the PR is not working or not up to standard, write the reason in github and close the PR
- If the PR is good for production, merge the request and delete the branch
6. Update the ticket in Jira to done
