const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const open = require('open');
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArray = [];

function createTeam() {

function teamManager() {
  console.log("\033[4;33m*Create Your Team*\033[0m\n")
inquirer.prompt([
    {
      type: 'input',
      name: 'nameManager',
      message: 'What is the team managers name?',
    },
    {
      type: 'input',
      name: 'idManager',
      message: 'What is the team managers id?',
    },
    {
      type: 'input',
      name: 'emailManager',
      message: 'What is the team managers email?',
    },
    {
      type: 'input',
      name: 'officenumberManager',
      message: 'What is the team managers office number?',
    },
  
  ])
    .then((answers) => {
      const manager = new Manager(
          answers.nameManager, answers.idManager, answers.emailManager, answers.officenumberManager
      );
      teamArray.push(manager)
      addTeam();
      function addTeam() {
        inquirer.prompt([
          {
            type: 'list',
            name: 'addMembers',
            message: 'Would you like to add another team member?',
            choices: [
              '+1 Engineer',
              '+1 Intern',
              "No, im ready to generate a team summary.",
            ],
          },
        ])
          .then((userChoice) => {
            switch (userChoice.addMembers) {
              case '+1 Engineer':
                engineerAdd();
                break;
              case '+1 Intern':
                internAdd();
                break;
              default:
                generateSummary();
            }
          });
      }

      function engineerAdd() {
        console.log("\033[4;33m*Add an engineer*\033[0m\n")
        inquirer.prompt([
          {
            type: 'input',
            name: 'nameEngineer',
            message: 'What is the engineers name?',
          },
          {
            type: 'input',
            name: 'idEngineer',
            message: 'What is the engineers id?',
          },
          {
            type: 'input',
            name: 'emailEngineer',
            message: 'What is the engineers email?',
          },
          {
            type: 'input',
            name: 'githubEngineer',
            message: 'What is the engineers Github username?',
          },

        ])
          .then((answers) => {
            const engineer = new Engineer(
              answers.nameEngineer, answers.idEngineer, answers.emailEngineer, answers.githubEngineer
            );
            teamArray.push(engineer)
            console.log("\033[;32mEngineer Added!\033[0m\n")
            addTeam();
          })
      }

      function internAdd() {
        console.log("\033[4;33m*Add an intern*\033[0m\n")
        inquirer.prompt([
          {
            type: 'input',
            name: 'nameIntern',
            message: 'What is the interns name?',
          },
          {
            type: 'input',
            name: 'idIntern',
            message: 'What is the interns id?',
          },
          {
            type: 'input',
            name: 'emailIntern',
            message: 'What is the interns email?',
          },
          {
            type: 'input',
            name: 'schoolIntern',
            message: 'What is the interns school name?',
          },

        ])
          .then((answers) => {
            const intern = new Intern(
              answers.nameIntern, answers.idIntern, answers.emailIntern, answers.schoolIntern
            );
            teamArray.push(intern)
            console.log("\033[;32mIntern Added!\033[0m\n")
            addTeam();
          })
      }


      function generateSummary() {
        console.log("\033[;32mTeam Summary Generated\033[0m\n")
        console.log("\033[1;31mOpening Now...\033[0m\n")
        fs.writeFileSync(outputPath, render(teamArray), 'utf-8');
        open('./output/team.html')
      }
    });
}

  teamManager(); 
}
createTeam();