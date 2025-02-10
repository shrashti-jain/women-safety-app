// Add interactivity to the 3D buttons for different features

// Function to trigger a fake call
function triggerFakeCall() {
    // Show the fake call UI
    document.getElementById('fake-call-ui').style.display = 'block';
    
    // Play the fake call ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.play();

    // Add event listener to the end call button
    document.getElementById('pick-call-button').addEventListener('click', function() {
        audio.pause();
        pickFakeCall();
    })
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

function pickFakeCall() {
    // Hide the fake call UI
    document.getElementById('fake-call-ui').style.display = 'none';
    
    // Stop the fake ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.pause();  // Reset the audio to the beginning

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
    document.getElementById('pick-call-button').addEventListener('click', function() {
        audio.pause();
        pickFakeCall();
    })
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
function pickFakeCall() {
    // Hide the fake call UI
    document.getElementById('fake-call-ui').style.display = 'none';
    
    // Stop the fake ringtone
    const audio = document.getElementById('fake-call-audio');
    audio.pause();
    audio.currentTime = 0;  // Reset the audio to the beginning
}

document.addEventListener('DOMContentLoaded', function () {
    const dashboardCircle = document.getElementById('dashboard-circle');
    const description = document.getElementById('dashboard-description');

    // Segment names
    const segments = [
        { name: 'Analytics', color: '#f184a9', percentage: 30 },
        { name: 'Distance Travelled', color: '#8796ea', percentage: 40 },
        { name: 'Surrounding People', color: '#74e478', percentage: 30 }
    ];

    // Function to set the background gradient and add click events
    function updateDashboard() {
        let offset = 0;
        let gradientString = '';
        segments.forEach(segment => {
            const segmentDegrees = (segment.percentage / 100) * 360;
            gradientString += `${segment.color} ${offset}deg ${offset + segmentDegrees}deg, `;
            offset += segmentDegrees;
        });

        dashboardCircle.style.background = `conic-gradient(${gradientString.slice(0, -2)})`;

        // Adding click event listeners
        dashboardCircle.addEventListener('click', function (event) {
            const rect = dashboardCircle.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;
            
            let cumulativeDegrees = 0;
            for (const segment of segments) {
                const segmentDegrees = (segment.percentage / 100) * 360;
                if (angle >= cumulativeDegrees && angle <= cumulativeDegrees + segmentDegrees) {
                    description.textContent = `${segment.name}`;
                    break;
                }
                cumulativeDegrees += segmentDegrees;
            }
        });
    }

    updateDashboard();
});


let lastX, lastY, lastZ;
let shakeCounter = 0;
let lastShakeTime = 0;
const shakeThreshold = 20; // Sensitivity threshold
const shakeDirectionThreshold = 30; // Threshold to differentiate direction change
const shakeDurationThreshold = 1000; // milliseconds to sustain shaking
const minShakeMagnitude = 0.5; // Minimum magnitude for the shake to be considered

function triggerAlert() {
    const alertMessageElement = document.getElementById('alertMessage');
    const alertSentElement = document.getElementById('alertSent');
    const timerElement = document.getElementById('timer');
    const cancelAlertButton = document.getElementById('cancelAlert');

    let countdown = 5;
    let countdownInterval;

    alertMessageElement.style.display = 'block';
    alertSentElement.style.display = 'none';
    timerElement.innerText = `Canceling in ${countdown} seconds...`;

    countdownInterval = setInterval(() => {
        countdown--;
        timerElement.innerText = `Canceling in ${countdown} seconds...`;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            alertMessageElement.style.display = 'none';
            alertSentElement.style.display = 'block';
        }
    }, 1000);

    cancelAlertButton.onclick = function() {
        clearInterval(countdownInterval);
        alertMessageElement.style.display = 'none';
        alertSentElement.style.display = 'none'; // Hide both messages
    };
}

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
        const acceleration = event.accelerationIncludingGravity;
        const currentTime = new Date().getTime();
        
        if (!lastX || !lastY || !lastZ) {
            lastX = acceleration.x;
            lastY = acceleration.y;
            lastZ = acceleration.z;
            lastShakeTime = currentTime;
            return;
        }

        const deltaX = acceleration.x - lastX;
        const deltaY = acceleration.y - lastY;
        const deltaZ = acceleration.z - lastZ;
        
        const magnitudeX = Math.abs(deltaX);
        const magnitudeY = Math.abs(deltaY);
        const magnitudeZ = Math.abs(deltaZ);

        if (magnitudeX > shakeThreshold && magnitudeY < shakeDirectionThreshold && magnitudeZ < shakeDirectionThreshold) {
            shakeCounter++;
            lastShakeTime = currentTime;
        } else {
            shakeCounter = Math.max(0, shakeCounter - 1);
        }

        if (shakeCounter > 2 && (currentTime - lastShakeTime) < shakeDurationThreshold) {
            if (magnitudeX > minShakeMagnitude) { // Ensure there's significant shaking in the X direction
                triggerAlert();
                shakeCounter = 0; // Reset counter after triggering alert
            }
        }

        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
    });
} else {
    alert("DeviceMotionEvent is not supported on your device.");
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