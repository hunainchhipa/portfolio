# Portfolio Website

A modern, responsive portfolio website showcasing professional experience, projects, and technical skills. Built with vanilla JavaScript and styled with Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Interactive UI**: Smooth animations, hover effects, and dynamic content loading
- **Experience Tabs**: Clean tabbed interface for viewing work experience
- **Project Showcase**: Video previews and detailed project modals
- **Tech Stack Display**: Organized technology proficiencies by category
- **Contact Form**: EmailJS integration for direct communication
- **Dark Theme**: Modern slate color palette with teal accents

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Font Awesome
- **Email Service**: EmailJS
- **Hosting**: Firebase Hosting

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css             # Custom CSS styles
├── script.js              # JavaScript functionality
├── data.js                # Project data
├── assets/                # Images, videos, and icons
├── public/                # Firebase public directory
├── firebase.json          # Firebase configuration
└── .firebaserc           # Firebase project settings
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase CLI (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser, or
   - Use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```

3. **View the site**
   - Navigate to `http://localhost:8000` in your browser

### EmailJS Setup (Optional)

To enable the contact form:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service
3. Create an email template
4. Update the EmailJS credentials in `index.html`:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   // Update service_id and template_id in the form handler
   ```

## Firebase Deployment

### Initial Setup

1. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if starting fresh)
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project: `hunainchhipa-23`
   - Set public directory as: `public`
   - Configure as single-page app: `No`
   - Don't overwrite existing files

### Deploy to Firebase

To deploy your portfolio to Firebase Hosting:

```bash
# Deploy to Firebase
firebase deploy

# Or deploy only hosting
firebase deploy --only hosting
```

### Common Firebase Commands

```bash
# View current Firebase project
firebase projects:list

# Switch Firebase project
firebase use <project-id>

# Test locally before deploying
firebase serve

# View deployment history
firebase hosting:channel:list

# Deploy to preview channel (for testing)
firebase hosting:channel:deploy preview
```

### Post-Deployment

After successful deployment, your site will be live at:
```
https://hunainchhipa-23.web.app
https://hunainchhipa-23.firebaseapp.com
```

## Customization

### Update Personal Information

1. **Hero Section**: Edit the title and subtitle in `index.html` (lines 82-89)
2. **About Section**: Update the bio and download CV link (lines 160-208)
3. **Stats**: Modify years of experience and projects (lines 126-157)
4. **Experience**: Edit company details and achievements (lines 428-569)
5. **Projects**: Update project data in `data.js`

### Styling

- **Colors**: Modify Tailwind classes or update CSS variables
- **Spacing**: Adjust padding/margin classes in `index.html`
- **Custom Styles**: Add styles to `styles.css`

### Adding Projects

Edit `data.js` to add new projects:

```javascript
{
  title: "Project Name",
  description: "Project description...",
  technologies: ["React", "Node.js"],
  features: ["Feature 1", "Feature 2"],
  url: "https://project-url.com",
  video: "assets/project-videos/project.mp4"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Images and videos optimized for web
- Lazy loading for project videos
- Minimal external dependencies
- CDN-hosted libraries for faster loading

## License

This project is open source and available for personal use.

## Contact

**Hunain Chhipa**
- Email: Your email here
- LinkedIn: Your LinkedIn URL
- GitHub: https://github.com/hunainchhipa

---

Built with passion using vanilla JavaScript and Tailwind CSS
