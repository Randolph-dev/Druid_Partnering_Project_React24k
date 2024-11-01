# Druid_Partnering_Project_React24k
This is a team project from the company Druid about creating a new website for their business as a final assignment for Business College Helsinki students.

## For development team

### Setup the dev environment
1. Clone the project: ``` git clone https://github.com/Randolph-dev/Druid_Partnering_Project_React24k.git```
2. Change to frontend directory: ```cd Druid_Partnering_Project_React24k/Frontend```
3. Install frontend dependencies: ```npm i```
4. Host the frontend in local server: ```npm run dev```
5. Open a new terminal, cd to backend folder ```cd Druid_Partnering_Project_React24k/Backend```
6. Install backend dependencies: ```composer i```
7. Build and start a lando docker contaienr ```lando start```
8. To find our the backend port, run ```lando info```
9. To change Drupal admin password ```lando drush upwd admin ”newpassword”```

**Remember to pull the latest changes regularly from dev:** ```git pull origin dev``` for dev branches or ```git pull origin BRANCH_NAME```

### Working on a ticket
1. Choose a ticket in the current sprint
2. Assign yourself to a ticket
3. Click on the ticket
4. Create a branch using Jira **BRANCHING FROM DEV, NOT MAIN** and copy the branch name
5. Checkout the branch in your local env ```git checkout -b BRANCH_NAME```
6. Commit your changes ```git commit -m "SCRUM-xx <message>"```
7. Push the changes to your branch ```git push origin BRANCH_NAME```
#### **never push to main**
9. Add a PR description like using the template
10. Wait for the PR to merge, if not, checkout the branch and continue working on it

### To review a PR
1. Fetch the branch ```git pull origin BRANCH_NAME```
2. Checkout the branch ```git checkout -b BRANCH_NAME```
3. Follow PR instructions to update dependencies, update configuration and db
4. Test the page to see if it match the feature descriptions
5. 
- If the PR is not working or not up to standard, write the reason in github and close the PR
- If the PR is good for production, merge the request and delete the branch
6. Update the ticket in Jira to done

### Mautic Install (to run Mautic wizard). Please read carefully.

1. ```git pull origin``` to download configurations in your branch
2. ```cd Mautic```
3. ```lando start```
4. ```lando composer install```
5. ```npm install```
6. ```lando info``` to check available URL port (e.g. http://localhost:[port])
7. Run Mautic installation wizard
-- IMPORTANT: In the installation wizard, you MUST use these exact database settings:
   
- Database host: database
- Database name: lamp
- Database user: lamp
- Database password: lamp
- (These values are required for Lando's database connection)

8. Create your own admin credentials.

### Possible issues during Mautic set up
Some issues may appear during Mautic's installation process. Most of which are caused by the composer install. Some of them can be:
- Memory exhaustion issue with PHP - allowed PHP memory space isn't enough to handle the operations required for the install. Solution: increase memory limit with ```php -d memory_limit=-1 bin/ ```
- Composer extension errors - failure to install in the working repository. Solution: Ran composer with ignore commands to keep the install process while ignoring the problematic extensions ```composer install --ignore-platform-req=ext-imap --ignore-platform-req=ext-redis```
- Security issues - Some files can be interrupted during the install due to dubios origin/authors. This can be solved by whitelisting the files. 
