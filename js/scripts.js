//----------------- General para todas las paginas -----------------
document.addEventListener('DOMContentLoaded', function () {
    initializeBackToTop();
});
// Cargar los códigos generados
let arrayCodes = []; // Variable global

// Modificar initializeApp para asignar a la variable global
async function initializeApp() {
    const result = await loadProtectedCodes();

    if (result.codes.length === 0) {
        console.error('No se pudieron cargar los códigos');
        return;
    }

    arrayCodes = result.codes; // Asignar a la variable global
    return arrayCodes;
}

// Función para verificar códigos que espere a que arrayCodes esté disponible
async function verificarCodigoAcceso(codigo) {
    // Si arrayCodes aún no está cargado, esperar a que se cargue
    if (arrayCodes.length === 0) {
        await initializeApp();
    }
    return arrayCodes.includes(codigo.toUpperCase());
}

// Función para obtener un código aleatorio
async function obtenerCodigoAleatorio() {
    if (arrayCodes.length === 0) {
        await initializeApp();
    }
    const indice = Math.floor(Math.random() * arrayCodes.length);
    return arrayCodes[indice];
}

// En loadProtectedCodes(), agregar un fallback para desarrollo:
async function loadProtectedCodes() {
    // try {
    //     // Intentar cargar como módulo ES6
    //     const { getCodes } = await import('../generated/codes.js');
    //     return getCodes();

    // } catch (error) {
    //console.warn('No se pudieron cargar los códigos protegidos:', error);

    // Fallback: cargar desde JSON
    try {
        const response = await fetch('../data/codes.json');
        //console.log('response: ', response)
        return await response.json();

    } catch (jsonError) {
        console.error('Error cargando códigos:', jsonError);

        // Fallback para desarrollo: códigos de prueba
        console.warn('Usando códigos de prueba para desarrollo');

        return []
    }
    // }
}

document.addEventListener('DOMContentLoaded', initializeApp())
//-----------------------------------------------------------------
// Función para el botón "Volver arriba"
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}


// Aplicar a todos los enlaces con la clase
document.querySelectorAll('.smooth-page-transition').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.href;

        // Aplicar fade out
        document.body.classList.add('fade-out');

        // Redirigir después de 300ms
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Efecto de entrada al cargar la página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 50);
});
//----------------- End General para todas las paginas -----------------

//--------------------- Modulo 0 -----------------------------------
function wrapLabels(label, maxLength) {
    if (typeof label !== 'string' || label.length <= maxLength) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    return lines;
}

const commonTooltipCallback = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function (tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    } else {
                        return label;
                    }
                }
            }
        }
    }
};

const ataquesData = {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026(proy)'],
    datasets: [{
        label: '% de ataques al sector',
        data: [15, 19, 21, 24, 44, 50],
        backgroundColor: '#0072B2',
        borderColor: '#00446A',
        borderWidth: 2,
        fill: true,
    }]
};

const ataquesCtx = document.getElementById('ataquesChart')?.getContext('2d');
if (ataquesCtx) {
    new Chart(ataquesCtx, {
        type: 'line',
        data: ataquesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value + "%"
                        }
                    }
                }
            },
            ...commonTooltipCallback
        }
    });
}

const humanFactorData = {
    labels: ['Error Humano', 'Fallo del Sistema', 'Ataque Externo Directo'],
    datasets: [{
        label: 'Origen de Fugas de Datos',
        data: [82, 10, 8],
        backgroundColor: [
            '#D55E00',
            '#0072B2',
            '#009E73'
        ],
        hoverOffset: 4
    }]
};

const humanFactorCtx = document.getElementById('humanFactorChart')?.getContext('2d');
if (humanFactorCtx) {

    new Chart(humanFactorCtx, {
        type: 'doughnut',
        data: humanFactorData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            ...commonTooltipCallback
        }
    });
}

//----------------- Molulo 1 --------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const emailSupportIcon = document.getElementById('emailSupportIcon');

    if (emailSupportIcon) {
        emailSupportIcon.addEventListener('click', function () {
            Swal.fire({
                title: 'SOPORTE IT PRODISMO',
                html: `
                <div class="text-left text-gray-700 leading-relaxed">
                    <p class="mb-2">Para consultas relacionadas con IT y Seguridad, contacta a:</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>
                            <strong>Mail IT:</strong> <a href="mailto:itprodismo@prodismo.com" class="text-blue-600 hover:underline">itprodismo@prodismo.com</a>
                        </li>
                        <li>
                            <strong>Seguridad:</strong> <a href="mailto:eferrari@prodismo.com" class="text-blue-600 hover:underline">eferrari@prodismo.com</a>
                            <p class="text-sm text-center text-gray-400">+54 9 351 521-7958</p>
                        </li>
                        <li>
                        <strong>IT Manager:</strong> <a href="mailto:gmontalbetti@prodismo.com" class="text-blue-600 hover:underline">gmontalbetti@prodismo.com</a>
                        <p class="text-sm text-center text-gray-400">+54 9 3541 66-9837</p>
                        </li>
                        <li>
                            <strong>Help Desk (STI):</strong>
                                <a href="https://apps.powerapps.com/play/e/default-48f8f875-b75a-4037-a9d8-15d6bbd7c5f9/a/fce0c9bd-9de6-4890-b9ad-5d4f8e05b93f?tenantId=48f8f875-b75a-4037-a9d8-15d6bbd7c5f9&source=teamsopenwebsite&hint=0bdd9fd3-167c-40ea-ac48-d4e5868adbad&sourcetime=1716909981370#" class="text-blue-600 block text-center">
                                    <img src="../images/HelpDesk_logo2.png" class="mx-auto block transition-transform duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-125" title="Ir al STI">
                                </a>
                        </li>
                    </ul>
                    <p class="mt-4 text-sm text-gray-600 text-center">Estamos aquí para ayudarte a resolver cualquier duda.</p>
                </div>
            `,
                //icon: 'info', // Puedes cambiar a 'success', 'error', 'warning', 'question'
                imageUrl: "../images/ITProdimo_logo.png",
                //iconColor: '#D55E00', // Color del icono para que coincida con tu esquema
                showCloseButton: true, // Muestra el botón de cerrar (la "X")
                showConfirmButton: true, // Muestra el botón de "OK"
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#08089d', // Color del botón de confirmación
                allowOutsideClick: false, // No se puede cerrar haciendo clic fuera del modal
                customClass: {
                    popup: 'rounded-lg shadow-xl', // Clases de Tailwind para el estilo del popup
                    title: 'text-2xl font-bold text-gray-800',
                    htmlContainer: 'text-base',
                },
                width: '520px', // Ancho del modal, para que no ocupe toda la pantalla
            });
        });
    }

    const guiaPdfModuloUno = document.getElementById('guia-pdf-modulo-uno');
    if (guiaPdfModuloUno) {
        // Agregar evento de clic a la card
        guiaPdfModuloUno.addEventListener('click', function () {
            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/Instructivo_MS_Authenticator_MS_Teams_Rev00.pdf';
            link.download = 'Instructivo_MS_Authenticator_MS_Teams_Rev00.pdf';
            link.target = '_blank';

            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
//-----------------------------------------------------------

const phishingChartData = {
    labels: [
        wrapLabels('Phishing (Correo)', 16),
        wrapLabels('Vishing (Llamadas)', 16),
        wrapLabels('Smishing (SMS)', 16),
        wrapLabels('Business Email Compromise (BEC)', 16)
    ],
    datasets: [{
        label: 'Frecuencia de Ataque (%)',
        data: [55, 20, 15, 10],
        backgroundColor: '#00446A',
        borderColor: '#00446A',
        borderWidth: 1,
    }]
};

const phishingChartCtx = document.getElementById('phishingChart')?.getContext('2d');
if (phishingChartCtx) {
    new Chart(phishingChartCtx, {
        type: 'bar',
        data: phishingChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + "%";
                        }
                    }
                }
            },
            ...commonTooltipCallback
        }
    });
}

//----------------------- Mail fraudulentos o legitimos ----------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Escucha el clic en todos los botones con la clase 'check-button'.
    const btnFrauLeg = document.querySelectorAll('.check-button')
    if (btnFrauLeg) {
        btnFrauLeg.forEach(button => {
            button.addEventListener('click', (e) => {
                const isCorrect = e.target.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    Swal.fire({
                        title: '¡Correcto! 😎',
                        text: 'Perfecto, has decidido sabiamente. ¡Estás un paso más cerca de ser un experto en ciberseguridad!',
                        icon: 'success',
                        confirmButtonText: 'Genial'
                    });
                } else {
                    Swal.fire({
                        title: '¡Incorrecto! 😥',
                        text: 'Presta atención a las pistas. Los correos fraudulentos a menudo tienen errores gramaticales, links sospechosos o te piden información personal.',
                        icon: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                }
            });
        });
    }
});
//---------------------------------------------------------------

//------------------------ Modulo 3 ------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Obtener la card de política por su ID
    const policyCard = document.getElementById('policy-card');
    const examLink = document.querySelector('a[href="./Examen_modulo3.html"]');

    if (policyCard) {
        // Agregar evento de clic a la card
        policyCard.addEventListener('click', function () {
            // Verificar si ya fue descargado
            const yaDescargado = localStorage.getItem('politicaDescargada') === 'true';

            if (yaDescargado) {
                // Mostrar alerta indicando que ya fue descargado
                Swal.fire({
                    icon: 'info',
                    title: 'PDF Ya Descargado',
                    html: 'El documento <strong>MC211-IT-2 Política de Uso Aceptable</strong> ya ha sido descargado anteriormente.<br><br>Por favor, verifica en la carpeta de descargas de tu PC el archivo:<br><strong>"MC211-IT-2_Política_de_Uso_Aceptable.pdf"</strong>',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#00446A',
                    footer: 'Si necesitas otra copia, contacta al departamento de IT'
                });
                return;
            }

            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/MC211-IT-2 Política de Uso Aceptable de Recursos de Tecnologías de Info.pdf';
            link.download = 'MC211-IT-2_Politica_de_Uso_Aceptable.pdf';
            link.target = '_blank';

            // Agregar evento para detectar cuando la descarga se complete
            link.addEventListener('click', function () {
                // Marcar en localStorage que el PDF fue descargado
                localStorage.setItem('politicaDescargada', 'true');

                // Mostrar confirmación de descarga después de un breve delay
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'PDF Descargado Exitosamente',
                        html: 'El documento <strong>MC211-IT-2 Política de Uso Aceptable</strong> ha sido descargado correctamente.<br><br>El archivo se guardó como:<br><strong>"MC211-IT-2_Politica_de_Uso_Aceptable.pdf"</strong>',
                        confirmButtonText: 'Continuar',
                        confirmButtonColor: '#00446A',
                        footer: 'Ya puedes acceder al examen del módulo'
                    });
                }, 1000);
            });

            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Feedback visual
            policyCard.style.backgroundColor = '#e6f0f7';
            policyCard.style.transition = 'background-color 0.3s ease';
            setTimeout(() => {
                policyCard.style.backgroundColor = '';
            }, 1000);
        });
    }

    if (examLink) { examLink.addEventListener('click', verificarAccesoExamen); }
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtener la card de guía PDF por su ID
    const guiaPdf = document.getElementById('guia-pdf');

    if (guiaPdf) {
        // Agregar evento de clic a la card
        guiaPdf.addEventListener('click', function () {
            // Verificar si ya fue descargado
            const guiaDescargada = localStorage.getItem('guiaPhishingDescargada') === 'true';

            if (guiaDescargada) {
                // Mostrar alerta indicando que ya fue descargado
                Swal.fire({
                    icon: 'info',
                    title: 'Guía Ya Descargada',
                    html: 'La <strong>Guía de Identificación de Phishing</strong> ya ha sido descargada anteriormente.<br><br>Por favor, verifica en la carpeta de descargas de tu PC el archivo:<br><strong>"I523-IT-3_Guía de Identificación de Phishing.pdf"</strong>',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#00446A'
                });
                return;
            }

            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/I523-IT-3_Guía de Identificación de Phishing.pdf';
            link.download = 'I523-IT-3_Guía de Identificación de Phishing.pdf';
            link.target = '_blank';

            // Agregar evento para detectar cuando la descarga se complete
            link.addEventListener('click', function () {
                // Marcar en localStorage que la guía fue descargada
                localStorage.setItem('guiaPhishingDescargada', 'true');

                // Mostrar confirmación de descarga después de un breve delay
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guía Descargada Exitosamente',
                        html: 'La <strong>Guía de Identificación de Phishing</strong> ha sido descargada correctamente.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#00446A'
                    });
                }, 1000);
            });

            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Feedback visual
            guiaPdf.style.backgroundColor = '#e6f0f7';
            guiaPdf.style.transition = 'background-color 0.3s ease';
            setTimeout(() => {
                guiaPdf.style.backgroundColor = '';
            }, 1000);
        });
    }
});

// Función para verificar acceso al examen (debe estar definida)
function verificarAccesoExamen(event) {
    // Verificar si el PDF fue descargado
    const politicaDescargada = localStorage.getItem('politicaDescargada') === 'true';

    if (!politicaDescargada) {
        // Prevenir la redirección
        event.preventDefault();

        // Mostrar alerta con SweetAlert2
        Swal.fire({
            icon: 'warning',
            title: 'Descarga Requerida',
            html: 'Debes descargar primero el documento de <strong>Política de Uso Aceptable (MC211-IT-2)</strong> antes de acceder al examen.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#00446A',
            footer: 'Haz clic en la tarjeta de "Política de Uso Aceptable" para descargar el PDF',
            // ✅ Aquí va el callback
            didClose: () => {
                // Buscar el elemento
                const policyCard = document.getElementById('policy-card');

                if (policyCard) {
                    policyCard.scrollIntoView({ behavior: 'smooth', top: -150 });
                } else {
                    console.warn('⚠️ No se encontró el elemento con id="policy-card"');
                }
            }
        });
    }
    // Si está descargado, permitirá la redirección normal
}

// Función opcional para resetear las descargas (útil para testing)
function resetearDescargas() {
    localStorage.removeItem('politicaDescargada');
    localStorage.removeItem('guiaPhishingDescargada');
    Swal.fire({
        icon: 'success',
        title: 'Descargas Reseteadas',
        text: 'Ahora puedes descargar los PDFs nuevamente.',
        confirmButtonColor: '#00446A'
    });
}

// Función para verificar si puede acceder al examen
function verificarAccesoExamen(event) {
    // Verificar si el PDF fue descargado
    const politicaDescargada = localStorage.getItem('politicaDescargada') === 'true';

    if (!politicaDescargada) {
        // Prevenir la redirección
        event.preventDefault();

        // Mostrar alerta con SweetAlert2
        Swal.fire({
            icon: 'warning',
            title: 'Descarga Requerida',
            html: 'Debes descargar primero el documento de <strong>Política de Uso Aceptable (MC211-IT-2)</strong> antes de acceder al examen.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#00446A',
            footer: 'Haz clic en la tarjeta de "Política de Uso Aceptable" para descargar el PDF',
            // ✅ Aquí va el callback
            didClose: () => {
                // Buscar el elemento
                const policyCard = document.getElementById('policy-card');
                
                // Debug: revisa la consola para saber si lo encuentra
                //console.log('Elemento policy-card:', policyCard);

                if (policyCard) {
                    policyCard.scrollIntoView({ behavior: 'smooth', top: -150 });
                } else {
                    console.warn('⚠️ No se encontró el elemento con id="policy-card"');
                }
            }
        })
    }
    // Si está descargado, permitirá la redirección normal
}
//------------------------ End Modulo 3 ------------------------------

//------------------ Examen Modulo 3 ---------------------------------
// Array de usuarios válidos (convertido a minúsculas)
const arrayUsuarios = [
    "aaltamirano@prodismo.com",
    "abuenosaires@prodismo.com",
    "acordoba@prodismo.com",
    "acorvalan@prodismo.com",
    "adminrobotica@prodismo.com",
    "admpersonal@prodismo.com",
    "afranco@prodismo.com",
    "agallo@prodismo.com",
    "almacen@prodismo.com",
    "altamirano@prodismo.com",
    "amercado@prodismo.com",
    "amelonez@prodismo.com",
    "amontoya@prodismo.com",
    "amorandini@prodismo.com",
    "apedrosa@prodismo.com",
    "ariquelme@prodismo.com",
    "arodriguez@prodismo.com",
    "arosa@prodismo.com",
    "asanchez@prodismo.com",
    "asistente_compras@prodismo.com",
    "asubelza@prodismo.com",
    "avalle@prodismo.com",
    "avanoli@prodismo.com",
    "avivas@prodismo.com",
    "avucovich@prodismo.com",
    "basefacturas@prodismo.com",
    "bozvacic@prodismo.com",
    "ccatala@prodismo.com",
    "ccid@prodismo.com",
    "cjuncos@prodismo.com",
    "compras@prodismo.com",
    "comexterior@prodismo.com",
    "contable@prodismo.com",
    "croldan@prodismo.com",
    "cruiz@prodismo.com",
    "dcaviglia@prodismo.com",
    "dcontrera@prodismo.com",
    "ddiaz@prodismo.com",
    "dgonzalez@prodismo.com",
    "dmoreno@prodismo.com",
    "dpedrosa@prodismo.com",
    "dpetrone@prodismo.com",
    "dpilosio@prodismo.com",
    "dpou@prodismo.com",
    "drossetto@prodismo.com",
    "dvelez@prodismo.com",
    "dveravega@prodismo.com",
    "dzamudio@prodismo.com",
    "ecordoba@prodismo.com",
    "edomig@prodismo.com",
    "ereyna@prodismo.com",
    "esaulo@prodismo.com",
    "esanfelice@prodismo.com",
    "esola@prodismo.com",
    "facturas@prodismo.com",
    "farrese@prodismo.com",
    "fbernaola@prodismo.com",
    "fferrari@prodismo.com",
    "fforllarine@prodismo.com",
    "fgarcia@prodismo.com",
    "flehmann@prodismo.com",
    "fluciano@prodismo.com",
    "fmoreira@prodismo.com",
    "fnadal@prodismo.com",
    "fpedrosa@prodismo.com",
    "fsalazar@prodismo.com",
    "gcerda@prodismo.com",
    "gcerutti@prodismo.com",
    "gcomba@prodismo.com",
    "gestion@prodismo.com",
    "ggoglio@prodismo.com",
    "gherrera@prodismo.com",
    "gmontalbetti@prodismo.com",
    "gnani@prodismo.com",
    "guardia@prodismo.com",
    "gsavino@prodismo.com",
    "hcorral@prodismo.com",
    "hrivera@prodismo.com",
    "iarmua@prodismo.com",
    "icarballo@prodismo.com",
    "iroman@prodismo.com",
    "jano@prodismo.com",
    "jgilobert@prodismo.com",
    "jherrera@prodismo.com",
    "jmendoza@prodismo.com",
    "joliver@prodismo.com",
    "jrodriguez@prodismo.com",
    "jsolimano@prodismo.com",
    "jvillarreal@prodismo.com",
    "lbarovero@prodismo.com",
    "lbertorello@prodismo.com",
    "lbianco@prodismo.com",
    "lcastagno@prodismo.com",
    "lceliz@prodismo.com",
    "lconci@prodismo.com",
    "lfernandez@prodismo.com",
    "lluduena@prodismo.com",
    "lmartinez@prodismo.com",
    "lrodriguez@prodismo.com",
    "lvanda@prodismo.com",
    "logistica@prodismo.com",
    "mantenimiento@prodismo.com",
    "maragonez@prodismo.com",
    "marce@prodismo.com",
    "martinapedrosa@prodismo.com",
    "mcasas@prodismo.com",
    "mbecerra@prodismo.com",
    "mbonugli@prodismo.com",
    "mcabello@prodismo.com",
    "mcaceres@prodismo.com",
    "mecanizado@prodismo.com",
    "metrologia@prodismo.com",
    "metrologia-ajuste@prodismo.com",
    "metrologiabsas@prodismo.com",
    "mfioramonte@prodismo.com",
    "mferrero@prodismo.com",
    "mleiva@prodismo.com",
    "mmiserere@prodismo.com",
    "mmoreno@prodismo.com",
    "mnunez@prodismo.com",
    "molmos@prodismo.com",
    "mrecchia@prodismo.com",
    "msosa@prodismo.com",
    "mvargas@prodismo.com",
    "mvega@prodismo.com",
    "mvivas@prodismo.com",
    "mzamudio@prodismo.com",
    "naltamirano@prodismo.com",
    "nfuentes@prodismo.com",
    "nmontoya@prodismo.com",
    "nrito@prodismo.com",
    "nrusso@prodismo.com",
    "nvera@prodismo.com",
    "oaguirre@prodismo.com",
    "panol@prodismo.com",
    "principal@prodismo.com",
    "proveedores@prodismo.com",
    "proveedores2@prodismo.com",
    "rbarrea@prodismo.com",
    "rderesa@prodismo.com",
    "rhuanca@prodismo.com",
    "rramirez@prodismo.com",
    "rmiers@prodismo.com",
    "rrhh@prodismo.com",
    "rvaudagna@prodismo.com",
    "saltamira@prodismo.com",
    "saparicio@prodismo.com",
    "scandiani@prodismo.com",
    "sdominguez@prodismo.com",
    "sduchoud@prodismo.com",
    "sgonzalez@prodismo.com",
    "sjafire@prodismo.com",
    "slotockyj@prodismo.com",
    "squiroga@prodismo.com",
    "supervisormontaje@prodismo.com",
    "tecnica@prodismo.com",
    "tfernandez@prodismo.com",
    "ubrizzi@prodismo.com",
    "vbenhamubarey@prodismo.com",
    "vgauna@prodismo.com",
    "ventas@prodismo.com",
    "ventas2@prodismo.com",
    "ventas3@prodismo.com",
    "vmisano@prodismo.com",
    "vvillalba@prodismo.com",
    "xcaseres@prodismo.com",
    "zlehmann@prodismo.com"
].map(email => email.toLowerCase()).sort();

