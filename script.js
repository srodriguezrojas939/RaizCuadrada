/* --- ARCHIVO: script.js --- */

// 1. Lógica de Tema (Oscuro/Claro)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Aplicar tema guardado al cargar
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// 2. Lógica del Menú Lateral (Acordeón)
function toggleSubmenu(element) {
    const parent = element.parentElement; // .nav-group
    const submenu = parent.querySelector('.submenu');
    
    // Cerrar otros menús si quieres que solo uno esté abierto a la vez (opcional)
    document.querySelectorAll('.nav-group.active').forEach(item => {
        if(item !== parent) {
            item.classList.remove('active');
            item.querySelector('.submenu').style.maxHeight = null;
        }
    });

    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        submenu.style.maxHeight = null;
    } else {
        parent.classList.add('active');
        submenu.style.maxHeight = submenu.scrollHeight + "px";
    }
}

// 3. Inicializar Iconos y Scripts al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos Lucide
    if(typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Aquí puedes agregar la lógica del texto rotativo si la página lo tiene
    const rotatingElement = document.querySelector('.rotating-text');
    if (rotatingElement) {
        // ... (Tu lógica de texto rotativo iría aquí solo si existe el elemento)
    }
});
