const projects = [
  {
    id: 1,
    title: "Auto-Annotation Pipeline",
    company: "HiMedia Laboratories",
    tags: ["Computer Vision", "AI"],
    index: "01",
    link: "auto-annotations.html", // New property! 🔗
    description: "An Active Learning approach using Mask RCNN to reduce manual annotation efforts."
  },
 {
  id: 2,
  index: "02",
  title: "Micro-organism Identification", // 
  company: "HiMedia Laboratories", // 
  category: "Vision", 
  tags: ["OpenCV", "PyTorch", "Mask-RCNN"], // [cite: 11]
  impact: "Increased accuracy to 94%", // [cite: 16]
  description: "Developed a detection pipeline to count and calculate growth rate of micro-organisms." // [cite: 15]
},
{
    id: 3,
    index: "03",
    title: "Unsloth: Kernel Anatomy",
    company: "Technical Blog",
    category: "GenAI", // This links it to the 'GenAI' filter button
    tags: ["Triton", "LLMs", "Optimization"],
    link: "unsloth-kernels.html", // Ensure this matches your file name exactly
    description: "A deep dive into how custom Triton kernels bypass the VRAM wall for faster LLM training."
  }
];

function renderProjects(filteredProjects) {
    const container = document.getElementById('project-gallery');
    container.innerHTML = ''; 

    filteredProjects.forEach((project, index) => {
    // 1. Create an anchor tag instead of a div
    const card = document.createElement('a');
    
    // 2. Add the href attribute pointing to your project's HTML file
    card.href = project.link;

    // 3. Keep the same styling (adding 'block' to ensure it behaves like a container)
    card.className = `project-card block flex-none w-80 p-8 border-2 border-slate-900 
                     opacity-0 translate-y-8 transition-all duration-700 
                     ease-out snap-center cursor-pointer group 
                     dark:border-slate-100 dark:hover:bg-slate-100`;

    card.style.transitionDelay = `${index * 100}ms`;

    // 4. Content stays the same, but we remove the internal <a> tag since the whole card is one
    card.innerHTML = `
        <span class="block text-6xl font-black mb-12 opacity-10 transition-all duration-500 
                     group-hover:opacity-100 group-hover:translate-x-2 
                     dark:text-white dark:group-hover:text-slate-950">
            ${project.index}
        </span>
        
        <h4 class="text-xl font-bold tracking-tighter mb-2 uppercase transition-colors duration-500 
                   group-hover:text-white dark:text-white dark:group-hover:text-slate-950">
            ${project.title}
        </h4>
        
        <p class="text-sm font-medium mb-8 opacity-60 transition-opacity duration-500 
                  group-hover:opacity-100 dark:text-slate-300 dark:group-hover:text-slate-700">
            ${project.company}
        </p>

        <div class="overflow-hidden">
            <div class="text-xs font-mono tracking-widest pt-4 border-t border-current
                        transform translate-y-full transition-transform duration-500 
                        group-hover:translate-y-0 dark:group-hover:text-slate-950">
                EXPLORE PROJECT →
            </div>
        </div>
    `;

    container.appendChild(card);

    setTimeout(() => {
        card.classList.remove('opacity-0', 'translate-y-8');
        card.classList.add('opacity-100', 'translate-y-0');
    }, 10);
});
}

// Initialization: This makes sure the gallery isn't empty on page load
renderProjects(projects);

async function filterProjects(category, clickedButton) {
    // 1. Manage Active State
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        // Reset to inactive
        btn.classList.remove('bg-white', 'shadow-sm', 'dark:bg-slate-700', 'text-slate-900', 'dark:text-white');
        btn.classList.add('text-slate-500', 'dark:text-slate-400');
    });

    // Set clicked button to active
    clickedButton.classList.add('bg-white', 'shadow-sm', 'dark:bg-slate-700', 'text-slate-900', 'dark:text-white');
    clickedButton.classList.remove('text-slate-500', 'dark:text-slate-400');
    const container = document.getElementById('project-gallery');
    const currentCards = container.querySelectorAll('.project-card');

    // 1. Trigger Exit Animation
    currentCards.forEach(card => {
        card.classList.add('opacity-0', 'translate-y-4');
    });

    // 2. Wait for the transition to finish (e.g., 400ms)
    await new Promise(resolve => setTimeout(resolve, 400));

    // 3. Filter the data
    const filtered = category === 'All' 
        ? projects 
        : projects.filter(p => p.category === category);

    // 4. Render new cards with the staggered entrance
    renderProjects(filtered);
}
