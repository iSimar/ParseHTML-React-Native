# ParseHTML-React-Native
ParseHTML is a component for [React-Native](https://github.com/facebook/react-native). ParseHTML let's you render html code in your iOS Applications.

HTML Tags currently being parsed: 
- `<b>`
- `<i>`

### (This project is still at it's early stage.)

## Usage

Import ParseHTML using ParseHTML.js
````
var ParseHTML = require("./ParseHTML");
````

Use the ParseHTML Component
````
<ParseHTML code="Place HTML <i>Code</i> here. <b>HELLO WORLD</b>" />
````

Add or override custom Tags
````
<ParseHTML code="<p>This will be large.</p> and <code>Orange with a Black background</code>"
           customTagToStyle={{
                              "<p>": {fontSize: 30},
                              "<code>": [{color: "#FF7F50"}, {backgroundColor: "#000000"}]
                            }}
                            />
````

*For a simple example, checkout ParseHTMLSampleApp in the Examples Folder*