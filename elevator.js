/*
Elevator Project:
  Provide code that simulates an elevator. You are free to use any language.
  Upload the completed project to GitHub (public) for discussion during interview.
  Document all assumptions and any features that weren’t implemented.
  The result should be an executable, or script, that can be run with the following inputs and generate the following outputs.
    Inputs: [list of floors to visit] (e.g. elevator start=12 floor=2,9,1,32)
    Outputs: [total travel time, floors visited in order] (e.g. 560 12,2,9,1,32)
    Program Constants: Single floor travel time: 10
*/

const readline = require("readline");

class Elevator {
  constructor(starting_floor, floors_to_visit) {
    this.starting_floor = starting_floor;
    this.floors_to_visit = floors_to_visit;
    this.travel_time = 10;
    this.total_travel_time = 0;
    this.floors_visited = [];
  }

  move() {
    // create new list with starting floor and floors to visit
    let floors = [this.starting_floor, ...this.floors_to_visit];

    // loop over all the floors
    // Each loop calculates travel time and appends it to total_travel_time
    // Each loop adds the current floor as a visited floor in floors_visited
    floors.forEach((current_floor, index) => {
      let next_floor = floors[index + 1];

      if (next_floor === undefined) {
        this.floors_visited.push(current_floor);
        return;
      }

      let travel_distance = Math.abs(current_floor - next_floor);

      let current_travel_time = travel_distance * this.travel_time;

      this.total_travel_time += current_travel_time;

      this.floors_visited.push(current_floor);
    });

    return {
      total_travel_time: this.total_travel_time,
      floors_visited: this.floors_visited,
    };
  }
}

// Creates the readline Interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter the starting floor for the elevator (single number): ",
  (num) => {
    rl.question(
      "Enter the floors you would like to visit (number, comma-separated): ",
      (list) => {
        // Data validation and sanitization
        // Convert strings to either num or list of nums
        const starting_floor = Number(num);
        const floors_to_visit = list.split(",").map((n) => Number(n.trim()));

        // Create instance of elevator class
        let new_elevator = new Elevator(starting_floor, floors_to_visit);

        const { total_travel_time, floors_visited } = new_elevator.move();

        console.log(`Total Travel Time: ${total_travel_time}`);
        console.log(`Floors Visited in Order: ${floors_visited}`);

        rl.close();
      }
    );
  }
);