//--------- Elementos comunes ambos examenes -----------
function capitalizarTexto(texto) {
    if (!texto || typeof texto !== 'string') return '';

    return texto.trim()
        .toLowerCase()
        .split(/\s+/)
        .map(palabra => {
            if (palabra.length === 0) return '';
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join(' ');
}

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('#name, #surname, #nameFinal, #surnameFinal');

    if (inputs) {
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.value.trim() !== '') {
                    this.value = capitalizarTexto(this.value);
                }
            });
        });
    }
});
//--------- Elementos comunes ambos examenes -----------
// Array de preguntas completo (20 preguntas)
const quizData = [
    {
        question: "¿Qué acción se considera una violación grave de la política de seguridad de la empresa?",
        options: [
            { text: "Instalar software de acceso remoto no autorizado.", correct: true },
            { text: "Usar el equipo de la empresa para llamadas personales.", correct: false },
            { text: "Navegar por redes sociales durante las horas de descanso.", correct: false },
            { text: "Cargar el teléfono móvil personal con el ordenador de la empresa.", correct: false }
        ]
    },
    {
        question: "¿Cuál es la mejor práctica para proteger tu equipo de la empresa en un lugar público?",
        options: [
            { text: "Dejarlo desbloqueado para un acceso rápido.", correct: false },
            { text: "Conectarse a una red Wi-Fi pública sin contraseña.", correct: false },
            { text: "Utilizar siempre una VPN para cifrar la conexión.", correct: true },
            { text: "Compartirlo con colegas para optimizar el trabajo.", correct: false }
        ]
    },
    {
        question: "Si recibes un correo electrónico que solicita tu contraseña de la empresa, ¿cuál es el curso de acción correcto?",
        options: [
            { text: "Responder al remitente y solicitar más información.", correct: false },
            { text: "Eliminar el correo inmediatamente sin abrirlo.", correct: false },
            { text: "Reportar el correo al departamento de IT y no interactuar con él.", correct: true },
            { text: "Hacer clic en el enlace para ver si el sitio es legítimo.", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de datos se considera confidencial y debe manejarse con cuidado?",
        options: [
            { text: "Listas de precios de productos.", correct: false },
            { text: "Información financiera de la empresa y datos de clientes.", correct: true },
            { text: "Manuales de uso de software.", correct: false },
            { text: "Horarios de reuniones de equipo.", correct: false }
        ]
    },
    {
        question: "El uso de software ilegal o sin licencia en un equipo de la empresa puede llevar a:",
        options: [
            { text: "Una mejor productividad.", correct: false },
            { text: "Sanciones legales y brechas de seguridad.", correct: true },
            { text: "Mayor velocidad de procesamiento.", correct: false },
            { text: "Reducción de costos para la empresa.", correct: false }
        ]
    },
    {
        question: "¿Por qué es importante mantener los sistemas operativos y el software actualizados?",
        options: [
            { text: "Para mejorar la estética de la interfaz de usuario.", correct: false },
            { text: "Para evitar la instalación de nuevo hardware.", correct: false },
            { text: "Para corregir vulnerabilidades de seguridad conocidas.", correct: true },
            { text: "Para consumir más ancho de banda de la red.", correct: false }
        ]
    },
    {
        question: "Si tu equipo de la empresa es robado, ¿qué debes hacer primero?",
        options: [
            { text: "Publicar en redes sociales para pedir ayuda.", correct: false },
            { text: "Esperar a que alguien lo encuentre y lo devuelva.", correct: false },
            { text: "Notificar inmediatamente al departamento de IT y a tu supervisor.", correct: true },
            { text: "Comprar un equipo de reemplazo por tu cuenta.", correct: false }
        ]
    },
    {
        question: "¿Cuál es una buena práctica para crear una contraseña segura para los sistemas de la empresa?",
        options: [
            { text: "Usar tu fecha de nacimiento o un nombre de familiar.", correct: false },
            { text: "Utilizar la misma contraseña para todas tus cuentas.", correct: false },
            { text: "Crear una contraseña larga que combine letras, números y símbolos.", correct: true },
            { text: "Escribir la contraseña en una nota y pegarla en tu escritorio.", correct: false }
        ]
    },
    {
        question: "¿Qué significa el término 'phishing'?",
        options: [
            { text: "Un tipo de virus informático.", correct: false },
            { text: "El uso de redes sociales en el trabajo.", correct: false },
            { text: "Un intento de fraude para obtener datos confidenciales.", correct: true },
            { text: "Un ataque de denegación de servicio.", correct: false }
        ]
    },
    {
        question: "Si necesitas compartir un archivo confidencial con un colega, ¿cuál es el método más seguro?",
        options: [
            { text: "Enviarlo por correo electrónico sin cifrado.", correct: false },
            { text: "Usar un servicio de almacenamiento en la nube no aprobado por la empresa.", correct: false },
            { text: "Compartirlo a través de una plataforma de colaboración de la empresa aprobada.", correct: true },
            { text: "Guardarlo en una memoria USB y entregarlo personalmente.", correct: false }
        ]
    },
    {
        question: "¿Qué debe hacer un empleado si sospecha que ha sido víctima de un ataque de phishing?",
        options: [
            { text: "Cambiar inmediatamente todas sus contraseñas y reportar al departamento de IT.", correct: true },
            { text: "Ignorarlo si no ha proporcionado información sensible.", correct: false },
            { text: "Reenviar el correo a colegas para advertirles.", correct: false },
            { text: "Eliminar el correo y continuar con el trabajo normal.", correct: false }
        ]
    },
    {
        question: "¿Cuál es el propósito principal de una política de uso aceptable?",
        options: [
            { text: "Limitar el acceso a internet de los empleados.", correct: false },
            { text: "Establecer reglas claras para el uso seguro de los recursos tecnológicos.", correct: true },
            { text: "Controlar el tiempo que los empleados pasan en redes sociales.", correct: false },
            { text: "Restringir el uso de dispositivos personales en la empresa.", correct: false }
        ]
    },
    {
        question: "¿Qué característica define a una contraseña segura?",
        options: [
            { text: "Ser fácil de recordar para el usuario.", correct: false },
            { text: "Contener al menos 12 caracteres con mayúsculas, minúsculas, números y símbolos.", correct: true },
            { text: "Incluir el nombre de la empresa.", correct: false },
            { text: "Ser la misma para todas las cuentas del usuario.", correct: false }
        ]
    },
    {
        question: "¿Qué debe hacer un empleado antes de conectar un dispositivo USB personal a su equipo de trabajo?",
        options: [
            { text: "Conectarlo directamente si es de confianza.", correct: false },
            { text: "Escanearlo con software antivirus y obtener autorización.", correct: true },
            { text: "Usarlo solo si es necesario urgentemente.", correct: false },
            { text: "Compartir los archivos con colegas inmediatamente.", correct: false }
        ]
    },
    {
        question: "¿Qué es la autenticación multifactor (MFA)?",
        options: [
            { text: "Tener dos contraseñas diferentes para la misma cuenta.", correct: false },
            { text: "Un método de verificación que combina algo que sabes con algo que tienes.", correct: true },
            { text: "Usar la misma contraseña en dos dispositivos diferentes.", correct: false },
            { text: "Un sistema que requiere dos usuarios para acceder a un archivo.", correct: false }
        ]
    },
    {
        question: "¿Cuándo es apropiado usar el correo electrónico corporativo para fines personales?",
        options: [
            { text: "Siempre que sea necesario.", correct: false },
            { text: "Nunca, debe usarse exclusivamente para trabajo.", correct: true },
            { text: "Solo para asuntos personales urgentes.", correct: false },
            { text: "Cuando no haya supervisores cerca.", correct: false }
        ]
    },
    {
        question: "¿Qué debe hacerse con los equipos antiguos que ya no se usan?",
        options: [
            { text: "Desecharlos en la basura normal.", correct: false },
            { text: "Entregarlos al departamento de IT para eliminación segura.", correct: true },
            { text: "Donarlos sin borrar la información.", correct: false },
            { text: "Venderlos para recuperar parte de la inversión.", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de información sobre la empresa está prohibido compartir en redes sociales?",
        options: [
            { text: "Solo información financiera confidencial.", correct: false },
            { text: "Cualquier información sensible o no pública que no haya sido autorizada para divulgación.", correct: true },
            { text: "Información sobre eventos sociales de la empresa.", correct: false },
            { text: "Fotos del espacio físico de la oficina.", correct: false }
        ]
    },
    {
        question: "¿Cómo debes manejar tu identidad en redes sociales en relación con la empresa?",
        options: [
            { text: "Usar el nombre y logo de la empresa en tu perfil personal para darle más credibilidad.", correct: false },
            { text: "Mencionar que trabajas en la empresa pero sin usar su nombre ni logo sin autorización.", correct: true },
            { text: "Crear un perfil profesional usando exclusivamente el nombre de la empresa.", correct: false },
            { text: "No mencionar en absoluto tu vinculación con la empresa.", correct: false }
        ]
    },
    {
        question: "Si recibes una solicitud de conexión de alguien que afirma ser ejecutivo de la empresa, ¿qué debes hacer?",
        options: [
            { text: "Aceptar inmediatamente para expandir tu red profesional.", correct: false },
            { text: "Verificar su identidad a través de canales oficiales antes de aceptar.", correct: true },
            { text: "Preguntarle directamente por qué quiere conectarse contigo.", correct: false },
            { text: "Ignorar todas las solicitudes de personas que mencionen la empresa.", correct: false }
        ]
    },
    {
        question: "¿Cuál es el comportamiento profesional esperado al interactuar en redes sociales?",
        options: [
            { text: "Ser informal y cercano para mostrar tu personalidad auténtica.", correct: false },
            { text: "Expresar libremente tus opiniones políticas y religiosas.", correct: false },
            { text: "Mantener un tono respetuoso y evitar controversias que puedan asociarse con la empresa.", correct: true },
            { text: "Compartir memes y contenido humorístico sobre la vida corporativa.", correct: false }
        ]
    },
    {
        question: "¿Qué precaución debes tomar al publicar sobre tus actividades laborales?",
        options: [
            { text: "Evitar mencionar proyectos específicos en los que estés trabajando.", correct: true },
            { text: "Solo publicar después de que el proyecto haya finalizado exitosamente.", correct: false },
            { text: "Usar lenguaje técnico detallado para demostrar tu expertise.", correct: false },
            { text: "Publicar únicamente durante horario laboral.", correct: false }
        ]
    },
    {
        question: "Si encuentras comentarios negativos sobre la empresa en redes sociales, ¿cuál es la acción correcta?",
        options: [
            { text: "Responder defendiendo agresivamente a la empresa.", correct: false },
            { text: "Reportar los comentarios a tu supervisor o al departamento de comunicación corporativa.", correct: true },
            { text: "Ignorarlos completamente ya que no son tu responsabilidad.", correct: false },
            { text: "Compartir los comentarios con colegas para que estén informados.", correct: false }
        ]
    },
    {
        question: "¿Dónde debes almacenar los diseños CAD y documentos confidenciales de la empresa?",
        options: [
            { text: "En el escritorio de tu computadora para acceso rápido.", correct: false },
            { text: "En servicios de almacenamiento en la nube personales como Google Drive o Dropbox.", correct: false },
            { text: "En la carpeta de red designada que es segura, respaldada y auditable.", correct: true },
            { text: "En una memoria USB para transportarlos fácilmente.", correct: false }
        ]
    },
    {
        question: "¿Por qué es riesgoso guardar archivos confidenciales en el escritorio o dispositivos USB personales?",
        options: [
            { text: "Porque ocupan mucho espacio de almacenamiento.", correct: false },
            { text: "Porque no se pueden organizar adecuadamente.", correct: false },
            { text: "Por el riesgo de pérdida, robo o fuga de información confidencial.", correct: true },
            { text: "Porque se desorganizan más fácilmente.", correct: false }
        ]
    },
    {
        question: "¿Qué ventaja tiene almacenar documentos en la red corporativa versus almacenamiento local?",
        options: [
            { text: "La red corporativa tiene respaldos automáticos y controles de seguridad.", correct: true },
            { text: "Los archivos se abren más rápido en la red corporativa.", correct: false },
            { text: "La red corporativa permite editar documentos simultáneamente sin restricciones.", correct: false },
            { text: "La red corporativa tiene capacidad ilimitada de almacenamiento.", correct: false }
        ]
    },
    {
        question: "Si necesitas trabajar con información confidencial desde casa, ¿cuál es el procedimiento correcto?",
        options: [
            { text: "Enviar los archivos por correo personal para acceder desde cualquier computadora.", correct: false },
            { text: "Guardar los archivos en un USB y llevarlos a casa.", correct: false },
            { text: "Conectarse mediante VPN autorizada y acceder a los archivos través de la red segura de la empresa.", correct: true },
            { text: "Tomar fotos de pantalla con el teléfono para revisar la información.", correct: false }
        ]
    }
];

// Variables globales para el examen Modulo 3
const personalForm = document.getElementById('personal-form');
const quizContent = document.getElementById('quiz-content');
const resultsContainer = document.getElementById('results-container');
const questionText = document.getElementById('question-text');
const currentQuestion = document.getElementById('current-question');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const showResultsBtn = document.getElementById('showResultsBtn');
const scoreDisplay = document.getElementById('score-display');
const finalName = document.getElementById('final-name');
const percentageDisplay = document.getElementById('percentage-display');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const btnSubmitForm = document.getElementById('btnSubmitForm');
const contenedorBtnContinuar = document.getElementById('contenedor-btn-continuar');
const continuarModulo4 = document.getElementById('continuar-modulo4');

let currentQuestionIndex = 0;
let userAnswers = {};
let isFormSubmitted = false;
let finalScore = 0;
let preguntasSeleccionadas = []; // Array para guardar las preguntas seleccionadas aleatoriamente

// Función para validar el email corporativo
function validarEmailCorporativo(email) {
    let emailLower = ''
    if (email) {
        emailLower = email.toLowerCase().trim()
    }

    if (!emailLower.endsWith('@prodismo.com')) {
        return {
            valido: false,
            mensaje: 'El email debe tener el dominio @prodismo.com'
        };
    }

    if (!arrayUsuarios.includes(emailLower)) {
        return {
            valido: false,
            mensaje: 'El email corporativo no está autorizado para realizar el examen'
        };
    }

    return {
        valido: true,
        mensaje: 'Email válido'
    };
}

// Función para validar todo el formulario
function validarFormularioCompleto() {
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const employeeId = document.getElementById('employeeId').value.trim();
    const corporateEmail = document.getElementById('corporateEmail').value.trim();

    if (!name || !surname || !employeeId || !corporateEmail) {
        return {
            valido: false,
            mensaje: 'Todos los campos son obligatorios'
        };
    }

    const validacionEmail = validarEmailCorporativo(corporateEmail)
    if (!validacionEmail.valido) {
        return validacionEmail;
    }

    if (isNaN(employeeId) || employeeId <= 0) {
        return {
            valido: false,
            mensaje: 'El número de legajo debe ser un número válido'
        };
    }

    return {
        valido: true,
        mensaje: 'Formulario válido'
    };
}

// Función para seleccionar 10 preguntas aleatorias del total de 20
function seleccionarPreguntasAleatorias() {
    const preguntasAleatorias = [...quizData];

    // Mezclar el array usando el algoritmo Fisher-Yates
    for (let i = preguntasAleatorias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasAleatorias[i], preguntasAleatorias[j]] = [preguntasAleatorias[j], preguntasAleatorias[i]];
    }

    // Tomar solo las primeras 10 preguntas
    return preguntasAleatorias.slice(0, 10);
}

// Función para mezclar las opciones de respuesta de cada pregunta
function mezclarOpciones(pregunta) {
    const opcionesMezcladas = [...pregunta.options];

    for (let i = opcionesMezcladas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesMezcladas[i], opcionesMezcladas[j]] = [opcionesMezcladas[j], opcionesMezcladas[i]];
    }

    return {
        ...pregunta,
        options: opcionesMezcladas
    };
}

// Función para iniciar el cuestionario
function iniciarCuestionario() {
    const validacion = validarFormularioCompleto();

    if (validacion.valido) {
        isFormSubmitted = true;

        // 1. Seleccionar las 10 preguntas aleatorias al inicio (solo una vez)
        const preguntasAleatorias = seleccionarPreguntasAleatorias();
        preguntasSeleccionadas = preguntasAleatorias.map(pregunta => mezclarOpciones(pregunta));

        personalForm.classList.add('hidden');
        quizContent.classList.remove('hidden');
        document.getElementById('final-name').textContent = document.getElementById('name').value + ' ' + document.getElementById('surname').value;

        // 2. Iniciar la barra de progreso
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = '0%';

        // Actualizar contador de preguntas
        document.getElementById('total-questions').textContent = preguntasSeleccionadas.length;

        renderQuestion();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error en el formulario',
            text: validacion.mensaje,
            confirmButtonText: 'Corregir',
            confirmButtonColor: '#00446A'
        });
    }
}

// Modificar el evento submit del formulario
if (personalForm) {
    personalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        iniciarCuestionario();
    });
}

// Agregar evento al botón específico
if (btnSubmitForm) {
    btnSubmitForm.addEventListener('click', function (e) {
        e.preventDefault();
        iniciarCuestionario();
    });
}

// Validación en tiempo real para el email
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('corporateEmail');
    const btnSubmitForm = document.getElementById('btnSubmitForm');

    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const email = this.value;
            if (email) {
                const validacion = validarEmailCorporativo(email);

                if (!validacion.valido) {
                    this.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                    let errorSpan = this.parentNode.querySelector('.email-error');
                    if (!errorSpan) {
                        errorSpan = document.createElement('span');
                        errorSpan.className = 'email-error text-red-500 text-xs mt-1';
                        this.parentNode.appendChild(errorSpan);
                    }
                    errorSpan.textContent = validacion.mensaje;

                    if (btnSubmitForm) {
                        btnSubmitForm.disabled = true;
                        btnSubmitForm.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                } else {
                    this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                    this.classList.add('border-green-500', 'ring-2', 'ring-green-200');
                    const errorSpan = this.parentNode.querySelector('.email-error');
                    if (errorSpan) {
                        errorSpan.remove();
                    }

                    if (btnSubmitForm) {
                        btnSubmitForm.disabled = false;
                        btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                }
            }
        });

        emailInput.addEventListener('input', function () {
            this.classList.remove('border-red-500', 'border-green-500', 'ring-2', 'ring-red-200', 'ring-green-200');
            const errorSpan = this.parentNode.querySelector('.email-error');
            if (errorSpan) {
                errorSpan.remove();
            }

            if (btnSubmitForm) {
                btnSubmitForm.disabled = false;
                btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    const campos = ['name', 'surname', 'employeeId'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo && btnSubmitForm) {
            campo.addEventListener('input', function () {
                const validacion = validarFormularioCompleto();
                btnSubmitForm.disabled = !validacion.valido;
                if (validacion.valido) {
                    btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    btnSubmitForm.classList.add('opacity-50', 'cursor-not-allowed');
                }
            });
        }
    });
});

