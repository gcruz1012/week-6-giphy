var animals=["cat", "dog", "mouse", "bird", "zebra", "lion","horse", "tiger", "pig"];

for(var i=0;i<animals.length;i++){

	var animalButton = $("<button>");

	animalButton.attr("id",animals[i]);

	animalButton.html(animals[i]);

	$("#animalButtons").append(animalButton)

	};


function all(){

	$("button").on("click", function clicked() {

		var it = $(this).attr("id");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + it + "&api_key=slH3G7Y5Q8II7nD8yUF1iGfmKRMvqQVL&limit=10";
	

		$.ajax({
		url: queryURL,
		method: "GET"
		})


	.done(function (response) {
	
		if (!$("#animals").is(":empty")){

		$("#animals").html("");

		}


		else{

			var results = response.data;

			for (var j = 0; j < results.length; j++) {

				var gifDiv = $("<div>");

				var rating = results[j].rating;

				var p = $("<p>").text("Rating: " + rating);

				var animalImage = $("<img class='item'>");

				animalImage.attr("src", results[j].images.fixed_height_still.url);

				animalImage.attr("data-still",results[j].images.fixed_height_still.url);

				animalImage.attr("data-animate",results[j].images.fixed_height.url)

				animalImage.attr("data-state","still");
				
				console.log(animalImage);

				gifDiv.prepend(p);

				gifDiv.prepend(animalImage);

				$("#animals").append(gifDiv);
			}

			$(".item").on("click", function() {

				var state=$(this).attr("data-state");
				// console.log(state);
				var animate=$(this).attr("data-animate");

				var still=$(this).attr("data-still");

				if(state==="still"){

					$(this).attr("src", animate);

					$(this).attr("data-state","animate");

					console.log(this);
				}


				else{
					$(this).attr("src", still);

					$(this).attr("data-state", "still");
				}


			});

			
		};

	});
			
	});
};
			$("#addAnimal").on("click",function(event){

				event.preventDefault();

				var newAnimal=$("#animal-input").val().trim();

				console.log(newAnimal);
			
				animals.push(newAnimal);
			
				var animalButton = $("<button>");
			
				animalButton.attr("id",animals[animals.length-1]);
			
				animalButton.html(animals[animals.length-1]);
				
				$("#animalButtons").append(animalButton)
				
				all();
			});
all();