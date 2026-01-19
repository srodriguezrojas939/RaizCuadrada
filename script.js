        // Inicializar Iconos
        lucide.createIcons();

        // Modo Noche/Día
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            
            // Cambiar icono
            const iconName = newTheme === 'dark' ? 'sun' : 'moon';
            document.querySelectorAll('[data-lucide="moon"], [data-lucide="sun"]').forEach(el => {
                el.setAttribute('data-lucide', iconName);
            });
            lucide.createIcons();
        }

        // Menú Móvil
        function toggleMenu() {
            document.getElementById('sidebar').classList.toggle('active');
        }

        // Animación de scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        
  


            // Función para desplegar el menú lateral
function toggleSubmenu(element) {
    const parent = element.parentElement; // El div .nav-group
    const submenu = parent.querySelector('.submenu');
    
    // Si ya está abierto, lo cerramos
    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        submenu.style.maxHeight = null;
    } else {
        // Opcional: Cerrar otros menús abiertos para que solo haya uno a la vez
        document.querySelectorAll('.nav-group.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.submenu').style.maxHeight = null;
        });

        // Abrimos el actual
        parent.classList.add('active');
        submenu.style.maxHeight = submenu.scrollHeight + "px";
    }
}
    