function renderQuestion() {
    // Usar las preguntas ya seleccionadas al inicio (no volver a seleccionar)
    const question = preguntasSeleccionadas[currentQuestionIndex];
    questionText.textContent = `Pregunta ${currentQuestionIndex + 1}/${preguntasSeleccionadas.length}: ${question.question}`;
    optionsContainer.innerHTML = '';
    currentQuestion.textContent = `${currentQuestionIndex + 1}`

    // Actualizar barra de progreso
    const progressPercentage = ((currentQuestionIndex) / preguntasSeleccionadas.length) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`;

    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item', 'p-3', 'border', 'rounded', 'mb-2', 'cursor-pointer', 'hover:bg-gray-100');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `question-${currentQuestionIndex}`;
        radioInput.value = index;
        radioInput.id = `q${currentQuestionIndex}-opt${index}`;
        radioInput.classList.add('mr-2', 'cursor-pointer');

        // 2. Deshabilitar la opción si ya se respondió esta pregunta
        if (userAnswers[currentQuestionIndex] !== undefined) {
            radioInput.disabled = true;
            optionItem.classList.add('disabled-option');
        }

        const label = document.createElement('label');
        label.htmlFor = `q${currentQuestionIndex}-opt${index}`;
        label.textContent = option.text;
        label.classList.add('cursor-pointer', 'flex-1');

        optionItem.appendChild(radioInput);
        optionItem.appendChild(label);
        optionsContainer.appendChild(optionItem);

        if (userAnswers[currentQuestionIndex] !== undefined && userAnswers[currentQuestionIndex] == index) {
            radioInput.checked = true;
            optionItem.classList.add('bg-blue-100', 'border-blue-300');
        }

        // 2. Solo permitir clic si la pregunta no ha sido respondida
        if (userAnswers[currentQuestionIndex] === undefined) {
            optionItem.addEventListener('click', () => {
                handleAnswer(index);
            });
        }
    });

    updateNavigationButtons();
}

function handleAnswer(selectedIndex) {
    if (userAnswers[currentQuestionIndex] === undefined) {
        userAnswers[currentQuestionIndex] = selectedIndex;

        const options = optionsContainer.querySelectorAll('.option-item');
        options.forEach(option => {
            option.classList.remove('bg-blue-100', 'border-blue-300');
            option.classList.add('disabled-option');

            // Deshabilitar todos los inputs de radio
            const radioInput = option.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.disabled = true;
            }

            // Remover event listeners para prevenir más clics
            option.replaceWith(option.cloneNode(true));
        });

        // Avanzar progreso inmediatamente
        advanceProgress();

        options[selectedIndex].classList.add('bg-blue-100', 'border-blue-300');
    }

    verificarCompletitud();
}

function verificarCompletitud() {
    // 3. Verificar si todas las 10 preguntas tienen respuesta
    const todasRespondidas = Object.keys(userAnswers).length === preguntasSeleccionadas.length;

    if (todasRespondidas && currentQuestionIndex === preguntasSeleccionadas.length - 1) {
        showResultsBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    } else {
        showResultsBtn.classList.add('hidden');
    }
}

function updateNavigationButtons() {
    if (currentQuestionIndex === 0) {
        prevBtn.style.display = 'none';
        nextBtn.classList.remove('hidden');

    } else {
        prevBtn.style.display = 'inline-block';
        nextBtn.classList.remove('hidden');
    }

    if (currentQuestionIndex === preguntasSeleccionadas.length - 1) {
        nextBtn.style.display = 'none';
        // Solo mostrar botón de resultados si todas están respondidas
        if (Object.keys(userAnswers).length === preguntasSeleccionadas.length) {
            showResultsBtn.classList.remove('hidden');
        }

    } else {
        nextBtn.style.display = 'inline-block';
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = 'Siguiente';
        showResultsBtn.classList.add('hidden');
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < preguntasSeleccionadas.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
        }
    });
}

// Función compacta para aumentar el progreso
function advanceProgress() {
    const progressFill = document.getElementById('progress-fill');
    let currentWidth = parseInt(progressFill.style.width) || 0;
    let newWidth = currentWidth + 10;

    // No superar el 100%
    if (newWidth > 100) newWidth = 100;

    progressFill.style.width = newWidth + '%';
}

if (showResultsBtn) {
    showResultsBtn.addEventListener('click', () => {
        showResults();
    });
}

// Función para reiniciar el examen completamente conservando los datos del formulario
function restartExam() {
    // 1. Guardar los valores actuales del formulario
    const nameValue = document.getElementById('name').value;
    const surnameValue = document.getElementById('surname').value;
    const employeeIdValue = document.getElementById('employeeId').value;
    const corporateEmailValue = document.getElementById('corporateEmail').value;

    // 2. Ocultar resultados y mostrar formulario inicial
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('personal-form').classList.remove('hidden');

    // 3. Reiniciar la barra de progreso
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = '0%';

    // 4. Limpiar las respuestas seleccionadas (si las hay)
    let selectedOptions = document.querySelectorAll('.option-item.selected');
    selectedOptions.forEach(option => {
        option.classList.remove('selected');
    });

    // 5. Reiniciar variables del examen
    currentQuestionIndex = 0;
    userAnswers = {};
    finalScore = 0;
    preguntasSeleccionadas = [];
    isFormSubmitted = false;

    // 6. Restaurar los valores del formulario
    document.getElementById('name').value = nameValue;
    document.getElementById('surname').value = surnameValue;
    document.getElementById('employeeId').value = employeeIdValue;
    document.getElementById('corporateEmail').value = corporateEmailValue;

    // 7. Reiniciar estado de botones
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    showResultsBtn.classList.add('hidden');

    // 8. Habilitar el botón de comenzar examen si está deshabilitado
    if (btnSubmitForm) {
        btnSubmitForm.disabled = false;
        btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // 9. Limpiar cualquier mensaje de error del email
    const emailInput = document.getElementById('corporateEmail');
    emailInput.classList.remove('border-red-500', 'border-green-500', 'ring-2', 'ring-red-200', 'ring-green-200');
    const errorSpan = emailInput.parentNode.querySelector('.email-error');
    if (errorSpan) { errorSpan.remove(); }

    // 10. Limpiar el contenido de las preguntas y opciones
    questionText.textContent = '';
    optionsContainer.innerHTML = '';

    // 11. Reiniciar el puntaje y variables del examen
    if (typeof currentQuestionIndexFinal !== 'undefined') { currentQuestionIndexFinal = 0; }
    if (typeof userAnswers !== 'undefined') { userAnswers = []; }

    if (contenedorBtnContinuar) { contenedorBtnContinuar.classList.add('hidden') }
    if (continuarModulo4) {
        continuarModulo4.classList.add('hidden')
        continuarModulo4.setAttribute('disabled', true)
    }

    // 12. Scroll hacia arriba para mejor experiencia de usuario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función con confirmación antes de reiniciar (sin cambios)
function restartExamWithConfirmation() {
    Swal.fire({
        title: '¿Reiniciar examen?',
        text: "Perderás todas tus respuestas actuales, pero se conservarán tus datos personales",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00446A',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            restartExam();
            Swal.fire({
                title: 'Reiniciado',
                text: 'El examen ha sido reiniciado. Tus datos personales se han conservado.',
                icon: 'success',
                timer: 1200,
                showConfirmButton: false
            });
        }
    });
}

// Asignar el evento al botón de reinicio
const restartBtn = document.getElementById('restart-btn');
if (restartBtn) {
    restartBtn.addEventListener('click', restartExamWithConfirmation);
}

// Mostrar resultados Modulo 3
function showResults() {
    finalScore = 0;
    preguntasSeleccionadas.forEach((question, index) => {
        if (userAnswers[index] !== undefined && question.options[userAnswers[index]].correct) {
            finalScore++;
        }
    });

    const percentage = (finalScore / preguntasSeleccionadas.length) * 100;

    quizContent.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreDisplay.textContent = `${finalScore}/${preguntasSeleccionadas.length}`;
    percentageDisplay.textContent = `Porcentaje de acierto: ${percentage.toFixed(1)}%`;

    if (contenedorBtnContinuar && finalScore >= 8) {
        contenedorBtnContinuar.classList.remove('hidden');
    }
}

// Descarga de archivo pdf Modulo 3
if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const restartExamBtn = document.getElementById('restart-btn')
        restartExamBtn.setAttribute('disabled', true)

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const employeeId = document.getElementById('employeeId').value;
        const email = document.getElementById('corporateEmail').value;
        const score = finalScore;
        const totalQuestions = parseInt(preguntasSeleccionadas.length);
        const percentage = (score / totalQuestions) * 100;
        const now = new Date();
        const passed = percentage >= 80;

        if (passed) {
            const restartExamBtn = document.getElementById('restart-btn')
            restartExamBtn.setAttribute('disabled', true)
            continuarModulo4.classList.remove('hidden');
            continuarModulo4.removeAttribute('disabled');
            continuarModulo4.addEventListener('click', mostrarModalVerificacion);
        }

        const iconOk = "data:image/png;base64,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"
        const iconNoOk = "data:image/png;base64,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"
        const icon = passed ? iconOk : iconNoOk

        // function numeroAleatorio() { return Math.floor(Math.random() * 50); }
        // const aprovalCode = arrayCodes[numeroAleatorio()]
        const aprovalCode = await obtenerCodigoAleatorio();


        // Usamos un logo de marcador de posición y un texto de encabezado
        const logoBase64 = "data:image/png;base64,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";

        const localDate = now.toLocaleDateString();
        const localTime = now.toLocaleTimeString('es-ES', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        // Header
        doc.addImage(logoBase64, "PNG", 10, 10, 48, 12);
        doc.setFontSize(14);
        doc.text("Informe de Evaluación Modulo 3", 110, 20, { align: 'center' });
        doc.line(10, 25, 200, 25); // Línea debajo del encabezado
        doc.setFontSize(14);
        doc.text("Uso Responsable de Equipos y Softwares", 110, 35, { align: 'center' });

        // Datos del Usuario
        doc.setFontSize(14);
        doc.text("Datos del Usuario", 10, 45);
        doc.setFontSize(12);
        doc.text(`Nombre: ${name} ${surname}`, 15, 55);
        doc.text(`Número de Legajo: ${employeeId}`, 15, 65);
        doc.text(`Email: ${email}`, 15, 75);
        doc.text(`Fecha y Hora: ${localDate} ${localTime}`, 15, 85);

        // Resultados
        doc.text("Resultados:", 10, 100);
        doc.setFontSize(14);
        doc.text(`Puntaje: ${score}/${totalQuestions}`, 15, 110);
        doc.text(`Porcentaje de acierto: ${percentage.toFixed(0)}%`, 15, 120);
        doc.text(passed ? `Código: ${aprovalCode}` : " ", 15, 130);

        // Mensaje e icono de resultado
        doc.setFontSize(16);
        doc.addImage(icon, "PNG", 12, 162, 10, 10);
        doc.text(passed ? "¡Felicidades, has aprobado el examen!" : "Revisa los conceptos para volver a intentarlo.", 26, 170);
        doc.setFontSize(12);
        doc.text(passed ? `Puedes continuar con el Modulo 4: Accesos Remotos Seguros, ingresando el código: ${aprovalCode} ` : " ", 18, 180);
        doc.text(passed ? `Envía este archivo pdf a itprodismo@prodismo.com con el asunto:` : " ", 18, 190);
        doc.text(passed ? `Examen Modulo 3 Capacitacion Seguridad 2026` : " ", 18, 200);
        doc.text(passed ? `Muchas gracias!` : " ", 18, 210);

        doc.text(`Equipo de IT`, 140, 220);
        doc.addImage(logoBase64, "PNG", 140, 222, 24, 8);

        doc.setFontSize(10);
        doc.text("No es necesario imprimir este certificado", 100, 276, { align: 'center' });

        doc.line(10, 280, 200, 280); // Línea arriba del footer
        doc.setFontSize(10);
        doc.text("F314-IT-C-1", 12, 285);

        doc.save(`Resultado_Examen_Modulo3_${employeeId}_${name}-${surname}_${localDate.replace('/', '_')}.pdf`);
    });
}

// Función para mostrar el modal de código de acceso
function mostrarModalCodigoAcceso() {
    Swal.fire({
        title: 'Ingresa tu Código de Acceso',
        html: `
            <div class="text-center">
                <p class="mb-4 text-gray-600">Por favor, ingresa el código que recibiste al aprobar el examen del Módulo 3.</p>
                <input type="text" id="codigo-acceso-input" placeholder="Ej: K8D9M" class="swal2-input text-center uppercase font-mono" maxlength="5"
                    style="letter-spacing: 2px; font-size: 1.2rem;">
                <p class="text-sm text-gray-500 mt-2">El código debe tener exactamente 5 caracteres (letras y números)</p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Verificar Código',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        focusConfirm: false,
        preConfirm: () => {
            const codigoInput = document.getElementById('codigo-acceso-input');
            const codigo = codigoInput ? codigoInput.value.trim().toUpperCase() : '';

            if (!codigo) {
                Swal.showValidationMessage('Por favor, ingresa un código');
                return false;
            }

            if (codigo.length !== 5) {
                Swal.showValidationMessage('El código debe tener exactamente 5 caracteres');
                return false;
            }

            if (!arrayCodes.includes(codigo)) {
                Swal.showValidationMessage('Código incorrecto. Verifica e intenta nuevamente.');
                return false;
            }

            return codigo;
        }

    }).then((result) => {
        if (result.isConfirmed) {
            const codigo = result.value;

            // Guardar el código en localStorage para uso futuro
            localStorage.setItem('examen_aprobado', 'true');
            localStorage.setItem('codigo_acceso', codigo);
            localStorage.setItem('fecha_aprobacion', new Date().toISOString());

            // Mostrar confirmación y redirigir
            Swal.fire({
                icon: 'success',
                title: '¡Código Verificado!',
                text: 'Acceso concedido al Módulo 4.',
                confirmButtonText: 'Ir al Módulo 4',
                confirmButtonColor: '#10b981',
                timer: 5000,
                timerProgressBar: true

            }).then(() => {
                // Redirigir al módulo 4
                window.location.href = './Modulo4_Escritorio_Remoto_AnyDesk_VPN_Accesos_Seguros.html';
            });
        }
    });

    // Configurar el input después de que se muestre el modal
    setTimeout(() => {
        const codigoInput = document.getElementById('codigo-acceso-input');
        if (codigoInput) {
            codigoInput.focus();

            // Auto-convertir a mayúsculas y limitar caracteres
            codigoInput.addEventListener('input', function () {
                this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 5);
            });

            // Permitir enviar con Enter
            codigoInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const confirmButton = document.querySelector('.swal2-confirm');
                    if (confirmButton) confirmButton.click();
                }
            });
        }
    }, 100);
}

// Función para verificar si ya se aprobó el examen anteriormente
function verificarAprobacionPrevia() {
    return localStorage.getItem('examen_aprobado') === 'true';
}

// Agregar evento al botón "Ya aprobado"
document.addEventListener('DOMContentLoaded', function () {
    const btnYaAprobado = document.getElementById('btnYaAprobado');

    if (btnYaAprobado) {
        btnYaAprobado.addEventListener('click', function (e) {
            e.preventDefault();
            mostrarModalCodigoAcceso();
        });

        // Verificar si ya está aprobado y mostrar información
        if (verificarAprobacionPrevia()) {
            const codigoGuardado = localStorage.getItem('codigo_acceso');
            const fechaAprobacion = localStorage.getItem('fecha_aprobacion');

            // Agregar badge informativo al botón
            btnYaAprobado.innerHTML += `
                <span class="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <i class="fas fa-check mr-1"></i>Ya aprobado
                </span>
            `;

            // Tooltip con información
            btnYaAprobado.title = `Examen aprobado el ${new Date(fechaAprobacion).toLocaleDateString()}. Código: ${codigoGuardado}`;
        }
    }
});
//------------------ End Examen Modulo 3 ---------------------------------

