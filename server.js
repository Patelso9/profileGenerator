const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      // questions for manager set up as objects
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
        // reccomended to add validate property for email
        type: 'input',
        name: 'managerEmail',
        message: 'What is your Email?'
      },
      {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is your manager office number?'
      }

    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      //questions
      {
        type: 'input',
        name: 'engineerName',
        message: 'What is the engineer name?'
      },
      {
        type: 'input',
        name: 'engineerId',
        message: 'What is the engineer ID?'
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the intern email?'
      },
      {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is the engineer GitHUb username?'
      },
    ]).then(answers => {
      
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
    
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      
      
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
       //questions
       {
        type: 'input',
        name: 'internName',
        message: 'What is the intern name?'
      },
      {
        type: 'input',
        name: 'internId',
        message: 'What is the intern ID?'
      },
      {
        type: 'input',
        name: 'internEmail',
        message: 'What is the intern email?'
      },
      {
        type: 'input',
        name: 'internSchool',
        message: 'What school does the intern attend?'
      },
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internGithub);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
     
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
