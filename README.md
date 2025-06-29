# CodeTogether - Real-time Collaborative Coding Platform

![CodeTogether Screenshot](screenshot.png)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction
CodeTogether is a real-time collaborative coding platform that allows developers to create coding rooms, invite others, and collaborate on code in real-time. With features like live code editing, chat functionality, and code execution, CodeTogether makes pair programming and remote collaboration seamless.

## Features
- **Real-time Code Collaboration**: Multiple users can edit code simultaneously with live updates
- **Room Management**: Create, join, and manage coding rooms with specific languages
- **Code Execution**: Run code directly in the platform and see output in real-time
- **Participant Management**: See who's online, manage permissions, and track activity
- **Integrated Chat**: Communicate with collaborators without leaving the editor
- **Syntax Highlighting**: Support for multiple programming languages
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- Monaco Editor (VS Code editor component)
- Socket.IO Client
- React Icons

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB (with Mongoose)
- Docker (for code execution sandbox)

### DevOps
- Docker
- Nginx
- GitHub Actions (CI/CD)

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- Docker (for code execution)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/codetogether.git

# Navigate to backend directory
cd codetogether/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

1. **Create an Account**: Sign up using your email
2. **Create a Room**: Specify room name, programming language, and max participants
3. **Invite Collaborators**: Share the room link with others
4. **Code Together**: Start coding with real-time synchronization
5. **Run Code**: Execute your code and see the output
6. **Chat**: Communicate with participants using the integrated chat

## Project Structure

```
codetogether/
├── backend/               # Backend server
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── app.js             # Main application file
│   └── server.js          # Server entry point
│
├── frontend/              # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Application pages
│   │   ├── styles/        # CSS files
│   │   ├── utils/         # Frontend utilities
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── docker/                # Docker configurations
├── .github/               # GitHub CI/CD workflows
├── .env.example           # Environment variables template
├── docker-compose.yml     # Docker compose configuration
└── README.md              # Project documentation
```

## API Endpoints

| Endpoint          | Method | Description                     |
|-------------------|--------|---------------------------------|
| /api/auth/signup  | POST   | Register a new user             |
| /api/auth/login   | POST   | Authenticate user               |
| /api/auth/logout  | POST   | Logout user                     |
| /api/rooms        | POST   | Create a new room               |
| /api/rooms/:id    | GET    | Get room details                |
| /api/rooms/:id    | DELETE | Delete a room                   |
| /api/execute      | POST   | Execute code                    |
| /api/validate     | GET    | Validate authentication token   |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Monaco Editor for the powerful code editor component
- Socket.IO for real-time communication
- React community for amazing libraries and tools
- All contributors who helped build this project

---

**Connect with us**: [GitHub](https://github.com/yourusername) | [Twitter](https://twitter.com/yourhandle) | [Project Website](https://codetogether.example.com)