//---------------------- Modulo 4 -------------------------------
// Función para mostrar el modal de verificación
function mostrarModalVerificacion() {
    // Crear el overlay/modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'codigo-verification-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw; /* Usar viewport width */
        height: 100vh; /* Usar viewport height */
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
        overflow: hidden; /* Elimina scroll */
        margin: 0;
        padding: 0;
    `;
    // Crear el contenido del modal
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 700px;
        width: 90%;
        max-width: 90vw; /* Limitar al 90% del viewport */
        text-align: center;
        overflow: hidden;
        box-sizing: border-box;
        margin: 1rem; /* Margen de seguridad */
        max-height: 90vh; /* Limitar altura */
        overflow-y: auto; /* Permitir solo scroll vertical si es necesario */
    `;

    modalContent.innerHTML = `
        <div class="mb-6">
            <div class="text-6xl mb-4">🔒</div>
            <h2 class="text-2xl font-bold text-[#00446A] mb-2">Verificación Requerida</h2>
            <p class="text-gray-600 mb-4">Para acceder al Módulo 4, ingresa el código de verificación que recibiste al completar el examen del Módulo 3.</p>
        </div>
        
        <div class="mb-6">
            <label id="label-codigo-input" for="codigo-input" class="block text-sm font-medium text-gray-700 mb-2">Código de Verificación</label>
            <input type="text" id="codigo-input" placeholder="Ej: K8D9M" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono uppercase"
                maxlength="5" style="letter-spacing: 2px;">
            <p id="error-message" class="text-red-500 text-sm mt-2 hidden">Código incorrecto. Por favor, intenta nuevamente.</p>
        </div>
        
        <button id="btn-verificar" class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Verificar Código
        </button>
        
        <div class="mt-4 text-sm text-gray-500">
            <p>¿No tienes un código? Debes completar el examen del Módulo 3 primero.</p>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Ocultar el contenido principal de la página
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    if (main) { main.style.display = 'none' };
    if (footer) { footer.style.display = 'none' };

    // Agregar funcionalidad al input y botón
    const codigoInput = document.getElementById('codigo-input');
    const btnVerificar = document.getElementById('btn-verificar');
    const errorMessage = document.getElementById('error-message');

    // Función para auto-convertir a mayúsculas y limitar a 5 caracteres
    codigoInput.addEventListener('input', function () {
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 5);
    });

    // Función de verificación
    function verificarCodigo() {
        const codigo = codigoInput.value.trim();

        if (!codigo) {
            errorMessage.textContent = 'Por favor, ingresa un código.';
            errorMessage.classList.remove('hidden');
            codigoInput.focus();
            return;
        }

        // console.log('1788-codigo: ', codigo)

        if (verificarCodigoAcceso(codigo)) {
            // Código correcto - guardar en localStorage y mostrar contenido
            localStorage.setItem('modulo4_verificado', 'true');
            localStorage.setItem('codigo_usado', codigo);

            // Ocultar modal y mostrar contenido después de un breve delay
            modalOverlay.remove();

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Código Verificado!',
                text: 'Acceso concedido al Módulo 4.',
                confirmButtonText: 'Ir al Módulo 4',
                confirmButtonColor: '#00446A',
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar: true

            }).then(() => {
                // Redirigir al módulo 4
                window.location.href = './Modulo4_Escritorio_Remoto_AnyDesk_VPN_Accesos_Seguros.html';
            });

        } else {
            // Código incorrecto
            errorMessage.textContent = 'Código incorrecto. Por favor, verifica e intenta nuevamente.';
            errorMessage.classList.remove('hidden');
            codigoInput.focus();
            codigoInput.select();

            // Agregar efecto de shake al input
            codigoInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                codigoInput.style.animation = '';
            }, 500);
        }
    }

    // Event listeners
    btnVerificar.addEventListener('click', verificarCodigo);

    codigoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            verificarCodigo();
        }
    });

    // Prevenir que se cierre el modal haciendo clic fuera
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            // Opcional: puedes agregar un mensaje de que debe ingresar el código
            codigoInput.focus();
        }
    });

    // Enfocar el input automáticamente
    setTimeout(() => {
        codigoInput.focus();
    }, 300);
}

// Función para verificar si ya está verificado
function verificarAccesoPrevio() {
    return localStorage.getItem('modulo4_verificado') === 'true';
}

// Ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    if (document.body.getAttribute('data-requiere-verificacion') === 'true') {
        if (!verificarAccesoPrevio()) {
            setTimeout(() => {
                mostrarModalVerificacion();
            }, 500);
        }
    }
});

// Opcional: Función para resetear la verificación (útil para testing)
function resetearVerificacionModulo4() {
    localStorage.removeItem('modulo4_verificado');
    localStorage.removeItem('codigo_usado');
    Swal.fire({
        icon: 'info',
        title: 'Verificación Resetada',
        text: 'La próxima vez que cargues la página, se pedirá el código nuevamente.',
        confirmButtonColor: '#00446A'
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.body.getAttribute('data-requiere-verificacion') === 'true') {
        // Obtener la card de acuerdo Modelo por su ID
        const acuerdoModelo = document.getElementById('acuerdoModelo');

        if (acuerdoModelo) {
            // Agregar evento de clic a la card
            acuerdoModelo.addEventListener('click', function () {
                // Verificar si ya fue descargado
                const yaDescargado = localStorage.getItem('acuerdoModeloDescargada') === 'true';

                if (yaDescargado) {
                    // Mostrar alerta indicando que ya fue descargado
                    Swal.fire({
                        icon: 'info',
                        title: 'PDF Ya Descargado',
                        html: 'El documento <strong>MC214-IT-1 Acuerdo Modelo de Teletrabajo</strong> ya ha sido descargado anteriormente.<br>',
                        confirmButtonText: 'Entendido',
                        confirmButtonColor: '#00446A',
                        footer: 'Si necesitas otra copia, contacta al departamento de IT'
                    });
                    return;
                }

                // Crear un enlace temporal para descargar el PDF
                const link = document.createElement('a');
                link.href = '../files_output/MC214-IT-1 Acuerdo Modelo de Teletrabajo.pdf';
                link.download = 'MC214-IT-1_Acuerdo_Modelo_Teletrabajo.pdf';
                link.target = '_blank';

                // Agregar evento para detectar cuando la descarga se complete
                link.addEventListener('click', function () {
                    // Marcar en localStorage que el PDF fue descargado
                    localStorage.setItem('acuerdoModeloDescargada', 'true');

                    // Mostrar confirmación de descarga después de un breve delay
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'PDF Descargado Exitosamente',
                            html: 'El documento <strong>MC214-IT-1 Acuerdo Modelo de Teletrabajo</strong> ha sido descargado correctamente.',
                            confirmButtonText: 'Continuar',
                            confirmButtonColor: '#00446A'
                        });
                    }, 1500);
                });

                // Simular clic en el enlace
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Feedback visual
                acuerdoModelo.style.backgroundColor = '#e6f0f7';
                acuerdoModelo.style.transition = 'background-color 0.3s ease';
                setTimeout(() => {
                    acuerdoModelo.style.backgroundColor = '';
                }, 1000);
            });
        }

        const contactoIt = document.getElementById('contactoIt');
        if (contactoIt) {
            contactoIt.addEventListener('click', function () {
                Swal.fire({
                    title: 'SOPORTE IT PRODISMO',
                    html: `
                        <div class="text-left text-gray-700 leading-relaxed">
                            <p class="mb-2">Para consultas relacionadas con IT y Seguridad, contacta a:</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>
                                    <strong>Mail IT:</strong> <a href="mailto:itprodismo@prodismo.com" class="text-blue-600 hover:underline">itprodismo@prodismo.com</a>
                                </li>
                                <li>
                                    <strong>Seguridad:</strong> <a href="mailto:eferrari@prodismo.com" class="text-blue-600 hover:underline">eferrari@prodismo.com</a>
                                    <p class="text-sm text-center text-gray-400">+54 9 351 521-7958</p>
                                </li>
                                <li>
                                <strong>IT Manager:</strong> <a href="mailto:gmontalbetti@prodismo.com" class="text-blue-600 hover:underline">gmontalbetti@prodismo.com</a>
                                <p class="text-sm text-center text-gray-400">+54 9 3541 66-9837</p>
                                </li>
                                <li>
                                    <strong>Help Desk (STI):</strong>
                                        <a href="https://apps.powerapps.com/play/e/default-48f8f875-b75a-4037-a9d8-15d6bbd7c5f9/a/fce0c9bd-9de6-4890-b9ad-5d4f8e05b93f?tenantId=48f8f875-b75a-4037-a9d8-15d6bbd7c5f9&source=teamsopenwebsite&hint=0bdd9fd3-167c-40ea-ac48-d4e5868adbad&sourcetime=1716909981370#" class="text-blue-600 block text-center">
                                            <img src="../images/HelpDesk_logo2.png" class="mx-auto block transition-transform duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-125" title="Ir al STI">
                                        </a>
                                </li>
                            </ul>
                            <p class="mt-4 text-sm text-gray-600 text-center">Estamos aquí para ayudarte a resolver cualquier duda.</p>
                        </div>
                    `,
                    imageUrl: "../images/ITProdimo_logo.png",
                    showCloseButton: true, // Muestra el botón de cerrar (la "X")
                    showConfirmButton: true, // Muestra el botón de "OK"
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#08089d', // Color del botón de confirmación
                    allowOutsideClick: false, // No se puede cerrar haciendo clic fuera del modal
                    customClass: {
                        popup: 'rounded-lg shadow-xl', // Clases de Tailwind para el estilo del popup
                        title: 'text-2xl font-bold text-gray-800',
                        htmlContainer: 'text-base',
                    },
                    width: '520px', // Ancho del modal, para que no ocupe toda la pantalla
                });
            });
        }
    }
});
//---------------------- End Modulo 4 -------------------------------

//---------------------- Modulo 5 -----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const contactoIt = document.getElementById('contactoIt');
    if (contactoIt) {
        contactoIt.addEventListener('click', function () {
            Swal.fire({
                title: 'SOPORTE IT PRODISMO',
                html: `
                        <div class="text-left text-gray-700 leading-relaxed">
                            <p class="mb-2">Para consultas relacionadas con IT y Seguridad, contacta a:</p>
                            <ul class="list-disc list-inside space-y-1">
                                <li>
                                    <strong>Mail IT:</strong> <a href="mailto:itprodismo@prodismo.com" class="text-blue-600 hover:underline">itprodismo@prodismo.com</a>
                                </li>
                                <li>
                                    <strong>Seguridad:</strong> <a href="mailto:eferrari@prodismo.com" class="text-blue-600 hover:underline">eferrari@prodismo.com</a>
                                    <p class="text-sm text-center text-gray-400">+54 9 351 521-7958</p>
                                </li>
                                <li>
                                <strong>IT Manager:</strong> <a href="mailto:gmontalbetti@prodismo.com" class="text-blue-600 hover:underline">gmontalbetti@prodismo.com</a>
                                <p class="text-sm text-center text-gray-400">+54 9 3541 66-9837</p>
                                </li>
                                <li>
                                    <strong>Help Desk (STI):</strong>
                                        <a href="https://apps.powerapps.com/play/e/default-48f8f875-b75a-4037-a9d8-15d6bbd7c5f9/a/fce0c9bd-9de6-4890-b9ad-5d4f8e05b93f?tenantId=48f8f875-b75a-4037-a9d8-15d6bbd7c5f9&source=teamsopenwebsite&hint=0bdd9fd3-167c-40ea-ac48-d4e5868adbad&sourcetime=1716909981370#" class="text-blue-600 block text-center">
                                            <img src="../images/HelpDesk_logo2.png" class="mx-auto block transition-transform duration-300 ease-in-out transform hover:scale-110 hover:filter hover:brightness-125" title="Ir al STI">
                                        </a>
                                </li>
                            </ul>
                            <p class="mt-4 text-sm text-gray-600 text-center">Estamos aquí para ayudarte a resolver cualquier duda.</p>
                        </div>
                    `,
                imageUrl: "../images/ITProdimo_logo.png",
                showCloseButton: true, // Muestra el botón de cerrar (la "X")
                showConfirmButton: true, // Muestra el botón de "OK"
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#08089d', // Color del botón de confirmación
                allowOutsideClick: false, // No se puede cerrar haciendo clic fuera del modal
                customClass: {
                    popup: 'rounded-lg shadow-xl', // Clases de Tailwind para el estilo del popup
                    title: 'text-2xl font-bold text-gray-800',
                    htmlContainer: 'text-base',
                },
                width: '500px', // Ancho del modal, para que no ocupe toda la pantalla
            });
        });
    }
});
// Array de situaciones de riesgo (7 situaciones)
const situacionesRiesgo = [
    {
        id: 1,
        titulo: "Contraseña en Post-it",
        descripcion: "Un empleado ha pegado su contraseña en un post-it visible en el monitor de su computadora.",
        imagen: "../images/riesgos/password-postit.jpg", // Ruta a tu imagen
        esCorrecto: true
    },
    {
        id: 2,
        titulo: "Documento Confidencial Olvidado",
        descripcion: "Un plano técnico 2D con información confidencial fue dejado en la impresora compartida.",
        imagen: "../images/riesgos/plano-impresora.jpg",
        esCorrecto: true
    },
    {
        id: 3,
        titulo: "Cuarto de Servidores Abierto",
        descripcion: "La puerta del cuarto de servidores se encuentra abierta sin supervisión.",
        imagen: "../images/riesgos/servidores-abierto.jpg",
        esCorrecto: true
    },
    {
        id: 4,
        titulo: "Dispositivo USB Desconocido",
        descripcion: "Un empleado encuentra un dispositivo USB desconocido conectado a su computadora.",
        imagen: "../images/riesgos/usb-desconocido.jpg",
        esCorrecto: true
    },
    {
        id: 5,
        titulo: "Sesión de Computadora Bloqueada",
        descripcion: "Una computadora dejada desatendida con la sesión del usuario bloqueada.",
        imagen: "../images/riesgos/sesion-bloqueada.jpg",
        esCorrecto: false
    },
    {
        id: 6,
        titulo: "Documentos Confidenciales en Escritorio",
        descripcion: "Una persona deja documentación confidencial de la empresa en el escritorio.",
        imagen: "../images/riesgos/documentos-confidenciales.jpg",
        esCorrecto: true
    },
    {
        id: 7,
        titulo: "Documentos en Papelera",
        descripcion: "Documentos confidenciales desechados en la papelera común sin destruir.",
        imagen: "../images/riesgos/documentos-papelera.jpg",
        esCorrecto: true
    }
];

let situacionActual = 0;
let situacionesMostradas = [];

// Elementos del DOM
const modal = document.getElementById('riesgosModal');
const abrirRiesgosModal = document.getElementById('abrirModalRiesgos');
const modalTitle = document.getElementById('modalTitle');
const situacionImage = document.getElementById('situacionImage');
const situacionDesc = document.getElementById('situacionDesc');
const progresoTexto = document.getElementById('progresoTexto');
const progresoBarra = document.getElementById('progresoBarra');
const btnCorrecto = document.getElementById('btnCorrecto');
const btnIncorrecto = document.getElementById('btnIncorrecto');
const closeModal = document.getElementById('closeModal');
const identificaRiesgos = document.getElementById('identificaRiesgos');

// Función para abrir el modal de identificación de riesgos
function abrirModalRiesgos() {
    document.getElementById('riesgosModal').classList.remove('hidden')
}

if (abrirRiesgosModal) {
    abrirRiesgosModal.addEventListener('click', () => {
        abrirModalRiesgos()
    })
}

// Función para mostrar una situación
function mostrarSituacion() {
    if (situacionesMostradas.length >= situacionesRiesgo.length) {
        // Todas las situaciones mostradas
        mostrarModalCompletado();
        return;
    }

    // Seleccionar siguiente situación no mostrada
    const situacion = situacionesRiesgo[situacionesMostradas.length];
    situacionActual = situacionesMostradas.length;

    // Actualizar el modal
    modalTitle.textContent = `Situación ${situacion.id}: ${situacion.titulo}`;
    situacionImage.src = situacion.imagen;
    situacionImage.alt = situacion.titulo;
    situacionDesc.textContent = situacion.descripcion;

    // Actualizar progreso
    const progreso = ((situacionesMostradas.length + 1) / situacionesRiesgo.length) * 100;
    progresoTexto.textContent = `Situación ${situacionesMostradas.length + 1} de ${situacionesRiesgo.length}`;
    progresoBarra.style.width = `${progreso}%`;

    // Mostrar modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Función para manejar la respuesta del usuario
function manejarRespuesta(esCorrectoSeleccionado) {
    const situacion = situacionesRiesgo[situacionActual];
    const respuestaCorrecta = !situacion.esCorrecto; // Todas son situaciones incorrectas

    if (esCorrectoSeleccionado === respuestaCorrecta) {
        // Respuesta correcta (seleccionó "Incorrecto" para situaciones de riesgo)
        Swal.fire({
            icon: 'success',
            title: '¡Perfecto! 🎉',
            text: 'Has identificado correctamente la situación de riesgo.',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#10b981',
            timer: 2000,
            timerProgressBar: true
        });
    } else {
        // Respuesta incorrecta (seleccionó "Correcto" para situaciones de riesgo)
        Swal.fire({
            icon: 'error',
            title: '¡Atención! ⚠️',
            text: 'Esta situación representa un riesgo de seguridad. Debes identificarla como incorrecta.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ef4444',
            timer: 2500,
            timerProgressBar: true
        });
    }

    // Marcar situación como mostrada
    if (!situacionesMostradas.includes(situacionActual)) {
        situacionesMostradas.push(situacionActual);
    }

    // Mostrar siguiente situación después del alert
    setTimeout(() => {
        if (situacionesMostradas.length < situacionesRiesgo.length) {
            mostrarSituacion();
        } else {
            mostrarModalCompletado();
        }
    }, 2600);
}

// Función para mostrar modal de completado
function mostrarModalCompletado() {
    Swal.fire({
        icon: 'success',
        title: '¡Entrenamiento Completado! 🏆',
        html: `
            <div class="text-center">
                <p>Has revisado todas las situaciones de riesgo.</p>
                <p class="text-sm text-gray-600 mt-2">Puedes volver a practicar cuando quieras.</p>
            </div>
        `,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#00446A'
    }).then(() => {
        cerrarModal();
        // Resetear para permitir volver a practicar
        situacionesMostradas = [];
    });
}

// Función para cerrar el modal
function cerrarModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {

    const identificaRiesgos = document.getElementById('identificaRiesgos')
    if (identificaRiesgos) {
        identificaRiesgos.addEventListener('click', function () {
            mostrarSituacion();
        });

        // Hacer el card clickeable visualmente
        identificaRiesgos.style.cursor = 'pointer';
        identificaRiesgos.classList.add('hover:shadow-lg', 'transition-shadow', 'duration-200');

        // Botones del modal
        btnCorrecto.addEventListener('click', () => manejarRespuesta(true));
        btnIncorrecto.addEventListener('click', () => manejarRespuesta(false));

        // Cerrar modal
        closeModal.addEventListener('click', cerrarModal);

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                cerrarModal();
            }
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                cerrarModal();
            }
        });
    }

    // Obtener la card de acuerdo Modelo por su ID
    const politicaMinimoPrivilegio = document.getElementById('politica-minimo-privilegio');
    if (politicaMinimoPrivilegio) {
        // Agregar evento de clic a la card
        politicaMinimoPrivilegio.addEventListener('click', function () {
            // Verificar si ya fue descargado
            const yaDescargado = localStorage.getItem('politicaMinimoPrivilegioDescargada') === 'true';

            if (yaDescargado) {
                // Mostrar alerta indicando que ya fue descargado
                Swal.fire({
                    icon: 'info',
                    title: 'PDF Ya Descargado',
                    html: 'El documento <strong>MC421-IT-2 Política de Mínimos Privilegios</strong> ya ha sido descargado anteriormente.<br>',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#00446A',
                    footer: 'Si necesitas otra copia, contacta al departamento de IT'
                });
                return;
            }

            // Crear un enlace temporal para descargar el PDF
            const link = document.createElement('a');
            link.href = '../files_output/MC421-IT-2 Política de Mínimos Privilegios.pdf';
            link.download = 'MC421-IT-2_Política_Mínimos_Privilegios.pdf';
            link.target = '_blank';

            // Agregar evento para detectar cuando la descarga se complete
            link.addEventListener('click', function () {
                // Marcar en localStorage que el PDF fue descargado
                localStorage.setItem('politicaMinimoPrivilegioDescargada', 'true');

                // Mostrar confirmación de descarga después de un breve delay
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'PDF Descargado Exitosamente',
                        html: 'El documento <strong>MC421-IT-2 Política de Mínimos Privilegios</strong> ha sido descargado correctamente.',
                        confirmButtonText: 'Continuar',
                        confirmButtonColor: '#00446A'
                    });
                }, 1500);
            });

            // Simular clic en el enlace
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Feedback visual
            politicaMinimoPrivilegio.style.backgroundColor = '#e6f0f7';
            politicaMinimoPrivilegio.style.transition = 'background-color 0.3s ease';
            setTimeout(() => {
                politicaMinimoPrivilegio.style.backgroundColor = '';
            }, 1000);
        });
    }

});
//---------------------- End Modulo 5 -------------------------------


//---------------------- Modulo 6 -------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

    const policyBtnConfirm = document.getElementById('policyBtnConfirm');
    if (policyBtnConfirm) {
        document.getElementById('policyBtnConfirm').addEventListener('click', function () {
            confirmPolicy('Escritorio y Pantalla Limpios');
        });

    }

    // Agregar efecto de clic a los elementos de la política
    const policyItems = document.querySelectorAll('.policy-item');
    policyItems.forEach(item => {
        item.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    const custodyBtn = document.getElementById('custodyBtn');
    if (custodyBtn) {
        custodyBtn.addEventListener('click', function () {
            confirmPolicy('Cadena de Custodia');
        });
    }

    function confirmPolicy(policyName) {
        Swal.fire({
            title: 'Confirmación de Conocimiento',
            html: `¿Confirmas que has leído y comprendido la política de <strong>${policyName}</strong>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#00446A',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, confirmo',
            cancelButtonText: 'Cancelar'

        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Confirmado!',
                    text: `Tu conocimiento de la política ${policyName} ha sido registrado.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }
});

// Agregar efecto de clic a los elementos de la cadena de custodia
const custodyItems = document.querySelectorAll('.custody-item');
custodyItems.forEach(item => {
    item.addEventListener('click', function () {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Función para verificar si ambos botones han sido confirmados
function verificarConfirmaciones() {
    const policyConfirmed = document.getElementById('policyBtnConfirm').classList.contains('confirmed');
    const custodyConfirmed = document.getElementById('custodyBtn').classList.contains('confirmed');

    return policyConfirmed && custodyConfirmed;
}

// Función para mostrar alerta de error
function mostrarAlertaError() {
    Swal.fire({
        icon: 'warning',
        title: 'Confirmación requerida',
        text: 'Debes confirmar ambas políticas antes de acceder al examen final.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#00446A'
    });
}

// Función para manejar el clic en los botones de confirmación
function configurarBotonesConfirmacion() {
    const policyBtn = document.getElementById('policyBtnConfirm');
    const custodyBtn = document.getElementById('custodyBtn');

    if (policyBtn) {
        // Configurar evento para el primer botón
        policyBtn.addEventListener('click', function () {
            this.classList.add('confirmed');
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Política Confirmada
            `;
            this.style.opacity = '0.7';
            this.disabled = true;
        });
    }

    if (custodyBtn) {
        // Configurar evento para el segundo botón
        custodyBtn.addEventListener('click', function () {
            this.classList.add('confirmed');
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Política Confirmada
            `;
            this.style.opacity = '0.7';
            this.disabled = true;
        });
    }
}

// Función para interceptar el clic en el enlace del examen
function configurarEnlaceExamen() {
    const enlaceExamen = document.querySelector('a[href="./Examen_final_SI.html"]');

    if (enlaceExamen) {
        enlaceExamen.addEventListener('click', function (e) {
            if (!verificarConfirmaciones()) {
                e.preventDefault(); // Prevenir la navegación
                mostrarAlertaError();
            }
        });
    }
}

// También puedes agregar estilos CSS para mejorar la apariencia
const estilo = document.createElement('style');
estilo.textContent = `
    .btn-primary-mod6.confirmed {
        cursor: not-allowed;
        background-color: #d1d5db !important;
    }
    
    .btn-primary-mod6:disabled {
        pointer-events: none;
    }
    
    a[href="./Examen_final_SI.html"] {
        transition: opacity 0.3s ease;
    }
    
    a[href="./Examen_final_SI.html"]:hover .card {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(estilo);


// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    configurarBotonesConfirmacion();
    configurarEnlaceExamen();
});
//------------------ End Modulo 6 ----------------------------------------

//------------------ Previa Examen Final ----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Configurar el evento para el botón de código de acceso (si existe en esta página)
    const btnCodigoAcceso = document.getElementById('btnCodigoAcceso');
    if (btnCodigoAcceso) {
        btnCodigoAcceso.addEventListener('click', function () {
            mostrarModalVerificacionFinal();
        });
    }

    // Configurar eventos para la página de examen final (si existe en esta página)
    const btnVerificarCodigo = document.getElementById('btnVerificarCodigo');
    const accessCodeInput = document.getElementById('accessCode');

    if (btnVerificarCodigo && accessCodeInput) {
        // Función para verificar el código de acceso
        btnVerificarCodigo.addEventListener('click', function () {
            const accessCode = accessCodeInput.value.trim().toUpperCase();
            const examLinkContainer = document.getElementById('examLinkContainer');

            if (!accessCode) {
                Swal.fire({
                    title: 'Código Requerido',
                    text: 'Por favor ingresa tu código de acceso',
                    icon: 'warning',
                    confirmButtonColor: '#00446A'
                });
                return;
            }

            if (typeof arrayCodes !== 'undefined' && arrayCodes.includes(accessCode)) {
                // Código válido
                accessCodeInput.classList.add('access-granted');
                if (examLinkContainer) {
                    examLinkContainer.classList.remove('hidden');
                }

                Swal.fire({
                    title: '¡Código Válido!',
                    text: 'Acceso concedido al examen final',
                    icon: 'success',
                    confirmButtonColor: '#00446A'
                });

                // Scroll suave al enlace del examen
                if (examLinkContainer) {
                    examLinkContainer.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Código inválido
                Swal.fire({
                    title: 'Código Inválido',
                    text: 'El código ingresado no es válido. Verifica que hayas aprobado el Módulo 3.',
                    icon: 'error',
                    confirmButtonColor: '#00446A'
                });
            }
        });

        // Permitir presionar Enter para verificar el código
        accessCodeInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                btnVerificarCodigo.click();
            }
        });

        // Formatear automáticamente el código (5 caracteres máx)
        accessCodeInput.addEventListener('input', function (e) {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

            if (value.length > 5) {
                value = value.substring(0, 5);
            }

            e.target.value = value;
        });
    }
});

// Función para verificar el código de acceso (compatibilidad con modal)
function verificarCodigoAccesoFinal(codigo) {
    return typeof arrayCodes !== 'undefined' && arrayCodes.includes(codigo.toUpperCase());
}

