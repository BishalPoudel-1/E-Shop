🛒 E-Shop – React-Based E-Commerce Platform
===========================================

Welcome to E-Shop, a modern and modular e-commerce web application built using React.js and Firebase.  
It simulates a full online shopping experience — from browsing products to user authentication and checkout.

🔗 GitHub Repository: https://github.com/BishalPoudel-1/E-Shop  

🚀 Features
-----------
- 🔐 User Authentication (Login/Signup via Firebase)
- 🛍️ Product Listings with individual detail pages
- 🛒 Shopping Cart, Checkout, and Simulated Purchase Flow
- 💬 Contact Form for customer queries
- 💰 Discount Section for special offers
- 📁 Reusable Components and global state with React Context API

🛠️ Tech Stack
-------------
- Frontend: React.js with JSX
- Routing: React Router
- Authentication: Firebase Auth
- State Management: React Context + Reducer
- Styling: CSS Modules
- Tools: npm, Git, VS Code

📁 Project Structure
--------------------
<pre> ```bash E-SHOP/ ├── public/ → Static assets ├── src/ │ ├── adminpage/ → Admin page components (optional) │ ├── Component/ → Shared reusable components (Navbar, Footer, etc.) │ ├── context_api/ │ │ ├── AuthContext.js → Global auth context │ │ └── AuthReducer.js → Reducer for managing auth state │ ├── pages/ │ │ ├── AboutMe.jsx / .css │ │ ├── ContactForm.js / .css │ │ ├── Discount-ProductDetail.js / .css │ │ ├── ProductList.js │ │ ├── ProductDetail.js │ │ ├── home.js / .css │ │ ├── login.js / .css │ │ ├── usercart.jsx / .css │ │ ├── userbuy.jsx / .css │ │ └── usercheckout.jsx / .css │ ├── firebase.js → Firebase configuration │ ├── App.js → Root component │ ├── index.js → App entry point │ ├── reportWebVitals.js → Performance monitoring │ └── setupTests.js → Testing setup ├── package.json └── .gitignore ``` </pre>

✅ Getting Started
------------------
1. Clone the repository:
   $ git clone https://github.com/BishalPoudel-1/E-Shop.git
   $ cd E-Shop

2. Install dependencies:
   $ npm install

3. Configure Firebase:
   - Open `firebase.js`
   - Replace placeholder values with your Firebase project's config

4. Start the development server:
   $ npm start

5. Open `http://localhost:3000` in your browser.

📸 Screenshots 
-------------------------
## Homepage

# Desktop Version
![homw](https://github.com/user-attachments/assets/211060f6-1589-4e7b-bb47-e24ff766882c)

# Mobile Version
![mobile home](https://github.com/user-attachments/assets/1d7c502f-53e0-4dd0-98ca-b4df59185df2)


## Login/Signup Pages

# Desktop version
![login](https://github.com/user-attachments/assets/5fb6ce3b-54f5-4b32-b645-86ec6c95b77e)
![register](https://github.com/user-attachments/assets/fc6a6919-2aca-4ef1-a479-4b237da11176)

# Mobile Version
![mobile login](https://github.com/user-attachments/assets/19a17dbb-4dd8-460b-bffb-91f6b32f634b)
![mobile register](https://github.com/user-attachments/assets/8b95b9c4-ce44-47eb-9872-0e7c0bf013d1)




👤 Author
---------
Made with 💙 by  Bishal Poudel  
GitHub: https://github.com/BishalPoudel-1
