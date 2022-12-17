// Packages require
const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
const db = require('./config/connection');

// Initial port
const PORT = process.env.PORT || 3001;

// Create instance of express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

