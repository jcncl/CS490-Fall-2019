var examName ="";
var username ="";
var question_ids = [];
var questionDB = [];

window.onload=function(){
	loggedInStudent();
	examName = 	window.localStorage.getItem('examName');
	username = window.localStorage.getItem('username')
	ajaxCallExamQuestions(examName, username);
	document.getElementById('exam_name').innerHTML = examName;
};

function submitExam() {
	var flag = false

	for (var i in question_ids){
		if(String(document.getElementById("student_answer_"+question_ids[i]).value)==""){
			flag = true;
			break;
		}
	}
	if(flag == true){
   alert("Check to see if you have completed all Questions");
	} else
	{
		//console.log("im in a loop");
		var array= {
		"username": username,
		"examName": examName,
		};

    var time="-1999";
    var questions = question_ids.length;
		for(var j in question_ids){
			var id = question_ids[j];
			var answer = '"'+document.getElementById("student_answer_"+id).value +'"';

      var subOutput = questionDB[id]['output'].replace(/:/g,",");
			array = {
				"username": username,
				"examName": examName,
				"id":id,
				"functionName":questionDB[id]['functionName'],
				"topic":questionDB[id]['topic'],
				"parameters":questionDB[id]['cases'],
				"input":questionDB[id]['input'],
				"output":subOutput,
				"answer":answer,
        "constraint": questionDB[id]['constraint'],
        "loop": questionDB[id]['loop'],
        "maxGrade":questionDB[id]['pointWorth']
				}
      console.log(array);
			var fields = JSON.stringify(array);
      fields = fields.replace(/\+/g,"%2B");
      console.log(fields);
			ajaxSaveExamRequest(fields);


			}
		}
}

function ajaxSaveExamRequest(fields)
{
	console.log("im in another function");
	console.log(fields);
	var data = 'json_string='+fields;
	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/sendExam.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
      var ajaxDisplay = document.getElementById('Exam_Submit');
			//var parsedResponse = JSON.parse(response);
			//console.log()
			console.log(response);
      if (response="success"){
      document.getElementById("Exam_submit_btn").disabled = true;
      ajaxDisplay.innerHTML = "Exam Submitted Successfully";
      setTimeout(function(){
   window.location.href='studentHomePage.html';
   },3000);
      }
		} else {
			console.log("failed to recieve PHP response");
   setTimeout(function(){
   window.location.href='studentHomePage.html';
   },3000);
		}
	};
}
function ajaxCallExamQuestions(examName, username){

	var data = 'json_string={"header":"takeExamRequest","examName":"'+examName+'"}';
	var request = new XMLHttpRequest();
	console.log(data);

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);


	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;


			populateQuestions(response);
		} else {
			console.log("failed to recieve PHP response")
		}
	};
}

function populateQuestions(response){
console.log(response);
    questionDB = JSON.parse(response);

	for (var i in questionDB){
		var exam_node = document.getElementById("question-list");
		var new_div = document.createElement("div");
		new_div.id = "question_wrapper_"+i
    new_div.className="question-container";
		new_div.innerHTML = `
			<form>
				<div class="container-title">
					<div class="caption">
						<span class="caption-title" id="question_name_`+i+`">`+questionDB[i]['functionName']+` </span>
						<span class="caption-explain" id ="point_worth_`+i+`"> Points: `+questionDB[i]['pointWorth']+`</span>
					</div>
				</div>
				<div class="question-body">
					<div class="left">
						<h4 id="question_id_`+i+`"> Question ID: `+i+` </h4>
						<p>`+questionDB[i]['question']+`</p>
					</div>
					<div class="right">
						<h4> Your Answer: </h4>
						<div>
							<textarea class="answer" id="student_answer_`+i+`"></textarea>
						</div>
					</div>
				</div>
			</form>
							`
		exam_node.appendChild(new_div);
		question_ids.push(i);
	}
 console.log(question_ids);
}


