// Newsletter signup functionality
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletter-form');
  const successDiv = document.getElementById('signup-success');
  const errorMessage = document.getElementById('error-message');
  const submitButton = document.getElementById('submit-button');
  const emailInput = document.getElementById('email-input');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Update button state
      submitButton.disabled = true;
      submitButton.textContent = 'Joining...';
      errorMessage.classList.add('hidden');
      
      const email = emailInput.value;
      const formData = new FormData();
      formData.append('email', email);
      
      try {
        const response = await fetch('https://buttondown.email/api/emails/embed-subscribe/gamenightgpt', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          // Show success message
          form.classList.add('hidden');
          successDiv.classList.remove('hidden');
        } else {
          // Show error
          errorMessage.classList.remove('hidden');
          submitButton.disabled = false;
          submitButton.textContent = 'Get Early Access';
        }
      } catch (error) {
        // Show error
        errorMessage.classList.remove('hidden');
        submitButton.disabled = false;
        submitButton.textContent = 'Get Early Access';
      }
    });
  }
});