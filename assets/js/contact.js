// Initialize EmailJS
(function () {
  emailjs.init("P0T0AwGb7qYepWeHx"); // add a public key here
})();

// Handle Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Send Email
    emailjs.sendForm("service_povzevn", "template_rn2gimo", this).then(
      function () {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send the message. Please try again later.");
        console.error("Error:", error);
      }
    );
  });
