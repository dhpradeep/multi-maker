// read csv file
function handleFiles(files) {
	if (window.FileReader) {
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	reader.onload = loadHandler;
	reader.onerror = errorHandler;     
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	drawOutput(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("tags").innerHTML = "";
	document.getElementById("datas").innerHTML = "";

	var lines_header = lines[0];

	var tags = document.getElementById("tags");
	for (var i=0; i<lines_header.length; i++)
	{
		tags.innerHTML += "<div class='hoverable resize-drag' style='margin-left:"+(i*5)+"em'>"+ lines_header[i] +"</div>"
	}


	//remove header of csv file
	lines.shift()

	var csv_add = document.createDocumentFragment();
	for (var i = 0; i < lines.length-1; i++) 
	{
			var div = document.createElement('div');
			div.className = 'nodes';
			div.innerHTML = lines[i]+"\n";
			csv_add.appendChild(div);
	}
   document.getElementById("datas").appendChild(csv_add);

	
}
//end of read csv file
