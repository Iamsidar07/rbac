# Role Base Access Control (RBAC)

## Description
This project is a full-stack user management dashboard built with React and Next.js. It allows administrators to manage users, roles, and permissions efficiently. The application provides a responsive interface for easy navigation and management of user data. The backend API is implemented to handle data operations securely.

## Lighthouse Score
![Lighthouse Score](/src/assets/lighthouse-score.png) 

## Features
- **Full-Stack Application**: Built with React for the frontend and Node.js for the backend.
- **User Management**: Create, read, update, and delete user accounts.
- **Role Management**: Assign and manage roles for users.
- **Permission Management**: Define and assign permissions to roles.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **API Implementation**: RESTful API for handling user data operations.
- **Security**: Utilizes React Hook Form for form handling and Zod for validation to ensure data integrity and security.
- **Breadcrumb Navigation**: Easy navigation through the dashboard.

## Technologies Used
- **Frontend**: React, Next.js, TypeScript
- **Backend**: Next.js, Mongoose
- **Database**: MongoDB (with Mongoose)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/iamsidar07/rbac.git
   ```
2. Navigate to the project directory:
   ```bash
   cd rbac
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Copy the `.env.example` file to create your `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and add your MongoDB connection string and any other necessary environment variables.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- You can also navigate directly to `/dashboard` or `/` to test the user management features.

## Testing Guidelines
- **Navigate to `/dashboard` or `/`**: This will take you to the main user management interface where you can view, add, edit, and delete users.

## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to the contributors and libraries that made this project possible.