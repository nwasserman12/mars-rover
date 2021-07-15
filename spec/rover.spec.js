const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js'); 

describe("Rover class", function() {

  it("should have the constructor sets position and default values for mode and generatorWatts", function(){
    const obj = new Rover(4, 'normal', 110);
    assert.strictEqual(obj.position, 4);
    assert.strictEqual(obj.mode, 'NORMAL'); 
    assert.strictEqual(obj.generatorWatts, 110);
  });
  
  it("should have response returned by receiveMessage contains name of message", function(){
    const commands = new Command (['STATUS_CHECK']);
    const message = new Message('test', commands)
    const obj = new Rover(4, 'normal');
    let results = obj.recieveMessage(message); 
    assert.strictEqual(results.message, 'test')
  }); 

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){ 
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; 
    const message = new Message('test', commands);  
    const obj = new Rover(4, 'normal'); 
    let number = obj.recieveMessage(message).results.length 
    assert.strictEqual(number, 2);
  });

  
  it("responds correctly to status check command", function(){
    const commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382, 'normal'); 
    response = rover.recieveMessage(message).results;
    assert.strictEqual(response[1].completed, true ); 
    assert.strictEqual(response[1].roverStatus.generatorWatts,  110);
    assert.strictEqual(response[1].roverStatus.mode, 'NORMAL');
    assert.strictEqual(response[1].roverStatus.position, 98382);
  }); 

  it("responds correctly to mode change command", function(){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382, 'normal');
    response = rover.recieveMessage(message).results;
    assert.strictEqual(response[0].completed, true );
    assert.strictEqual(rover.mode, 'LOW_POWER');
  }); 
  
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    const commands = [new Command('MOVE'), new Command('STATUS_CHECK')]
    const message = new Message('Test moving', commands);
    const rover = new Rover(98382, 'low_power');
    response = rover.recieveMessage(message).results;  
    assert.strictEqual(response[0].completed, false);
  });

  it("responds with position for move command", function(){
    const commands = [new Command('MOVE', 87382098), new Command('STATUS_CHECK')]
    const message = new Message('Test moving', commands);
    const rover = new Rover(98382, 'NORMAL');
    response = rover.recieveMessage(message).results; 
    assert.strictEqual(response[1].roverStatus.position, 87382098); 
  });

  it("should return completed false and a message for an unknown command", function(){
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('HELLO FRIEND!')];
    const message = new Message('Test unknown command', commands);
    const rover = new Rover(98382, 'NORMAL');
    response = rover.recieveMessage(message).results;  
    assert.strictEqual(response[1].completed, false); 
    assert.strictEqual(response[1].error, 'NOT A VALID COMMAND');
  });   

  }); 

