import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

const finals2014 = fifaData.filter((state) => {
     return state.Year === 2014 && state.Stage === "Final";
});

console.log(finals2014);
console.log(finals2014[0]["Home Team Name"]);
console.log(finals2014[0]["Away Team Name"]);
console.log(finals2014[0]["Home Team Goals"]);
console.log(finals2014[0]["Away Team Goals"]);
console.log(finals2014[0]["Win conditions"]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    const finalsData = data.filter((state) =>{
        return state.Stage === "Final"
    })
return finalsData;
};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {

    const finalYears = callback.map((state) =>{
        return {"Year": state.Year}
    })
    return finalYears;
};

console.log(getYears(getFinals(fifaData)));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) {

    const winners = [];
    callback.filter((state) =>{
        if(state["Home Team Goals"] > state["Away Team Goals"]){
            winners.push(state["Home Team Name"]);
        } else if (state["Away Team Goals"] > state["Home Team Goals"]){
            winners.push(state["Away Team Name"]);
        } else {
            winners.push("Tie");
        }
    })
    return winners;
};

console.log(getWinners(getFinals(fifaData)));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callbackWinners, callbackYears) {
 callbackYears.forEach((state, index) => {
     console.log(`In ${state.Year}, ${callbackWinners[index]} won the world cup!`)
     
 });   
};
getWinnersByYear((getWinners(getFinals(fifaData))),(getYears(getFinals(fifaData))));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

    const home = data.reduce((accu, state) => {
        let sum = accu + state["Home Team Goals"]; 
        return sum;
    }, 0);
    let aveHome = home / data.length;
    const away = data.reduce((accu, state) => {
        let sum = accu + state["Away Team Goals"];
        return sum;
    }, 0);
    let aveAway = away / data.length;
    // console.log(typeof(aveHome));
    // console.log(aveHome);
    return `Home scored an average of ${aveHome.toFixed(2)} goals per match, and Away scored an average of ${aveAway.toFixed(2)} goals per match.`
};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitial) {

    const teamWins = data.filter((state) => {
        if(teamInitial === state["Away Team Initials"] && state.Stage === "Final"){
            if(state["Away Team Goals"] > state["Home Team Goals"]){
                return state["Away Team Name"];
            }
        } else if (teamInitial === state["Home Team Initials"] && state.Stage === "Final"){
            if(state["Home Team Goals"] > state["Away Team Goals"]){
                return state["Home Team Name"];
            }
        }

    })
    // console.log(teamWins);
    console.log(`${teamInitial} won ${teamWins.length} world cup matches`)

};

getCountryWins(fifaData, "FRG");


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    let avGoals = {};
        data.filter((state) => {
        if(!avGoals[state["Home Team Name"]]){
            return avGoals[state["Home Team Name"]] = {score: 0, games: 0, avg: null};
        } if(!avGoals[state["Away Team Name"]]){
            return avGoals[state["Away Team Name"]] = {score: 0, games: 0, avg: null};
        }
    })

    data.forEach((state) => {
        avGoals[state["Home Team Name"]]["score"] += state["Home Team Goals"];
        avGoals[state["Home Team Name"]]["games"] ++;

        avGoals[state["Away Team Name"]]["score"] += state["Away Team Goals"];
        avGoals[state["Away Team Name"]]["games"] ++;
    })
    
    const teams = Object.entries(avGoals);
    let highestAvg = teams[0];
    for(let i = 0; i < teams.length; i++){
        teams[i][1]["avg"] = teams[i][1]["score"] / teams[i][1]["games"];
        if(teams[i][1]["avg"] > highestAvg[1]["avg"]){
            highestAvg = teams[i];
        }
    }
    console.log(`${highestAvg[0]}, with an average of ${highestAvg[1]["avg"]} scores per game played.`);
};

getGoals(fifaData);


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
