d.addEventListener("DOMContentLoaded", function(){
	// Достаем стелочки
	larr = getById("leftarrow");
	rarr = getById("rightarrow");

	// Достаем все "сцены"
	scenes = getElArr("#slider .scene");

	counter = 0;
	scenes_count = scenes.length - 1;

	function AnimateIt (lstcnt, curcnt, dir)
	{
		if(last_scene)
		{
			last_scene.classList.remove("inactive_l");
			last_scene.classList.remove("inactive_r");
		}

		last_scene = scenes.item(lstcnt);
		cur_scene = scenes.item(curcnt);

		if(dir == 1)
		{
			cur_scene.classList.remove("pos_l");
			cur_scene.classList.add("pos_r");
		}
		else
		{
			cur_scene.classList.remove("pos_r");
			cur_scene.classList.add("pos_l");
		}
		cur_scene.classList.remove("inactive_l");
		cur_scene.classList.remove("inactive_r");

		w.requestAnimationFrame(function(){
			cur_scene.classList.add("active");
		});

		if(dir == 1)
			last_scene.classList.add("inactive_l");
		else
			last_scene.classList.add("inactive_r");
		last_scene.classList.remove("active");
	}
	
	larr.onclick = function ()
	{
		clearTimeout(auto_listener);
		lstcnt = counter;
		counter--;
		if(counter < 0) counter = scenes_count;

		AnimateIt(lstcnt, counter, 0);
		auto_listener = setTimeout(function(){larr.onclick()}, 30000);
	}
	rarr.onclick = function ()
	{
		clearTimeout(auto_listener);
		lstcnt = counter;
		counter++;
		if(counter > scenes_count) counter = 0;

		AnimateIt(lstcnt, counter, 1);
		auto_listener = setTimeout(function(){rarr.onclick()}, 30000);
	}
	auto_listener = setTimeout(function(){rarr.onclick()}, 30000);
});