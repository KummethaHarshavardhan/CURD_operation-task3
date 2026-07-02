# Product Management CRUD Application — Implementation Summary

## Overview

This project is a Product Management System built using the MERN stack — MongoDB, Express.js, React.js, and Node.js. 
It allows a user to Create, Read, Update, and Delete (CRUD) products through a simple web interface. Each product record 
includes a name, price, category, description, rating, and an optional buy link, and the application follows a standard 
three-tier architecture where the frontend, backend, and database run as separate processes communicating over HTTP.

## Architecture

The React frontend runs on port 3000 and handles everything the user sees and interacts with. The Express backend runs on port 5050 
and acts as the middle layer, receiving requests from the frontend, validating them, and communicating with the database. 
MongoDB runs locally on port 27017 and stores all product data permanently, even after the servers are restarted. Since the frontend and 
backend run on different ports, CORS (Cross-Origin Resource Sharing) is enabled on the backend so the browser allows requests between them.

## Backend Implementation

The backend is structured around a clear separation of concerns. The `server.js` file is the entry point that loads environment variables, 
connects to MongoDB, sets up middleware, and starts the Express server. The `config/db.js` file handles the MongoDB connection using Mongoose, 
and shuts down the server gracefully if the database is unreachable. The `models/Product.js` file defines a Mongoose schema that acts as a blueprint 
for every product, enforcing required fields such as name, price, category, and description, while rating and productLink are optional with sensible 
defaults. The `routes/products.js` file defines the REST API endpoints — POST to create a product, GET to fetch all or a single product, PUT to update, 
and DELETE to remove one. Every route performs server-side validation before touching the database and is wrapped in try/catch blocks so that failures 
return meaningful error messages with proper HTTP status codes instead of crashing the server.

## Frontend Implementation

The frontend is built with functional React components and hooks. The `productService.js` file centralizes all API communication using Axios, so every component
calls simple functions like getProducts or createProduct rather than repeating HTTP logic. The `App.js` file acts as the main parent component, holding the core 
application state — the list of products, loading status, and which product is being edited — and passing this data down to child components as props. 
The `ProductList.js` component renders the product table, including a star-based rating display and a clickable buy link that falls back to "N/A" when not provided. 
The `ProductForm.js` component is a single reusable modal used for both adding and editing products; when an existing product is passed in, the form pre-fills with 
its values, and when nothing is passed in, it starts empty. Client-side validation gives instant feedback before a request is even sent to the server.

## Data Flow

When a user adds a new product, the form validates the input locally, then sends a POST request to the backend through Axios. The backend validates the data again on 
the server side, saves it to MongoDB through Mongoose, and returns the saved product along with a success message. The frontend then shows a confirmation alert, closes
the form, and re-fetches the full product list so the table updates immediately with the new item appearing at the top, since products are sorted by creation date in 
descending order. The same general flow — validate, send request, update database, respond, refresh the UI — applies to editing and deleting products as well.

## Key Concepts Demonstrated

The project demonstrates REST API design with resource-based endpoints and proper HTTP verbs, schema-based data validation using Mongoose, environment-based configuration 
through .env files to keep sensitive settings out of the codebase, and CORS handling to enable cross-origin communication between frontend and backend. On the frontend, 
it demonstrates component-based UI design, controlled form inputs tied to React state, and asynchronous data fetching with proper error handling. The interface also includes 
CSS animations such as a smoothly appearing modal, staggered table row entrances, and hover/active states on buttons to make the experience feel more polished.

## Design Decisions

A few deliberate choices shaped the final implementation. Native browser alert() popups were used instead of a custom notification component to keep the codebase simpler. 
Products are sorted newest-first so that recently added items are immediately visible without scrolling. A single reusable form component handles both adding and editing to 
avoid duplicating form logic. Finally, a .gitignore file excludes the node_modules folder and .env files from version control, keeping the GitHub repository lightweight and 
preventing any database credentials from being exposed publicly.
