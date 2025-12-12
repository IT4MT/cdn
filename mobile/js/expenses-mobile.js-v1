function submitFilterForm(event) {
    event.preventDefault();
    
    // Get form values
    var curyear = document.getElementById('curyear').value;
    var curmo = document.getElementById('curmo').value;
    var euser = document.getElementById('euser').value;
    var source = document.getElementById('source').value;
    var category = document.getElementById('category').value;
    
    // Build query string
    var params = 'curyear=' + encodeURIComponent(curyear) + 
                 '&curmo=' + encodeURIComponent(curmo) + 
                 '&euser=' + encodeURIComponent(euser) + 
                 '&source=' + encodeURIComponent(source) + 
                 '&category=' + encodeURIComponent(category);
    
    // Get currentproj if it exists
    var currentprojInput = document.querySelector('input[name="currentproj"]');
    if (currentprojInput) {
        params += '&currentproj=' + encodeURIComponent(currentprojInput.value);
    }
    
    // Navigate to the new URL
    window.location.href = '?' + params;
    
    return false;
}

function toggleFilters() {
    var filtersCard = document.getElementById('filtersCard');
    var toggleBtn = document.querySelector('.toggle-filters-btn');
    
    if (filtersCard.style.display === 'none' || filtersCard.style.display === '') {
        filtersCard.style.display = 'block';
        toggleBtn.textContent = '✕ Hide Filters';
        toggleBtn.classList.add('active');
    } else {
        filtersCard.style.display = 'none';
        toggleBtn.textContent = '⚙️ Show Filters';
        toggleBtn.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Fix select2 dropdowns visibility
    document.querySelectorAll('.select2-selection').forEach(function(elem) {
        elem.style.zIndex = '9999';
        elem.parentElement.style.zIndex = '9999';
    });
    
    // Handle modal form opens to reinitialize select2
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && (node.classList.contains('modal') || node.classList.contains('pdocrud-modal'))) {
                        setTimeout(function() {
                            // Reinitialize select2 in the new modal
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
    
    // Hide "Array" text in cells
    document.querySelectorAll('.pdocrud-table td, .pdocrud-table th').forEach(function (cell) {
        if (cell.textContent.trim() === 'Array') {
            cell.textContent = '-';
        }
    });
});
