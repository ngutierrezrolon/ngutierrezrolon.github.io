//Welcome to the JS

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove the '#' from the href
    
            // Hide all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('hidden');
            });
    
            // Hide the main element
            const mainElement = document.getElementById('main');
            if (mainElement) {
                mainElement.style.display = 'none';
            }
            
            // Show the target section
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.classList.remove('hidden');
            }
    
            // Show the main element again if the target is inside the main
            if (targetElement && targetElement.closest('#main')) {
                mainElement.style.display = 'block';
            }
        });
    });
    //Active link color different

    // Select all scroll links
    const scrollLinks = document.querySelectorAll('.scroll-link');
    //const sections = document.querySelectorAll('section');

    function updateActiveLink(clickedLink) {
        // Remove the "active-link" class from all links
        scrollLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Add the "active-link" class to the clicked link
        clickedLink.classList.add('active-link');
    }

    // Add a click event listener to each scroll link
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            updateActiveLink(link);
            console.log("link clicked")
            updateCurrentSection();
            console.log("current section " + currentSection)
        });
    });
    
    //Daily chengyu

    // Define the ids for your HTML elements
    const chengyuText = document.getElementById("chengyu-text");
    const chengyuPinyin = document.getElementById("chengyu-pinyin");
    const chengyuDefinition = document.getElementById("chengyu-definition");
    const dailyChengyuLink = document.getElementById("dailychengyulink")
    // Fetch data from your CSV file and process it
    // Replace this with your own code to read and process the CSV data
    fetch("chengyu.csv")
        .then(response => response.text())
        .then(data => {
            // Split data into rows and process them
            const rows = data.split("\n");
            const randomRowIndex = Math.floor(Math.random() * (rows.length - 1)) + 1; // -1 to exclude the header
            const randomRow = rows[randomRowIndex];    
            const [chengyu, pinyin, definition] = randomRow.split(",");
            
            dailyChengyuLink.textContent = chengyu;

            // Populate the HTML elements with the data
            chengyuText.textContent = chengyu;
            chengyuPinyin.textContent = `Pinyin: ${pinyin}`;
            chengyuDefinition.textContent = `Definition: ${definition}`;
            // Add example sentence if available
            // chengyuExample.textContent = `Example: ${example}`;
        })
        .catch(error => console.error(error));
    
        //contact form to file
    var successMessage = document.getElementById('success-message');
    
    if (successMessage) {
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // define sections

    // Function to check which section is in the viewport
    function updateCurrentSection() {
        const activeLink = document.querySelector('a.active-link');
        if (activeLink) {
            const targetId = activeLink.getAttribute('href').substring(1);
            currentSection = targetId;
        } else {
            currentSection = "other";
        }
        console.log("current section " + currentSection)
    }

    // Event listener to update currentSection when scrolling
    //window.addEventListener("scroll", updateCurrentSection);

    // Function to check if an element is in the viewport
    /*function isElementInViewport(element) {
        if (!element) {
            return false;
        }
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight &&
            rect.right <= windowWidth
        );
    }*/

    // Initially update currentSection when the page loads
    updateCurrentSection();


    // bouncy animation
    const container = document.getElementById('container');
    const logo = document.createElement('div');
    logo.className = 'dvd-logo';
    container.appendChild(logo);

    const playButton = document.getElementById('play-button');
    const collisionSound = document.getElementById('collisionSound');
    let animationRunning = false;

    playButton.addEventListener('click', function () {
        if (animationRunning) {
            stopanimation();

            playButton.textContent = "Start";
            playButton.classList.remove("stop");
            playButton.classList.add("start");
            animationRunning = false;
        } else {
            startanimation();
            playButton.textContent = "Stop";
            playButton.classList.remove("start");
            playButton.classList.add("stop");
            animationRunning = true;
        }
    })

    let x = 0;
    let y = 0;
    let dx = 2;
    let dy = 2;

    /*function playCollisionSound() {
        const containerRect = container.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        updateCurrentSection();

        if (currentSection === "animation") {
            // Check if the logo has hit the frame of the container

            if (
                logoRect.left <= containerRect.left ||
                logoRect.right >= containerRect.right ||
                logoRect.top <= containerRect.top ||
                logoRect.bottom >= containerRect.bottom
            ) {
                collisionSound.play();
            }
        } else {
            collisionSound.pause(); // Pause the sound when not in the "animation" section
        }
    }*/

    const topside = -10;
    const botside = 15;
    const leftside = -15;
    const rightside = 15;

    function playCollisionSound() {
        const containerRect = container.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();
        
        if (currentSection === "projects") {
            if (
                logoRect.left <= containerRect.left - leftside ||
                logoRect.right >= containerRect.right - rightside ||
                logoRect.top <= containerRect.top - topside||
                logoRect.bottom >= containerRect.bottom - botside
            ) {
                if (collisionSound.paused) {
                    collisionSound.currentTime = 0;
                    collisionSound.play();
                }
            }
        } else {
            collisionSound.pause();
        }
    }
    
    let animationId;

    function animate() {
        x += dx;
        y += dy;

        if (x < leftside) {
            x = leftside;
            dx = -dx;
            playCollisionSound();
        }
        if (x + logo.clientWidth > container.clientWidth - rightside) {
            x = container.clientWidth - logo.clientWidth - rightside;
            dx = -dx;
            playCollisionSound();
        }
        if (y < topside) {
            y = topside;
            dy = -dy;
            playCollisionSound();
        }
        if (y + logo.clientHeight > container.clientHeight - botside) {
            y = container.clientHeight - logo.clientHeight - botside;
            dy = -dy;
            playCollisionSound();
        }

        logo.style.left = x + 'px';
        logo.style.top = y + 'px';

        animationId = requestAnimationFrame(animate);
    }

    function startanimation() {
        if(!animationId) {
            animate();
        }
    }

    function stopanimation() {
        if(animationRunning) {
            cancelAnimationFrame(animationId);
            animationId = undefined;
        }
    }
    //animate();
});