// Función para mostrar el modal de verificación
function mostrarModalVerificacionFinal() {
    // Verificar si ya existe un modal abierto
    if (document.getElementById('codigo-verification-overlay-finalExam')) {
        return;
    }

    // Crear el overlay/modal
    const modalOverlayFinalExam = document.createElement('div');
    modalOverlayFinalExam.id = 'codigo-verification-overlay-finalExam';
    modalOverlayFinalExam.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
        overflow: hidden;
        margin: 0;
        padding: 0;
    `;

    // Crear el contenido del modal
    const modalContentFinalExam = document.createElement('div');
    modalContentFinalExam.style.cssText = `
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        width: 60%;
        max-width: 60vw;
        text-align: center;
        overflow: hidden;
        box-sizing: border-box;
        margin: 1rem;
        max-height: 90vh;
        overflow-y: auto;
    `;

    modalContentFinalExam.innerHTML = `
    <div class="mb-6">
        <div class="text-6xl mb-4">🔒</div>
        <h2 class="text-2xl font-bold text-[#00446A] mb-2">Verificación Requerida</h2>
        <p class="text-gray-600 mb-4">Para acceder al Examen Final, ingresa el código de verificación que recibiste al completar el examen del Módulo 3.</p>
    </div>

    <div class="mb-6">
        <label id="label-codigo-input-finalExam" for="codigo-input-finalExam" class="block text-sm font-medium text-gray-700 mb-2">Código de Verificación</label>
        <input type="text" id="codigo-input-finalExam" placeholder="Ej: K8D9M" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono uppercase"
            maxlength="5" style="letter-spacing: 2px;">
        <p id="error-message-finalExam" class="text-red-500 text-sm mt-2 hidden">Código incorrecto. Por favor, intenta nuevamente.</p>
    </div>

    <div id="botones-verificacion">
        <button id="btn-verificar-finalExam" class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Verificar Código
        </button>
    </div>

    <div class="mt-4 text-sm text-gray-500">
        <p id='footer-modal-final'>¿No tienes un código? Debes completar el examen del Módulo 3 primero.</p>
    </div>
    `;

    modalOverlayFinalExam.appendChild(modalContentFinalExam);
    document.body.appendChild(modalOverlayFinalExam);

    // Ocultar el contenido principal de la página (si existe)
    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('footer');
    if (mainContent) mainContent.style.display = 'none';
    if (footerContent) footerContent.style.display = 'none';

    // Agregar funcionalidad al input y botón
    const codigoInputFinalExam = document.getElementById('codigo-input-finalExam');
    const btnVerificarFinalExam = document.getElementById('btn-verificar-finalExam');
    const errorMessageFinalExam = document.getElementById('error-message-finalExam');

    if (codigoInputFinalExam && btnVerificarFinalExam && errorMessageFinalExam) {
        // Función para auto-convertir a mayúsculas y limitar a 5 caracteres
        codigoInputFinalExam.addEventListener('input', function () {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 5);
        });

        // Función de verificación
        function verificarCodigoFinal() {
            const codigo = codigoInputFinalExam.value.trim();

            if (!codigo) {
                errorMessageFinalExam.textContent = 'Por favor, ingresa un código.';
                errorMessageFinalExam.classList.remove('hidden');
                codigoInputFinalExam.focus();
                return;
            }

            if (verificarCodigoAccesoFinal(codigo)) {
                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Código Verificado!',
                    text: `Acceso concedido al Examen Final.`,
                    confirmButtonColor: '#00446A',
                    timer: 1600,
                    showConfirmButton: false
                });

                // Transformar el modal para mostrar el botón de redirección
                setTimeout(() => {
                    habilitarEnlaceExamenFinal(modalOverlayFinalExam);
                }, 1600);

            } else {
                // Código incorrecto
                errorMessageFinalExam.textContent = 'Código incorrecto. Por favor, verifica e intenta nuevamente.';
                errorMessageFinalExam.classList.remove('hidden');
                codigoInputFinalExam.focus();
                codigoInputFinalExam.select();

                // Agregar efecto de shake al input
                codigoInputFinalExam.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    codigoInputFinalExam.style.animation = '';
                }, 500);
            }
        }

        // Event listeners
        btnVerificarFinalExam.addEventListener('click', verificarCodigoFinal);

        codigoInputFinalExam.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                verificarCodigoFinal();
            }
        });

        // Prevenir que se cierre el modal haciendo clic fuera
        modalOverlayFinalExam.addEventListener('click', function (e) {
            if (e.target === modalOverlayFinalExam) {
                codigoInputFinalExam.focus();
            }
        });

        // Enfocar el input automáticamente
        setTimeout(() => {
            codigoInputFinalExam.focus();
        }, 300);
    }
}

// Función para habilitar el enlace al examen final
function habilitarEnlaceExamenFinal(modalOverlayFinalExam) {
    // Buscar el contenedor del botón de verificación
    const btnVerificarContainer = document.getElementById('btn-verificar-finalExam')?.parentNode;

    if (btnVerificarContainer) {
        // Crear botón para ir al examen final
        const btnIrAlExamen = document.createElement('button');
        btnIrAlExamen.id = 'btn-ir-examen-final';
        btnIrAlExamen.className = 'w-full bg-[#009E73] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 mt-4';
        btnIrAlExamen.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
            Ir al Examen Final
        `;

        // Agregar evento click para redirigir
        btnIrAlExamen.addEventListener('click', function () {
            window.location.href = "./Examen_final_10.html";
        });

        // Insertar el botón después del botón de verificación
        btnVerificarContainer.parentNode.insertBefore(btnIrAlExamen, btnVerificarContainer.nextSibling);

        // Ocultar el botón de verificación ya que el código fue aceptado
        const btnVerificar = document.getElementById('btn-verificar-finalExam');
        if (btnVerificar) btnVerificar.style.display = 'none';

        // También ocultar el input, mensaje de error, label y footer
        const codigoInput = document.getElementById('codigo-input-finalExam');
        const errorMessage = document.getElementById('error-message-finalExam');
        const labelInput = document.getElementById('label-codigo-input-finalExam');
        const footerModalFinal = document.getElementById('footer-modal-final');

        if (codigoInput) codigoInput.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        if (labelInput) labelInput.style.display = 'none';
        if (footerModalFinal) footerModalFinal.textContent = 'Muchos éxitos!!';

        // Actualizar el mensaje del modal
        const tituloModal = modalOverlayFinalExam.querySelector('h2');
        const descripcionModal = modalOverlayFinalExam.querySelector('p.text-gray-600');

        if (tituloModal) {
            tituloModal.textContent = '¡Código Verificado Correctamente!';
            tituloModal.className = 'text-2xl font-bold text-[#009E73] mb-2';
        }

        if (descripcionModal) {
            descripcionModal.textContent = 'Ahora puedes acceder al examen final. Haz clic en el botón de abajo para comenzar.';
            descripcionModal.className = 'text-gray-600 mb-4';
        }

        // Cambiar el icono del modal a checkmark
        const iconoModal = modalOverlayFinalExam.querySelector('.text-6xl');
        if (iconoModal) {
            iconoModal.textContent = '✅';
        }
    }
}
//------------------ End Previa Examen Final ----------------------------------------

//------------------ Examen Final 10 preguntas -------------------------------
// Array de preguntas completo (20 preguntas)
const quizDataFinal = [
    {
        question: "¿Cuál es la mejor práctica para proteger tu equipo de la empresa en un lugar público?",
        options: [
            { text: "Dejarlo desbloqueado para un acceso rápido.", correct: false },
            { text: "Conectarse a una red Wi-Fi pública sin contraseña.", correct: false },
            { text: "Utilizar siempre una VPN para cifrar la conexión.", correct: true },
            { text: "Compartirlo con colegas para optimizar el trabajo.", correct: false }
        ]
    },
    {
        question: "Si recibes un correo electrónico que solicita tu contraseña de la empresa, ¿cuál es el curso de acción correcto?",
        options: [
            { text: "Responder al remitente y solicitar más información.", correct: false },
            { text: "Eliminar el correo inmediatamente sin abrirlo.", correct: false },
            { text: "Reportar el correo al departamento de IT y no interactuar con él.", correct: true },
            { text: "Hacer clic en el enlace para ver si el sitio es legítimo.", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de datos se considera confidencial y debe manejarse con cuidado?",
        options: [
            { text: "Listas de precios de productos.", correct: false },
            { text: "Información financiera de la empresa y datos de clientes.", correct: true },
            { text: "Manuales de uso de software.", correct: false },
            { text: "Horarios de reuniones de equipo.", correct: false }
        ]
    },
    {
        question: "Si tu equipo de la empresa es robado, ¿qué debes hacer primero?",
        options: [
            { text: "Publicar en redes sociales para pedir ayuda.", correct: false },
            { text: "Esperar a que alguien lo encuentre y lo devuelva.", correct: false },
            { text: "Notificar inmediatamente al departamento de IT y a tu supervisor.", correct: true },
            { text: "Comprar un equipo de reemplazo por tu cuenta.", correct: false }
        ]
    },
    {
        question: "Si necesitas compartir un archivo confidencial con un colega, ¿cuál es el método más seguro?",
        options: [
            { text: "Enviarlo por correo electrónico sin cifrado.", correct: false },
            { text: "Usar un servicio de almacenamiento en la nube no aprobado por la empresa.", correct: false },
            { text: "Compartirlo a través de una plataforma de colaboración de la empresa aprobada.", correct: true },
            { text: "Guardarlo en una memoria USB y entregarlo personalmente.", correct: false }
        ]
    },
    {
        question: "¿Qué debe hacer un empleado si sospecha que ha sido víctima de un ataque de phishing?",
        options: [
            { text: "Cambiar inmediatamente todas sus contraseñas y reportar al departamento de IT.", correct: true },
            { text: "Ignorarlo si no ha proporcionado información sensible.", correct: false },
            { text: "Reenviar el correo a colegas para advertirles.", correct: false },
            { text: "Eliminar el correo y continuar con el trabajo normal.", correct: false }
        ]
    },
    {
        question: "¿Qué característica define a una contraseña segura?",
        options: [
            { text: "Ser fácil de recordar para el usuario.", correct: false },
            { text: "Contener al menos 12 caracteres con mayúsculas, minúsculas, números y símbolos.", correct: true },
            { text: "Incluir el nombre de la empresa.", correct: false },
            { text: "Ser la misma para todas las cuentas del usuario.", correct: false }
        ]
    },
    {
        question: "¿Qué es la autenticación multifactor (MFA)?",
        options: [
            { text: "Tener dos contraseñas diferentes para la misma cuenta.", correct: false },
            { text: "Un método de verificación que combina algo que sabes con algo que tienes.", correct: true },
            { text: "Usar la misma contraseña en dos dispositivos diferentes.", correct: false },
            { text: "Un sistema que requiere dos usuarios para acceder a un archivo.", correct: false }
        ]
    },
    {
        question: "¿Qué debe hacerse con los equipos antiguos que ya no se usan?",
        options: [
            { text: "Desecharlos en la basura normal.", correct: false },
            { text: "Entregarlos al departamento de IT para eliminación segura.", correct: true },
            { text: "Donarlos sin borrar la información.", correct: false },
            { text: "Venderlos para recuperar parte de la inversión.", correct: false }
        ]
    },
    {
        question: "¿Qué tipo de información sobre la empresa está prohibido compartir en redes sociales?",
        options: [
            { text: "Solo información financiera confidencial.", correct: false },
            { text: "Cualquier información sensible o no pública que no haya sido autorizada para divulgación.", correct: true },
            { text: "Información sobre eventos sociales de la empresa.", correct: false },
            { text: "Fotos del espacio físico de la oficina.", correct: false }
        ]
    },
    {
        question: "¿Dónde debes almacenar los diseños CAD y documentos confidenciales de la empresa?",
        options: [
            { text: "En el escritorio de tu computadora para acceso rápido.", correct: false },
            { text: "En servicios de almacenamiento en la nube personales como Google Drive o Dropbox.", correct: false },
            { text: "En la carpeta de red designada que es segura, respaldada y auditable.", correct: true },
            { text: "En una memoria USB para transportarlos fácilmente.", correct: false }
        ]
    },
    {
        question: "¿Por qué es riesgoso guardar archivos confidenciales en el escritorio o dispositivos USB personales?",
        options: [
            { text: "Porque ocupan mucho espacio de almacenamiento.", correct: false },
            { text: "Porque no se pueden organizar adecuadamente.", correct: false },
            { text: "Por el riesgo de pérdida, robo o fuga de información confidencial.", correct: true },
            { text: "Porque se desorganizan más fácilmente.", correct: false }
        ]
    },
    {
        question: "¿Qué ventaja tiene almacenar documentos en la red corporativa versus almacenamiento local?",
        options: [
            { text: "La red corporativa tiene respaldos automáticos y controles de seguridad.", correct: true },
            { text: "Los archivos se abren más rápido en la red corporativa.", correct: false },
            { text: "La red corporativa permite editar documentos simultáneamente sin restricciones.", correct: false },
            { text: "La red corporativa tiene capacidad ilimitada de almacenamiento.", correct: false }
        ]
    },
    {
        question: "Si necesitas trabajar con información confidencial desde casa, ¿cuál es el procedimiento correcto?",
        options: [
            { text: "Enviar los archivos por correo personal para acceder desde cualquier computadora.", correct: false },
            { text: "Guardar los archivos en un USB y llevarlos a casa.", correct: false },
            { text: "Conectarse mediante VPN autorizada y acceder a los archivos través de la red segura de la empresa.", correct: true },
            { text: "Tomar fotos de pantalla con el teléfono para revisar la información.", correct: false }
        ]
    },
    // ... (27 preguntas originales aquí)
    // PREGUNTAS ADICIONALES - TOTAL 40
    {
        question: "¿Qué es una 'Pantalla Limpia' en el contexto de seguridad de la información?",
        options: [
            { text: "Una política que prohíbe tener fondos de pantalla coloridos.", correct: false },
            { text: "Un monitor que ha sido limpiado recientemente con productos especializados.", correct: false },
            { text: "Una práctica de no dejar información sensible visible en pantallas desatendidas.", correct: true },
            { text: "Un programa que limpia automáticamente el historial del navegador.", correct: false }
        ]
    },
    {
        question: "¿Cuál es el tiempo máximo recomendado para dejar tu equipo desbloqueado al alejarte de tu puesto?",
        options: [
            { text: "5 minutos", correct: false },
            { text: "15 minutos", correct: false },
            { text: "Nunca debes dejar tu equipo desbloqueado y desatendido.", correct: true },
            { text: "30 minutos si estás en una zona segura", correct: false }
        ]
    },
    {
        question: "¿Qué tecla de acceso rápido bloquea rápidamente tu equipo en Windows?",
        options: [
            { text: "Ctrl + P + Delete", correct: false },
            { text: "Alt + F4", correct: false },
            { text: `Windows + L`, correct: true },
            { text: "Ctrl + Shift + Esc", correct: false }
        ]
    },
    {
        question: "La información clasificada como 'Público' puede ser:",
        options: [
            { text: "Compartida libremente con cualquier persona sin restricciones.", correct: true },
            { text: "Compartida solo con empleados de la empresa.", correct: false },
            { text: "Compartida solo con el departamento correspondiente.", correct: false },
            { text: "Mantenida completamente confidencial.", correct: false }
        ]
    },
    {
        question: "La información 'Confidencial' debe ser protegida porque:",
        options: [
            { text: "Su divulgación podría causar daños significativos a la empresa.", correct: true },
            { text: "Es información que solo interesa a un departamento.", correct: false },
            { text: "Contiene datos personales de los empleados exclusivamente.", correct: false },
            { text: "Es información temporal que pronto será pública.", correct: false }
        ]
    },
    {
        question: "¿Qué nivel de clasificación tendría un manual de procedimientos interno de la empresa?",
        options: [
            { text: "Público", correct: false },
            { text: "Interno", correct: true },
            { text: "Confidencial", correct: false },
            { text: "Restringido", correct: false }
        ]
    },
    {
        question: "La información 'Restringida' se caracteriza por:",
        options: [
            { text: "Poder ser compartida con socios comerciales sin restricciones.", correct: false },
            { text: "Ser información que pronto será de dominio público.", correct: false },
            { text: "Ser accesible solo para personal específico autorizado.", correct: true },
            { text: "Contener solo datos técnicos no sensibles.", correct: false }
        ]
    },
    {
        question: "La 'Cadena de Custodia' de la información se refiere a:",
        options: [
            { text: "El registro y control de quién accede y maneja la información confidencial.", correct: true },
            { text: "La ubicación física donde se almacenan los servidores.", correct: false },
            { text: "El proceso de backup automático de los datos.", correct: false },
            { text: "La red de cableado estructurado de la empresa.", correct: false }
        ]
    },
    {
        question: "¿Por qué es importante mantener la cadena de custodia de documentos confidenciales?",
        options: [
            { text: "Para poder rastrear responsabilidades en caso de fuga de información.", correct: true },
            { text: "Para reducir el uso de papel en la empresa.", correct: false },
            { text: "Para acelerar el proceso de digitalización de documentos.", correct: false },
            { text: "Para cumplir con requisitos estéticos de archivo.", correct: false }
        ]
    },
    {
        question: "El uso de USB personales está terminantemente prohibido porque:",
        options: [
            { text: "Pueden introducir malware y facilitar la fuga de información confidencial.", correct: true },
            { text: "Son más lentos que los USB corporativos.", correct: false },
            { text: "Consumen más energía de los puertos USB.", correct: false },
            { text: "No son compatibles con los sistemas de la empresa.", correct: false }
        ]
    },
    {
        question: "¿Qué alternativa segura existe si necesitas transferir archivos temporalmente?",
        options: [
            { text: "Usar USB personales pero escaneándolos primero con antivirus.", correct: false },
            { text: "Enviar archivos por correo personal cifrado.", correct: false },
            { text: "Subir archivos a redes sociales con configuración privada.", correct: false },
            { text: "Utilizar servicios de transferencia segura autorizados por IT.", correct: true }
        ]
    },
    {
        question: "¿Qué debe hacer un empleado si encuentra un USB desconocido en la oficina?",
        options: [
            { text: "Conectarlo para identificar al dueño por los archivos.", correct: false },
            { text: "Llevarlo a recepción para que lo reclame alguien.", correct: false },
            { text: "Entregarlo inmediatamente al departamento de IT sin conectarlo.", correct: true },
            { text: "Guardarlo por si alguien lo reclama posteriormente.", correct: false }
        ],
    },
    {
        question: "Una práctica esencial de 'Consejos de Seguridad Informática' es:",
        options: [
            { text: "Anotar las contraseñas en un cuaderno bien guardado.", correct: false },
            { text: "Actualizar regularmente el software y usar autenticación multifactor.", correct: true },
            { text: "Usar la misma contraseña compleja para todas las cuentas.", correct: false },
            { text: "Compartir credenciales con colegas de confianza.", correct: false }
        ]
    },
    // PREGUNTAS ADICIONALES SOBRE NORMAS - TOTAL 44
    {
        question: "La norma ISO 27001 requiere que las organizaciones implementen:",
        options: [
            { text: "Un enfoque basado en riesgos para la seguridad de la información.", correct: true },
            { text: "Firewalls de última generación en todos los equipos.", correct: false },
            { text: "Políticas de contraseñas idénticas para todas las industrias.", correct: false },
            { text: "Auditorías diarias de seguridad informática.", correct: false }
        ]
    },
    {
        question: "¿Por que los fabricantes exigen un compromiso con la seguridad de la información a travéz de TISAX®?",
        options: [
            { text: "Permite omitir requisitos específicos de algunos proveedores.", correct: false },
            { text: "Reduce los costos de certificación a cero.", correct: false },
            { text: "Nos confían sus diseños y propiedad intelectual más valiosa y exigen su confidencialidad e integridad.", correct: true },
            { text: "Garantiza contratos automáticos con los proveedores.", correct: false }
        ]
    },
    {
        question: "TISAX clasifica la información en diferentes niveles de protección basándose en:",
        options: [
            { text: "El tamaño de la empresa proveedora.", correct: false },
            { text: "El volumen de facturación anual con fabricantes.", correct: false },
            { text: "La antigüedad de la relación comercial.", correct: false },
            { text: "El impacto que tendría su divulgación no autorizada.", correct: true }
        ]
    }
];

const personalFormFinal = document.getElementById('personal-form-final');
const quizContentFinal = document.getElementById('quiz-content-final');
const resultsContainerFinal = document.getElementById('results-container-final');
const questionTextFinal = document.getElementById('question-text-final');
const currentQuestionFinal = document.getElementById('current-question-final');
const optionsContainerFinal = document.getElementById('options-container-final');
const nextBtnFinal = document.getElementById('next-btn-final');
const prevBtnFinal = document.getElementById('prev-btn-final');
const showResultsBtnFinal = document.getElementById('showResultsBtn-final');
const scoreDisplayFinal = document.getElementById('score-display-final');
const finalNameFinal = document.getElementById('final-name-final');
const percentageDisplayFinal = document.getElementById('percentage-display-final');
const downloadPdfBtnFinal = document.getElementById('download-pdf-btn-final');
const btnSubmitFormFinal = document.getElementById('btnSubmitForm-final');
const btnEncuestaFinal = document.getElementById('encuesta-btn-final');

// Variables globales para el examen final
let currentQuestionIndexFinal = 0;
let userAnswersFinal = {};
let isFormSubmittedFinal = false;
let finalScoreFinal = 0;
let preguntasSeleccionadasFinal = []; // Array para guardar las preguntas seleccionadas aleatoriamente

// Función para validar el email corporativo
function validarEmailCorporativoFinal(email) {
    let emailLower = ''
    if (email) {
        emailLower = email.toLowerCase().trim()
    }

    if (!emailLower.endsWith('@prodismo.com')) {
        return {
            valido: false,
            mensaje: 'El email debe tener el dominio @prodismo.com'
        };
    }

    if (!arrayUsuarios.includes(emailLower)) {
        return {
            valido: false,
            mensaje: 'El email corporativo no está autorizado para realizar el examen'
        };
    }

    return {
        valido: true,
        mensaje: 'Email válido'
    };
}

// Función para validar todo el formulario
function validarFormularioCompletoFinal() {
    const nameFinal = document.getElementById('nameFinal').value.trim();
    const surnameFinal = document.getElementById('surnameFinal').value.trim();
    const employeeIdFinal = document.getElementById('employeeIdFinal').value.trim();
    const corporateEmailFinal = document.getElementById('corporateEmailFinal').value.trim();

    if (!nameFinal || !surnameFinal || !employeeIdFinal || !corporateEmailFinal) {
        return {
            valido: false,
            mensaje: 'Todos los campos son obligatorios'
        };
    }

    const validacionEmailFinal = validarEmailCorporativoFinal(corporateEmailFinal);
    if (!validacionEmailFinal.valido) {
        return validacionEmailFinal;
    }

    if (isNaN(employeeIdFinal) || employeeIdFinal <= 0) {
        return {
            valido: false,
            mensaje: 'El número de legajo debe ser un número válido'
        };
    }

    return {
        valido: true,
        mensaje: 'Formulario válido'
    };
}

// Función para seleccionar 10 preguntas aleatorias del total
function seleccionarPreguntasAleatoriasFinal() {
    const preguntasAleatoriasFinal = [...quizDataFinal];

    // Mezclar el array usando el algoritmo Fisher-Yates
    for (let i = preguntasAleatoriasFinal.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasAleatoriasFinal[i], preguntasAleatoriasFinal[j]] = [preguntasAleatoriasFinal[j], preguntasAleatoriasFinal[i]];
    }

    // Tomar solo las primeras 10 preguntas
    return preguntasAleatoriasFinal.slice(0, 10);
}

// Función para mezclar las opciones de respuesta de cada pregunta
function mezclarOpcionesFinal(pregunta) {
    const opcionesMezcladasFinal = [...pregunta.options];

    for (let i = opcionesMezcladasFinal.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesMezcladasFinal[i], opcionesMezcladasFinal[j]] = [opcionesMezcladasFinal[j], opcionesMezcladasFinal[i]];
    }

    return {
        ...pregunta,
        options: opcionesMezcladasFinal
    };
}

