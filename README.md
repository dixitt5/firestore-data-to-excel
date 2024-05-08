# Firestore Data to Excel Exporter

This repository contains the example code for integrating Firebase Firestore with React (using Vite) to export data as Excel files. The solution leverages Firebase Cloud Functions to automate the conversion of Firestore documents into CSV format, which are then made downloadable as Excel files. This example is particularly useful for generating reports and managing data exports in admin panels or similar applications.

## Prerequisites

Before you begin, ensure you have the following:
- A Firebase account.
- A Firebase project with Firestore and Cloud Functions enabled.
- Node.js installed on your machine.
- Yarn or npm for managing packages.

## Setup Instructions

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/your-username/firestore-data-to-excel.git
cd firestore-data-to-excel
```

### 2. Install Dependencies

Install the necessary dependencies using npm or Yarn:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Firebase

Ensure your Firebase project is set up and initialized:

- Follow the [Firebase documentation]("https://firebase.google.com/docs") to create a new Firebase project and enable Firestore and Cloud Functions.

- Configure your Firebase project settings in your application.

### 4. Local Development

Run the application locally using the following command:

```bash
npm run dev
# or
yarn dev
```
This will start the Vite development server and open the application in your default web browser.

### 5. Deploy Cloud Functions

Open up a new terminal window and run the following command to deploy the Cloud Functions:

```bash
firebase deploy --only functions
```

This will deploy the Cloud Functions to your Firebase project.

## Features

- **React Frontend**: Showcases how to fetch and display Firestore data in a table using React hooks.

- **Excel Export**: Includes a button that triggers a Cloud Function to convert Firestore data to CSV and then to Excel format.

- **Real-time Updates**: Uses Firestore's onSnapshot() method to watch for updates and retrieve the download link once ready.

## Cloud Functions

The included Cloud Function automates the process of fetching data from Firestore, converting it into a readable date format using date-fns, converting that data to CSV using Papaparse, and then uploading the file to Firebase Storage for public access.

## Additional Resources
For more detailed understanding and customizations, refer to the blog post that walks through the development of this feature: [Medium Blog](https://medium.com/@tilajidixit/how-to-export-firestore-data-to-excel-in-react-apps-using-firebase-cloud-functions-46998a329b6a).

Happy Coding!