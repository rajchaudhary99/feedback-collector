![image](https://github.com/user-attachments/assets/b4bd0478-b4dd-4af5-abf5-d2b8c8fd8130)

![image](https://github.com/user-attachments/assets/5ffefe05-a205-439c-9fd4-f0e7d7ac7121)

🚀 How to Run the Feedback Collector Application
Open Terminal/Command Prompt
You'll need to open two separate terminal windows.

First Terminal - Start JSON Server (Backend)

bash
Copy
npx json-server --watch db.json --port 3001
This will:

Start the mock API server

Watch the db.json file for changes

Run on port 3001

You should see output confirming it's running

Second Terminal - Start React App (Frontend)

bash
Copy
npm run dev
This will:

Start the Vite development server

Launch the React application

Typically runs on port 3000

Automatically open your browser (or give you the URL)

Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:3001/feedbacks

🔄 How the System Works
Submit Feedback at http://localhost:3000

Manage Submissions at http://localhost:3000/admin

Data Storage:

New submissions go to pending_feedbacks

Approved feedback moves to feedbacks

All stored in db.json

⚠️ Troubleshooting Tips
If you encounter issues:

Make sure both terminals are running

Verify ports 3000 and 3001 are available

Check db.json exists in your project root

Ensure you ran npm install first

🛑 Stopping the Application
In each terminal window, press:

bash
Copy
Ctrl + C

