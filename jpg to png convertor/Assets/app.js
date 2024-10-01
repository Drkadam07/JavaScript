
  var selectedFile;

  function handleFileSelect(event) {
    event.preventDefault();
    selectedFile = event.target.files[0];
    showImagePreview(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  function handleDrop(event) {
    event.preventDefault();
    selectedFile = event.dataTransfer.files[0];
    showImagePreview(selectedFile);
  }

  function showImagePreview(file) {
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = '<img src="' + URL.createObjectURL(file) + '" alt="Original Image">';
  }

  function convertImage() {
    var toFormat = document.getElementById('toFormat').value;

    if (selectedFile) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var resultElement = document.getElementById('result');
        resultElement.innerHTML = '<img src="' + e.target.result + '" alt="Converted Image">';
        
        // Display the download button and reset button
        var downloadButton = document.getElementById('downloadButton');
        var resetButton = document.getElementById('resetButton');
        downloadButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';
        
        // Convert the image and update download link
        var convertedImage = convertToFormat(e.target.result, toFormat);
        downloadButton.href = convertedImage;
      }
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select an image.');
    }
  }

  
  function resetInterface() {
    var resultElement = document.getElementById('result');
    var downloadButton = document.getElementById('downloadButton');
    var dropZone = document.getElementById('dropZone');
    
    resultElement.innerHTML = '';
    downloadButton.style.display = 'none';
    dropZone.innerHTML = '<p>Drag & Drop an image file here</p>';
    
    // Clear the file input
    document.getElementById('imageInput').value = '';
    selectedFile = null;
}

  
  function downloadConvertedImage() {
    var resultImage = document.querySelector('.result img'); // Update this line
    var link = document.createElement('a');
    link.href = resultImage.src;
    link.download = 'converted_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
