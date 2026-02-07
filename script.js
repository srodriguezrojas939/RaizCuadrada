/* --- ARCHIVO: script.js --- */

/* =========================================
   1. FUNCIONES GLOBALES 
   ========================================= */

// Función auxiliar para actualizar los iconos de sol/luna
function updateThemeIcons(theme) {
    const iconName = theme === 'dark' ? 'sun' : 'moon';
    
    // Busca todos los iconos de tema y los actualiza
    document.querySelectorAll('[data-lucide="moon"], [data-lucide="sun"]').forEach(el => {
        el.setAttribute('data-lucide', iconName);
    });

    // Refresca los iconos nuevos
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Función: Alternar Tema (Oscuro/Claro)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
    // 1. Cambiar atributo en HTML
    html.setAttribute('data-theme', newTheme);
    
    // 2. Guardar en memoria del navegador
    localStorage.setItem('theme', newTheme);
    
    // 3. Actualizar los iconos visualmente
    updateThemeIcons(newTheme);

     document.body.classList.toggle("dark");
    updatePlotsTheme();
}

// Función: Menú Móvil 
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Función: Submenú Lateral
function toggleSubmenu(element) {
    const parent = element.parentElement; // El contenedor .nav-group
    const submenu = parent.querySelector('.submenu');
    
    // Si este menú ya está abierto, lo cerramos
    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        submenu.style.maxHeight = null;
    } else {
        // (Opcional) Cerrar otros menús abiertos para mantener el orden
        document.querySelectorAll('.nav-group.active').forEach(item => {
            // Solo cerramos los que no sean el que acabamos de clicar
            if (item !== parent) {
                item.classList.remove('active');
                item.querySelector('.submenu').style.maxHeight = null;
            }
        });

        // Abrimos el menú actual
        parent.classList.add('active');
        submenu.style.maxHeight = submenu.scrollHeight + "px";
    }
}


/* =========================================
   2. INICIALIZACIÓN (Al cargar la página)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // A. RESTAURAR TEMA GUARDADO
    // Leemos la memoria o usamos 'light' por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicamos el tema
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Actualizamos los iconos según el tema guardado
    updateThemeIcons(savedTheme);


    // B. INICIALIZAR ICONOS LUCIDE (General)

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    // C. ANIMACIÓN DE SCROLL (Intersection Observer)
    const observerOptions = {
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Si quieres que la animación ocurra solo una vez, descomenta la siguiente línea:
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Activar observador en todos los elementos con la clase .reveal-on-scroll
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});


 
    document.addEventListener("DOMContentLoaded", function() {

        const zoomSeen = localStorage.getItem('zoomAlertDismissed');
        
       
        const isMobile = window.innerWidth <= 768;

        if (!zoomSeen && isMobile) {
            const alertBox = document.getElementById('zoomAlert');
            
            
            setTimeout(() => {
                alertBox.classList.add('active');
                lucide.createIcons(); 
            }, 1000);

         
            setTimeout(() => {
                cerrarZoomAlert();
            }, 6500); 
        }
    });


    function cerrarZoomAlert() {
        const alertBox = document.getElementById('zoomAlert');
        if(alertBox) {
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'translateY(-20px)';
         
            setTimeout(() => {
                alertBox.classList.remove('active');
            }, 500);
        }
    }

   
    function noMostrarZoomMas() {
        localStorage.setItem('zoomAlertDismissed', 'true');
        cerrarZoomAlert();
    }

