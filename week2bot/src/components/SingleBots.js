import React from "react";

function SingleBot({ bot, enlistedBots, setEnlistedBots }) {
  const isEnlisted = enlistedBots.some(
    (enlistedBot) => enlistedBot.id === bot.id
  );

  function handleDischarge(){
    if (isEnlisted) {
      
      const updatedEnlistedBots = enlistedBots.filter(
        (enlistedBot) => enlistedBot.id !== bot.id
      );
      setEnlistedBots(updatedEnlistedBots);
    } else {
      
      setEnlistedBots([...enlistedBots, bot]);

      fetch(`http://localhost:3000/bots/${bot.id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (resp.status === 200) {
            // Bot deleted successfully
          } else if (resp.status === 404) {
            // this is the  Handle the case where the bot is not found
          } else {
            // it defines the fired message in case of an error 
          }
        })
        .catch((error) => {
          console.error("Error deleting bot:", error);
        });
    }
  };

  return (
  
    <div 
    className="single bot-card" onClick={handleDischarge}>
      <h2>{bot.name}</h2>
      
      <img src={bot.avatar_url} alt="bots"/>
      <p>Health:{bot.health}</p>
      <p>Damage:{bot.damage}</p>
      <p>Armor:{bot.armor}</p>
      {isEnlisted && (
        <button className="discharge-button" onClick={handleDischarge}>
        X
      </button>
      )}
    </div>

     );
}

export default SingleBot;