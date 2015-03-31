'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ParseHTML = require("./ParseHTML");

var ParseHTMLSampleApp = React.createClass({
  render: function() {
    return (
      <ParseHTML 
          code="Hello this is <b>Sample</b> HTML text. My name is <i>SpongeBob</i>, my bestfriend is <p>Patrick Star</p>. Lets use the code tag: <code>Hello World!</code>"
          customTagToStyle={{
                              "<p>": {fontSize: 30},
                              "<code>": [{color: "#FF7F50"}, {backgroundColor: "#000000"}]
                            }}/>
    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('ParseHTMLSampleApp', () => ParseHTMLSampleApp);
