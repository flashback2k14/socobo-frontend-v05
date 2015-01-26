# socobo-frontend
Frontend Project for Socobo

Steps to include frontend into socobo

1. clone repo
2. copy files into socobo/public
3. go to index.html and add /assets/ to the following links:
	- bower_components/webcomponentsjs/webcomponents.js
	- elements/socobo-app/socobo-app.html
	- styles.css
	- main.js
4. go to elements/socobo-app/socobo-app --> script tag and add /assets/ to User --> pictureUrl
	- images/github.png
	
	
Rules for Documentation:
Please use the following Syntax:

Variables:

/**
 * @variable(s): variableName
 * @defaultValue(s): value(s)
 * @modifier(s): modifier(s) -> optional
 * @datatype(s): typeName  -> optional
 * @description:
	-> this has 3 different annotations
 * - normal description 
 * - ! description with special attention
	-> please at the end of the description
 * - ? description with questions any flavour
	-> please at the end of the description
 */

Functions:

/**
 * @function: functionName
 * @params: parameter name(s)
 * @description:
	-> this has 3 different annotations
 * - normal description 
 * - ! description with special attention
	-> please at the end of the description
 * - ? description with questions any flavour
	-> please at the end of the description
 */