var examName = window.localStorage.getItem('examName');
var students = [];
var examDB =[]
window.onload=function(){
	document.getElementById('exam_name').innerHTML = "Exam Name: "+examName;
	loggedInTeacher();
	ajaxCallExamScores(examName);
	ajaxReleaseScore(examName);
};


function populateExams(response)
{
	examDB = JSON.parse(response);
	console.log(response);
	students = JSON.parse(response);

	var table = document.getElementById("student_table");

	for (var i in students){

		var tr = document.createElement("tr");

		var studentName = students[i]['username'];
		var student_name_td = document.createElement("td");
		var student_name = document.createTextNode(students[i]['username']);
		student_name_td.appendChild(student_name);

		var status = students[i]['status'];
		var student_status_td = document.createElement("td");
		var student_status = document.createTextNode(status);
		student_status_td.appendChild(student_status);

		var student_grade_td = document.createElement("td");
		if (status == "Submitted" || status == "Released")
		{
			var string = students[i]['grade']+"/"+students[i]['total'];
			var student_grade = document.createTextNode(string);
		}
		else
		{
			var string = "N/A";
			var student_grade = document.createTextNode(string);
		}
		student_grade_td.appendChild(student_grade);

		var review_td = document.createElement("td");
		if (status == "Submitted" || status == "Released")
		{
			review_td.innerHTML = '<div><input class="tiny-button" type="button" value="Review" onClick="reviewExam('+i+')"></div>'
		}
		else
		{
			review_td.innerHTML = '<div><input class="tiny-button" type="button" value="Review" onClick="reviewExam('+i+')" disabled></div>'
		}
		var release_td = document.createElement("td");
		if (examDB[i]['status'] == 'Released'||examDB[i]['status'] == 'Assigned'){
			release_td.innerHTML = '<div><input class="tiny-button" type="button" value="Release" onClick="releaseScore('+i+')" disabled></div>'
		} else {
			release_td.innerHTML = '<div><input class="tiny-button" type="button" value="Release" onClick="releaseScore('+i+')"></div>'
		}
		tr.appendChild(student_name_td);
		tr.appendChild(student_status_td);
		tr.appendChild(student_grade_td);
		tr.appendChild(review_td);
		tr.appendChild(release_td);
		table.appendChild(tr);

	}
}


function reviewExam(studentNo){
	window.localStorage.setItem("studentName", students[studentNo]['username']);
	goTo('modify_exam.html');
}



function ajaxCallExamScores(examName){

	var data = 'json_string={"header":"teacherExamScoreRequest","examName":"'+examName+'"}';
	console.log(data);

	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function()
	{
		if (request.status >= 200 && request.status < 400)
		{
			var response = request.responseText;
			console.log(response);
			populateExams(response);
		}
		else
		{
			console.log("failed to recieve PHP response")
		}
	};
}
function ajaxReleaseScores(examName){

	var data = 'json_string={"header":"releaseScore","examName":"'+examName+'"}';
	console.log(data);

	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);
			populateExams(response);
		} else {
			console.log("failed to recieve PHP response")
		}
	};
}

function ajaxReleaseScore(examName){
	var data = 'json_string={"header":"examRelease","examName":"'+examName+'"}';
	console.log("The data is: " + data);

	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);


	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
			console.log(response);

		} else {
			console.log("failed to recieve PHP response")
		}
	};
}

function releaseScore(examID){
	ajaxReleaseScore(examDB[examID]['examName']);
	location.reload();

}