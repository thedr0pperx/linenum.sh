# Contributing to LinEnum.sh

First off, thank you for considering contributing to LinEnum.sh! 🎉

## Code of Conduct

This project is educational and meant to teach security best practices. All contributions should:
- Be respectful and constructive
- Focus on education, not exploitation
- Maintain the harmless, fun nature of the project
- Not introduce actual malicious code

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:
- Clear description of the enhancement
- Why it would be useful
- Example use cases
- Mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly locally
5. Commit with clear messages (`git commit -m 'Add some AmazingFeature'`)
6. Push to your fork (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/linenum.sh.git
cd linenum.sh

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Code Style

- Use TypeScript for type safety
- Follow the existing code style (Prettier config included)
- Write clear, descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

### Testing

Before submitting:

```bash
# Build the project
npm run build

# Test curl functionality
curl -s localhost:3000 | bash

# Test the web interface
# Open http://localhost:3000 in browser
```

### What We're Looking For

Contributions that would be especially valuable:
- 🗺️ Better world map visualization (maybe using D3.js or similar)
- 📊 Enhanced statistics and analytics
- 🎨 UI/UX improvements
- 🌐 Internationalization (i18n)
- 📱 Mobile experience enhancements
- ♿ Accessibility improvements
- 📚 Documentation improvements
- 🎓 More educational content about security
- 🔒 Security enhancements (without breaking the fun)

### What We're NOT Looking For

- Actual malicious code or exploits
- Breaking changes to the educational message
- Features that compromise user privacy
- Anything that would make the project actually dangerous

## Questions?

Feel free to open an issue with the "question" label or reach out to [@thedr0pperx](https://github.com/thedr0pperx).

## Recognition

Contributors will be listed in the README. Thank you for helping make the web more secure through education! 🙏

---

Remember: The goal is to teach, not to harm. Keep it fun, keep it educational! 🎓

