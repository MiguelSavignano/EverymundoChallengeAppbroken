# Instructions

### Preparing the environment

1. Clone this repo with depth=1
2. Enter the directory and install the npm modules
3. Copy the file ```tests/.env-test-dist``` to ```tests/.env```
4. Run ```npm test```
5. Copy the file ```.env-dist``` to ```.env```
6. Run ```npm start```
7. Open the url [http://localhost:3000](http://localhost:3000), it should show a blank page.

### Tasks

1. The app is working but the page is blank
    * See the source code
    * Fix the problem.
    * Commit the changes

2. When you create a new Movie there is a problem with the *Release Year* and *Genre* fields.
   They seem to be connected. This is a angularjs problem.
    * Identify the problem.
    * Fix it.
    * Commit the changes

3. Create a new movie with the following info:
    * Title:    *NodeJs*
    * Release Year:   *2015*
    * Director: *[your name]*
    * Genre:    *action*

4. After created click on the view button to see the data saved for that movie.
   Notice that the director's name was saved on the release year field.
   That is a mistake with the ng-models on the _form.html partial
    * Identify the problem.
    * Fix it.
    * Commit the changes

5. Create another movie and view it, you'll notice the director's name does not appear.
   Is it not being saved or is it just not being retrieved?
    * Identify the problem.
    * Fix it.
    * Commit the changes

6. Create another movie, but now leave all the fields in blank. You'll notice
   that it saves without any problem. The model should not allow to save a movie
   without title or genre.
    * Identify the problem.
    * Fix it.
    * Commit the changes

7. Create a few more movies and you'll notice that only the first 5 appears on 
   the list. It should show all of them.
    * Identify the problem.
    * Fix it.
    * Commit the changes

8. Try to edit the data of a non blank title movie. Change it's name and save.
   You'll notice that when you edit and save it is saving all in blank.
    * See route and the update method of the movies controller to solve it.
    * Fix it.
    * Commit the changes

9. The delete feature is not working, but there is no error. I is answering with
   Http status 200. What is hapening?
    * Identify the problem.
    * Fix it.
    * Commit the changes

