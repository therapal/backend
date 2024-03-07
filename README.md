# Therapal Backend Repository

[![UAT Workflow](https://github.com/THERAPAL/backend/actions/workflows/main.yaml/badge.svg?branch=dev&event=push)](https://github.com/THERAPAL/backend/actions/workflows/main.yaml)

Welcome to the Therapal backend repository! This repository contains the backend code for the Therapal project, an application focused on mental health and well-being.

## API Docs
https://documenter.getpostman.com/view/32427553/2s9Yyy7Hpc

## Technologies Used

- Node.js
- Express.js
- Sequelize
- PostgreSQL

## Setting Up Environment Variables

This project uses environment variables for configuration. Follow these steps to set up your environment variables:

1. Create a new file named `.env` in the root of the project.
2. Copy the contents of `.env.sample` into `.env`.
3. Replace the placeholder values in `.env` with your actual values.

## Development Setup

To set up the development environment for this project, follow these steps:

1. Clone the repository: `git clone https://github.com/THERAPAL/backend.git`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## Running Development Migrations

To run development migrations for your database, follow these steps:

1. Ensure that your database server is running and that your development database is properly configured in `config/config.js`.
2. Use the following command to run the migrations:
   npx sequelize-cli db:migrate

## Contributing

We welcome contributions to the Therapal project! If you'd like to contribute, please fork the repository and submit a pull request. Make sure to follow our [contribution guidelines](CONTRIBUTING.md).
