function openFilesModal(link, allowFileGatorToOpenFiles) {
    var url = link.getAttribute('href');
    // Save the FileGator URL so we can return to it
    sessionStorage.setItem('lastFileGatorUrl', url);
    
    var modal = document.createElement('div');
    modal.className = 'pdocrud-files-modal';
    
    // Create iframe with FileGator - use sandbox that allows scripts and popups
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'pdocrud-files-modal-iframe';
    iframe.setAttribute('style', 'width: 100%; height: 100%; border: none; border-radius: 12px; display: block;');
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups');
    
    // Add close button
    var closeBtn = document.createElement('span');
    closeBtn.className = 'pdocrud-files-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    var content = document.createElement('div');
    content.className = 'pdocrud-files-modal-content';
    content.appendChild(closeBtn);
    content.appendChild(iframe);
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Wait for FileGator to load, then override window.open to intercept file opens
    iframe.onload = function() {
        try {
            var iframeWin = iframe.contentWindow;
            var originalOpen = iframeWin.window.open;
            
            // Override window.open to intercept file opens
            iframeWin.window.open = function(url, target, features) {
                console.log('FileGator trying to open: ' + url);
                
                // Extract and decode the path parameter to check file type
                var decodedPath = '';
                try {
                    var urlObj = new URL(url);
                    var pathParam = urlObj.searchParams.get('path');
                    if (pathParam) {
                        decodedPath = atob(pathParam); // Decode base64
                        console.log('Decoded path: ' + decodedPath);
                    }
                } catch(e) {
                    console.log('Could not parse URL: ' + e.message);
                }
                
                // Check if it's a video file
                var videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
                var isVideo = videoExtensions.some(ext => 
                    url.toLowerCase().includes(ext) || decodedPath.toLowerCase().includes(ext)
                );
                
                // Check if it's a PDF file
                var pdfExtensions = ['.pdf'];
                var isPdf = pdfExtensions.some(ext => 
                    url.toLowerCase().includes(ext) || decodedPath.toLowerCase().includes(ext)
                );
                
                if (isVideo) {
                    console.log('Intercepting video: ' + url);
                    // Close FileGator modal and open video in our modal instead
                    modal.remove();
                    openVideoModal(url);
                    return null;
                }
                
                if (isPdf) {
                    console.log('Intercepting PDF: ' + url);
                    // Close FileGator modal and open PDF in our modal instead
                    modal.remove();
                    openPdfModal(url);
                    return null;
                }
                
                // For other file types, open normally (download)
                return originalOpen.call(iframeWin.window, url, target, features);
            };
            
        } catch(e) {
            console.log('Cannot override window.open in iframe: ' + e.message);
        }
    };
}

function openVideoModal(videoUrl) {
    var modal = document.createElement('div');
    modal.className = 'pdocrud-files-modal';
    
    var closeBtn = document.createElement('span');
    closeBtn.className = 'pdocrud-files-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    var backBtn = document.createElement('button');
    backBtn.innerHTML = '← Back to Files';
    backBtn.setAttribute('style', 'position: absolute; top: 50px; left: 20px; z-index: 2002; padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;');
    backBtn.onmouseover = function() {
        this.style.background = '#0056b3';
    };
    backBtn.onmouseout = function() {
        this.style.background = '#007bff';
    };
    backBtn.onclick = function() {
        modal.remove();
        // Re-open FileGator with the same URL
        var lastFileGatorUrl = sessionStorage.getItem('lastFileGatorUrl');
        if (lastFileGatorUrl) {
            var fileGatorLink = document.createElement('a');
            fileGatorLink.setAttribute('href', lastFileGatorUrl);
            openFilesModal(fileGatorLink, true);
        }
    };
    
    var videoContainer = document.createElement('div');
    videoContainer.setAttribute('style', 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000;');
    
    var video = document.createElement('video');
    video.setAttribute('width', '100%');
    video.setAttribute('height', 'auto');
    video.setAttribute('controls', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('style', 'max-width: 100%; max-height: 85vh; object-fit: contain;');
    
    var source = document.createElement('source');
    source.setAttribute('src', videoUrl);
    source.setAttribute('type', 'video/mp4');
    
    video.appendChild(source);
    videoContainer.appendChild(video);
    
    var content = document.createElement('div');
    content.className = 'pdocrud-files-modal-content';
    content.setAttribute('style', 'background: #000; padding: 0; position: relative;');
    content.appendChild(closeBtn);
    content.appendChild(backBtn);
    content.appendChild(videoContainer);
    
    modal.appendChild(content);
    document.body.appendChild(modal);
}

function openPdfModal(pdfUrl) {
    var modal = document.createElement('div');
    modal.className = 'pdocrud-files-modal';
    
    var closeBtn = document.createElement('span');
    closeBtn.className = 'pdocrud-files-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    var backBtn = document.createElement('button');
    backBtn.innerHTML = '← Back to Files';
    backBtn.setAttribute('style', 'position: absolute; top: 50px; left: 20px; z-index: 2002; padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;');
    backBtn.onmouseover = function() {
        this.style.background = '#0056b3';
    };
    backBtn.onmouseout = function() {
        this.style.background = '#007bff';
    };
    backBtn.onclick = function() {
        modal.remove();
        // Re-open FileGator with the same URL
        var lastFileGatorUrl = sessionStorage.getItem('lastFileGatorUrl');
        if (lastFileGatorUrl) {
            var fileGatorLink = document.createElement('a');
            fileGatorLink.setAttribute('href', lastFileGatorUrl);
            openFilesModal(fileGatorLink, true);
        }
    };
    
    var downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '⬇ Download PDF';
    downloadBtn.setAttribute('style', 'position: absolute; top: 50px; right: 70px; z-index: 2002; padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;');
    downloadBtn.onmouseover = function() {
        this.style.background = '#218838';
    };
    downloadBtn.onmouseout = function() {
        this.style.background = '#28a745';
    };
    downloadBtn.onclick = function() {
        // Trigger download
        var link = document.createElement('a');
        link.href = pdfUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    var pdfContainer = document.createElement('div');
    pdfContainer.setAttribute('style', 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f5f5f5;');
    
    var pdfEmbed = document.createElement('iframe');
    pdfEmbed.setAttribute('src', pdfUrl + '#toolbar=1&navpanes=0&scrollbar=1');
    pdfEmbed.setAttribute('type', 'application/pdf');
    pdfEmbed.setAttribute('style', 'width: 100%; height: 100%; border: none;');
    
    pdfContainer.appendChild(pdfEmbed);
    
    var content = document.createElement('div');
    content.className = 'pdocrud-files-modal-content';
    content.setAttribute('style', 'background: #f5f5f5; padding: 0; position: relative;');
    content.appendChild(closeBtn);
    content.appendChild(backBtn);
    content.appendChild(downloadBtn);
    content.appendChild(pdfContainer);
    
    modal.appendChild(content);
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
