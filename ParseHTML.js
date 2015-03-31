/*
Coded by: Simar (github.com/iSimar)
*/

'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var ParseHTML = React.createClass({
  getInitialState: function() {
    var defaultTagToStyle = {
                              '<b>': {fontWeight: 'bold'},
                              '<i>': {fontStyle: 'italic'},
                              '<normal>': {fontStyle: 'normal'},
                            };
    if(this.props.customTagToStyle){
      for(var i in Object.keys(this.props.customTagToStyle)){
        defaultTagToStyle[Object.keys(this.props.customTagToStyle)[i]] = this.props.customTagToStyle[Object.keys(this.props.customTagToStyle)[i]];
      }
    }
    return {
      tagToStyle: defaultTagToStyle,
    };
  },
  _getNextHTMLTag: function(html_code, tags_to_look_for){
    var min = -1;
    var nextTag = "";
    for (var i = 0; i < tags_to_look_for.length; i++) {
      var tag = tags_to_look_for[i];
      var nextIndex = html_code.indexOf(tag);
      if(min == -1){
        min = nextIndex;
        nextTag = tag;
      }
      else{
        if(min>nextIndex && nextIndex != -1){
          min = nextIndex;
          nextTag = tag;
        }
      }
    }
    return {"tag": nextTag, "indexStart": min};
  },
  _buildHTMLParseTree: function(html_code){
    return this._buildHTMLParseTreeOverload(html_code, []);
  },
  _buildHTMLParseTreeOverload: function(html_code, segments){
    var nextTag = this._getNextHTMLTag(html_code, Object.keys(this.state.tagToStyle));
    if(nextTag.indexStart != -1){
      if(nextTag.indexStart>0){
        segments.push({
                        "type":"<normal>", 
                        "text": html_code.slice(0, nextTag.indexStart),
                      });
      }
      console.log(nextTag.indexStart);
      var endTag = "</"+(nextTag.tag).slice(1);
      var indexEnd = html_code.indexOf(endTag);
      var new_text = html_code.slice(nextTag.indexStart+nextTag.tag.length, indexEnd);
      segments.push({"type":nextTag.tag, 
                      "text": new_text,
                      "segments": this._buildHTMLParseTreeOverload(new_text, [])});
      return this._buildHTMLParseTreeOverload(html_code.slice(indexEnd+endTag.length, html_code.length), segments);
    }
    else{
      if(html_code!=''){
        segments.push({"type":"<normal>", 
                       "text": html_code,});
      }
      return segments;
    }
  },
  _renderHTMLParseTree: function(parseTree){
    return parseTree.map((segment)=>{
      return <Text style={this.state.tagToStyle[segment.type]}>{segment.text}</Text>;
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          {this._renderHTMLParseTree(this._buildHTMLParseTree(this.props.code))}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});


module.exports = ParseHTML;