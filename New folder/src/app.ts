import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = <HTMLInputElement>document.querySelector("#address")!;

const GOOGLE_API_KEY = "AIzaSyDPrIjCm_BqDoISfR43gzpD04DHp_anXW8";
type GoogleGeocodingResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[];
	status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

function searchAddressHandler(e: Event) {
	e.preventDefault();

	//get form input
	const enteredAddress = addressInput.value;

	//send address to Google's API

	//encodeURI() - Convert address string to URL compatible string

	axios
		.get<GoogleGeocodingResponse>(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
				enteredAddress
			)}&key=${GOOGLE_API_KEY}
    `
		)
		.then((response) => {
			if (response.data.status! == "OK")
				throw new Error("Could not fetch location");
			console.log(response);

			const coordinates = response.data.results[0].geometry.location;
			const map = new google.maps.Map(document.getElementById("map"), {
				center: { coordinates },
				zoom: 8,
			});
			new google.maps.Marker({
				position: coordinates,
				map: map,
				title: "Place",
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

form.addEventListener("submit", searchAddressHandler);
