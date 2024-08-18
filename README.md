# Hospital Search Application

## Overview

The Hospital Search Application is a web-based tool that allows users to search for hospitals in the United States. It provides detailed information about each hospital, including its location, contact details, overall rating, and additional characteristics such as emergency services availability and ownership type.

## Features

- Search for hospitals by name
- Display hospital information in an easy-to-read card format
- Expandable cards for additional hospital details
- Responsive design for various screen sizes
- Server-side searching of a comprehensive hospital database

## Technologies Used

- Frontend:
  - React.js
  - Material-UI (MUI) for styling and components
- Backend:
  - Node.js
  - Express.js
- Data:
  - CSV file containing hospital information

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hospital-search-application.git
   cd hospital-search-application
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Place your `Hospital_General_Information.csv` file in the root directory of the project.

## Configuration

1. Ensure that the `CSV_FILE_PATH` in `csvUtils.js` points to the correct location of your CSV file.

2. If needed, adjust the `port` in `server.js` (default is 3001).

## Running the Application

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. Enter a hospital name or part of a name in the search bar.
2. Click the "Search" button or press Enter.
3. View the list of hospitals matching your search criteria.
4. Click on the expand icon on a hospital card to view additional information.

## Project Structure

```
hospital-search-application/
│
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   └── package.json        # Frontend dependencies
│
├── server.js               # Express server setup
├── csvUtils.js             # Utility for reading and searching CSV data
├── Hospital_General_Information.csv  # Data source
└── package.json            # Backend dependencies
```

## API Endpoints

- GET `/api/hospitals?query=<search_term>`
  - Searches for hospitals based on the provided query
  - Returns an array of hospital objects

## Contributing

Contributions to improve the Hospital Search Application are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Hospital data provided by the Centers for Medicare & Medicaid Services
- Icons provided by Material-UI

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/hospital-search-application](https://github.com/yourusername/hospital-search-application)