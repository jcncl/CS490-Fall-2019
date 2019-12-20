
document.querySelector("#loginForm").addEventListener("submit", function(e){
	//preventing default behaviour
	e.preventDefault();
	//making a call user userLogin()
	userLogin()
});

document.querySelector("#username").addEventListener("Invalid Credentials", function(){
	//checking for length of username
	if(String(this.value).length==0){
		this.setCustomValidity("Username Missing");
	}
	else{
		this.setCustomValidity("");
	}
});

document.querySelector("#password").addEventListener("Invalid Credentials", function(e){
	//checking for length of password
	if(String(this.value).length==0){
		this.setCustomValidity("Missing password...");
	}
	else{
		this.setCustomValidity("");
	}
});

function userLogin()
{
	var username = document.getElementById('username');
	var password = document.getElementById('password');

	makeAjaxCall(username.value, password.value);
}

function makeAjaxCall(username, password){
	var data = 'json_string={"header":"login","username":"'+username+'","password":"'+password+'"}';
 	//console.log(data);
	var request = new XMLHttpRequest();

	request.open('POST', 'https://web.njit.edu/~jcc53/curls/curl.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(data);
	console.log(data);

	//ajax request was successful
	request.onload = function() {
		if (request.status >= 200 && request.status < 400)
		{
			console.log(request.responseText);
			var response = request.responseText;
			//var serverResponse = JSON.parse(response);
			//console.log(serverResponse);
			loginAttempt(response, username);
		}
		else
		{
			console.log(response);
		}
	};
}

function loginAttempt(response, username){
 	//json_decode(response);
	console.log(response);
	//var responseJSON = response;
	//var parsedJSON = JSON.parse(response);
 	var ajaxDisplay = document.getElementById('ajaxDiv');
	if(response == '"Failure"')
	{
		console.log("Im here");
		ajaxDisplay.innerHTML = "<h3><center> Username or Password is incorrect!<br> Please try again!</center></h3>";
		console.log("failed Login");
	}
	else
	{
		window.localStorage.setItem('username', username);
		window.localStorage.setItem('type', response);

		if(response == '["student"]')
		{
			//console.log('"Student"')
			window.location.replace("https://web.njit.edu/~jcc53/studentHomePage.html");
		}
		else if(response == '["teacher"]')
		{
			//console.log("teacher")
			window.location.replace("https://web.njit.edu/~jcc53/teacherHomePage.html");
		}
	}
}

