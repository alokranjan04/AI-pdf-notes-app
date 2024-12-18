# AI PDF Notes App 📚

An intelligent PDF management system that leverages AI to help users organize, analyze, and extract insights from their PDF documents.

## 🌟 Features

### 📱 Core Features
- **PDF Management**
  - Upload and organize PDFs
  - Create collections and folders
  - Real-time PDF preview
  - Search through PDF contents

- **AI-Powered Analysis**
  - Smart text extraction
  - Document summarization
  - Key points identification
  - Natural language querying

- **User Management**
  - Secure authentication with Clerk
  - User-specific document storage
  - Customizable preferences

### ⭐ Premium Features
- Advanced AI analysis
- Bulk document processing
- Enhanced storage capacity
- Priority support

## 🛠️ Technical Stack

- **Frontend**: Next.js 13+ with App Router
- **Authentication**: Clerk
- **Database**: Convex
- **AI Integration**: Google Gemini API
- **Styling**: Tailwind CSS + shadcn/ui
- **Payments**: PayPal

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication related routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── pdf/              # PDF handling components
│   ├── shared/           # Shared/common components
│   └── ui/               # UI components (shadcn)
├── lib/                  # Utility functions and helpers
│   ├── api/             # API related utilities
│   ├── pdf/             # PDF processing utilities
│   ├── ai/              # AI integration utilities
│   └── db/              # Database utilities
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── config/             # Configuration files
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/alokranjan04/ai-pdf-notes-app.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📝 API Documentation

### PDF Management
- `POST /api/pdf/upload` - Upload a new PDF
- `GET /api/pdf/:id` - Retrieve PDF details
- `DELETE /api/pdf/:id` - Delete a PDF
- `PUT /api/pdf/:id/move` - Move PDF to different collection

### AI Analysis
- `POST /api/ai/analyze` - Analyze PDF content
- `POST /api/ai/summarize` - Generate PDF summary
- `POST /api/ai/query` - Query PDF content

## 🔒 Security

- Secure authentication with Clerk
- File encryption at rest
- HTTPS-only communication
- Rate limiting on API routes
- Input sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## 👥 Team

- Alok Ranjan - Lead Developer
- [Add team members]

## 📞 Support

For support, email support@yourapp.com or join our Slack channel.