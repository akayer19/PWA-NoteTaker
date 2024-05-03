// Get a reference to the install button
const installButton = document.getElementById('buttonInstall');

// Event handler for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event for later use
    window.deferredPrompt = event;

    // Show the install button
    installButton.classList.remove('hidden');
});

// Click event handler for the install button
installButton.addEventListener('click', async () => {
    // Retrieve the stored deferred prompt
    const promptEvent = window.deferredPrompt;

    // If there's no deferred prompt, exit the function
    if (!promptEvent) {
        return;
    }

    // Show the installation prompt to the user
    promptEvent.prompt();

    // Wait for the user's choice
    const { outcome } = await promptEvent.userChoice;

    // Log the user's choice
    if (outcome === 'accepted') {
        console.log('User accepted the Add to Home Screen prompt');
    } else {
        console.log('User dismissed the Add to Home Screen prompt');
    }

    // Reset the deferred prompt
    window.deferredPrompt = null;

    // Hide the install button
    installButton.classList.add('hidden');
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // Add any actions to take after the app has been installed
    console.log('App installed successfully');
});
