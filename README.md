# Codele

## Description
Codele is a modern web application built with Next.js 14.1, Firebase, and the OpenAI API. It offers daily coding challenges and AI-assisted coding solutions to enhance users' programming skills. This platform is designed primarily for both beginners and intermediate programmers who seek to improve their coding abilities in a user-friendly environment.

## Features
- Daily Python debugging challenges with varying difficulty levels.
- User authentication system powered by Firebase.
- Real-time database integration using Firestore for storing user progress.
- AI-powered coding assistance using OpenAI API.
- Responsive and intuitive user interface.

## Getting Started

### Prerequisites
- Node.js (version 18.17 or later)
- npm (I'm using version 10.2.4) or yarn
- Firebase account
- OpenAI API key

### Installation
1. **Clone the repository:**

   - Using HTTPS:
     ```bash
     git clone https://github.com/ethanvillalobos8/codele.git
     ```
   - Using SSH:
     ```bash
     git clone git@github.com:ethanvillalobos8/codele.git
     ```

2. Navigate to the project directory:

    ```bash
    cd codele-app
    ```

3. Install dependencies:

    ```bash
    npm install
    #or
    yarn install
    ```

4. Set up Firebase:
- Create a Firebase project in the Firebase console.
- Enable Authentication and Firestore Database.
- Add your Firebase project configuration to your application.

5. Set up OpenAI API:
- Obtain an API key from OpenAI.
- Add the API key to your application's environment variables.

6. Create a `.env.local` file in the root of your project and add your Firebase and OpenAI API keys:

    ```javascript
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

    OPENAI_API_KEY=your_openai_api_key
    ```

7. Run the development server:

    ```bash
    npm run dev
    #or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
Use Codele to solve daily Python debugging problems and improve your skills. Log in to track your progress, receive AI-powered coding assistance, and more.

## Contributing
Contributions to Codele are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) for instructions on how to contribute.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- Ethan Villalobos - ethan.villalobos8@gmail.com
- Project Link: https://github.com/ethanvillalobos8/codele
