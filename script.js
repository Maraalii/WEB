// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive Name Change
const nameElement = document.getElementById('name');
nameElement.addEventListener('click', function() {
    const newName = prompt('Enter your name:', nameElement.textContent);
    if (newName) {
        nameElement.textContent = newName;
        localStorage.setItem('portfolioName', newName);
    }
});

// Load saved name if exists
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('portfolioName');
    if (savedName) {
        nameElement.textContent = savedName;
    }
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(progress => {
        const width = progress.getAttribute('data-width');
        progress.style.width = width + '%';
    });
}

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

function animateTimeline() {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Run animations on load and scroll
window.addEventListener('load', () => {
    animateProgressBars();
    animateTimeline();
});

window.addEventListener('scroll', () => {
    animateTimeline();
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌓';
    }
});

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        nameInput.style.borderColor = 'red';
        isValid = false;
    } else {
        nameInput.style.borderColor = '#ddd';
    }
    
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = 'red';
        isValid = false;
    } else {
        emailInput.style.borderColor = '#ddd';
    }
    
    if (messageInput.value.trim() === '') {
        messageInput.style.borderColor = 'red';
        isValid = false;
    } else {
        messageInput.style.borderColor = '#ddd';
    }
    
    if (isValid) {
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Interactive Skill Cards
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('click', () => {
        // Get current progress
        const progressBar = card.querySelector('.progress');
        const progressText = card.querySelector('p:last-child');
        const currentWidth = parseInt(progressBar.getAttribute('data-width'));
        
        // Allow user to update progress
        const newWidth = prompt('Update your skill level (0-100):', currentWidth);
        
        if (newWidth !== null && !isNaN(newWidth) && newWidth >= 0 && newWidth <= 100) {
            progressBar.setAttribute('data-width', newWidth);
            progressBar.style.width = newWidth + '%';
            progressText.textContent = newWidth + '%';
        }
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add new project functionality
const projectGrid = document.querySelector('.project-grid');
const addProjectBtn = document.createElement('div');
//addProjectBtn.className = 'project-card add-project';
//addProjectBtn.innerHTML = `
  //  <div style="height: 200px; display: flex; align-items: center; justify-content: center; background-color: rgba(58, 134, 255, 0.1); font-size: 3rem;">+</div>
   // <div class="project-content">
       // <h3 class="project-title">Add New Project</h3>
      //  <p class="project-description">Click to add a new project to your portfolio.</p>
   // </div>
//`;

projectGrid.appendChild(addProjectBtn);

addProjectBtn.addEventListener('click', () => {
    const projectTitle = prompt('Enter project title:');
    if (!projectTitle) return;
    
    const projectDesc = prompt('Enter project description:');
    if (!projectDesc) return;
    
    const projectTags = prompt('Enter project tags (comma separated):');
    if (!projectTags) return;
    
   // const newProject = document.createElement('div');
   // newProject.className = 'project-card';
    
    const tagsHTML = projectTags.split(',')
        .map(tag => `<span class="tag">${tag.trim()}</span>`)
        .join('');
    
    newProject.innerHTML = `
        <div class="project-image">
            <img src="https://source.unsplash.com/random/400x300/?project" alt="${projectTitle}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${projectTitle}</h3>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <p class="project-description">${projectDesc}</p>
            <a href="#" class="btn">View Project</a>
        </div>
    `;
    
    projectGrid.insertBefore(newProject, addProjectBtn);
});
