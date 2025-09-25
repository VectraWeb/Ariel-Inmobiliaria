// Properties data
const properties = [
    {
        id: 1,
        title: "Casa Moderna en Las Lomas",
        price: "$350,000",
        location: "Las Lomas, Distrito Central",
        bedrooms: 4,
        bathrooms: 3,
        area: "250 m²",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "casa",
        featured: true
    },
    {
        id: 2,
        title: "Apartamento de Lujo Centro",
        price: "$180,000",
        location: "Centro Histórico",
        bedrooms: 2,
        bathrooms: 2,
        area: "120 m²",
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "apartamento",
        featured: true
    },
    {
        id: 3,
        title: "Villa con Vista al Mar",
        price: "$850,000",
        location: "Costa Atlántica",
        bedrooms: 6,
        bathrooms: 4,
        area: "450 m²",
        image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "villa",
        featured: true
    },
    {
        id: 4,
        title: "Penthouse Ejecutivo",
        price: "$420,000",
        location: "Zona Rosa",
        bedrooms: 3,
        bathrooms: 3,
        area: "200 m²",
        image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "penthouse",
        featured: false
    },
    {
        id: 5,
        title: "Casa Familiar Residencial",
        price: "$280,000",
        location: "Colonia Palmira",
        bedrooms: 5,
        bathrooms: 3,
        area: "300 m²",
        image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "casa",
        featured: false
    },
    {
        id: 6,
        title: "Estudio Moderno",
        price: "$95,000",
        location: "Universidad",
        bedrooms: 1,
        bathrooms: 1,
        area: "45 m²",
        image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
        type: "estudio",
        featured: false
    }
];

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const heroSlides = document.querySelectorAll('.slide');
const heroDots = document.querySelectorAll('.dot');
const heroNext = document.querySelector('.hero-next');
const heroPrev = document.querySelector('.hero-prev');
const filterBtns = document.querySelectorAll('.filter-btn');
const propertiesGrid = document.getElementById('properties-grid');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Slider
let currentSlide = 0;
const totalSlides = heroSlides.length;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Hero navigation buttons
heroNext.addEventListener('click', nextSlide);
heroPrev.addEventListener('click', prevSlide);

// Hero dots navigation
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play hero slider
setInterval(nextSlide, 5000);

// Properties rendering
function renderProperties(propertiesToShow = properties) {
    propertiesGrid.innerHTML = '';
    
    propertiesToShow.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.dataset.type = property.type;
        
        propertyCard.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                ${property.featured ? '<div class="property-badge"><i class="fas fa-star"></i> Destacada</div>' : ''}
                <div class="property-price">${property.price}</div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-features">
                    <span class="feature">
                        <i class="fas fa-bed"></i>
                        ${property.bedrooms} hab.
                    </span>
                    <span class="feature">
                        <i class="fas fa-bath"></i>
                        ${property.bathrooms} baños
                    </span>
                    <span class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        ${property.area}
                    </span>
                </div>
                <button class="property-btn">Ver Detalles</button>
            </div>
        `;
        
        propertiesGrid.appendChild(propertyCard);
    });
}

// Property filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        if (filter === 'all') {
            renderProperties(properties);
        } else {
            const filteredProperties = properties.filter(property => property.type === filter);
            renderProperties(filteredProperties);
        }
    });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.nombre || !data.apellido || !data.email || !data.telefono || !data.consulta || !data.mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, ingresa un email válido.');
        return;
    }
    
    // Simulate form submission
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
const searchLocation = document.getElementById('search-location');
const propertyTypeSelect = document.getElementById('property-type');

searchBtn.addEventListener('click', () => {
    const location = searchLocation.value.toLowerCase();
    const type = propertyTypeSelect.value;
    
    let filteredProperties = properties;
    
    // Filter by location
    if (location) {
        filteredProperties = filteredProperties.filter(property => 
            property.location.toLowerCase().includes(location)
        );
    }
    
    // Filter by type
    if (type) {
        filteredProperties = filteredProperties.filter(property => 
            property.type === type
        );
    }
    
    // Scroll to properties section
    document.getElementById('propiedades').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Update filter buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (type) {
        const typeBtn = document.querySelector(`[data-filter="${type}"]`);
        if (typeBtn) typeBtn.classList.add('active');
    } else {
        document.querySelector('[data-filter="all"]').classList.add('active');
    }
    
    // Render filtered properties
    renderProperties(filteredProperties);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initial render of properties
    renderProperties();
});

// Property card click handlers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('property-btn')) {
        const propertyCard = e.target.closest('.property-card');
        const propertyTitle = propertyCard.querySelector('.property-title').textContent;
        alert(`Más información sobre: ${propertyTitle}\n\nEn una implementación real, esto abriría una página de detalles de la propiedad.`);
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});