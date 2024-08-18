# Hospital Search Application

## Overview

This Hospital Search Application is a web-based tool that allows users to search for hospitals in the United States. It provides detailed information about each hospital, including its location, contact details, overall rating, and additional characteristics such as emergency services availability and ownership type.

## Features

- Search for hospitals by name
- Search for hospitals by address within a specified radius
- Display hospital information in an easy-to-read card format
- Expandable cards for additional hospital details
- Google Maps integration for address autocomplete and geocoding
- Responsive design for various screen sizes
- Server-side searching of a comprehensive hospital database

## Technologies Used

- Frontend:
  - React.js
  - Material-UI (MUI) for styling and components
  - Google Maps JavaScript API for address autocomplete
- Backend:
  - Node.js
  - Express.js
- Data:
  - CSV file containing hospital information

## Project Structure

```
hospital-search-application/
│
├── src/
│   ├── components/
│   │   ├── GoogleMapsSearch.js
│   │   ├── HospitalCard.js
│   │   ├── HospitalList.js
│   │   └── SearchBar.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env
├── .env.local
├── .gitignore
├── csvUtils.js
├── Hospital_General_Information.csv
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

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

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_API_KEY=your_google_maps_api_key_here
   ```

4. Ensure the `Hospital_General_Information.csv` file is in the root directory of the project.

## Running the Application

1. Start the backend server and frontend development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. Choose between "Search by Name" or "Search by Address" using the tabs.
2. For name search, enter a hospital name or part of a name in the search bar.
3. For address search, enter an address and specify a radius in miles.
4. View the list of hospitals matching your search criteria.
5. Click on a hospital card to expand and view additional information.

## API Endpoints

- GET `/api/hospitals?query=<search_term>`
  - Searches for hospitals based on the provided name query
- GET `/api/hospitals/radius?address=<address>&radius=<radius>`
  - Searches for hospitals within the specified radius of the given address

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
- Icons and components provided by Material-UI
- Google Maps JavaScript API for address autocomplete and geocoding