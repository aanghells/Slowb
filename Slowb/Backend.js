document.addEventListener('DOMContentLoaded', () => {
    const listaMaterias = document.getElementById('lista-materias');
    const listaMisMaterias = document.getElementById('lista-mis-materias');
    const formAgregarMateria = document.getElementById('form-agregar-materia');
    const btnAgregarMateria = document.getElementById('btn-agregar-materia');
    const nombreMateria = document.getElementById('nombre-materia');
    const btnGuardarMisMaterias = document.getElementById('guardar-mis-materias');

    // Simulación de usuario (admin o usuario normal)
    const usuario = {
        tipo: 'admin', // Cambiar a 'usuario' para probar permisos
        misMaterias: [] // Materias seleccionadas por el usuario
    };

    // Materias iniciales
    const materias = ['Matemáticas', 'Física', 'Química', 'Biología', 'Historia', 'Literatura'];

    // Renderizar lista de materias disponibles
    function renderizarMaterias() {
        listaMaterias.innerHTML = '';
        materias.forEach((materia, index) => {
            const li = document.createElement('li');
            li.textContent = materia;
            
            // Añadir evento de clic para seleccionar/deseleccionar
            li.addEventListener('click', () => toggleSeleccionMateria(materia));
            
            // Acciones solo para admin
            if (usuario.tipo === 'admin') {
                const accionesDiv = document.createElement('div');
                accionesDiv.classList.add('acciones-materia');

                const btnEditar = document.createElement('button');
                btnEditar.textContent = '✏️';
                btnEditar.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar selección al editar
                    editarMateria(index);
                });

                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = '🗑️';
                btnEliminar.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar selección al eliminar
                    eliminarMateria(index);
                });

                accionesDiv.appendChild(btnEditar);
                accionesDiv.appendChild(btnEliminar);
                li.appendChild(accionesDiv);
            }

            listaMaterias.appendChild(li);
        });
    }

    // Renderizar mis materias seleccionadas
    function renderizarMisMaterias() {
        listaMisMaterias.innerHTML = '';
        usuario.misMaterias.forEach(materia => {
            const li = document.createElement('li');
            li.textContent = materia;
            li.addEventListener('click', () => quitarMateriaSeleccionada(materia));
            listaMisMaterias.appendChild(li);
        });
    }

    // Toggle para seleccionar/deseleccionar materias
    function toggleSeleccionMateria(materia) {
        const index = usuario.misMaterias.indexOf(materia);
        if (index === -1) {
            // Añadir materia si no está seleccionada
            usuario.misMaterias.push(materia);
        } else {
            // Quitar materia si ya está seleccionada
            usuario.misMaterias.splice(index, 1);
        }
        renderizarMisMaterias();
        resaltarMateriasSeleccionadas();
    }

    // Quitar materia seleccionada desde Mis Materias
    function quitarMateriaSeleccionada(materia) {
        const index = usuario.misMaterias.indexOf(materia);
        if (index !== -1) {
            usuario.misMaterias.splice(index, 1);
            renderizarMisMaterias();
            resaltarMateriasSeleccionadas();
        }
    }

    // Resaltar materias seleccionadas en la lista principal
    function resaltarMateriasSeleccionadas() {
        const listaItems = listaMaterias.querySelectorAll('li');
        listaItems.forEach(li => {
            if (usuario.misMaterias.includes(li.textContent)) {
                li.classList.add('materia-seleccionada');
            } else {
                li.classList.remove('materia-seleccionada');
            }
        });
    }

    // Guardar mis materias (aquí podrías hacer una llamada a backend)
    btnGuardarMisMaterias.addEventListener('click', () => {
        alert(`Materias guardadas: ${usuario.misMaterias.join(', ')}`);
        // Aquí implementarías la lógica de guardar en backend
    });

    // Función para editar materia (como en el ejemplo anterior)
    function editarMateria(index) {
        const materiaOriginal = materias[index];
        const nuevoNombre = prompt('Editar nombre de materia:', materiaOriginal);
        
        if (nuevoNombre && nuevoNombre.trim()) {
            // Actualizar nombre en todas partes
            materias[index] = nuevoNombre;
            
            // Actualizar mis materias si estaba seleccionada
            const indexEnMisMaterias = usuario.misMaterias.indexOf(materiaOriginal);
            if (indexEnMisMaterias !== -1) {
                usuario.misMaterias[indexEnMisMaterias] = nuevoNombre;
            }
            
            renderizarMaterias();
            renderizarMisMaterias();
        }
    }

    // Función para eliminar materia
    function eliminarMateria(index) {
        const materiaEliminada = materias[index];
        materias.splice(index, 1);
        
        // Eliminar de mis materias si estaba seleccionada
        const indexEnMisMaterias = usuario.misMaterias.indexOf(materiaEliminada);
        if (indexEnMisMaterias !== -1) {
            usuario.misMaterias.splice(indexEnMisMaterias, 1);
        }
        
        renderizarMaterias();
        renderizarMisMaterias();
    }

    // Mostrar u ocultar formulario según el tipo de usuario
    if (usuario.tipo === 'admin') {
        formAgregarMateria.style.display = 'block';
    }

    // Agregar materia
    btnAgregarMateria.addEventListener('click', () => {
        if (nombreMateria.value.trim()) {
            materias.push(nombreMateria.value.trim());
            nombreMateria.value = '';
            renderizarMaterias();
        }
    });

    // Inicializar
    renderizarMaterias();
    renderizarMisMaterias();
});

