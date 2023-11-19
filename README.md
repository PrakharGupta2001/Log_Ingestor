# Log Ingestor and Query Interface

## Log Ingestor

### Setup

1. **Install Dependencies:**

   ```bash
   npm install express mongoose body-parser
2. **Run the Log Ingestor:**
   ```bash
   node log-ingestor.js

**Endpoints**
POST /logs: Ingest a new log.
GET /logs: Retrieve all logs.
DELETE /logs: Clear all logs (for testing purposes).
MongoDB Connection
The Log Ingestor uses MongoDB as the database. Ensure that MongoDB is running on the default port (27017) or update the connection URL in the code.

## Query Interface

**Install Dependencies:**
   ```bash
   npm install express mongoose body-parser

**Run the Query Interface:**
   ```bash
   node query-interface.js

**Endpoints**
GET /search: Search for logs based on specific criteria.
**MongoDB Connection**
The Query Interface connects to the same MongoDB database used by the Log Ingestor. Make sure MongoDB is running, and the database is populated with logs.

## User Interface
The basic web-based user interface allows you to interact with the Log Ingestor and Query Interface APIs.

Open main.html in a web browser.

Use the provided buttons and input fields to interact with the Log Ingestor and Query Interface.
