## Related ticket:
https://ticket_link_here
This should be the link to the ticket

## In this PR:
- Feature 1 description
- Feature 2 description

## Testing instruction
Checkout branch
Run lando start
If setting up project for the first time
make sure you have a dump.sql inside of root dir
run lando db-import dump.sql
Run lando drush deploy
Ref: Deploy - Drush, TLDR: it combines drush cim and drush cr and some other useful commands.
Create an article and a basic_page
See that the contents you create have the path aliases generated automatically and match the pattern set in the DoD