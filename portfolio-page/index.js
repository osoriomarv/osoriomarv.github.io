// MAKE NAVBAR MENU COLLAPSE AFTER CLICKING A MENU OPTION //
// Get all nav links inside the navbar
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Get the collapse element (the menu)
const navbarCollapse = document.getElementById('navbarNav');

// Add event listener for each link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Close the navbar by collapsing it
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click(); // This simulates a click to collapse the navbar
    }
  });
});





// This will hold the data from the JSON file
let projects = [];

// Fetch the JSON data from the 'projects.json' file
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    projects = data; // Store the JSON data in the 'projects' variable
    // Initially display all cards (web, app, and design projects)
    createCollapseSections();
  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to create the collapse sections based on the JSON data
function createCollapseSections() {
  const collapseSections = document.getElementById("collapse-sections");

  // Get unique project types from the data
  const projectTypes = [...new Set(projects.map(project => project.projectType))];

  projectTypes.forEach(projectType => {
    // Replace spaces with dashes for valid HTML ID
    const formattedProjectType = projectType.replace(/\s+/g, '-');
    // Create collapse section for each project type
    const sectionHTML = `
      <div class="row">
        <div class="d-grid mb-4 col-12 mx-auto">
          <!-- Collapse Button -->
          <button class="btn btn-lg active dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${formattedProjectType}" aria-expanded="false" aria-controls="collapse-${formattedProjectType}">
            ${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Projects
          </button>

          <!-- Collapse content -->
          <div class="collapse" id="collapse-${formattedProjectType}">
                <!-- Dynamically generated cards will go here -->
                
          </div>
        </div>
      </div>
    `;
    // Append the collapse section to the page
    collapseSections.innerHTML += sectionHTML;

    // Now, generate and append the cards after the section is created
    const collapseContent = document.getElementById(`collapse-${formattedProjectType}`);
    collapseContent.innerHTML = generateCards(projectType);
  });
}

// Function to generate cards for a specific project type
function generateCards(projectType) {
  let cardsHTML = '';

  // Filter the projects based on the selected type
  const filteredProjects = projects.filter(project => project.projectType === projectType);

  filteredProjects.forEach(project => {
    cardsHTML += `
        <div class="card mb-3">
          <div class="d-flex">
            <!-- Image on the left side -->
            <img src="${project.imageSrc}" class="card-img-left my-auto" alt="${project.desc}">
            <!-- Text on the right side -->
            <div class="card-body">
              <h3 class="card-text projectTitle">${project.title}</h3>
              <p class="card-text projectDetails">${project.summary}</p>
              <p class="card-text projectDetails"><strong>Application:</strong> ${project.application}</p>
            </div>
          </div>
        </div>
    `;
  });

  return cardsHTML;
}

// card-img-left
// img-fluid




// CURRENT YEAR FOR COPYRIGHT FOOTER //
// Get the current year
const currentYear = new Date().getFullYear();

// Set the current year into the element with ID 'current-year'
document.getElementById('current-year').textContent = currentYear;