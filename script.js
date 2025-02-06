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
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker Registered:', registration);
    });
}
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
    //deferredPrompt.prompt();
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
