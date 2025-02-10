document.getElementById("showTipsBtn").addEventListener("click", function() {
  const tips = [
    "Stay alert and be aware of your surroundings.",
    "Use your voice to call for help.",
    "Trust your instincts and avoid suspicious situations.",
    "If attacked, target sensitive areas like eyes, nose, and groin.",
    "Learn basic self-defense moves like palm strikes and knee strikes.",
    "Carry a personal alarm or pepper spray for protection."
  ];

  // List of local video files (make sure the files are in a 'videos' folder)
  const videos = [
    {
      title: "Basic Self-Defense Techniques",
      file: "\staticvideos\self-defense-vd1.mp4"  // Replace with the actual path to your video file
    },
    {
      title: "How to Defend Yourself Against an Attacker",
      file: "self-defense-vd1.mp4"   // Replace with the actual path to your video file
    },
    {
      title: "5 Self-Defense Moves Every Woman Should Know",
      file: "self-defense-vd1.mp4"   // Replace with the actual path to your video file
    }
  ];

  // Insert self-defense tips into the list
  const tipsList = document.getElementById("tipsList");
  tipsList.innerHTML = '';
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Insert self-defense videos from local files
  const videosContainer = document.getElementById("videosContainer");
  videosContainer.innerHTML = '';
  videos.forEach(video => {
    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video-item');

    const videoTitle = document.createElement('h3');
    videoTitle.textContent = video.title;

    // Create video element for local files
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.width = 300;  // Adjust the size as needed
    
    const sourceElement = document.createElement('source');
    sourceElement.src = video.file;
    sourceElement.type = 'video/mp4';  // Ensure the file format matches your video
    
    videoElement.appendChild(sourceElement);

    videoDiv.appendChild(videoTitle);
    videoDiv.appendChild(videoElement);

    videosContainer.appendChild(videoDiv);
  });

  // Show the tips and videos container
  document.getElementById("tipsContainer").classList.remove("hidden");
});
