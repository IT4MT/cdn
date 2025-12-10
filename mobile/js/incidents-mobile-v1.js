function openFilesModal(link) {
    var url = link.getAttribute('href');
    var modal = document.createElement('div');
    modal.className = 'pdocrud-files-modal';
    modal.innerHTML = '<div class="pdocrud-files-modal-content">' +
                      '<span class="pdocrud-files-modal-close" onclick="this.closest(\'.pdocrud-files-modal\').remove()">&times;</span>' +
                      '<iframe src="' + url + '" class="pdocrud-files-modal-iframe"></iframe>' +
                      '</div>';
    document.body.appendChild(modal);
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
        document.body.innerHTML = document.body.innerHTML.replace(/<form[^>]*>[\s\S]*?<\/form>/i, '');
        location.reload();
        return false;
      });
    }
  });
}, 500);

function changeLocation() {
    var dropdown = document.getElementById('locationDropdown');
    var selectedLocation = dropdown.value;
    
    if (!selectedLocation) return;
    
    var url = '?Location_ID=' + encodeURIComponent(selectedLocation);
    
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.select2-selection').forEach(function(elem) {
        elem.style.zIndex = '9999';
        elem.parentElement.style.zIndex = '9999';
    });
    
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && (node.classList.contains('modal') || node.classList.contains('pdocrud-modal'))) {
                        setTimeout(function() {
                            if (window.jQuery && window.jQuery.fn.select2) {
                                node.querySelectorAll('select').forEach(function(select) {
                                    if (!jQuery(select).data('select2')) {
                                        jQuery(select).select2({
                                            allowClear: true,
                                            width: '100%',
                                            dropdownAutoWidth: false,
                                            dropdownParent: jQuery(select).closest('.modal, .pdocrud-modal, .pdocrud-form-wrapper')
                                        });
                                    }
                                });
                            }
                        }, 100);
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    document.querySelectorAll('.pdocrud-table td, .pdocrud-table th').forEach(function (cell) {
        if (cell.textContent.trim() === 'Array') {
            cell.textContent = '-';
        }
    });
});

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
