# Druid_Partnering_Project_React24k
This is a team project from the company Druid about creating a new website for their business as a final assignment for Business College Helsinki students.

## Live site
- Live client site: [https://druid-project.alextran.dev](https://druid-project.alextran.dev)
- Drupal backend: [https://dev-druid-partnering-project-react24k.pantheonsite.io/](https://dev-druid-partnering-project-react24k.pantheonsite.io/)
- Mautic analytics dashboard: [https://mautic.alextran.cloud/](https://mautic.alextran.cloud/)

## For development team
### Setup the dev environment
1. Clone the project: `git clone https://github.com/Randolph-dev/Druid_Partnering_Project_React24k.git`
2. Change to frontend directory: `cd Druid_Partnering_Project_React24k/Frontend`
3. Install frontend dependencies: `npm i`
4. Create a .env file inside Frontend/ and add the required variable in this format:
```bash
VITE_DRUPAL_URL=http://YOUR_LOCAL_DRUPAL_URL/api/
VITE_MAUTIC_URL=https://mautic.alextran.cloud/
```
5. Host the frontend in local server: `npm run dev`
6. Open a new terminal, cd to backend folder `cd Druid_Partnering_Project_React24k/Backend`
7. Build and start a lando docker contaienr `lando start`
8. Install dependencies `lando composer i`
9. Import drupal db: `lando db.import LATEST_DB_NAME.gz`
10. Import drupal config: `lando drush cim`
11. To find the backend port and other useful info, run `lando info`
12. To change Drupal admin password ```lando drush upwd admin ”newpassword”```
**To pull the latest changes:** ```git pull origin BRANCH_NAME``` or to pull all branches ```git pull origin```

### Working on a ticket
1. Choose a ticket in the current sprint
2. Assign yourself to a ticket
3. Click on the ticket
4. Create a branch using Jira **BRANCHING FROM DEV, NOT MAIN** and copy the branch name
5. Pull the branch `git pull origin BRANCH_NAME`
6. Checkout the branch `git checkout -b BRANCH_NAME`
7. Commit your changes `git commit -m "SCRUM-xx <message>"`
8. Push the changes to your branch `git push origin BRANCH_NAME`
#### **never push to main**
9. Add a PR description. Use [This PR template](PR_template.md)
10. Wait for the PR to merge, if closed, checkout the same branch and continue working on it

### To review a PR
1. Pull the branch ```git pull origin BRANCH_NAME```
2. Checkout the branch ```git checkout -b BRANCH_NAME```
3. Follow PR instructions
4. Test the page to see if it match the feature descriptions
5. 
- If the PR is not working or not up to standard, write the reason in github and close the PR
- If the PR is good for production, merge the request and **delete the branch**
6. Update the ticket in Jira to done

### To access live site
- Drupal: Hosted with Pantheon [https://dev-druid-partnering-project-react24k.pantheonsite.io/](https://dev-druid-partnering-project-react24k.pantheonsite.io/)
- React: Hosted with Netlify [https://druid-project.alextran.dev](https://druid-project.alextran.dev)
- Mautic: Deployed a dockerized version in private server [https://mautic.alextran.cloud/](https://mautic.alextran.cloud/)

### Mautic
- Mautic used to be a folder living in this repo but because it is too heavy and require setting up on all local machine,
it is now installed online
- Here is the link to Mautic dashboard: [https://mautic.alextran.cloud/](https://mautic.alextran.cloud/)
- Remember to set the Mautic link as environment variable for it to track properly
- Ask or check the message channel for the login credential

### Possible issues during Mautic set up (outdated with the latest update)
Some issues may appear during Mautic's installation process. Most of which are caused by the composer install. Some of them can be:
- Memory exhaustion issue with PHP - allowed PHP memory space isn't enough to handle the operations required for the install. Solution: increase memory limit with ```php -d memory_limit=-1 bin/ ```
- Composer extension errors - failure to install in the working repository. Solution: Ran composer with ignore commands to keep the install process while ignoring the problematic extensions ```composer install --ignore-platform-req=ext-imap --ignore-platform-req=ext-redis```
- Security issues - Some files can be interrupted during the install due to dubios origin/authors. This can be solved by whitelisting the files.
- If you encounter issues such as too many files being commited, this is possibly caused by .gitignore failing to properly ignore the specified content. Run ```git rm -r --cached .``` (or to force) ```git rm -r --cached . -f``` to clear tracking of all files and re-add only the files specified for tracking based on .gitignore settings. 
