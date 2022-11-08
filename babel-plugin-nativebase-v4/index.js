const template = require("babel-template");

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const propAliases = {
  "bg": "backgroundColor",
  "p": "padding"
}

const tokens = {
  "4": "16px"
}



module.exports = function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        //console.log("Identifier: " + path);
      },
      JSXElement(path) {
        if(path.node.openingElement.name.name == "Box") {
          path.node.openingElement.name.name = "View";
          if(path.node.openingElement.attributes) {
            let styles = {};
            for(var i in path.node.openingElement.attributes) {
              let attr = path.node.openingElement.attributes[i];
              if(propAliases[attr.name.name]) {
                let value = attr.value.value;
                if(tokens[attr.value.value])
                  value = tokens[attr.value.value];

                styles[propAliases[attr.name.name]] = value;
              }
            }
//              console.log(styles);
//              console.log(attr);

              const ast = template("var temp = "+JSON.stringify(styles)+";");
              //console.log(ast().declarations[0].init);

              path.node.openingElement.attributes[0].value = ast().declarations[0].init;
              path.node.openingElement.attributes[0].name.name = "style";
              path.node.openingElement.attributes.length = 1;

              //console.log("var temp = "+JSON.stringify(styles)+";");
            }
        }
        /*if(path.node.openingElement.node. == "Box")
        {
          path.node.name = "View";
        }*/
      }
    },
  };
}