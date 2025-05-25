import { projectData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// Hamburger/X toggle and overlay menu
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");
let menuOpen = false;

menuToggle.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.remove("-translate-y-full");
    mobileMenu.classList.add("translate-y-0");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.remove("translate-y-0");
    mobileMenu.classList.add("-translate-y-full");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

// Make sure this part of your code is working correctly
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-y-0");
    mobileMenu.classList.add("-translate-y-full");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    menuOpen = false;

    // Add this line to ensure the body can scroll again if you've disabled it
    document.body.classList.remove("overflow-hidden");
  });
});

// Smooth scrolling for anchor links (keep if you want smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  const video = card.querySelector(".project-video");
  let playPromise;

  card.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    playPromise = video.play();

    // Handle the play promise
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Auto-play was prevented or interrupted
        // We can ignore this error
      });
    }
  });

  card.addEventListener("mouseleave", () => {
    // Only pause if the play promise has resolved
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          video.currentTime = 0;
        })
        .catch((error) => {
          // Auto-play was prevented or interrupted
          // We can ignore this error
        });
    }
  });
});

const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalVideo = document.getElementById("modal-video");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTechnologies = document.getElementById("modal-technologies");
const modalFeatures = document.getElementById("modal-features");
const modalUrl = document.getElementById("modal-url");
const closeModalBtn = document.getElementById("close-modal");

// Attach click event to each project card
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, idx) => {
  card.addEventListener("click", () => {
    document.body.classList.add("overflow-hidden");
    const project = projectData[idx];

    // Set basic info
    modalVideo.src = project?.video;
    modalTitle.textContent = project?.title;
    modalDescription.textContent = project?.description;
    modalUrl.href = project?.url;

    // Clear previous technologies and features
    modalTechnologies.innerHTML = "";
    modalFeatures.innerHTML = "";

    // Add technologies
    project?.technologies.forEach((tech) => {
      const techBadge = document.createElement("span");
      techBadge.className =
        "px-3 py-1 bg-[#363C44] text-white text-sm rounded-full";
      techBadge.textContent = tech;
      modalTechnologies.appendChild(techBadge);
    });

    // Add features
    project?.features.forEach((feature) => {
      const featureItem = document.createElement("li");
      featureItem.textContent = feature;
      modalFeatures.appendChild(featureItem);
    });

    // Show modal with animation
    modal.classList.remove("invisible", "opacity-0");
    setTimeout(() => {
      modal.classList.add("opacity-100");
      modalContent.classList.remove("translate-y-full");
    }, 10);
  });
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
function closeModal() {
  document.body.classList.remove("overflow-hidden");
  modal.classList.remove("opacity-100");
  modalContent.classList.add("translate-y-full");
  setTimeout(() => {
    modal.classList.add("invisible", "opacity-0");
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }, 300);
}

// Experience Tabs Functionality
document.addEventListener("DOMContentLoaded", function () {
  const companyTabs = document.querySelectorAll(".company-tab");

  companyTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      companyTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Hide all content sections
      const allContent = document.querySelectorAll(".experience-content");
      allContent.forEach((content) => content.classList.remove("active"));

      // Show the corresponding content
      const tabId = tab.getAttribute("data-tab");
      const contentToShow = document.getElementById(`${tabId}-content`);
      if (contentToShow) {
        contentToShow.classList.add("active");
      }
    });
  });
});