//documentos
document.addEventListener('DOMContentLoaded', () => {
    // Simulación de usuario y datos
    const usuario = {
        materias: ['Matemáticas', 'Integracion de Apps', 'IA'],
        documentos: {
            'Matemáticas': [
                { nombre: 'Ejercicios.pdf', url: '#' },
                { nombre: 'Resumen.docx', url: '#' }
            ],
            'Integracion de Apps': [
                { nombre: 'Formulario.pdf', url: '#' }
            ],
            'IA': []
        }
    };

    const materiaSelector = document.getElementById('materia-selector');
    const documentoInput = document.getElementById('documento-input');
    const btnSubirDocumento = document.getElementById('btn-subir-documento');
    const carpetasDocumentos = document.getElementById('carpetas-documentos');

    // Llenar selector de materias
    function llenarMaterias() {
        usuario.materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            materiaSelector.appendChild(option);
        });
    }

    // Renderizar documentos por materia
    function renderizarDocumentos() {
        carpetasDocumentos.innerHTML = '';

        usuario.materias.forEach(materia => {
            const carpetaMateria = document.createElement('div');
            carpetaMateria.classList.add('carpeta-materia');

            const tituloMateria = document.createElement('h3');
            tituloMateria.textContent = materia;
            carpetaMateria.appendChild(tituloMateria);

            const listaDocumentos = document.createElement('ul');
            listaDocumentos.classList.add('lista-documentos');

            // Documentos de esta materia
            const documentosMateria = usuario.documentos[materia] || [];
            documentosMateria.forEach(documento => {
                const itemDocumento = document.createElement('li');
                
                const nombreDocumento = document.createElement('span');
                nombreDocumento.textContent = documento.nombre;

                const accionesDocumento = document.createElement('div');
                accionesDocumento.classList.add('acciones-documento');

                const btnDescargar = document.createElement('button');
                btnDescargar.textContent = 'Descargar';
                btnDescargar.classList.add('btn-descargar');
                btnDescargar.addEventListener('click', () => descargarDocumento(documento));

                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.classList.add('btn-eliminar');
                btnEliminar.addEventListener('click', () => eliminarDocumento(materia, documento));

                accionesDocumento.appendChild(btnDescargar);
                accionesDocumento.appendChild(btnEliminar);

                itemDocumento.appendChild(nombreDocumento);
                itemDocumento.appendChild(accionesDocumento);
                listaDocumentos.appendChild(itemDocumento);
            });

            carpetaMateria.appendChild(listaDocumentos);
            carpetasDocumentos.appendChild(carpetaMateria);
        });
    }

    // Función para subir documento
    btnSubirDocumento.addEventListener('click', () => {
        const materiaSeleccionada = materiaSelector.value;
        const archivoSeleccionado = documentoInput.files[0];

        if (materiaSeleccionada && archivoSeleccionado) {
            // Simulación de subida de documento
            const nuevoDocumento = {
                nombre: archivoSeleccionado.name,
                url: '#' // En un caso real, generarías una URL de descarga
            };

            // Agregar documento a la materia
            if (!usuario.documentos[materiaSeleccionada]) {
                usuario.documentos[materiaSeleccionada] = [];
            }
            usuario.documentos[materiaSeleccionada].push(nuevoDocumento);

            // Limpiar selecciones
            materiaSelector.value = '';
            documentoInput.value = '';

            // Renderizar documentos actualizados
            renderizarDocumentos();
        } else {
            alert('Selecciona una materia y un documento');
        }
    });

    // Función de descarga (solo simulación)
    function descargarDocumento(documento) {
        alert(`Descargando ${documento.nombre}`);
        // En un caso real, manejarías la descarga del documento
    }

    // Función de eliminación
    function eliminarDocumento(materia, documento) {
        const documentosMateria = usuario.documentos[materia];
        const index = documentosMateria.indexOf(documento);
        
        if (index !== -1) {
            documentosMateria.splice(index, 1);
            renderizarDocumentos();
        }
    }

    // Inicializar
    llenarMaterias();
    renderizarDocumentos();
});
//descargas
document.addEventListener('DOMContentLoaded', () => {
    // Datos simulados de historial de descargas
    const usuario = {
        nombre: 'Juan Pérez'
    };

    const historialDescargas = [
        {
            fecha: '2024-02-15',
            hora: '10:30:45',
            materia: 'Matemáticas',
            documento: 'Ejercicios.pdf',
            tamano: '2.5 MB',
            usuario: usuario.nombre
        },
        {
            fecha: '2024-02-16',
            hora: '14:22:11',
            materia: 'Integracion',
            documento: 'Formulario.docx',
            tamano: '1.2 MB',
            usuario: usuario.nombre
        },
        {
            fecha: '2024-03-01',
            hora: '09:45:33',
            materia: 'IA',
            documento: 'Resumen.pdf',
            tamano: '3.7 MB',
            usuario: usuario.nombre
        }
        // Más registros de historial
    ];

    const materias = [...new Set(historialDescargas.map(descarga => descarga.materia))];

    // Elementos del DOM
    const filtroMateriaSelect = document.getElementById('filtro-materia-select');
    const fechaInicio = document.getElementById('fecha-inicio');
    const fechaFin = document.getElementById('fecha-fin');
    const btnAplicarFiltros = document.getElementById('btn-aplicar-filtros');
    const cuerpoTablaDescargas = document.getElementById('cuerpo-tabla-descargas');
    const totalDescargasElement = document.getElementById('total-descargas');
    const descargasMesElement = document.getElementById('descargas-mes');
    const documentoMasDescargadoElement = document.getElementById('documento-mas-descargado');

    // Llenar selector de materias
    function llenarMaterias() {
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            filtroMateriaSelect.appendChild(option);
        });
    }

    // Renderizar tabla de descargas
    function renderizarTablaDescargas(descargas) {
        cuerpoTablaDescargas.innerHTML = '';

        descargas.forEach(descarga => {
            const fila = document.createElement('tr');
            
            fila.innerHTML = `
                <td>${descarga.fecha}</td>
                <td>${descarga.hora}</td>
                <td>${descarga.materia}</td>
                <td>${descarga.documento}</td>
                <td>${descarga.tamano}</td>
                <td>${descarga.usuario}</td>
            `;

            cuerpoTablaDescargas.appendChild(fila);
        });
    }

    // Aplicar filtros
    function aplicarFiltros() {
        const materiaSeleccionada = filtroMateriaSelect.value;
        const fechaInicioValor = fechaInicio.value;
        const fechaFinValor = fechaFin.value;

        let descargasFiltradas = historialDescargas;

        // Filtro por materia
        if (materiaSeleccionada) {
            descargasFiltradas = descargasFiltradas.filter(
                descarga => descarga.materia === materiaSeleccionada
            );
        }

        // Filtro por rango de fechas
        if (fechaInicioValor && fechaFinValor) {
            descargasFiltradas = descargasFiltradas.filter(descarga => 
                descarga.fecha >= fechaInicioValor && descarga.fecha <= fechaFinValor
            );
        }

        renderizarTablaDescargas(descargasFiltradas);
        actualizarResumen(descargasFiltradas);
    }

    // Actualizar resumen de descargas
    function actualizarResumen(descargas) {
        // Total de descargas
        totalDescargasElement.textContent = descargas.length;

        // Descargas este mes
        const mesActual = new Date().getMonth() + 1;
        const descargasMes = descargas.filter(descarga => {
            const mesFecha = new Date(descarga.fecha).getMonth() + 1;
            return mesFecha === mesActual;
        });
        descargasMesElement.textContent = descargasMes.length;

        // Documento más descargado
        const conteoDocumentos = descargas.reduce((conteo, descarga) => {
            conteo[descarga.documento] = (conteo[descarga.documento] || 0) + 1;
            return conteo;
        }, {});

        const documentoMasDescargado = Object.keys(conteoDocumentos).reduce(
            (a, b) => conteoDocumentos[a] > conteoDocumentos[b] ? a : b, 
            ''
        );
        documentoMasDescargadoElement.textContent = documentoMasDescargado || '-';
    }

    // Eventos
    btnAplicarFiltros.addEventListener('click', aplicarFiltros);

    // Inicializar
    llenarMaterias();
    renderizarTablaDescargas(historialDescargas);
    actualizarResumen(historialDescargas);
});
//Calendario
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar íconos Lucide
    lucide.createIcons();

    const calendarDays = document.getElementById('calendarDays');
    const monthDisplay = document.getElementById('monthDisplay');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const subjectButtons = document.getElementById('subjectButtons');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    const selectedSubjectDisplay = document.getElementById('selectedSubjectDisplay');
    const addEventBtn = document.getElementById('addEventBtn');
    const eventDescription = document.getElementById('eventDescription');
    const eventsList = document.getElementById('eventsList');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedSubject = null;
    const events = {};

    const MONTHS = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const SUBJECT_COLORS = {
        'Matemáticas': '#FF6B6B',
        'Integracion de Aplicaciones': '#4ECDC4', 
        'Inteligencia Artificial': '#45B7D1',
        'Arquitectura': '#FFA07A',
        'Programacion': '#98D8C1'
    };

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        monthDisplay.textContent = `${MONTHS[month]} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDayOfMonth.getDay();
        const totalDays = lastDayOfMonth.getDate();

        calendarDays.innerHTML = '';

        // Previous month's days
        for (let i = 0; i < (startingDayOfWeek || 7) - 1; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('text-gray-300', 'text-center', 'p-2', 'border');
            calendarDays.appendChild(dayElement);
        }

        // Current month's days
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('text-center', 'p-2', 'border', 'cursor-pointer', 'hover:bg-gray-100');

            const fullDate = new Date(year, month, day);
            const dateKey = fullDate.toISOString().split('T')[0];

            if (events[dateKey]) {
                dayElement.style.backgroundColor = events[dateKey].color;
                dayElement.classList.add('text-white');
            }

            dayElement.addEventListener('click', () => {
                const prevSelected = calendarDays.querySelector('.bg-blue-500');
                if (prevSelected) {
                    prevSelected.classList.remove('bg-blue-500', 'text-white');
                }
                
                dayElement.classList.add('bg-blue-500', 'text-white');
                selectedDate = fullDate;
                selectedDateDisplay.textContent = fullDate.toLocaleDateString();
                
                // Mostrar eventos del día seleccionado
                renderDayEvents(dateKey);
                
                updateAddEventButton();
            });

            calendarDays.appendChild(dayElement);
        }
    }

    function renderDayEvents(dateKey) {
        eventsList.innerHTML = '<h4 class="font-semibold mb-2">Eventos</h4>';
        
        if (events[dateKey]) {
            events[dateKey].events.forEach((event, index) => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('bg-gray-100', 'p-2', 'rounded', 'mb-2', 'flex', 'justify-between', 'items-center');
                
                const eventText = document.createElement('span');
                eventText.textContent = `${event.subject}: ${event.description}`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '&times;';
                deleteBtn.classList.add('text-red-500', 'font-bold', 'hover:text-red-700');
                deleteBtn.addEventListener('click', () => {
                    events[dateKey].events.splice(index, 1);
                    renderDayEvents(dateKey);
                    renderCalendar(currentDate);
                });

                eventItem.appendChild(eventText);
                eventItem.appendChild(deleteBtn);
                eventsList.appendChild(eventItem);
            });
        }
    }

    function updateAddEventButton() {
        addEventBtn.disabled = !(selectedDate && selectedSubject && eventDescription.value.trim());
    }

    subjectButtons.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const prevSelected = subjectButtons.querySelector('.ring-2');
            if (prevSelected) prevSelected.classList.remove('ring-2', 'ring-black');
            
            e.target.classList.add('ring-2', 'ring-black');
            selectedSubject = e.target.dataset.subject;
            selectedSubjectDisplay.textContent = selectedSubject;
            
            updateAddEventButton();
        }
    });

    eventDescription.addEventListener('input', updateAddEventButton);

    addEventBtn.addEventListener('click', () => {
        if (selectedDate && selectedSubject && eventDescription.value.trim()) {
            const dateKey = selectedDate.toISOString().split('T')[0];
            
            if (!events[dateKey]) {
                events[dateKey] = {
                    color: SUBJECT_COLORS[selectedSubject],
                    events: []
                };
            }
            
            events[dateKey].events.push({
                subject: selectedSubject,
                description: eventDescription.value.trim()
            });

            // Limpiar formulario
            eventDescription.value = '';
            selectedSubject = null;
            selectedSubjectDisplay.textContent = 'Ninguna';
            subjectButtons.querySelector('.ring-2')?.classList.remove('ring-2', 'ring-black');
            addEventBtn.disabled = true;

            // Renderizar calendario y eventos
            renderCalendar(currentDate);
            renderDayEvents(dateKey);
        }
    });

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Initial render
    renderCalendar(currentDate);
});
//Index
// Selección de elementos del DOM
const loginForm = document.getElementById("loginForm");
const registerButton = document.querySelector(".register-btn");
const googleButton = document.querySelector(".google-btn");
const microsoftButton = document.querySelector(".microsoft-btn");
const forgotPasswordLink = document.querySelector(".forgot-password");

// Evento de envío del formulario de inicio de sesión
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener valores de los campos de entrada
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Validación básica (puedes mejorarla)
    if (username === "admin" && password === "1234") {
        alert("Inicio de sesión exitoso");
        window.location.href = "Home.html"; // Redirigir a Home.html
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// Evento para el botón "Registrarse"
registerButton.addEventListener("click", () => {
    alert("Funcion en proceso.");
    // Redirige a una página de registro si tienes una
    // window.location.href = "register.html";
});

// Evento para el botón de inicio de sesión con Google
googleButton.addEventListener("click", () => {
    alert("Redirigiendo al inicio de sesión con Google...");
    // Aquí puedes agregar la lógica de integración con Google OAuth
});

// Evento para el botón de inicio de sesión con Microsoft
microsoftButton.addEventListener("click", () => {
    alert("Redirigiendo al inicio de sesión con Microsoft...");
    // Aquí puedes agregar la lógica de integración con Microsoft OAuth
});

// Evento para el enlace de "¿Olvidaste tu contraseña?"
forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    alert("Función de recuperación de contraseña no implementada aún.");
    // Redirige a una página de recuperación si tienes una
    // window.location.href = "forgot-password.html";
});
// register
// Selección de elementos del DOM
const registerModal = document.getElementById("registerModal");
const closeBtn = document.querySelector(".close-btn");
const registerForm = document.getElementById("registerForm");

// Evento para abrir el modal de registro
registerButton.addEventListener("click", () => {
    registerModal.classList.remove("hidden"); // Mostrar el modal
});

// Evento para cerrar el modal de registro
closeBtn.addEventListener("click", () => {
    registerModal.classList.add("hidden"); // Ocultar el modal
});

// Evento para manejar el formulario de registro
registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado

    // Obtener valores del formulario
    const newUsername = registerForm.newUsername.value;
    const email = registerForm.email.value;
    const newPassword = registerForm.newPassword.value;

    // Simular registro
    alert(`Usuario registrado:\nUsuario: ${newUsername}\nCorreo: ${email}`);
    
    // Cerrar el modal
    registerModal.classList.add("hidden");

    // Opcional: Limpiar el formulario
    registerForm.reset();
});
