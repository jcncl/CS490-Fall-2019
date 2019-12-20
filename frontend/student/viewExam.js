var examName ="";
var studentName ="";
var question_ids = [];
var questionDB = [];

window.onload = function(){
	loggedInStudent();
	examName = window.localStorage.getItem('examName');
	studentName = window.localStorage.getItem('studentName');
	ajaxCallTeacherReview(studentName, examName);
	document.getElementById('exam_name').innerHTML = examName;
	document.getElementById('student_name').innerHTML = studentName;
};


function ajaxCallTeacherReview(username, examName){

	var data = 'json_string={"header":"examReview","examName":"'+examName+'","username":"'+username+'"}';
	var request = new XMLHttpRequest();
	console.log(data);

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(data);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var response = request.responseText;
        console.log(response);
			populateExam(response);
		}
		else
		{
			console.log("failed to recieve PHP response")
		}
	};
}

function populateExam (response){

	var questionDB = JSON.parse(response);


	for (var i in questionDB) {
		var exam_node = document.getElementById("question-list");
		var new_div = document.createElement("div");
		new_div.id = "question_wrapper_"+i;
		new_div.className="review-container"
    if (questionDB[i]['teacherNotes']==null)
		{
    	questionDB[i]['teacherNotes'] = "";
    }
		new_div.innerHTML =  `

			<form>
			<div class="container-title">
				<div class="caption">
					<span class="caption-title" id="question_name_`+i+`">`+questionDB[i]['functionName']+`</span>
					<span class="caption-explain" id="point_worth_`+i+`"> Points: </span>
					<input type="text" disabled id="student_score_`+i+`" style="width: 30px;" value=`+questionDB[i]['grade']+`><span>/`+questionDB[i]['pointWorth']+`</span>
				</div>
			</div>
			<div class="review-body">
				<div class="question">
					<h4 id="question_id_`+i+`"> Question ID: `+questionDB[i]['id']+` </h4>
					<p id="question_`+i+`">`+questionDB[i]['question']+`</p>
				</div>
				<div class="answerbox">
					<h4>  Student Answer: </h4>
					<div>
						<textarea disabled class="reviewanswer" id="student_answer_`+i+`">`+questionDB[i]['answer']+`</textarea>
					</div>
				</div>
				<div class="teacherNotes">
					<h4>  Teacher Notes: </h4>
					<textarea disabled class="teacheranswer" id="teacher_notes_`+i+`">`+questionDB[i]['teacherNotes']+`</textarea>
				</div>
				<div class="autoNotes">
					<table>
						<thead>
							<tr>
								<th>Area</th>
								<th>Notes</th>
                <th>Grades</th>
							</tr>
						</thead>
						<tbody id="autoNotes_table_`+i+`">
						</tbody>
					</table>
				</div>
			</div>
			</form>

				`;
		exam_node.appendChild(new_div);
		question_ids.push(i);
		var table = document.getElementById("autoNotes_table_"+i);
		var notes = questionDB[i]['autoNotes'].split(";");
  //insert a row

    var tr = document.createElement("tr");

    var function_name_td = document.createElement("td");
		var function_name = document.createTextNode("Function Name");
		function_name_td.appendChild(function_name);


		var function_notes_td = document.createElement("td");
		var functionNotes = document.createTextNode(questionDB[i]['functionNotes']);
		function_notes_td.appendChild(functionNotes);

		var function_grade_td = document.createElement("td");
    function_grade_td.id="FunctionGrade_"+i;
		var function_grade = document.createTextNode(questionDB[i]['functionGrade']);
		function_grade_td.appendChild(function_grade);

    tr.appendChild(function_name_td);
		tr.appendChild(function_notes_td);
		tr.appendChild(function_grade_td);
    table.appendChild(tr);

    //Insert Row

    var tr = document.createElement("tr");

    var syntax_name_td = document.createElement("td");
		var syntax_name = document.createTextNode("Syntax Check");
		syntax_name_td.appendChild(syntax_name);


		var syntax_notes_td = document.createElement("td");
		var syntaxNotes = document.createTextNode(questionDB[i]['syntaxNotes']);
		syntax_notes_td.appendChild(syntaxNotes);

		var syntax_grade_td = document.createElement("td");
   syntax_grade_td.id="SyntaxGrade_"+i;
		var syntax_grade = document.createTextNode(questionDB[i]['syntaxGrade']);
		syntax_grade_td.appendChild(syntax_grade);

   tr.appendChild(syntax_name_td);
		tr.appendChild(syntax_notes_td);
		tr.appendChild(syntax_grade_td);
    table.appendChild(tr);
    //Insert Row

    var tr = document.createElement("tr");

    var constraint_name_td = document.createElement("td");
		var constraint_name = document.createTextNode("Constraint Check");
		constraint_name_td.appendChild(constraint_name);


		var constraint_notes_td = document.createElement("td");
		var constraintNotes = document.createTextNode(questionDB[i]['constraintNotes']);
		constraint_notes_td.appendChild(constraintNotes);

		var constraint_grade_td = document.createElement("td");
   constraint_grade_td.id="ConstraintGrade_"+i;
		var constraint_grade = document.createTextNode(questionDB[i]['constraintGrade']);
		constraint_grade_td.appendChild(constraint_grade);

   tr.appendChild(constraint_name_td);
		tr.appendChild(constraint_notes_td);
		tr.appendChild(constraint_grade_td);
    table.appendChild(tr);
    //Insert Row
  var loop = questionDB[i]['loopNotes']
    if(loop!="No Loops Required"){
    var tr = document.createElement("tr");

    var loop_name_td = document.createElement("td");
		var loop_name = document.createTextNode("Loop Check");
		loop_name_td.appendChild(loop_name);


		var loop_notes_td = document.createElement("td");
		var loopNotes = document.createTextNode(questionDB[i]['loopNotes']);
		loop_notes_td.appendChild(loopNotes);

		var loop_grade_td = document.createElement("td");
   loop_grade_td.id="LoopGrade_"+i;
		var loop_grade = document.createTextNode(questionDB[i]['loopGrade']);
		loop_grade_td.appendChild(loop_grade);

   tr.appendChild(loop_name_td);
		tr.appendChild(loop_notes_td);
		tr.appendChild(loop_grade_td);
    table.appendChild(tr);
    }
    //Insert Row
  var Test1 = questionDB[i]['TestCase1']
    if(Test1!="No Test Case"){
    var tr = document.createElement("tr");

    var TC1_name_td = document.createElement("td");
		var TC1_name = document.createTextNode("Test Case 1");
		TC1_name_td.appendChild(TC1_name);


		var TC1_notes_td = document.createElement("td");
		var TC1Notes = document.createTextNode(questionDB[i]['TestCase1']);
		TC1_notes_td.appendChild(TC1Notes);

		var TC1_grade_td = document.createElement("td");
   TC1_grade_td.id="TC1Grade_"+i;
		var TC1_grade = document.createTextNode(questionDB[i]['TC1Grade']);
		TC1_grade_td.appendChild(TC1_grade);

   tr.appendChild(TC1_name_td);
		tr.appendChild(TC1_notes_td);
		tr.appendChild(TC1_grade_td);
    table.appendChild(tr);
    }

    //Insert Row
    var Test2 = questionDB[i]['TestCase2']
    if(Test2!="No Test Case"){
    var tr = document.createElement("tr");

    var TC2_name_td = document.createElement("td");
		var TC2_name = document.createTextNode("Test Case 2");
		TC2_name_td.appendChild(TC2_name);


		var TC2_notes_td = document.createElement("td");
		var TC2Notes = document.createTextNode(questionDB[i]['TestCase2']);
		TC2_notes_td.appendChild(TC2Notes);

		var TC2_grade_td = document.createElement("td");
   TC2_grade_td.id="TC2Grade_"+i;
		var TC2_grade = document.createTextNode(questionDB[i]['TC2Grade']);
		TC2_grade_td.appendChild(TC2_grade);

   tr.appendChild(TC2_name_td);
		tr.appendChild(TC2_notes_td);
		tr.appendChild(TC2_grade_td);
    table.appendChild(tr);
    }

    //Insert Row
  var Test3 = questionDB[i]['TestCase3']
    if(Test3 != "No Test Case"){
    var tr = document.createElement("tr");

    var TC3_name_td = document.createElement("td");
		var TC3_name = document.createTextNode("Test Case 3");
		TC3_name_td.appendChild(TC3_name);


		var TC3_notes_td = document.createElement("td");
		var TC3Notes = document.createTextNode(questionDB[i]['TestCase3']);
		TC3_notes_td.appendChild(TC3Notes);

		var TC3_grade_td = document.createElement("td");
   TC3_grade_td.id="TC3Grade_"+i;
		var TC3_grade = document.createTextNode(questionDB[i]['TC3Grade']);
		TC3_grade_td.appendChild(TC3_grade);

   tr.appendChild(TC3_name_td);
		tr.appendChild(TC3_notes_td);
		tr.appendChild(TC3_grade_td);
    table.appendChild(tr);
    }
    //Insert Row
  var Test4 = questionDB[i]['TestCase4']
    if(Test4!="No Test Case"){
    var tr = document.createElement("tr");

    var TC4_name_td = document.createElement("td");
		var TC4_name = document.createTextNode("Test Case 4");
		TC4_name_td.appendChild(TC4_name);


		var TC4_notes_td = document.createElement("td");
		var TC4Notes = document.createTextNode(questionDB[i]['TestCase4']);
		TC4_notes_td.appendChild(TC4Notes);

		var TC4_grade_td = document.createElement("td");
   TC4_grade_td.id="TC4Grade_"+i;
		var TC4_grade = document.createTextNode(questionDB[i]['TC4Grade']);
		TC4_grade_td.appendChild(TC4_grade);

    tr.appendChild(TC4_name_td);
		tr.appendChild(TC4_notes_td);
		tr.appendChild(TC4_grade_td);
    table.appendChild(tr);
    }
    //Insert Row
    var Test5 = questionDB[i]['TestCase5']

  if(Test5!="No Test Case"){
    var tr = document.createElement("tr");

    var TC5_name_td = document.createElement("td");
		var TC5_name = document.createTextNode("Test Case 5");
		TC5_name_td.appendChild(TC5_name);


		var TC5_notes_td = document.createElement("td");
		var TC5Notes = document.createTextNode(questionDB[i]['TestCase5']);
		TC5_notes_td.appendChild(TC5Notes);

		var TC5_grade_td = document.createElement("td");
   TC5_grade_td.id="TC5Grade_"+i;
		var TC5_grade = document.createTextNode(questionDB[i]['TC5Grade']);
		TC5_grade_td.appendChild(TC5_grade);

   tr.appendChild(TC5_name_td);
		tr.appendChild(TC5_notes_td);
		tr.appendChild(TC5_grade_td);
    table.appendChild(tr);
  }
    //Insert Row
    var Test6 = questionDB[i]['TestCase6'];
    console.log(Test6);
  if(Test6!="No Test Case"){
    var tr = document.createElement("tr");

    var TC6_name_td = document.createElement("td");
		var TC6_name = document.createTextNode("Test Case 6");
		TC6_name_td.appendChild(TC6_name);


		var TC6_notes_td = document.createElement("td");
		var TC6Notes = document.createTextNode(questionDB[i]['TestCase6']);
		TC6_notes_td.appendChild(TC6Notes);

		var TC6_grade_td = document.createElement("td");
   TC6_grade_td.id="TC6Grade_"+i;
		var TC6_grade = document.createTextNode(questionDB[i]['TC6Grade']);
		TC6_grade_td.appendChild(TC6_grade);

   tr.appendChild(TC6_name_td);
		tr.appendChild(TC6_notes_td);
		tr.appendChild(TC6_grade_td);
    table.appendChild(tr);
    }
	}

}

