class Rover{
    constructor(position, mode, generatorWatts = 110){
      this.position = position;
      this.mode = mode.toUpperCase('Normal'); 
      this.generatorWatts = generatorWatts;
    }
    
    recieveMessage(message){
      let results = [];
      for(let i = 0; i < message.commands.length; i++) {
        if(message.commands[i].commandType === ('STATUS_CHECK')){
          let roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }  
          results.push({completed: true, roverStatus});
        } else if(message.commands[i].commandType === 'MODE_CHANGE'){
          if(message.commands[i].value === 'LOW_POWER'){
            this.mode = 'LOW_POWER'; 
          } else if (message.commands[i].value === 'NORMAL'){
            this.mode = 'NORMAL'; 
          }
          results.push({completed: true}); 
        }else if((message.commands[i].commandType === 'MOVE') && this.mode === 'LOW_POWER'){
          results.push({completed: false}); 
        }else if ((message.commands[i].commandType === 'MOVE') && this.mode === 'NORMAL'){
          results.push({completed: true}); 
          this.position = message.commands[i].value; 
        } else {
          results.push({completed: false, error: "NOT A VALID COMMAND"}); 
        }
      }
      return {
        message: message.name, 
        results: results 
      }
    }
  }
  
  
  module.exports = Rover; 