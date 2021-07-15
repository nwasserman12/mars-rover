const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

  it("throws error if a name is NOT passed into the constructor as the first parameter", function(){
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name is required.' 
      }
    );
  });

  it("shows that constructor sets name", function(){
    let obj = new Message('name', ['commands']);
    assert.strictEqual(obj.name, "name");
  });

  it("contains a commands array passed into the constructor as 2nd argument", function(){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let obj = new Message('name', commands); 
    assert.strictEqual(obj.commands, commands); 
  }); 
});  
