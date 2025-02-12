if ('serviceWorker' in navigator) {
    // Register the service worker
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker Registered:', registration);
    }).catch((error) => {
        console.error('Service Worker registration failed:', error);
    });

    // Listen for service worker messages to reload the page
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.action === 'reload') {
            window.location.reload(); // Force reload when service worker updates or is unregistered
        }
    });
}

// Optional: Add other functionality related to the page's behavior

// Your redirect function
function redirect(resource) {
    const syllabusPaths = {
        "uhv-syllabus": "pages/uhv-syllabus.html",
        "ps-syllabus": "pages/ps-syllabus.html",
        "os-syllabus": "pages/os-syllabus.html",
        "dbms-syllabus": "pages/dbms-syllabus.html",
        "se-syllabus": "pages/se-syllabus.html",
        "es-syllabus": "pages/es-syllabus.html",
        "fsd-syllabus": "pages/fsd-syllabus.html"
    };

    const resourcePaths = {
        "uhv-resources": "pages/uhv-resources.html",
        "ps-resources": "pages/ps-resources.html",
        "os-resources": "pages/os-resources.html",
        "dbms-resources": "pages/dbms-resources.html",
        "se-resources": "pages/se-resources.html",
        "es-resources": "pages/es-resources.html",
        "fsd-resources": "pages/fsd-resources.html"
    };

    if (syllabusPaths[resource]) {
        window.location.href = syllabusPaths[resource];
    } else if (resourcePaths[resource]) {
        window.location.href = resourcePaths[resource];
    } else {
        alert("Resource not found!");
    }
}

// Your PWA install button logic (Optional)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default prompt
    e.preventDefault();
    deferredPrompt = e;

    // Show your custom install button
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block'; // Make the install button visible

    // Install button click event
    installButton.addEventListener('click', () => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the installation');
            } else {
                console.log('User dismissed the installation');
            }
            deferredPrompt = null; // Reset the prompt
        });
    });
});
