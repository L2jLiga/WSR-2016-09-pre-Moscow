var w = window;
var d = w.document;

var larr,rarr,scenes,counter,scenes_count,cur_scene,last_scene, auto_listener;

function getById (id)
{
	return d.getElementById(id);
}
function getEl (selector)
{
	return d.querySelector(selector);
}
function getElArr (selector)
{
	return d.querySelectorAll(selector);
}

d.addEventListener("DOMContentLoaded", function(){
	// Для мобилки
	var nav, menutog;
	menutog = getById("menutoggle");
	nav = getEl("nav");
	
	menutog.onclick = function(){
		if(nav.getAttribute("class") == 'active')
		{
			nav.removeAttribute("class");
		}
		else
		{
			nav.setAttribute("class", "active");
		}
	}
});