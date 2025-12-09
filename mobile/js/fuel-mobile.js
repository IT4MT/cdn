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


function submitFilterForm(event) {
    event.preventDefault();
    
    var curyear = document.getElementById('curyear').value;
    var curmo = document.getElementById('curmo').value;
    var vehicle = document.getElementById('vehicle').value;
    
    var params = 'curyear=' + encodeURIComponent(curyear) + 
                 '&curmo=' + encodeURIComponent(curmo) + 
                 '&vehicle=' + encodeURIComponent(vehicle);
    
    var locationInput = document.querySelector('input[name="Location_ID"]');
    if (locationInput) {
        params += '&Location_ID=' + encodeURIComponent(locationInput.value);
    }
    
    var currentprojInput = document.querySelector('input[name="currentproj"]');
    if (currentprojInput) {
        params += '&currentproj=' + encodeURIComponent(currentprojInput.value);
    }
    
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

function changeLocation() {
    var dropdown = document.getElementById('locationDropdown');
    var selectedLocation = dropdown.value;
    
    if (!selectedLocation) return; // Do nothing if no selection
    
    var curyear = document.getElementById('curyear').value;
    var curmo = document.getElementById('curmo').value;
    var vehicle = document.getElementById('vehicle').value;
    
    var url = '?Location_ID=' + encodeURIComponent(selectedLocation) + 
              '&curyear=' + encodeURIComponent(curyear) + 
              '&curmo=' + encodeURIComponent(curmo) + 
              '&vehicle=' + encodeURIComponent(vehicle);
    
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
