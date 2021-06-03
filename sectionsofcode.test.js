const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER

      {
        type: 'input',
        name: 'managerName',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is your ID?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your Email?'
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is your office number?'
      }

    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  createManager();