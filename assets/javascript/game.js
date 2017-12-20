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
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#animals").append(gifDiv);
          }
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