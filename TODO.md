# 🚀 Suggestions & Future Developments - Dons Du Son

## 🛠️ CMS & Admin (WordPress-like System)
- [ ] **Backend Persistence**: Replace `localStorage` with a real database (Supabase, Firebase, or a dedicated Node.js/Express API) to ensure changes are shared across all users.
- [ ] **Image Upload**: Implement a real image upload system (Cloudinary or AWS S3) instead of just pasting Unsplash URLs in the editor.
- [ ] **Rich Text Support**: Integrate a lightweight rich text editor (like TipTap or Quill) for the Manifesto and History sections to allow bold, italic, and lists.
- [ ] **SEO Management**: Add fields in the CMS to edit Meta Titles and Descriptions for each page.

## 📁 Projets & Événements (Dynamic Management)
- [ ] **Project CRUD**: Create a dedicated admin page to Add/Edit/Delete projects instead of them being hardcoded.
- [ ] **Gallery System**: Allow adding multiple images for each project to create a carousel/gallery on the detail page.
- [ ] **Category Management**: Implement the filters requested in `TOFIX.md` (Concert, Expo, Atelier) via the CMS.

## 📦 Location de Matériel
- [ ] **Cart System**: Allow users to add multiple items to a "Quote Basket" before sending the final request.
- [ ] **PDF Generation**: Automatically generate a professional PDF quote and send it to the user and the association.
- [ ] **Availability Calendar**: Show real-time availability of gear to avoid overlapping rental requests.

## 🤝 Engagement & Community
- [ ] **Newsletter Integration**: Add a sign-up form connected to a service like Mailchimp or Brevo.
- [ ] **Member Portal**: Create a "Member Area" where volunteers can access internal documents, training schedules, and logistical info.
- [ ] **Interactive FAQ**: Implement a searchable FAQ with categories based on user feedback.

## 🎨 UI/UX & Polish
- [ ] **Dark/Light Mode**: Add a theme switcher (though the current dark theme is very "pro-audio", a light mode can improve accessibility).
- [ ] **Page Transitions**: Add smooth Framer Motion transitions between pages for a premium feel.
- [ ] **Performance**: Optimize images using WebP format and implement lazy loading for the project galleries.
- [ ] **Accessibility (a11y)**: Audit the site for screen readers and keyboard navigation (ARIA labels).

## 📊 Analytics
- [ ] **Traffic Tracking**: Integrate Google Analytics or Plausible to understand which sections interest users the most.
- [ ] **Event Tracking**: Track "Quote Requests" and "Contact Form" submissions to measure association impact.
