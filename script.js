
	/*----  after loading window, initialize 4x4 grid bydefault ----*/
	window.onload = function() {
		$( ".block" ).css( "background-color", "#ddd" );
		defineGrid(4)
		startNewGame();		
	}


	/* --- Build dynamic board of nxn size----*/
	function defineGrid(n){
		var boardDiv = document.getElementsByClassName("boardCls")[0] ;
		$("#board").html("")
		let cnt=0 ;
		for(let i=0;i<n;i++)
		{
			var rowDiv = document.createElement("div") ;
			rowDiv.classList.add("row") ;
			rowDiv.style.height=(580/n)+"px";

			for(let j=0;j<n;j++)
			{
				var singleDiv = document.createElement("div") ;
				singleDiv.classList.add("block") ;
				singleDiv.style.width=(580/n)+"px" ;
				var para = document.createElement("p") ;
				para.classList.add("number") ;
				
				singleDiv.id="block-"+cnt ;
				para.id="blk-"+cnt;
				cnt++ ;
				singleDiv.appendChild(para) ;
				rowDiv.appendChild(singleDiv) ;
			}
			boardDiv.appendChild(rowDiv) ;
		}
	}

	function startNewGame(){
		let gridSize = document.getElementById("inputSizeGrid").value ;
		localStorage.setItem("gridSize",gridSize) ;
		defineGrid(gridSize) ;

		$(".number").html("");
		$("#total_moves").html('0');
		$("#total_score").html('0');
		initializeTwoBlocks();
		checkGameOver() ;
	}
		


	$(document).keydown(function(e){
		switch(e.which) {
	        case 37: // left
	        handleLeft();
	        break;

	        case 38: // up
	        handleUp();
	        break;

	        case 39: // right
	        handleRight();
	        break;

	        case 40: // down
	        handleDown();
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});

	function initializeTwoBlocks(){
		var first_block = Math.floor(Math.random() * 15);
		var second_block = Math.floor(Math.random() * 15);
		// if both number came same		
		if (first_block==second_block) {
			var second_block = (first_block + 1)%15;
		}
		
		// populate two blocks with 2
		$("#block-"+first_block).html("<p class='number' id='blk-"+first_block+"'>2</p>");
		$("#block-"+second_block).html("<p class='number' id='blk-"+second_block+"'>2</p>");

	}


	function handleUp(){
		let n = parseInt(localStorage.getItem("gridSize")) ;
		for (let i = 0; i<n*n; i++) 
		{
			let x = parseInt(i) ;
			let pos=-1;
		
			if($( "#blk-"+i).html() != "")
			{
				let tmp=x-n ;
				
				while((x-n)>=0 && ($( "#blk-"+tmp).html() == ""))
				{
					pos=x-n ;
					x=x-n ;
					tmp=x-n ;
				}
				if(pos!=-1)
				{					
					$("#block-"+pos).html("<p class='number' id='blk-"+pos+"'>2</p>");
					$("#block-"+i).html("<p class='number' id='blk-"+i+"'></p>");
				}
			}
			
		}
		changeBlockColor("up") ;
		generateNewItem();
		
	}

	function handleLeft(){
		let n = parseInt(localStorage.getItem("gridSize")) ;
		for (let i = 0; i<n*n; i++) 
		{
			let r = i/n ;
			let c = i%n ;
			let x = parseInt(i) ;
			let pos=-1;
		
			if($( "#blk-"+i).html() != "")
			{
				let tmp=x-1 ;
				
				while((tmp)>=(i-c) && ($( "#blk-"+tmp).html() == ""))
				{
					pos=x-1 ;
					x=x-1 ;
					tmp=x-1 ;
				}
				if(pos!=-1)
				{
					
					$("#block-"+pos).html("<p class='number' id='blk-"+pos+"'>2</p>");
					$("#block-"+i).html("<p class='number' id='blk-"+i+"'></p>");
				}
			}
			
		}
		changeBlockColor("left")
		generateNewItem();
	}

	function handleRight(){

		let n = parseInt(localStorage.getItem("gridSize")) ;
		for (let i = n*n; i>=0; i--) 
		{
			let r = i/n ;
			let c = i%n ;
			let x = parseInt(i) ;
			let pos=-1;
		
			if($( "#blk-"+i).html() != "")
			{
				let tmp=x+1 ;
				
				while((tmp)<(i+n-c) && ($( "#blk-"+tmp).html() == ""))
				{
					pos=x+1 ;
					x=x+1 ;
					tmp=x+1 ;
				}
				if(pos!=-1)
				{					
					$("#block-"+pos).html("<p class='number' id='blk-"+pos+"'>2</p>");
					$("#block-"+i).html("<p class='number' id='blk-"+i+"'></p>");
				}
			}
			
		}
		changeBlockColor("right")
		generateNewItem();
		
	}

	function handleDown(){

		let n = parseInt(localStorage.getItem("gridSize")) ;
		for (let i = n*n-1; i>=0; i--) 
		{
			let x = parseInt(i) ;
			let pos=-1;
		
			if($( "#blk-"+i).html() != "")
			{
				
				let tmp = x+n ;
				
				while((tmp<(n*n)) && ($( "#blk-"+tmp).html() == ""))
				{
					pos=x+n ;
					x=x+n ;
					tmp=x+n
				}
				if(pos!=-1)
				{					
					$("#block-"+pos).html("<p class='number'  id='blk-"+pos+"'>2</p>");
					$("#block-"+i).html("<p class='number' id='blk-"+i+"'></p>");
				}
			}
			
		}
		changeBlockColor("down") ;
		generateNewItem();
	}

	function generateNewItem(){ // to generate and place new item on every move
		let n = parseInt(localStorage.getItem("gridSize")) ;
		var empty_fields = []; // array to store empty fields
		for (var i = 0; i <n*n; i++) {
			if ($( "#blk-"+i).html() == "") {
				empty_fields.push(i);
			}
		}
		//to update move count
		var count= eval($( "#total_moves").html());
		count++;
		$( "#total_moves").html(count);
		//get an empty field id randomly
		var new_item = empty_fields[Math.floor(Math.random()*empty_fields.length)];
		//place new number 2 in field
		$( "#blk-"+new_item).html("2");
		checkGameOver();
	}

	function changeBlockColor(direction){
		var allBlocks = document.getElementsByClassName("block");

		for (var i = allBlocks.length - 1; i >= 0; i--) 
		{
			allBlocks[i].style.background='#ccc';
			if(direction=="up" && ($( "#blk-"+i).html()=="2")){
				allBlocks[i].style.background='#ff99ff';
			}
			else if(direction=="left" && ($( "#blk-"+i).html()=="2")){
				allBlocks[i].style.background='#ff0055';
			}
			else if(direction=="right" && ($( "#blk-"+i).html()=="2")){
				allBlocks[i].style.background='#5c8a8a';
			}
			else if(direction=="down" && ($( "#blk-"+i).html()=="2")){
				allBlocks[i].style.background='#008ae6';
			}
				
			
		}
	}

	function checkGameOver(){
		let n = parseInt(localStorage.getItem("gridSize")) ;
		var empty_fields = []; // array to store empty fields
		for (var i = 0; i <n*n; i++) {
			if ($( "#blk-"+i).html() == "") {
				empty_fields.push(i);
			}
		}

		//if no empty field send game over message
		if(empty_fields.length==0){
			var game_over = true;
		}
		if(game_over){
			$( "#status" ).html("<h2 style='color: red;'>OVER</h2>");			
		}
		else{
			$( "#status" ).html("<h2 style='color: green;'>RUNNING</h2>");
		}
	}
