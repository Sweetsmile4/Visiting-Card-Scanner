# Visiting Card Scanner

A modern web application that uses OCR (Optical Character Recognition) to digitize and extract information from business cards.

## Features

- 📸 Upload and scan business card images
- 🤖 Automatic OCR text extraction using Tesseract.js
- 📝 Intelligent data extraction (name, phone, email, company, address)
- 💾 MongoDB database for persistent storage
- 🎨 Responsive modern UI with React
- 🔍 View and manage all scanned cards
- 🗑️ Delete cards with confirmation
- 🌐 RESTful API backend with Express.js

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **Tesseract.js** for OCR processing
- **Multer** for file uploads
- **CORS** for cross-origin requests

### Frontend
- **React 19** with Vite
- **Axios** for API calls
- **CSS3** for responsive styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (use `.env.example` as reference):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/visiting_cards
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (use `.env.example` as reference):
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### POST `/api/cards/upload`
Upload a business card image for OCR processing.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Image file

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "phone": "123456789",
  "email": "john@example.com",
  "company": "Tech Company",
  "address": "...",
  "imageUrl": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### GET `/api/cards`
Retrieve all saved visiting cards.

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    ...
  }
]
```

### DELETE `/api/cards/:id`
Delete a specific visiting card.

**Response:**
```json
{
  "message": "Card deleted successfully"
}
```

### GET `/api/health`
Health check endpoint.

## Code Improvements Implemented

### Backend Enhancements
1. **Better Error Handling**: Comprehensive try-catch blocks with meaningful error messages
2. **Input Validation**: File type and size validation, email and phone format validation
3. **Database Optimization**: Added indexes for faster queries
4. **Resource Cleanup**: Automatic deletion of image files when cards are deleted
5. **OCR Configuration**: Centralized OCR settings for easier maintenance
6. **Code Documentation**: JSDoc comments for all functions
7. **Graceful Shutdown**: Proper server shutdown handling
8. **CORS Configuration**: Configurable CORS with environment variables
9. **MongoDB Connection Retry**: Automatic retry logic for database connection

### Frontend Enhancements
1. **Loading States**: Proper loading indicators during API calls
2. **Error Messages**: User-friendly error feedback
3. **Form Validation**: Client-side validation before submission
4. **Image Preview**: Show selected image before upload
5. **Responsive Design**: Mobile-friendly layout with CSS Grid
6. **Accessibility**: Proper labels and semantic HTML
7. **Interactive Cards**: Hover effects and better visual hierarchy
8. **Clickable Links**: Phone numbers and emails are clickable
9. **Environment Configuration**: API URL from environment variables
10. **State Management**: Better state management with proper hooks

### Code Quality
1. **Code Organization**: Better file structure and separation of concerns
2. **Naming Conventions**: Consistent and meaningful variable/function names
3. **Comments and Documentation**: Added comments explaining complex logic
4. **Package.json Updates**: Better scripts and metadata
5. **Environment Examples**: Created `.env.example` files for reference

## File Structure

```
Visiting-Card-Scanner/
├── server/
│   ├── controllers/
│   │   └── cardControllers.js    (Improved with validation and error handling)
│   ├── models/
│   │   └── Card.js               (Added schema validation)
│   ├── routes/
│   │   └── cardRoutes.js          (Added file validation and delete route)
│   ├── utils/
│   │   └── ocr.js                 (Improved OCR configuration)
│   ├── uploads/                   (User-uploaded images)
│   ├── .env.example
│   ├── server.js                  (Improved with better error handling)
│   └── package.json               (Updated scripts)
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCard.jsx     (Improved UI with validation)
│   │   │   ├── UploadCard.css     (New styling)
│   │   │   ├── CardList.jsx       (Improved with grid layout)
│   │   │   └── CardList.css       (New responsive styling)
│   │   ├── services/
│   │   │   └── api.jsx            (Added environment variables)
│   │   ├── App.jsx                (Added error handling)
│   │   ├── App.css                (Modern styling)
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json               (Updated scripts)
│   └── vite.config.js
│
└── README.md
```

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Open** `http://localhost:5173` in your browser
3. **Upload** a business card image
4. **View** extracted information and save to database
5. **Manage** your card collection with the display list

## Error Handling

The application includes comprehensive error handling:
- Invalid file type/size validation
- MongoDB connection retry logic
- OCR processing error messages
- API request timeouts
- 404 and 500 error responses

## Development Tips

- Use `npm run dev` for development with hot reload
- Check console for detailed error messages
- MongoDB Compass can be used to view database
- Tesseract.js supports multiple languages

## Future Enhancements

- [ ] Add card editing functionality
- [ ] Implement user authentication
- [ ] Add card search and filtering
- [ ] Support for multiple languages
- [ ] Batch upload capability
- [ ] Export cards to CSV/PDF
- [ ] Advanced data validation
- [ ] Image preprocessing for better OCR

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please create an issue in the repository.
