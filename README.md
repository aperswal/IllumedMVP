# Healthcare Search Application

## Overview

This Healthcare Search Application is a comprehensive web-based tool that allows users to search for hospitals in the United States and explore insurance plans using the HealthCare.gov Marketplace API. It provides detailed information about hospitals, including location, contact details, and ratings. Additionally, users can search for health and dental insurance plans based on their personal information and preferences.

## Features

### Hospital Search
- Search for hospitals by name
- Search for hospitals by address within a specified radius
- Display hospital information in an easy-to-read card format
- Expandable cards for additional hospital details
- Google Maps integration for address autocomplete and geocoding

### Insurance Plan Search (using Marketplace API)
- Search for health and dental insurance plans
- Comprehensive form for user information, including:
  - Zip Code
  - Age
  - Sex
  - Eligibility factors (e.g., Medicare, Medicaid)
  - Tobacco use
  - Expected income
- Display of matching insurance plans with details

### General Features
- Responsive design for various screen sizes
- Server-side searching of a comprehensive hospital database
- Integration with the Marketplace API for insurance plan data

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
  - Marketplace API for insurance plan data

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/healthcare-search-application.git
   cd healthcare-search-application
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   MARKETPLACE_API_KEY=your_marketplace_api_key_here
   ```

4. Ensure the `Hospital_General_Information.csv` file is in the root directory of the project.

## Running the Application

1. Start the backend server and frontend development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. Choose between "Hospital Search" or "Insurance Search" using the main tabs.
2. For Hospital Search:
   - Choose between "Search by Name" or "Search by Address"
   - For name search, enter a hospital name or part of a name
   - For address search, enter an address and specify a radius in miles
   - View the list of hospitals matching your search criteria
   - Click on a hospital card to expand and view additional information
3. For Insurance Search:
   - Fill out the form with your personal information and preferences
   - Click "Search Plans" to view matching insurance plans
   - Review the list of plans with their details

## API Integration

### Marketplace API

This application uses the HealthCare.gov Marketplace API to search for insurance plans. The main endpoint used is:

```
POST /api/v1/plans/search
```

The request body includes:
- Household information (income, people, etc.)
- Market type
- Place (state, zipcode, countyfips)
- Year

For detailed API documentation, visit the [Marketplace API Documentation](https://marketplace.api.healthcare.gov/api-docs/).

## Contributing

Contributions to improve the Healthcare Search Application are welcome. Please follow these steps:

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
- HealthCare.gov Marketplace API for insurance plan data