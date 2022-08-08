# p2-revWork-UI

The UI for revWork is build around a template pattern. There are only 3 pages:
- The welcome page,
- The freelancer page, and
- The employer page

However, a wide variety of tasks can be accomplished on those pages because most
of the content is loaded in smaller HTML files. For example, the welcome page
also serves as the login and registration page because those features are
presented as dialogs over the main page.

![The welcome page](/screenshot1.png?raw=true "Welcome page")

The freelancer page allows a user to create profiles, edit and delete profiles,
view the list of available jobs, and apply for a job.

![freelancer page](/screenshot3.png?raw=true "Freelancer page")

The menu that allows all of those tasks is on the left side of the page.
Once a menu option is selected, all tasks are done on the same page by loading
the smaller HTML fragments and replacing portions of the main page as needed to
accomplish those tasks. The page flows for the task currently available looks
something like this:

![page flow](/flowchart.png?raw=true "Page flow")

Similarly on the employer page, fragments are loaded in as needed to allow
creation of jobs, listing of all of the employer's open jobs, viewing
applications, and selecting an application to get the job.

![The employer page](/screenshot2.png?raw=true "Employer page")

This site makes extensive use of the
[revWork API](https://github.com/220620-java/p2-revWork-API) to load the
data for the pages.

The website makes use of JWTs for authentication. However on the client side
this is simply limited to verifying that a freelancer can not view employer
pages and vice versa. More extensive use is done on the server side to verify
that each user is accessing only their content.
