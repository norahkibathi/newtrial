import React, { useState, useEffect } from "react";
import AllBots from "./components/AllBots.js";
import BotArmy from "./components/BotArmy";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]); 

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3000/bots')
    .then((resp) => resp.json())
    .then((data) => setBots(data))
    .catch((error) => console.error('Error fetching data:', error));
}, []);
//setting the constant and JS arrowfunction helps in the implementation of the code needed to relaase bots from the army
const releaseFromArmy = (updatedEnlistedBots) => {
  //  
  setEnlistedBots(updatedEnlistedBots);
};

function handleBotDischarge(bot) {
  // setting the const enables meeting the requirement of removing the bots from the front end 
  const updatedEnlistedBots = enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id);
  setEnlistedBots(updatedEnlistedBots);
}
 

  return (

  <>
    <div className="App">
        <BotArmy 
        enlistedBots={enlistedBots} 
        releaseFromYourBotArmy={releaseFromArmy}/>

      <AllBots
       bots={bots} 
       enlistedBots={enlistedBots} 
       setEnlistedBots={setEnlistedBots}
       handleBotDischarge={handleBotDischarge}
      />
      
    </div>
    </>
  );
}
export default App