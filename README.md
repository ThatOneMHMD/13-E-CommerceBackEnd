# E-Commerce Back-End

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This is the code files for the corresponsing back-end application (leveraging Express.js API) that functions as a professional E-Commerce company manager. Once run according to the instructions in the [Installation](#installation) and the [Usage](#usage) sections below, the user/business owner will be able to view and manage the products together with their associated tags and categories, in their E-Commerce company so that they can organize and plan their business appropriately while competing with other e-commerce companies.

## Table of Contents

- [E-Commerce Back-End](#e-commerce-back-end)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Demo Video](#demo-video)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Credits](#credits)

## Demo Video

This video is approximately 12 mins long. Through it, examples of leveraging the application with Insomina to view, add, update, and delete products, tags, and categories, are shown. Please note that his video has no audio.

Link: https://youtu.be/6xgIx0mrsjU

## Features

- When the user adds their database name, MySQL username, and MySQL password to an environment variable file, they are able to connect to a database using Sequelize
- When the user enters the schema and seed commands, a development database is created and is seeded with test data
- when the user enters the command to invoke the application, the server is started and the Sequelize models are synced to the MySQL database
- When the user opens API GET routes in Insomnia for categories, products, or tags, the data for each of these routes is displayed in a formatted JSON
- When the user tests API POST, PUT, and DELETE routes in Insomnia, they are able to successfully create, update, and delete data in my database

## Installation

To use your own professional Employee Manager, "git clone" the repo down to your local so you have the Express project on your local. Then follow the usage instruction below in the Usage section.

## Usage

To start the application, follow these steps carefully:

1. Rename the ".env.EXAMPLE" file to the left as ".env", then enter your own mysql information
2. Open Integrated Terminal and make sure you are in the right directory
3. In the "db" directory, type in, in the terminal, the following: 'mysql -u "YOUR-OWN-mysql-username" -p'. Press ENTER and then enter your password
4. After you have accessed your mysql terminal, type in this: 'SOURCE schema.sql;', this will run the mysql code and show the number of affected rows. Type 'quit' to exit mysql terminal and then go to a normal node terminal
5. Type 'node ./seeds/index.js' and press enter to seed the tables with data (if you wish to change seeding data, go into the './seeds/' folder and add you own)
6. Once that is done, go back in the root folder directory and type in the following: 'npm install'
7. Now, type in the foolowing: 'node ./server.js' to start the server
8. Lastly, go into Insomnia (or any other back-end app) and start running the API calls to manage your products!

## License

MIT

## Credits

ThatOneMHMD - The creator of this website!
(Link: https://github.com/ThatOneMHMD)

Xandromus - The provider of the starter code!
(Repo Link: https://github.com/coding-boot-camp/fantastic-umbrella.git)
