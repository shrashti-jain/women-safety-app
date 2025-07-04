// Add interactivity to the 3D buttons for different features


document.querySelectorAll('.feature-button').forEach(button => {
    button.addEventListener('click', function () {
        let feature = this.parentElement.querySelector('h2').innerText;
        if (feature === "Fake Call") {
            alert("Fake call activated. Expect a call in 10 seconds.");
            // Add logic for generating a fake call
        } else if (feature === "Self Defense Training") {
            window.location.href = "/self-defense-training/";
        } else if (feature === "Emergency Contacts") {
            window.location.href = "/emergency-contacts/";
        } else if (feature === "Panic Button") {
            alert("Panic mode activated. Alert sent to your emergency contacts.");
            // Add panic button functionality



        }
    });
});

// Shake detection variables
let lastUpdate = 0;
let shakeThreshold = 10;  // Adjust this value for sensitivity
let fakeCallTriggered = false;

// Function to handle device motion and detect shaking
function handleDeviceMotion(event) {
    const currentTime = new Date().getTime();
    
    // Process motion data only at intervals (to avoid constant processing)
    if ((currentTime - lastUpdate) > 100) {
        const acceleration = event.accelerationIncludingGravity;
        const speed = Math.sqrt(
            acceleration.x * acceleration.x + 
            acceleration.y * acceleration.y + 
            acceleration.z * acceleration.z
        );
        
        // Check if the motion speed exceeds the shake threshold
        if (speed > shakeThreshold && !fakeCallTriggered) {
            triggerFakeCall();  // Trigger the fake call
            fakeCallTriggered = true;  // Prevent repeated triggering
        }

        lastUpdate = currentTime;  // Update the last check time
    }
}

// Function to request permission for DeviceMotion (iOS specific)
function requestMotionPermission() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        // For iOS 13+ which requires permission
        DeviceMotionEvent.requestPermission().then(response => {
            if (response === 'granted') {
                window.addEventListener('devicemotion', handleDeviceMotion, true);
            }
        }).catch(error => {
            console.error('Permission error: ', error);
        });
    } else {
        // For other devices that don't need permission
        window.addEventListener('devicemotion', handleDeviceMotion, true);
    }
}

// Function to trigger a fake call
function triggerFakeCall() {
    // Show the fake call UI
    document.getElementById('fake-call-ui').style.display = 'block';
    
    // Play the fake call ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.play();

    // Add event listener to the end call button
    document.getElementById('end-call-button').addEventListener('click', function() {
        endFakeCall();
    });
}

// Function to end the fake call
function endFakeCall() {
    // Hide the fake call UI
    document.getElementById('fake-call-ui').style.display = 'none';
    
    // Stop the fake ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.pause();
    audio.currentTime = 0;  // Reset the audio to the beginning

    // Re-enable the shake detection after a delay (3 seconds)
    setTimeout(() => {
        fakeCallTriggered = false;
    }, 3000);
}

// Initialize the shake detection process
document.addEventListener('DOMContentLoaded', () => {
    requestMotionPermission();  // Call the function to request permission on page load
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// Add interactivity to the Fake Call button
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.feature-button').addEventListener('click', triggerFakeCall);
});

// Function to trigger a fake call
function triggerFakeCall() {
    // Show the fake call UI
    document.getElementById('fake-call-ui').style.display = 'block';
    
    // Play the fake call ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.play();

    // Add event listener to the end call button
    document.getElementById('end-call-button').addEventListener('click', function() {
        endFakeCall();
    });
}

// Function to end the fake call
function endFakeCall() {
    // Hide the fake call UI
    document.getElementById('fake-call-ui').style.display = 'none';
    
    // Stop the fake ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.pause();
    audio.currentTime = 0;  // Reset the audio to the beginning
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        body.classList.remove("active");
    } else {
        sidebar.style.width = "250px";
        body.classList.add("active");
    }
}

