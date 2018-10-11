#Frontend 
#####(webeng/addressly)

-----

#####Documentation
[addressly/documentation/index.html](addressly/documentation/index.html)

#Backend
#####(webeng/backend)

-----

#####Documentation
[backend/docs/index.html](backend/docs/index.html)

#To run the project
0. run npm install
1. execute "Start API Server" from [backend/gulpfile.js](backend/gulpfile.js)
2. execute _ng serve_ in webeng/addressly
3. navigate to [http://localhost:4200](http://localhost:4200)

#Common issues
TingoDB does not work if the database files have Windows Linebreaks

_Solution:_ Make sure the database files (backend/src/db)
 * addressbook.json
 * entries.json
 * groups.json
 
 have Unix Linebreaks.
 
 (In JetBrains use the Linebreak-Selection on the right bottom corner and choose LF instead of CRLF)