// Función para iniciar el cuestionario
function iniciarCuestionarioFinal() {
    const validacion = validarFormularioCompletoFinal();

    if (validacion.valido) {
        isFormSubmittedFinal = true;

        // 1. Seleccionar las 10 preguntas aleatorias al inicio (solo una vez)
        const preguntasAleatoriasFinal = seleccionarPreguntasAleatoriasFinal();
        preguntasSeleccionadasFinal = preguntasAleatoriasFinal.map(pregunta => mezclarOpcionesFinal(pregunta));

        personalFormFinal.classList.add('hidden');
        quizContentFinal.classList.remove('hidden');
        document.getElementById('final-name-final').textContent = document.getElementById('nameFinal').value + ' ' + document.getElementById('surnameFinal').value;

        // 2. Iniciar la barra de progreso
        const progressFill = document.getElementById('progress-fill-final');
        progressFill.style.width = '0%';

        // Actualizar contador de preguntas
        document.getElementById('total-questions-final').textContent = preguntasSeleccionadasFinal.length;

        renderQuestionFinal();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error en el formulario',
            text: validacion.mensaje,
            confirmButtonText: 'Corregir',
            confirmButtonColor: '#00446A'
        });
    }
}

// Modificar el evento submit del formulario
if (personalFormFinal) {
    personalFormFinal.addEventListener('submit', (e) => {
        e.preventDefault();
        iniciarCuestionarioFinal();
    });
}

// Agregar evento al botón específico
if (btnSubmitFormFinal) {
    btnSubmitFormFinal.addEventListener('click', function (e) {
        e.preventDefault();
        iniciarCuestionarioFinal();
    });
}

// Validación en tiempo real para el email
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('corporateEmailFinal');
    const btnSubmitForm = document.getElementById('btnSubmitForm-final');

    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const email = this.value;
            if (email) {
                const validacion = validarEmailCorporativoFinal(email);

                if (!validacion.valido) {
                    this.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                    let errorSpan = this.parentNode.querySelector('.email-error');
                    if (!errorSpan) {
                        errorSpan = document.createElement('span');
                        errorSpan.className = 'email-error text-red-500 text-xs mt-1';
                        this.parentNode.appendChild(errorSpan);
                    }
                    errorSpan.textContent = validacion.mensaje;

                    if (btnSubmitForm) {
                        btnSubmitForm.disabled = true;
                        btnSubmitForm.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                } else {
                    this.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                    this.classList.add('border-green-500', 'ring-2', 'ring-green-200');
                    const errorSpan = this.parentNode.querySelector('.email-error');
                    if (errorSpan) {
                        errorSpan.remove();
                    }

                    if (btnSubmitForm) {
                        btnSubmitForm.disabled = false;
                        btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                }
            }
        });

        emailInput.addEventListener('input', function () {
            this.classList.remove('border-red-500', 'border-green-500', 'ring-2', 'ring-red-200', 'ring-green-200');
            const errorSpan = this.parentNode.querySelector('.email-error');
            if (errorSpan) {
                errorSpan.remove();
            }

            if (btnSubmitForm) {
                btnSubmitForm.disabled = false;
                btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    const campos = ['nameFinal', 'surnameFinal', 'employeeIdFinal'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo && btnSubmitForm) {
            campo.addEventListener('input', function () {
                const validacion = validarFormularioCompletoFinal();
                btnSubmitForm.disabled = !validacion.valido;
                if (validacion.valido) {
                    btnSubmitForm.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    btnSubmitForm.classList.add('opacity-50', 'cursor-not-allowed');
                }
            });
        }
    });
});

function renderQuestionFinal() {
    // Usar las preguntas ya seleccionadas al inicio (no volver a seleccionar)
    const question = preguntasSeleccionadasFinal[currentQuestionIndexFinal];
    questionTextFinal.textContent = `Pregunta ${currentQuestionIndexFinal + 1}/${preguntasSeleccionadasFinal.length}: ${question.question}`;
    optionsContainerFinal.innerHTML = '';
    currentQuestionFinal.textContent = `${currentQuestionIndexFinal + 1}`

    // Actualizar barra de progreso
    const progressPercentageFinal = ((currentQuestionIndexFinal) / preguntasSeleccionadasFinal.length) * 100;
    document.getElementById('progress-fill-final').style.width = `${progressPercentageFinal}%`;

    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item', 'p-3', 'border', 'rounded', 'mb-2', 'cursor-pointer', 'hover:bg-gray-100');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `question-${currentQuestionIndexFinal}`;
        radioInput.value = index;
        radioInput.id = `q${currentQuestionIndexFinal}-opt${index}`;
        radioInput.classList.add('mr-2', 'cursor-pointer');

        // 2. Deshabilitar la opción si ya se respondió esta pregunta
        if (userAnswersFinal[currentQuestionIndexFinal] !== undefined) {
            radioInput.disabled = true;
            optionItem.classList.add('disabled-option');
        }

        const label = document.createElement('label');
        label.htmlFor = `q${currentQuestionIndexFinal}-opt${index}`;
        label.textContent = option.text;
        label.classList.add('cursor-pointer', 'flex-1');

        optionItem.appendChild(radioInput);
        optionItem.appendChild(label);
        optionsContainerFinal.appendChild(optionItem);

        if (userAnswersFinal[currentQuestionIndexFinal] !== undefined && userAnswersFinal[currentQuestionIndexFinal] == index) {
            radioInput.checked = true;
            optionItem.classList.add('bg-blue-100', 'border-blue-300');
        }

        // 2. Solo permitir clic si la pregunta no ha sido respondida
        if (userAnswersFinal[currentQuestionIndexFinal] === undefined) {
            optionItem.addEventListener('click', () => {
                handleAnswerFinal(index);
            });
        }
    });

    updateNavigationButtonsFinal();
}

function handleAnswerFinal(selectedIndex) {
    if (userAnswersFinal[currentQuestionIndexFinal] === undefined) {
        userAnswersFinal[currentQuestionIndexFinal] = selectedIndex;

        const options = optionsContainerFinal.querySelectorAll('.option-item');
        options.forEach(option => {
            option.classList.remove('bg-blue-100', 'border-blue-300');
            option.classList.add('disabled-option');

            // Deshabilitar todos los inputs de radio
            const radioInput = option.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.disabled = true;
            }

            // Remover event listeners para prevenir más clics
            option.replaceWith(option.cloneNode(true));
        });

        // Avanzar progreso inmediatamente
        advanceProgressFinal();

        options[selectedIndex].classList.add('bg-blue-100', 'border-blue-300');
    }

    verificarCompletitudFinal();
}

function verificarCompletitudFinal() {
    // 3. Verificar si todas las 10 preguntas tienen respuesta
    const verificarCompletitudFinal = Object.keys(userAnswersFinal).length === preguntasSeleccionadasFinal.length;

    if (verificarCompletitudFinal && currentQuestionIndexFinal === preguntasSeleccionadasFinal.length - 1) {
        document.getElementById('showResultsBtn-final').classList.remove('hidden');
        document.getElementById('next-btn-final').classList.add('hidden');
    } else {
        document.getElementById('showResultsBtn-final').classList.add('hidden');
    }
}

function updateNavigationButtonsFinal() {
    if (currentQuestionIndexFinal === 0) {
        prevBtnFinal.style.display = 'none';
        nextBtnFinal.classList.remove('hidden');

    } else {
        prevBtnFinal.style.display = 'inline-block';
        nextBtnFinal.classList.remove('hidden');
    }

    if (currentQuestionIndexFinal === preguntasSeleccionadasFinal.length - 1) {
        nextBtnFinal.style.display = 'none';
        // Solo mostrar botón de resultados si todas están respondidas
        if (Object.keys(userAnswersFinal).length === preguntasSeleccionadasFinal.length) {
            showResultsBtnFinal.classList.remove('hidden');
        }
    } else {
        nextBtnFinal.style.display = 'inline-block';
        nextBtnFinal.classList.remove('hidden');
        nextBtnFinal.textContent = 'Siguiente';
        showResultsBtnFinal.classList.add('hidden');
    }
}

if (nextBtnFinal) {
    nextBtnFinal.addEventListener('click', () => {
        if (currentQuestionIndexFinal < preguntasSeleccionadasFinal.length - 1) {
            currentQuestionIndexFinal++;
            renderQuestionFinal();
        }
    });
}

if (prevBtnFinal) {
    prevBtnFinal.addEventListener('click', () => {
        if (currentQuestionIndexFinal > 0) {
            currentQuestionIndexFinal--;
            renderQuestionFinal();
        }
    });
}

// Función compacta para aumentar el progreso
function advanceProgressFinal() {
    const progressFillFinal = document.getElementById('progress-fill-final');
    let currentWidthFinal = parseInt(progressFillFinal.style.width) || 0;
    let newWidthFinal = currentWidthFinal + 10;

    // No superar el 100%
    if (newWidthFinal > 100) newWidthFinal = 100;

    progressFillFinal.style.width = newWidthFinal + '%';
}

if (showResultsBtnFinal) {
    showResultsBtnFinal.addEventListener('click', () => {
        showResultsFinal();
    });
}

