document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const settingsPanel = document.getElementById('settings-panel');
    const previewPanel = document.getElementById('preview-panel');
    const processBtn = document.getElementById('process-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    const formatSelect = document.getElementById('format-select');
    const qualitySlider = document.getElementById('quality-slider');
    const qualityValue = document.getElementById('quality-value');
    const qualityGroup = document.getElementById('quality-group');
    
    const previewImg = document.getElementById('preview-img');
    const fileNameEl = document.getElementById('file-name');
    const originalSizeEl = document.getElementById('original-size');
    const compressedSizeEl = document.getElementById('compressed-size');
    const statusText = document.getElementById('status-text');

    let currentFile = null;
    let processedBlob = null;
    let processedUrl = null;

    // Helper: format bytes
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    // UI Updates
    function updateQualityValue() {
        qualityValue.textContent = `${Math.round(qualitySlider.value * 100)}%`;
    }

    function checkFormatSupport() {
        // PNG doesn't support quality slider natively in standard canvas toBlob
        if (formatSelect.value === 'image/png') {
            qualityGroup.style.display = 'none';
        } else {
            qualityGroup.style.display = 'flex';
        }
    }

    // Event Listeners for UI
    qualitySlider.addEventListener('input', updateQualityValue);
    formatSelect.addEventListener('change', checkFormatSupport);

    // Initial setup
    updateQualityValue();
    checkFormatSupport();

    function setStatus(key, type = '') {
        if (typeof getTranslation === 'function') {
            statusText.textContent = getTranslation(key); // relies on i18n window fn
        } else {
            statusText.textContent = key; // fallback
        }
        statusText.className = 'status ' + type;
    }

    // Process uploaded file
    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            setStatus('errorNoFile', 'error');
            return;
        }

        currentFile = file;
        processedBlob = null;
        if (processedUrl) {
            URL.revokeObjectURL(processedUrl);
            processedUrl = null;
        }

        // Preview original
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            fileNameEl.textContent = file.name;
            originalSizeEl.textContent = formatBytes(file.size);
            compressedSizeEl.textContent = '-';

            // Show panels
            settingsPanel.classList.add('active');
            previewPanel.classList.add('active');
            processBtn.disabled = false;
            downloadBtn.disabled = true;

            // Guess original format to set initial value
            if (file.type === 'image/png') formatSelect.value = 'image/png';
            else if (file.type === 'image/webp') formatSelect.value = 'image/webp';
            else formatSelect.value = 'image/jpeg';
            
            checkFormatSupport();
            setStatus('statusIdle');
        };
        reader.readAsDataURL(file);
    }

    // Drag & Drop
    dropzone.addEventListener('click', () => fileInput.click());
    
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    // Image Processing
    processBtn.addEventListener('click', () => {
        if (!currentFile) return;

        setStatus('statusProcessing');
        processBtn.disabled = true;

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            
            // if converting to JPEG and img has transparency, fill with white background
            if (formatSelect.value === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const quality = parseFloat(qualitySlider.value);
            const mimeType = formatSelect.value;

            // Allow the UI to update the "Processing..." text before heavy JS
            setTimeout(() => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        processBtn.disabled = false;
                        downloadBtn.disabled = false;
                        processedBlob = blob;
                        
                        if (processedUrl) URL.revokeObjectURL(processedUrl);
                        processedUrl = URL.createObjectURL(blob);
                        
                        compressedSizeEl.textContent = formatBytes(blob.size);
                        setStatus('success', 'success');
                    } else {
                        processBtn.disabled = false;
                        setStatus('errorProcess', 'error');
                    }
                }, mimeType, quality);
            }, 50);
        };
        img.onerror = () => {
            processBtn.disabled = false;
            setStatus('errorProcess', 'error');
        };

        // Load image data from current file
        img.src = previewImg.src;
    });

    // Download
    downloadBtn.addEventListener('click', () => {
        if (!processedBlob || !processedUrl) return;

        const a = document.createElement('a');
        a.href = processedUrl;

        // Create new filename based on selected format
        const extMatch = formatSelect.value.match(/\/([a-z]+)$/i);
        const ext = extMatch ? extMatch[1] : 'jpg';
        
        let newFileName = currentFile.name.substring(0, currentFile.name.lastIndexOf('.')) || currentFile.name;
        newFileName += '_lumina.' + ext;
        
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
