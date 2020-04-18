// Dependencies
require('dotenv').config()
const axios = require('axios');
const Discord = require('discord.js')
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;

// When bot is online it will execute code below
bot.on('ready', async () => {
    
      // defines the baseURL of the connection
      const domapi = axios.create({

        baseURL: 'https://api.dominic-poppe.dev/gameserver_information/v1/'

      });

      // We call a function and then put in our parameters; GAME, IP, PORT. See setup.md to edit IP/PORT. We are making a GET request.
      const updateStatus = async () => {
            
            const response = await domapi.get(`get_information?game=${process.env.GAME}&serverip=${process.env.IP}&port=${process.env.PORT}`);
            
            if (response.data.Status === 'Offline') {

                  await bot.user.setPresence({
                    
                      activity: {
                        
                        name: 'Server Offline'
                        
                      },
                      status: 'online'
                    
                  });

            }
            else {

                  await bot.user.setPresence({
                      
                      activity: {
                        
                        name: `${response.data.CurPlayers}/${response.data.MaxPlayers}`
                          
                      },
                      status: 'online'
                      
                  });

            }
              
      };

      const sleep = ( ms ) => (
        
        new Promise(resolve => setTimeout(resolve, ms)) 
        
      );

      // We then say how often do we want to update this information, for instance 25000 / 25 seconds. Refer to setup.md. Will take however long you set for first results to be delivered

      while(true) {

        // Infinite loop, adjust 'TIMER' in the .env file to change how long it waits for
        
        await updateStatus();

        await sleep( process.env.TIMER );

      }

});

bot.login(token).then(() => console.log(`${bot.user.username} is running and should be online!`));