// Función para reiniciar el examen completamente
function restartExamFinal() {
    // 1. Guardar los valores actuales del formulario
    const nameValueFinal = document.getElementById('nameFinal').value;
    const surnameValueFinal = document.getElementById('surnameFinal').value;
    const employeeIdValueFinal = document.getElementById('employeeIdFinal').value;
    const corporateEmailValueFinal = document.getElementById('corporateEmailFinal').value;

    // 2. Ocultar resultados y mostrar formulario inicial
    document.getElementById('results-container-final').classList.add('hidden');
    document.getElementById('quiz-content-final').classList.add('hidden');
    document.getElementById('personal-form-final').classList.remove('hidden');

    // 3. Reiniciar la barra de progreso
    const progressFill = document.getElementById('progress-fill-final');
    progressFill.style.width = '0%';

    // 4. Limpiar las respuestas seleccionadas (si las hay)
    const selectedOptions = document.querySelectorAll('.option-item.selected');
    selectedOptions.forEach(option => {
        option.classList.remove('selected');
    });

    // 5. Reiniciar variables del examen
    currentQuestionIndexFinal = 0;
    userAnswersFinal = {};
    finalScoreFinal = 0;
    preguntasSeleccionadasFinal = [];
    isFormSubmittedFinal = false;

    // 6. Restaurar los valores del formulario
    document.getElementById('nameFinal').value = nameValueFinal;
    document.getElementById('surnameFinal').value = surnameValueFinal;
    document.getElementById('employeeIdFinal').value = employeeIdValueFinal;
    document.getElementById('corporateEmailFinal').value = corporateEmailValueFinal;

    // 7. Reiniciar estado de botones
    prevBtnFinal.style.display = 'none';
    nextBtnFinal.style.display = 'none';
    btnSubmitFormFinal.classList.remove('hidden');

    // 8. Habilitar el botón de comenzar examen si está deshabilitado
    if (btnSubmitFormFinal) {
        btnSubmitFormFinal.disabled = false;
        btnSubmitFormFinal.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // 9. Limpiar cualquier mensaje de error del email
    const emailInput = document.getElementById('corporateEmailFinal');
    emailInput.classList.remove('border-red-500', 'border-green-500', 'ring-2', 'ring-red-200', 'ring-green-200');
    const errorSpan = emailInput.parentNode.querySelector('.email-error');
    if (errorSpan) { errorSpan.remove(); }

    // 10. Limpiar el contenido de las preguntas y opciones
    questionTextFinal.textContent = '';
    optionsContainerFinal.innerHTML = '';

    // 11. Reiniciar el puntaje y variables del examen
    if (typeof currentQuestionIndexFinal !== 'undefined') { currentQuestionIndexFinal = 0; }
    if (typeof userAnswers !== 'undefined') { userAnswers = []; }

    // 12. Scroll hacia arriba para mejor experiencia de usuario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función con confirmación antes de reiniciar
function restartExamWithConfirmationFinal() {
    Swal.fire({
        title: '¿Reiniciar examen?',
        text: "Perderás todo tu progreso actual",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00446A',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            restartExamFinal();
            Swal.fire({
                title: 'Reiniciado',
                text: 'El examen ha sido reiniciado',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

// Usar esta versión si quieres confirmación
const restarExamFinal = document.getElementById('restart-btn-final')
if (restarExamFinal) {
    restarExamFinal.addEventListener('click', restartExamWithConfirmationFinal);
}

// Mostrar resultados Final
function showResultsFinal() {

    finalScoreFinal = 0;
    preguntasSeleccionadasFinal.forEach((question, index) => {
        if (userAnswersFinal[index] !== undefined && question.options[userAnswersFinal[index]].correct) {
            finalScoreFinal++;
        }
    });

    const percentageFinal = (finalScoreFinal / preguntasSeleccionadasFinal.length) * 100;

    document.getElementById('quiz-content-final').classList.add('hidden');
    document.getElementById('results-container-final').classList.remove('hidden');
    document.getElementById('score-display-final').textContent = `${finalScoreFinal}/${preguntasSeleccionadasFinal.length}`;
    document.getElementById('percentage-display-final').textContent = `${percentageFinal.toFixed(1)}%`;

    // Aplicar clase de color según el puntaje
    const scoreDisplay = document.getElementById('score-display-final');
    if (percentageFinal >= 80) {
        scoreDisplay.className = 'result-score text-green-600 text-4xl font-bold';
        document.getElementById('result-message-final').textContent = '¡Excelente! Has demostrado un gran conocimiento en seguridad de la información.';
    } else if (percentageFinal >= 60) {
        scoreDisplay.className = 'result-score text-yellow-600 text-4xl font-bold';
        document.getElementById('result-message-final').textContent = 'Buen trabajo. Tienes un conocimiento sólido, pero hay áreas que puedes mejorar.';
    } else {
        scoreDisplay.className = 'result-score text-red-600 text-4xl font-bold';
        document.getElementById('result-message-final').textContent = 'Necesitas reforzar tus conocimientos en seguridad de la información. Te recomendamos revisar el material nuevamente.';
    }

    // Mostrar alerta con el resultado
    Swal.fire({
        title: 'Examen Finalizado',
        html: `<p>Tu puntaje: <strong>${finalScoreFinal}/${preguntasSeleccionadasFinal.length} (${percentageFinal.toFixed(1)}%)</strong></p><p>${document.getElementById('result-message-final').textContent}</p>`,
        icon: percentageFinal >= 80 ? 'success' : (percentageFinal >= 60 ? 'warning' : 'error'),
        confirmButtonText: 'Aceptar'
    });
}

// Descarga de archivo pdf Final
if (downloadPdfBtnFinal) {
    downloadPdfBtnFinal.addEventListener('click', async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const name = document.getElementById('nameFinal').value;
        const surname = document.getElementById('surnameFinal').value;
        const employeeId = document.getElementById('employeeIdFinal').value;
        const email = document.getElementById('corporateEmailFinal').value;
        const score = finalScoreFinal;
        const totalQuestionsFinal = parseInt(preguntasSeleccionadasFinal.length);
        const percentageFinal = (score / totalQuestionsFinal) * 100;
        const now = new Date();
        const nowPlusYear = new Date(now);
        nowPlusYear.setFullYear(now.getFullYear() + 1);
        const passed = percentageFinal >= 80;

        if (passed) {
            const restartExamBtnFinal = document.getElementById('restart-btn-final')
            restartExamBtnFinal.setAttribute('disabled', true)
        }

        const iconOk = "data:image/png;base64,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"
        const iconNoOk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAAF2ElEQVRYR62XbXBU5RXHf8992dfsbjYYI2WShhADsYGIwgxtDBGH8WWGDx0qzqit0nY6TjsD7WilU1o605FSP1QYnJahL6ND44yaMBJARypOZSoDWkWwAgbQIgilmu5uNtns7n19+mGTJXv3BgPt79s+5zz3/O95znPOXSGllFwDruNgjozgWhaKHiCQiKMoitftCxFXIyDzj6Nc2v86Q4cPM3b2E8zMMK5tI/QAwWSS8OwW6ru6mLn8TmZ0zPNu92VaAobeepPBLVv49/6/YmayCEVB0XUUTQMhQEpc28I1LVwpCSSv4/q77qH90UdpWHyz93EVXFGAaxX44IlfMrjlaexcAT0WR9E1r1sV0rKwRkdRYklufOxxOn/+UzTV61ViSgFG+nPe/s5DnNv9F4I1MZRgAPxd/REC1yhi5MaY9Y1v8tU/bSdcG/V6+QuwchkOrlrJxX0HCCXrQHg9rgLpUswM07BiFUtf6CUYDVaYfcv26I/XcmHfAUJ1/2NwAKEQqkvy2cv9vLtuA963rcrA+f4dHLxvNXqiFqH66rsmpGNjjORZ8tLLtH79rvJ6RQQ7l+HEpicRehCheYILgbRMzEwap2iUqt9jd4sFzEwG17Kr7ELT0VSXDzduxBgzy+sVUS7s6iN9bBC9Joo3V9IyUZP1ND74LSKNDVjZkctBhMDKDhNsmkPTgw8QSNQgLdvzAIkWS5A9cohze/eVlycJcDnfvxOhqNXnLiVWLk/7ho109/6ZnoEB4nObMVNphBCYqRSR9oUs3b2H23qfo+Nnj2GNZqteAiFQhcv5vr6yqSygcPEs6aMfoIUjlzdMRoKRSQMQnzefpQO7SXTcSC6VIrpgMT0DL5Fsmw2AmclUHcEEaiRM9r13GP1sGCYLyJ48gfGfNMKv0QiBHosy+MQGTvX2AxBrbae7r4+me1fR3d9HbUsjAP98dhvHNz2FHktUZxJQ9ADm0CWyH54q/Z4wFC7+C8ewEFMoF7qO4hgc+d5qBne8CEC8vZNl/X3UtTUD8PEzv+Xt769FShUxZetTcIsFChc+hckCpFWsPrPJSIkSjqBp8PfV9/PRzlcqzOdeeIbD312DqkdQQ8Erd03p4hoGVAjwy5cP9lieROdiaufOqViPty8gOb8NK5erWJ+S8UyXBWjxWoQqStXmx3i1x275Gsv2DHDd/NK4TZ88AUCycxG379lL8uZ5GOmpixBAqBp6vBYmC4i1NKNFw0jXX4AzNkZ8cRc9AzuJN80E4My237Cv6zZO/KEXgGhzGz279lC38CacsbznCSWkY6PWJIjOaYHJAuLtC4g0zsIZP5sKpMQ2TG5a/wvijePBt2/m3R/9BFEo8P6aRzj5x+cAiDa3Mn/94zjFgm8yXcMg3NRCcvwILx9BTZIblnWXNnoRoGgal159hczpMwxu/jVHfrgOJRglUFODpguOrXmE409vZ/j0KS6++hqKrvteQ9swqb9jOcGIDt5hlHrrAK/fcSciEEFRq6+RUyiixmPY2WHUQKjUM6QszwnHtNESMZyRHGo45N0OtoXlqCw7cJAbFn0FvLNgxpIeGleuwMxmfYtIDQWR+TxaOFK65xPapSwNm3AQmS+ghnyCC4ExMsqX7n2gHBxvBgByHx3nte7bMYfzaNHIle/zdBECJzeKUj+L5X97k+TsWWVT1cCvae1g0dankFYRp2j6ZuKqGB/TtqOwcOvvKoLjJwCg6b6HuWXzkziFUex84dpFCIEzlsMq2nRu3Ubrynu8Hv4CAOauXceSZ3+PFg1gpFKl/jBdIUKA62CmUoj4DBbteJ6OH3zb6wV+NeAlfewd3l+/nkv73wDbRauJjl8xHzFS4loWdi6H1HQa7l5B5682Ub9g6j8pXyhggk/37uLsjl6GDh3CGEohbbvimsvxiRmsv566rm5aHnqYphV3+7WCCqYtYILRTz4mfeQ9Rk6fofD5ULkPhBpmEm9ro+7WW4l/ufRtMB2uWsD/m/8CnNdfIjwdGEwAAAAASUVORK5CYII="
        const icon = passed ? iconOk : iconNoOk

        // function numeroAleatorio() { return Math.floor(Math.random() * 41); }
        // const aprovalCode = arrayCodes[numeroAleatorio()]
        const aprovalCode = await obtenerCodigoAleatorio();

        // Usamos un logo de marcador de posición y un texto de encabezado
        const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABFCAYAAABjcPudAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAAzbUlEQVR4Xu2dd3wdxbmwn5ndPU3dcu+9Y2yaMd10AphACJACKSQBLpAQSIAkcCFcSA+kAhdIyEdIgCT0ZkwxYFNCdcE27l2WJUtWO2XLzHx/zEq2ZGFsY7i5uefhd5Csszvb5i3zvu/MCmOMoUiRIv/WyK5/KFKkyL8fRUEvUuT/AEVBL1Lk/wCiOEYvUuSTw2jYUtfE+vWNrFlXQ0trgWw+IueHeKU9yJQm6F2VYdSw3gzuX0ZZaaprE3tEUdCLFPmYqW9oYv7CFbzxxnremb+S9bVbKSiPfBjRls3ia4PrJEkRknRTJCsqSZemqSoX7DdpBIdPHcWh+w2moiTRteldpijoRYp8DBhjqK1r4p0F61myvJaG1jyyNENJSQo3nSEXGepbFGtrt9CaN9RsqCfbsAW3kMeNQrQxRE4CLTwqqysYPLCcs48bx1nHTqQkk+x6uA+lKOhFinwMhFHEho11eIkM1VWVpD/AAzfA5iy8Mm8lz8zbxLzlW6ldvwnR1oxEI7WLkpI2oSgpSTJlaC++fd5hHLnvwK5N7ZSioBcp8jGydWsjNZs2sn79Wuo2N1DI+xitSTguPXtVM3BQf0aMGEF5VU8A3q/Nc+fDr/HSvI1s3NiEKwRJEyAcQc5NEmiXoX2qOOe4EVxy+n4kdzGcXhT0IkX2MnV1dSxYsID58+exevVq6uvrCcOQIAhRShGG9qfWGoCS0gyT9tmHE44/nqOOOBzhJpn73gZuunsuC9Y24UQKD48wGeEISRSkECUenzmsDzecdzhl6Q935YuCXqTIXmLFihXMfnE2b7/1Nrlcjq1btxJFEWDQyqC0QmuF0hopJVppwjAkl88SqgjP8Rg0sD+XXPwfnHDiKTTkDNff+hSPzV2BwcFLuoSuhydAa5dQGz573Bh+/OWDSTmi6+l0oijoRYp8RDZv3sxTTz3FwoUL2VizERUpK9zaoLVCa4PjOKTTaaqqqqisrASgtLSURCKBUiEtbW00NbWxZtUKWho3c+BBB/Gf111PaVUvLvvZEzwyexFushRdVoZyIGkcfJEkSDhcePQQbjhnv66n1YmioBcpsodEUcTLL7/MrGeeYcPGjSilYkutiJQiiiKklPTq1YtevXoxduxYhg0bxqBBgygvLyeVSuG6LlprlFJkcwXq6up5581/MuuZJ8n6Of7r+v9i9IRJXPzDh3h89lK8qp4EPSoRRHjSpU1oKsvLue708Zx76JCup9hBUdD/RWnNhbw9fxmbN9czaNAA9p0wnJKU03WzIv9D1NfX88gjjzB//nxaWlqsgMcC6/s+URTRu3dvxowZw1FHHcW4cePIZDJdm/lACoUCjz3xOC/Ofp5vXnQhfYZO4LzL7uXtpZuRg3sjS8uRQoMLzdphRK9e3PfNgxlV3X2uvSjo/4LMW7SBn/3m7yxesR4/UqQzKUYN6cl/XnY2E8YO7rp5kU+YZcuW8eCDD7Ju3TqCIEAIgdaaQqFANttGJlPChAkTmDFjBpMmTeq6+26xbt06nn/uOT592qeYvzzHFT96kE25gPSQUUTJNDgRkeuSD1wuPHYoPzp9XNcmoCjoHx9+GHHbXY/y/vIaEskEhvg2GwkCAt9n2kHj+PI5x3bab/naeq78wZ94+a13SZeXI02GSOeJoiwHThjO7T+/lEEDqjvtU+STY+HChTzwwAPU19cjhA2ARVFEc3MzuVyWPn36cuaZZ3LCCSfgOHvHA2tpbaWxsZ6hQ4Zz1Y8f5M8Pz8cb0Ac5cBiRNEgpyRrB0F5l3P6lyRwwsKRrEzjXX3/99V3/WOSjk837/PK2x3nu1eWsXNfA+6s2s3RlPe+v3MLSVfXMX7KG6h4VfOqYzkGU3975GI898zap8hSukLjGxXUUeB5b6nzK0g7TDhrbaZ8inwxvv/02s2bNYuPGjTiO02HJ6+rqyOWyTJ48hauuuor9998fKXcxwb0LJJNJKiurAOjXuyev/HMVm+vqSPaoRKdLEUhEwqE+BwkdcvyE3l2bKM5e+7iw2l7jOAZHGvuz/XdpcB2BaLfyMWFkWLGilkgoBB5SZew2QiOli9KaBUuWobTqtF+Rj58FCxbw+OOPs379ehKJBI7joJRi3bp15HJZTj75FK677joGDty9irXdZcKY3hw0oTduLkA1bAFHEjkernHAhLy9oYV1zWHX3YqC/rFiYle9WwzQOffpOoIeVRmEkBgclAyJHB8lQGgPoyP69+2xV61FkQ9n9erVzJw5k+bmZhzHQQobeFu1ahWFQoEvfvFcLrnkElKpD6hz3YsI4JTj92dAZQVq0yacQgHhuUhtSLkOKxoVzy3c1HW3oqB/vOxYxCDFtj+bLt8LATNOmcrAPj3IteUIZUBkDEalKDQXGDFwAKeddBSim3aLfDw0NTXx7LPPsnnzZoQQOI6DwbB82XKiKOJzn/scX/rSlzrG658E++07lAF9ShAtrciGRhJxj3CNoK0Ary6rR3WJvBUF/X+Q7rrGMYdN5spLTmP80N5kTJIUKVLCMGl0D6765qlM3X9k112KfEwYY5g5cyZr1qzBcRwcRyKlZPXq1TQ0NvDpT3+ab3zjG113+9iprPQYN7EPCQFm8xZkFKFcwLgQaVY2GWrbOg/vioL+MbHNcHcnzh+MAM4+7RDu+tXF3HTlWdx41dnc9IOzuOO3l3DyCVO6bl7kY0JrzYsvvsjSpUspFApEUUQUKZYuXcry5cs4/IjDufDCC7vu9omx78TBRMqnZeMmcs1NZHVAPjRoFbChtcCq+rZO2+9xei0INEEUgTEgoHQP5sjuCgVfoSKFESAdSSbpdt1kp2RzQUfIy3Mdkom9k/LYHm0glyvEMu2S8FwCP89ZF/2EdxbWk065YCIwAoQ9fi7XylkzDuO3N53ftbl/SQqFkEjFpZy7UbiTy4coZfBch9Ru7LcraAP5go8xAoHA8xwS3t6xXfl8njlz5tDc3Nzhlre2trJk8WKqepRx7rlfYeDAQV13+8R4//213P2XF9ncaigbMxKnZxVhJEFoUgmHz02q4oCRfTq23y1Bz/sRCxZvYNbz7zB/8TJcL4EyBoGhvCTJlEljOOSg8UwaNxDnI9zvzVuaePPd1cx5ZT4ba5owShBJjevABV/6FEdMG9N1lw4iDYuWrGfuq0t4972ltOYKGOlgjCbpCYYM7MdhB+/LgZOH0bNq1yuVumPJyg08+/wC3pm3iiAIMMLghzBl7GAuveAUvnjZL3h7fi2plASjOgTdCChkWzlrxqH85qavdbRngHnvraW2oQW0ipWCwTECIw0RDgOqK5g8YeDuOgoUfMWWxlYQBiEMRkE6laC6R2nXTTvIFxSvvvk+M59/g5pNjURa4DiSXtWlTD/iAI6cNo6q8h0VfHNrnmfnLOCFl96lobENcBFCM2hAD446bApHHTKRkvSeCX0YGd5bsoZXX1/EvAVryOYjDKBdjVEB40YN4rCpEzhoymgqyj/a8/3fjDE25tPOLgl6W97niVlv8sCjr7JmbQONzS34kUJpG0EyWiOFJpNM0Ld3BWOH9eXcs0/kmMN3L9+bK0T8/dE53P/Qy6xcv5VcPiSMIgwCZRRJV3LDd8/ha1+Y3nVXtIHnX1nEPfc/z7JVddTVNZDzA4yQGCERgNERnutQWVHK0IHVnDPjUM45/YjdtgILF2/g7vtm8sb81WzY1EwhH6EFIA35bI5jp43jrt9cxlcuv5m33t1IMuV2L+inHspvfrRN0P1Ic/l1d/PYzFcoKcmATmAEeFpipKIQGY48YDR3/foipNw1SX9/+QaenzuPuf9cTkODb9WJDAnyiv32GcxPb/gqXjczn/757kpu+d0/WLS8hi0teZTWICQYgxSCitISRo/sz/lfOJpPH79/x36Pz3ybW//8OCvW1pPNKaJIxfkFg+dJKstKmTR2MJd87RQOPWD34g1PvLCIvz30LMtWbGRLQ5ZcXmFw0FKh3AKO9kjIFFUlCcYM68EZMw7jzNOPwtsznbJLLFrXRMNWH0KfUqHYZ5/BGCLWrl1LNptDawiCAoVCngMOOJB0Ok1jYyOFQgEhBMYYEp6HAVpamgnDCNd1cV03jgu4cTpP0rOnnbO+J3yooK+vaeKaH/2JV95eTWs+xHUMCVcikPbxGQEChNEIo/GVTxgpBvXsy8nHjuM73zyTstIP16zNrQHX/+TPPPLkW+S1wEuBdATS2DST0oaUk+AHl57BV885qtO+La0Ffnnr4zz09Bts3tKMmxQkXAfHSAwSIwQgkUZjMCgd4gcRJckEJx0ziWu+czZ9e9oZRTsjiuAvD77EH+59lvdX1uMkUiSTCmSARgISv1DgqKnjufXHF/Ply2/mrXdrPtiidxH0fKC46Mo7eOyptyitSKFRaASudkAYQhVwwhHj+MMt38KRO++9uXzAXx56kT8/8DxrN24lUhq0ixECLRWFrM/0aWP4651Xk050VnT/eGwuv7r9SZavq8NLJUlIFzD29A02/RdpCn5AZaXHF886lM+dcQL3/+05HnziTdY3NpFMeLjCRqgBGxc2oCNFLpdl+PC+XHvF5zj5mMmdjt0dW5tz3HzrI9z/+Ou0teVwXRfpuRhhz0micY1GGw90EqU0ftBKSVmKU447kGsvPYNevcq6NvuRqGsLuOlv7zJr7nr8LVsJGjYztiLJPXd8A2QLP/nJT1mzdi25nM+m2hq+8PnPceIJJ/H222/j+z5K2WBZIpGgpbWVJUsWU8jnyWRKKCsr6/hkMiX07NmTKVMmM3bs7hnO7dmpKVtdU89l1/43Tz+/BD8ypNOGhCsQWlo/UxsEGmGM/TcS1y0hWVLG5uYG/nT/HK656X5asjsm8LcnjDQ33PIAf314NtoVpEtcHAmOVjg6xI0ErvaQykGYzh28Nedz5Q//wJ/un8PW5hwlZQ5Jz25njPVhhNGgNVanGRzhUZIqxcfhgade45Jr7mBNTVOndrsSBCE33vJ3bvz131m2fhPpigSJlE2QOcrFjTzcyIPIQShpPR0jrHB/AFYBbUMACQEJBxLCwZMunitxpYMrPTzp4UnrneyM5pYcV/7wj/zot4/w/rpGhJMklciQTLkk0w7JVJJUOoXneju0NfuVhfzslidYtS5LqrQM6QrrBRgr5GBXMhWOQyZTSq4t4g/3Psf5l9/GHffNZXNTnpJUAkeYOHxjh3b23guk61FSUcWq9Y3c+Iu/MXvuwi5n0JmtzTmuuv6P/OHPz+P7IalMCtdzEMIqD2kEQrugUggjQfrIREBJWZogirjvb8/z3ev/Hxvrdv58d4cA+OETi7j12VW8X9NCXW0dW2oa2LgpSxQHuzfV1rK5djNr1qzhiMMPZ/pR03n44YdZunQpq1atYv369WzatIn33nuPv9x7L2/88w1qajZRV1dHbW0ttbW1bNq0iVwuS3V1D0aPHt31NHaLDxT0mroWvnP9Pcz550IyZR6O1AglEUaA1Gip0I6yP2WEdiKUo+zDVAaZMuhUkoefmsf3b7gb34+6HqKDx2a+zmOz5uKVpJGOACWQKgnawwiDMBKhpa0Sk9vayeVDvnP93cyaswCcAC8hQEuEFoBGOxrtRGipME4Q/x5ZIUQh3YBUppQ5c1dz5bV/YGNtY6fz2p7/d/8L3Pvgc+SCkEw6BUbhaGOPZVyEcbZF2oVVKEIEIIKuTX0IGiOs5yGMRKBA2N5jkBjTtZ5uR26961GemDkfP/JIlSRAqrhwxypoYYjvp+yUy9/SlOW2Pz3N2rpGkqVJhI5w0B3PV0ttP05kvSwRIRMZFGmWLF+NEgonITHGASHj7TRKarQ0KKlQMsIQkcmUsXJ9Pb+540GaW3Kdzr+drc15rv7h3Tzx3Dt4JeU4Tgq0C8ZBGCvk0tj7HUmFkgojFQKNUZoUCcrKqnnihbe49qZ7qNvS2vUQe8TapgJz1gREypBOGjJuknKSpGQCIWwKLplI4roOvXr24ozTP8NLL73UsRCFMQYdG5558+bR2tpKeXk5iUQC13XxPK/jM3jwYKZPn/6Ri6S63VsbuOXWf/Dqa++TSVfiCKzVjjuGRiC0g9Qu0ji2Q8Y330EhjcBoD+MZTFLw1LNvcfd9z3Q9DADNbQX++uALtLYqXFluc4EixMgcRkCkS1DSoESAEgot7PI7AH+8ZyazXliEUi6OdGP5kmgECOt5CO0htYMwLkJLpJZgNEYoHGNwtaA0XcIrr7/Hz259sFshevn1pdzzt7nk8pKETCIicBWAwjgKLTWRDImc0CoVYay10R7SeLaRrqaz+z8RSUnkgBJWoI2IlaowKCnQcdT+g3hnyUYefvYNtIlICZChQBjQMsJY9RE/wShWINuu+PGn3uCdBWtIlkmUaEMicbSLNNLeQ+0itBf/FBgZoFwfhCDlpfCERhDaczbS9g/lIVUSqV2EEfFHAhov47F07SZefu29TtfQzu/veoonn52Hmy7BuAWMDEG0n7cGdIdHKYW2Rkh7GOMBEi01yglJVZTz7OzF3PTzvxEEH2xwdpVCm4/vS5CCwIlo9jwCNwK3BSE0Wmt836e5uYV+/fohpWRjzUaMMfGSUgFaazZv3szyFcvRRpPP5ykUCvi+35HO69WrFyeeeCKeF/ehj0C3gj73zZW88NpSpCuRwsVox1pBqbFiJtACQh3hRwGhAY19kEYotDRI7eIqiSsNvtbc+8jrrNywo/v0+rtrWLymDs9zESbueO2mUSqQCu0YbPd2IHbdV6/fwt9nvokf+bjSKhsjje3QdjhoP9ohDARRBEhpvxPxeNm4IAxGBshkklkvLeWp2Z07nR8a7vrrbJas3EAinQZjq5CMNGih0bFbKqQTHzP2KhA2ut2umLrTIN38zQiBMNbOCmzpqzBerGjt/RE7GQ68MGcBmxsKyKSLESqumZIYYUBYJYwWaMdH48SxFsgVQp544S3a/ADXOEjtoIVVDBiBwQFpCLWP1nGaUAukNvG5xdsYidAghINSgihSaGnjEo6J7L0TII0hIQSNLQHzlmzsehnMX1zDrNkLUY6DIzWOtoFAjLRDMeFghENkIoLQECkbMxLGtZ6nCDEiQhgHzwhMyjBz7nyeeXFB10PtNkJIpKPBcUgaB9dEVvEpQaQVnptgzOjRjB03lrHjx9LW1ka2tQ0V2cUoVLwohe/7jBk9hkn7TGL8+PGMGzuO0aNHdyxQMWPGDKqq7GSWj0q3gv7wYy+yqa6BRNLDxJ2rvVNKCWiB8kN6VSUY1K+c8lQaHYDBxRhpUziG2K01JBIJNtZu5elnXu16KBYuWklLawHHlYDVtkYJ246x1kf7DiYA3w/Qce34ff+Yzcr1W0gkPTtoRNt+gLBpBeOiIklZqWDggDQ9q1IEfojRCRDx5PxYI2g0biLB1q0t/O3BZwmjbV7Da28tZsHClaRLMkAIQtkAk5EgEkgSoCSmYNChJir4REGIMbFYCt29RH8QHXouVhud/r3ztrQxLF2+hkIhQEgRhwe2KQUjDQoBJMAk7fOKv9va1Mqmukak48bCJCD2AbQAcFBBnt49kpSkIrQKEDig27uQXTrJPjNBFBRIuQF9qj20arPjBSMxaBBxXAdwZIIFi5bi+53jOI88NpvV62pIJr0O5Sba+6Kw/SryfSrSKYb06UmP0gRGZcFECBEPU7BepjAax5FsbcnxyJMvE233fPcE5Qq0q3GCALemjuSmepwWH5RLLpenV+8+XP2973PnHXdy7Q9+QDqdxHNdgiAgDEPCMCSbzXLQQQfxyCOP8Oc//5nbbruNX978S2688UauvvpqLr/88o8UfOvKDoJe39DG+8s3oA3xQ1F2zCisxtQqgjDL0VNH8qsbv8EfbrmMay/7NKOHlKBUHiPbNXzchYzV7kHg88KLb9Hcku90vDXrajC4sTtndxBIG2Axksgv0K8yzcnH7sv0w0bQr1eaMFS89vYSgii0KYo4+oqRtvMpA1HAmGGV/ODy07jzV5dy8w1f4dADhqKibMfqm+0IsClCR7BybT3LVtpJAcbAzGffoHFrDtfBCprUNohmPIRy0X5EylUcffgwfnjlF7jwKyfSv4+HUiEGBxNnJz4J2try1Nc3Ih2rJO0jaA+kGZSxllhFEfmWHEJbscfaQhyxfXews+aMHQgRFSLGDu3HrT/5FhecdyyZhEB3KahuLywJlaIsLfnuxZ/hlhu/wdABJagwwpCIb0X7fpIwUoQh5PLbSjbrGrK8s2gFkdEdyWAbs3DBeGjjEhbamDiymuuuOJu7fnUxN179eQ6aNAgdZWOH3rOelbFelTESKT3WrK9n/U5iMbuCk3BJNLZgFq/Cra3DiUJM0kWWpHFTtq6gtLSUqqoepNNptDZEKiIIraDbKruIiooKqqurqayspLKykvLycsrKyigtLd3rE2R2EPQVq2qprW/D9RLbddDYrBiDjiKmH74Pv7/5Uo6YOp4JowbwuTMO5bZbLmbkiGrCKOoIRtmPiKPfki1NPo2N2Y5jNbVkqalrIgxV7ELGrq6UIByiMKRf7wp+/J/ncusvL+TOX3yTE47cj+WrNlHX2IzrSGtdO45nXfhIKcaP6cMdN/8H58w4komjBjL9kPHc/otLOfKQkaigS/AnvjzPcWlozLN0pXUls3mf95fXE2lho8daWKskwAiD1j7lJZrLLjqV22++lPPPPpwfX/1Frrv6q7iuAG2Q2yu9zofcZfm3KSoRi+MHU/AjcvnQynaHjGwTKmk8VCHHoD5JPjvjIM6ccTCJ9uGfsHENOk4rPm8BCkU67fG5M4/n4P2GcfH5pzFuzGCiOEW0PUIICoUChx48ha+fexyHTx3PScdMw2htlZ4hHoJYjI0EdLpH6zbWU9uQRSS9jriLteJ2CBmGAftPGc7tN3+bM2ccyvgxfTj1hAP4/c8v57CDxxKErWhh4zDWUNnIhOcmqGvI8/7Kmo5j7Qky5yPW1FGW9UmWpvArErSVJ4lK09Yj6kIURQSBteRRbNGDIKBQKHTd9GNjB0Ffv3ELvh/3fCvd8Q+rwXtWl/P1L59KWUnniqjRw/rzxc+eSjpRjul4jtsEXgiJHwkam7cJemtbnpaWPC5xKkxgx8zxQ9c6ZPLEERx75D4ApBIenuuwclUt2azEJbntHMEqFQ1lJWm+8NkTGD6kb8exAHpUZLjsgnPo06easD0Psh1CCJpbWtlQswWAhsYWGlsKGNfm422MoD2ZbNDG59CDx3Dhl08iuV3ApGePSjzXBgeFCTvOr/2W7lxcPwJGoLVACGmt6/b6xYAJNT0rMlx75ee569ff4uxPH2Jn0+0EAaA16YxL/wF2vKgiRcIV8bCk+wY6FAgwesQA0ukEWhvak4MdsQsbI+/UzoYNm2nLqW21AvFwEMcnopWy8iQXfOV0hg7q1bEPQO/qCi79+mfp17cKP/JjA2A9EmkEriPJ5kNWrtoxJrA7RNk8URgQ9CilrTwD6RJEqgSdSmG6uaFKK8LAWvIwijoE3i4F/cmwg6CvXrueKNI40lqvjgdgBEpFVFSkGDCg+wqdMSMHk0l66Ehs17RVFMKVtOVzrFi1pmN7KR2k8GzEtN393q53SiIGDNwxGBFqQ2CsYArTbiWsq6lVSEnaYcSw7hcAGNCngtKSFKaL+96OEAYnrhTbtLmBXOijpU2RCUNHqksZKMmUcuQhB3bavx3huGgScQbA/s0Qx5Ni3RR1o2w+CkGk0UagDR3WuR0BhFGWyZNGcfxRO5kc03H720/aAe2ihSLSPli5J1Lt7W+vTbYR6bBjqqTA1mAjw3hI0UUYBB3KHSBSBh2HX62ylBgDWoA2ipJ0in7V5ds1sI0+1ZVUV5ZhlN42Ttc2wAkRCkM2b69jzzHIVIJCaYagpBQnWYabzEAmjegmDaaVJoxiix5FRFFIEL/E4ZNih7MSwrpJQtsb317UIdofhdF2nN4Nixa9Ry6/FenIjiBSu6BrrShJZ+jfbzsra0QcRDPxxASw9k4jjR0dar3jsbSIMCJEy3A7t9b+X0pJNp+lZnNt190AaM7mCcLCdgGbWBDba8CFIoqvr3/fXpRmUhgRxb0xtuaAMIIoiNhc39DlCJZc1qetzUcID1RnpSm0xnEcBvTv7HF0pnsB2hn/fHMxm2obbDrGdFZkBnA9l+HD++7EiuttwyCr1eK4R3v+3nYXm1FwOq5nR0Sn74wRKB0P6eJgXcf3HcOubRgEkQptjAhbcCOQGJ1CiAx+IaS+fscMDkAun8fPBbjCizM02xSSMBrXOKS8HevzdwtXIlMJEokkIpkhTKXxSzKYTBrTraArgljI24U9CIK9ruh3xg5nJaRAiSiWz/ZQTKwRhSQIDNKoHQIxi1du5i8PvkyuECCcbWUYRhrbgZQmKQWD+m9bz8rmc/2ODmT1uoOjDUiNEglMh+XYxqC+vSn1kiijrQJq7zfa4EiXrS0FHnj0ebL5zpFcA9z7j9n25XeuZ70BIW0aSRjQ2gZRelhrUV6aIeO5SEXHLD0rsOAIgx8UeGzWHNZsrO90HIAXX3mPzZtq8Tw3LqjZJujGQFkmxdCBnV1P4n5vaI+Y7zrzlqzjv++ZRWtbgCslyLjiIc5dA3huKfIDCnjahdmeoy25tT1AAQoRFy6BdbtNnCHpJOvxaEEIqwjbv9JojLaVgqa9XWGfvzQGI5xOw5khg/tTWZ7BKPuWE2tgwKBxJDQ1NfLXh2aT8zsrM23gLw8/z5qNtSTdRHwvNQZhC3Y0pB2XYQN2vO+7hXDIl6YJShLIVApTkiAqS6NL0t267lpH+KF9FVP7eN0WznTvVX4c7CDo3SNizYoNangOd93zOLfdM5M33l3JrXc9wTe/93uWr6on6ZXGT3u7B2QcjHapKEtSVblNm1pdHW9kn6T9dHzfPSOH9aFv71JUAOB2dByk7YCpdJpXX1/KN6/+b95dvI5cYFi6qpbvXHc39z30MjhJhIyAEGFUh0KLtKEiU8K4EXYh/PKyFEMGVyKFE0f2rVVqjyIkEmWsWNnApVf/jmdeWkBDs8/WVp/7H5nD7/7wMK0FH+MIW83X7rqiUQpSSUH/fntWf90e3V6xspZ77nuN/7r5fr5z3W0sWrEWL5HosObtdf5GCLQxOET079f9sOtfiSEDq6kqT6K1iLM99nqkULau3Uvy8qsL+Pb3bmPB4hoKPixbsZmrrruLhx57BSOcDgMjiGsxkIRaUF7pMHzYRxN0ISWkU5hMmjCTJkynIZ2C5E5c9zAkDK0lD8OwIwL/SbHjWX0gAm20XZjQSbDw/Q3cdPPfufh7d/HL259m0fJaEskSwBaLtI+5jHCJ7S4HHTi2m6mDcVAndol3hR5VpUwcMwCCyKawhLRHE3GOFoHjpXjyxXlcdNWtfOOK33PRFXdw/yOvUVAC6dnIqGivrjIOEpdQwYghvZkwagAAUgoOmzqejJfewbMw0ioH16tg3nubuOI/7+Rrl/+Gr1/+W274+X2sXNOAm0rHFlFjpE1VIQSRHzFiWD+mTBrRqc1dpX0e0jsLV/LjX/+N2//fcyxeVoeXLOmsHoUVdoRNi/bskeHg/cZv+/5flN7VGUYN74XWduiopR1v2zkVBiESaJHiyWff4tKrb+OCK27jwstv44FHXycfChxv+5cY2OcmSRCFEaPH9mHEsH7bfb8HSAeZykBJmrA0Q1RWagNyabveX1eUtgUyYbQttdYenPuk2PGsuiUOqLVfhI4oKSlFk2JTfQ4tEiSSKQSRLa2M97FBJ0EU5BkyoAcnH3fA9o3G7OjqbE933wrgzFMOY+TgPkRhLo5wWRcRAUIJBJJkJsmGDW08+/xClq2uJZFK4DrSut/GidNxLsK46EhRkvY49aRpZDLbQsZHTpvMqMH9CPwIhBsXiAhb/ipDjFB4iRQtWcNrbyxl7mvvkytIEqk0EmuBbFrJsS68FiRcwaEHTqCyNN3punaV9jib43n42sdJJkmkShDaYbsK4Y74igHCyGdQ/woG9NsxuPmvhgC++JnjGNK/B0GQ3zYUMLJjCCQcFy9TysoNtTw9+3WWr6vFSZWAa9cesEjAA+OiI015SYJPHTeNdKr7t5nsKkJKRCoFqTSk0ph0EtIZ+7duOqzW2qbXAptWC8IgHqP/ywm6RQhwhMSR4LmGRMLFcxxEXOPcXrnU/p+tPY5wdZ4zTzmQ/ScN7dqkPQXTJRW0C0zdfzSfOn4SJmxDYquuBLYM1d5t2zE8N0FJaYpESoHw7UQIZYtx7GHt8CHy2zh0/2GcemJnZTSwXwXnnXUYPStTqCjqqLayRBgZooVNBaXTZaQzJfFccWWDbkbaMa82SOORa8syfmxvPn/m0Z2Os2cEODKwmQBjy0S6ekZCaNAhSU9w/FH7UVG2dwsxPi6m7TeSE4+ciGMC26dkZIciCOshoTBC4SY8SkpLcTtKfq0HZT/tQ0OJX2jh8Gkj+NTR3WdJdgfTHluVTvxxwXHilT93pD3q3m7No9B+/kej7ruKNgZj7BhIYGckGeHYJmP3WRiHQq7A1CnjuPC8E7s2EY/LBQI782t3Of/ckzhk6r5kW1qRyI7LMdI+ZKEBGVjLiws6aevIhZ14YYRBu4ZckGX0iL5ceemZlJfsqO3POuMQph8xnlAFKKO3zVZrtzJa2vJdEXZMdLGuugTtIYxGOorAD+ndq4qvfflE+vXes/H59ggkGGuxQNq5AdsLulFIDIVsC5MnjuWMGUduv/snhhDbhnK7w7cuOJ1D9p9Ers23MRJprJcijDUuBoSO5z8YYdNoSlqPTsf9wDG0ZXNMmjCMK/7jdErTH32CiL2W9sxEHAXEWOXSTUdWKiLwrSVvL4ENwuBfW9DbH5cU9mNnRUUI42GMREsw0kVrQZDPcsiUcdx4zTcoLe3ekkhjI8NWSVgdrJFoI3A+JCrZt3c5P7z6PA45cByFXA4dxcIubemuHbPHE1i0Z4UiDqppx0Zj8y1ZRg/uy39973wmfsB7zRwpuObyz3PktImoqECkA4wELdstBtgxpO2E28J1BiMFRjoUCgHphObr5x3PZ048uFP722PnV9v0pPVKHGvBhEbGFXrtxzQ4dqZWPDnHWjFbT2DjHi7ZrM+QAf255Ksz6FHR/TOw2KCkEQYtQytERsYRdjom2tBhJ9s76baeLdjWQbbv70IbW0Akbb2EHdYZtLCVjQJbvdaV6qoM3/v2Oew3figqn0MbOw1Vy3htAW1nyNkZdttC/kbaVYUMgmxrCxNH9efaKz7PxNHdP9/dRWIQwrXDgvYSICMQuN3JOdoYVLStSGb7zyfFLgq6sONg7GpCIBBK25e7S4GSBmlSCCFQQpPL+giT59Tj9+W3Pz2fMSM/IMopBMRziBXx2AuNipd/ctDdBje2Z/zI3vzshq8y/fBRoHLksyFG2Ui8vTw3Xk5KgaPiiRwpfN8QFXIctO8QfnrNuRw+dVTXpjvRu7qU3/3ofM4+7QBK04ZctoBSCTuLS9ioupbW6tjrsHOyg8AnKOQZOqA3137nLC4675iuTW9HPI1TOzZajsAYDy0USoLUcalo3JtsubBdqslgMDp2bYVLFHq0teUYNqSSq771GY47svuX73VgwBiJwUULjVAJhE6ghYMRSdu94yGLMXFeGy9OBbZH9q0FMMSdPpZdiYeJJKp9GGNctHFRJK1yNHar7pg8oT+/vOFLTJ86ASeSBLkQrRyM8EAKhBOAzGNkYC2+tPcgiiIKbW0cPGUcP/nBuRxx0J4FPrsjUoZ8EEEQQuhjQh/8AkGo4kKdzmRzBZq2NtLc3ExTUxNNzU00bm2ktXXvzI/fFbq/uzsjtjTZQJPzQ4LAEEWCQiFPPt+KqwMmj+nHNd85h5t//A0GxmWT3aG0JjIR+aCNKPRt6iEIiMICQeBT8Av44YdrvVFD+3Dbzy/l+5edyaSxA5Da4Pshed8nCCOCQBNGBt/38cMc2s8xsl81X/n80dz+q0s55KCdC3k7PatK+Pl1X+cn15zPwfsMo0RoglxAvhDhRz5hGBAGmiAwBL511fv0KOfMEydz5y2XcN7ZR+PtbAEzAUZGFKJW/CBPGPqEQcG6fL4N4LRl7aqnYMvzQt+P0zYGXwnyfoFCLqDUy3DU1FH85idf54xTpnY90g4oLXBxibJ5dCEgDPJEQR4VBASFPGGQR0U2B28QFPIhYb5AGBSIAp8o8AmDgDDwKRRy8RDJth2GEX4hRxAWKAQFIj/AFHyMXyAq5BFKtduRbhk/djC/v/kSvnvx6ewzvD9pA5Gv8IOIXBSQ0z6FSJP3FYVciPYLDO6V4KLzpnPbLy5karw2nfqAQq/dpbI0xYzJPZkxuZLTJvfitMm9OXX/ak6eVElFZsfnO3zECE448VMcc8wxHHvssRxzzDGc/KmTmTJlJxWKe5kd1oz7+e8e4va/vISKQoR0UMKuQio0+DpkSL8KHv7T97n73md4dNZ8hOchdERFOsOgwT3Zd58BfOroqQwd9OH52pbWHPc/MpuaLVmk9JBxkXy7NXNQHLz/OI45bGLXXT+QNRsbmD1nHu+9v4FFyzbQ1lawgTejKUm59OldyX77DOP4o6cwYcyeL9fb3JrnxbnzeOPdFSxYspaW1hCtrOOTTEqqK9PsM34Yxxw+hWkHjuxakdotkTY8/MSrLFq2EemJ2FV37AovRuDJBKOHVvGZUw9HCHjymX/y6ztmkg0MQiqMllSWJxg+uAfHHXkQxx01eZeXZm7LFrj/oZfZ1NCCEGHsPQi7OoyCivIkJx19EGOG9yeKIu5/+EXW1LTalGGnLmSt6eSxgzn9lGkAvLdkHbPmvEtzPoeDxNE2K6KFQKmAIQN6cPbpx5DehaW8123Ywgtz5vHqm8tYvX4LBd+ghULrkNJMhj7VFUydMpLph01g4jhbD9GOMWavvVHFhp23DWVF/NnZ3d6bx99ddlHQ7XjNVwGD+5bz97uupKw0zeq1tQjp2BxtVSWDBn64cH+S1DW2sbGm1pZrGk1ZaQmDB/bBc/fuzW5qybN+Y71dKdUY0qkEQwb1IbULHfej0NzaxvqaBpRqr/M39OnVk/59Krpu+m/J5i2tbNrUYIcLOqSioozBA/rEU4p3jw0bNlBTU0MURUgpaWpqYvXq1QwaNIiTTz75f0xA/UDx1JOv0lTfhJ/wSPbtg0qlcLXAldAWaQ4e1YfJQ3b+Ku3dFvSh/Sr4621XMGTQjq9mLVLkfyuLFi3i1Vdfpba2tkPQZz07i57VPbnzzjsZPnx4110+Ee780wvc8btnaG32yQ/sS2b/STQrSDtpAgMDe3r8/gvj2W9wj667dmK3xuh2eC7igFyRIv8+jBw5EmMMLS0tbN26FYC+ffuyceNGHn/i8a6bfyK8/c4q7rjzMeqaW2nzJIm+vWgLA0SoyBfy6MjwhWmD+DAhpztBl8ZFag8t3LgC3KaplFQopUmkkoQ7HYkUKfK/j2QyyaRJkygtLe1YoXXokKGkUimemfkMdXV1XXf5WNlY08SPfvkotY0hQcbBGz4CUVFNFIa4JovO5ThxVIqvHdY5DvFB7CDotvDDBxEijA2cYAQyfpGAa2wgpUiRfzcmTZpEjx7WOkZRRGlpKUOHDmVTzSbuvfferpt/bDQ257nqpn/w1vzVJFxBsmc/ZL8+FLTBCwX5QDB6SBXfPGUsqV0MA+0gsXaWli1jsHFEF2ESthoMu8Lpbs+hLFLkfwGZTIbp06fTs2fPjpVaBwwYQGVVJU8//TRz587tusteJ5sLuf5nD/PCa8shkcDr0ZfMgIH4Mo8hRGmHsoTHpScOY9+hH+6yt7ODoPuFCJWXhAVJXuUpRD75yCevCuSiPL6JUPG0wSJF/t2YOHEi48aNw/O8jhLVoUOHks/nufvuu1m6dGnXXfYabfmQ7/3yMZ5+cTEpRyCqelEYPIqsl8QLFSqUaFfwlaMH89mpuxcc3CHq/uhTrzLzhQUo4diSRW1nXhknIvQVg/v35j++dhK9e3SdblqkyL8HuVyO++67j3feeadjxeDW1hZqa2sZMmQoV155FWPGfLRXJHVla3OBa255jCdfXowOBYlMGaK6BzkvEVeJKsDjjEMG8tPzp5Hq5sWYO2MHQSeuzRVC7FC3a4s7O/9WpMi/I01NTdx///3Mnz+fILDr5OdzeVpamunZsxdf+tKXOOqozi/73FNWbmrlP295lDlvLEOSQpaVocrLQRg8I4gEFDzJyfv05lcXTKesm4lXH0a3gl6kSBFoy7bx17/cx8KFC2hs3IrjOERRSCGfp6y8nEOmHcIJJ5zA0GHdTb/unq7Vcc+9sYYf3fMy85fXUi4SeIk0QQZCx+CZJE4kCT2Hw6f04jcXHEn1Hk4zLgp6kSJdWLN6AxrD8GGDMFozd/bLvDj7JVauWUs+LKCjEBMpHM9l0OBBjB0/ngMPPIDBgwdRVVm1bWUQIAh8mpqaaGluJeF6DBrcH+F41DX7/PGht/j77OWsq28mnXBxpUQ4wr4s2xP4OolnJCdN7c9NFxxFdenuW/J2ioJepEgXWppbeeDPLzN81ACOOcG+v71p61aef+E5XnrpZVpbWmhuaaY1l0WpiKSboGdVFQP69sUYh0xZKXgCPyyQSHr07tGTqQccxOR9J6OcFE+/sZo/Pr6Ed5bUYVQrCemD8ez0bgkuSXSg8CpdTj9mDNeeffBHnkdfFPQiRbqhrqaFG374J/oM7cuFF32aXpXWmmZbm3l/+XLeW7yY5cuW07C5nubmVrL5PJHWuAmXHhWlDBswgDHjJzB5yr6MGTuWXOQw6801PDRnGW8t2cLWrS14RMgotOsxuPY9B9o45JSkT2WK737hAL544sQdU2N7QFHQixT5ANavq+eCC29hS4vi6xedyfEn7MuQnp3dZz+fpVAooJTCdVwymTRucttagEu2aF58dx2z393AolV1tDZuRedzyMi3i64IF4QHDoRGYRyP/cb05vtfPZxpY3e27v/uURT0IkV2wpb6Zr797dt46fUaBo4dwMQDRzL1kH0YOXwA/XqXUFECnrSrSeVDqGsMWLW5hQU1LbyzfBMNjQVqVtYQtLTiRj7S93G1AsegXQ8Zv7ugEGmq+6Y59+RJXHjaAVR0eeXZR6Uo6EWKfAhBqLj11kf43W+fYkurId2/mr7DBlPeq5J0ZTkyXYISLpGWNAdt5LIFWra0EDS34RSyeCqHEwa4eJiEQLnSrjysQTuSVMbluGnj+MqM/ThgfP+uh98rFAW9SJFd5M03lnLXbTN59Z8r2dLUisIgUylEKmkDaY6D4wpc+9Jmu5SWdCCRwDguKn47TRRoPK+UHpUJjjhsKKefOIkj9t29SrfdpSjoRYrsBloZXnxxEY89/ipvv7OUhq0F2nI+MuHZV3sZB+EkMNK+WES6LlrYtfQypRnSSRg1sBeHHTiaY48cy8Qxe28cvjOKgl6kyB6yZu1m3np7FfMWrGX5ihq2NDThehkKfgQCSspKUDqgV58qBg3ozaRxg5g4vh8jh/cmndjFaWd7iaKgFymyF/D9kFzep+AbstkCAGXlGVIJyGRSeHuyvtVepCjoRYr8H2Bv5OKLFCnyL05R0IsU+T/A/wde5AzP0GTRrQAAAABJRU5ErkJggg==";

        const localDate = now.toLocaleDateString();
        const localTime = now.toLocaleTimeString('es-ES', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        // Header
        doc.addImage(logoBase64, "PNG", 10, 10, 48, 12);
        doc.setFontSize(14);
        doc.text("Informe de Evaluación Final", 110, 20, { align: 'center' });
        doc.line(10, 25, 200, 25); // Línea debajo del encabezado
        doc.setFontSize(14);
        doc.text("Capacitación Inicial en Seguridad de la Información - 2026", 110, 35, { align: 'center' });

        // Datos del Usuario
        doc.setFontSize(14);
        doc.text("Datos del Usuario", 10, 45);
        doc.setFontSize(12);
        doc.text(`Nombre: ${name} ${surname}`, 15, 55);
        doc.text(`Número de Legajo: ${employeeId}`, 15, 65);
        doc.text(`Email: ${email}`, 15, 75);
        doc.text(`Fecha y Hora: ${localDate} ${localTime}`, 15, 85);

        // Resultados
        doc.text("Resultados Finales:", 10, 100);
        doc.setFontSize(14);
        doc.text(`Puntaje Final: ${score}/${totalQuestionsFinal}`, 15, 110);
        doc.text(`Porcentaje de acierto: ${percentageFinal.toFixed(0)}%`, 15, 120);
        doc.text(passed ? `Código: ${aprovalCode}` : " ", 15, 130);
        doc.text(passed ? `Valido hasta: ${nowPlusYear}` : " ", 15, 140);

        // Mensaje y icono de resultado
        doc.setFontSize(16);
        doc.addImage(icon, "PNG", 12, 162, 10, 10);
        doc.text(passed ? "¡Felicidades, has aprobado el Examen Final!" : "Revisa los conceptos de todos los modulos y vuelve a intentarlo.", 26, 170);
        doc.setFontSize(12);
        doc.text(passed ? `Envía este archivo pdf a itprodismo@prodismo.com con el asunto:` : " ", 20, 190);
        doc.text(passed ? `Examen Final Capacitacion Seguridad 2026` : " ", 20, 200);
        doc.text(passed ? `Muchas gracias!` : " ", 20, 210);

        doc.text(`Equipo de IT`, 140, 220);
        doc.addImage(logoBase64, "PNG", 140, 222, 24, 8);

        doc.setFontSize(10);
        doc.text("No es necesario imprimir este certificado", 100, 276, { align: 'center' });

        doc.line(10, 280, 200, 280); // Línea arriba del footer
        doc.setFontSize(10);
        doc.text("F314-IT-C-1", 12, 285);

        doc.save(`Resultado_Examen_Final_${employeeId}_${name}-${surname}_${localDate.replace('/', '_')}.pdf`);
    });
}

//--------------- Encuesta final ------------------------------
// Botón para realizar encuesta
if (btnEncuestaFinal) {
    btnEncuestaFinal.addEventListener('click', function () {
        redirigirAEncuesta();
    });
}

function redirigirAEncuesta() {
    window.open("https://forms.office.com/r/qRPMiDE0ab", "_blank");
}
//--------------- End Encuesta final ------------------------------
//--------------- End Examen Final 10 preguntas -------------------