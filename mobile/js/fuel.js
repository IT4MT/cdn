function openFilesModal(link) {
    var url = link.getAttribute('href');
    var modal = document.createElement('div');
    modal.className = 'pdocrud-files-modal';
    
    // Check if URL is an image file
    var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    var isImage = imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
    
    if (isImage) {
        // For images, create a wrapped HTML page that scales the image
        var wrappedHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { 
                        margin: 0; 
                        padding: 20px; 
                        background: #f5f5f5;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }
                    img { 
                        max-width: 100%; 
                        max-height: 90vh; 
                        width: auto;
                        height: auto;
                        object-fit: contain;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                </style>
            </head>
            <body>
                <!img src="` + url + `" alt="Document">
		<a href="` + url + `" target="_blank">Click to view: ` + filename + ` </a>
            </body>
            </html>
        `;
        
        var blob = new Blob([wrappedHtml], { type: 'text/html' });
        var blobUrl = URL.createObjectURL(blob);
        
        modal.innerHTML = '<div class="pdocrud-files-modal-content">' +
                          '<span class="pdocrud-files-modal-close" onclick="this.closest(\'.pdocrud-files-modal\').remove(); URL.revokeObjectURL(\'' + blobUrl + '\');">&times;</span>' +
                          '<iframe src="' + blobUrl + '" class="pdocrud-files-modal-iframe"></iframe>' +
                          '</div>';
    } else {
        // For other content (file managers, etc.), load as-is
        modal.innerHTML = '<div class="pdocrud-files-modal-content">' +
                          '<span class="pdocrud-files-modal-close" onclick="this.closest(\'.pdocrud-files-modal\').remove()">&times;</span>' +
                          '<iframe src="' + url + '" class="pdocrud-files-modal-iframe"></iframe>' +
                          '</div>';
    }
    
    document.body.appendChild(modal);
}

function closeFormModal() {
  document.getElementById('formModal').classList.remove('active');
  document.getElementById('form-container').innerHTML = '';
  // Reload page to show table again
  location.reload();
}

// Monitor for cancel button clicks
setInterval(function() {
  var cancelButtons = document.querySelectorAll('.pdocrud-cancel-btn');
  cancelButtons.forEach(function(btn) {
    if (!btn.hasAttribute('data-cancel-intercepted')) {
      btn.setAttribute('data-cancel-intercepted', 'true');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Just close the modal, don't submit
        document.body.innerHTML = document.body.innerHTML.replace(/<form[^>]*>[\s\S]*?<\/form>/i, '');
        location.reload();
        return false;
      });
    }
  });
}, 500);






// adding code for mking DE/Cost as input numbers only - start
// Restrict Cost (DE) field to digits and decimal point only
document.addEventListener('DOMContentLoaded', function() {
    // Handle initial form inputs
    restrictCostInput();
    
    // Watch for dynamically added forms
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        restrictCostInput();
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});

function restrictCostInput() {
    // Find all inputs that might be the DE (Cost) field
    var inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(function(input) {
        // Check if this is the DE/Cost field by looking at name or placeholder
        if (input.name && (input.name.includes('DE') || input.name.includes('Cost')) ||
            input.placeholder && (input.placeholder.includes('Cost') || input.placeholder.includes('DE'))) {
            
            if (!input.hasAttribute('data-cost-restricted')) {
                input.setAttribute('data-cost-restricted', 'true');
                
                input.addEventListener('input', function(e) {
                    // Remove any character that's not a digit or decimal point
                    this.value = this.value.replace(/[^0-9.]/g, '');
                    
                    // Prevent multiple decimal points
                    var parts = this.value.split('.');
                    if (parts.length > 2) {
                        this.value = parts[0] + '.' + parts[1];
                    }
                });
            }
        }
    });
}
// adding code for mking DE/Cost as input numbers only - end
