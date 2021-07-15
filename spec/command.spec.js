const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

  it("connector sets command type", function(){
    let obj = new Command("commandType", "value"); 
    assert.strictEqual(obj.commandType, "commandType"); 
  });

  it("constructor sets a value passed in as the 2nd argument", function(){
    let obj = new Command("commandType", 4);
      assert.strictEqual(obj.value, 4); 
  });

});