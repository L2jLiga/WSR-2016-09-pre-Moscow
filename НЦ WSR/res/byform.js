String.prototype.replaceAll = function(search, replace){
  return this.split(search).join(replace);
}

function insertParam(name, desc, tuda)
{
	if(!name || !desc || !tuda) return;
	var e = d.createElement("div");

	var n = d.createElement("b");
	n.innerHTML = name;

	e.appendChild(n);
	e.innerHTML = e.innerHTML + ": " + desc;
	
	tuda.appendChild(e);
	
	return;
}

d.addEventListener("DOMContentLoaded", function(){
	var buyus = getElArr("#form > div");
	var state = 0;
	
	var cl_button = getEl("#form > button");
	
	var stvorki;
	var stv = "";
	var data = "";
	
	function send_fake ()
	{
		// stvorki - Это сколько сьворок
		// stv - номера с поворотно-откидными механизмами..
		// data- - полуготовое тело запроса XHR
		var xhr = new XMLHttpRequest();

		stv = stv.trim().replaceAll("  ", ' ');

		data = data + "&zakaz[stv_cnt]=" + stv;
		data = data + "&zakaz[stvorki]=" + stvorki;
		
		xhr.open("POST", '/submit.php', true)
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return;

			getEl("#form").innerHTML = "<div id='form3' class='active'><h3>"+this.responseText+"</h3></div>";
		}
		xhr.send(data);
	}
	
	cl_button.onclick = function()
	{
		buyus.item(state).classList.add("inactive");
		
		state++;
		if(state == 2)
		{
			cl_button.onclick = function(){send_fake()};
			stv = "";
			data = "submit=1";
			var input = getElArr("#form input");
			for(var i = 0; i < input.length; i++)
			{
				var name, inp, desc;
				inp = input.item(i);
				if(inp.getAttribute('type') === 'radio')
				{
					if(inp.checked)
					{
						name = "Количество створок";
						desc = inp.value;
						stvorki = desc;
					}
					else
					{
						continue;
					}
				}
				else if (inp.getAttribute('type') === 'checkbox')
				{
					if(inp.value > stvorki) continue;
					if(inp.checked)
					{
						// TO DO: будет время - оптимизировать
						name = "Поворотно-откидной механизм на"
						desc = inp.value + " створке";

						stv = stv + " " + inp.value + " ";

					}
					else
					{
						continue;
					}
				}
				else
				{
					name = inp.getAttribute("placeholder");
					desc = inp.value; 
					if(desc)
					data = data +  "&zakaz[" + inp.getAttribute("name") + "]=" + encodeURIComponent(inp.value);
				}
				if(name && desc){
					insertParam(name, desc, buyus.item(state));
				}
			}
		}
		
		buyus.item(state).classList.add("active");
	}
});