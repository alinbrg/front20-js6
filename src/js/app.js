// 1. html ფაილში (ჯავასკრიპტით არა) შევქმნათ ღილაკი, ამ ღილაკის კლიკზე წაიშალოს თვითონ ეს ღილაკი.

const button = document.querySelector(".remove-btn");
button.addEventListener("click", (e) => {
	// console.log("button clicked");
	button.remove();
	// e.target.remove();
});

// 2. ჯავასკრიპტით შევქმნათ img tag რომელსაც src ად მივანიჭებთ ამ:
// https://fastly.picsum.photos/id/405/1400/800.jpg?hmac=4CRI7OpfDWtP4EydVd4Z-1NKSGhBmpZq8OaEXVu3be8
// ლინკს და ეს შექმნილი img ჩავსვათ body ში (ჯავასკრიპტით) , ასევე  დავამატოთ alt ატრიბუტიც. თუ საჭირო იქნება დაამატეთ კლასიც (ჯავასკრიპტიდან) და მიანიჭეთ სტილები css-დან (სქროლი არ უნდა გვქონდეს).
const editSection = document.querySelector(".edit");

function createImg() {
	const newImg = document.createElement("img");

	newImg.setAttribute(
		"src",
		"https://fastly.picsum.photos/id/405/1400/800.jpg?hmac=4CRI7OpfDWtP4EydVd4Z-1NKSGhBmpZq8OaEXVu3be8"
	);

	newImg.setAttribute("alt", "street image");
	newImg.classList.add("img");

	editSection.append(newImg);
}

createImg();

// 3. html-ში შექმენით <section id="images-list"></section>
const imagesSection = document.querySelector("#images-list");

// 4.
//     4.1 გითჰაბის გაზიარებულ რეპოზიტორში ნახეთ ფაილი => results.js => აქ გვაქვს results  მასივი რომელიც შედგება 6 ობიექტისგან.

// console.log(results);
//     4.2. results  მასივიდან .map ის საშულებით შექმენით html სტრინგი (როგორც ლექციაზე გავაკეთეთ) დიზაინი უნდა იყოს ქვემოთ ატვირთული ფოტოს მსგავსი (სტილები დაადეთ css ის საშუალებით, კლასები ჯავასკრიპტიდან, ვიზუალის კიდევ უფრო გაუმჯობესებაც შეიძლება ^^).

//    4.3. დიზაინში (დავალება17-art.jpeg) result  card ზე არის სურათი და სურათის სახელი.   თქვენ აქ უნდა ჩასვათ webImage-ის url და title
//    4.4. დავამატოთ ღილაკები see more details და remove card -  ჯავასკრიპტიდან (როგორც ფოტოზეა)
//    4.5 ეს html სტრინგი ჩასვით ამ სექციაში: <section id="images-list"></section>

// 5. (optional) remove card ღილაკზე დაჭერით წავშალოთ შესაბამისი  result  card-ი, see more details   ღილაკზე დაჭერის შედეგად ღილაკებამდე გამოვაჩინოთ დაატებითი ინფო  ფოტოზე მოცემული პირველი ელემენტის მსგავსად  -  ამ კონკრეტული ფოტოს longTitle  და ტექსტი, როგორც ფოტოზეა, სადაც გამოიყენებთ links-ის web მნიშვნელობას.

function addActions() {
	const showMoreBtns = document.querySelectorAll(".see-more");
	const deleteBtns = document.querySelectorAll(".delete");
	// console.log(showMoreBtns, deleteBtns);

	showMoreBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			// console.log(btn.closest(".card").querySelector(".more-info"));
			btn
				.closest(".card")
				.querySelector(".more-info")
				.classList.toggle("active");
		});
	});

	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			// console.log(btn.closest(".card"));
			btn.closest(".card").remove();
		});
	});
}

function renderCards() {
	const resultsHtml = results
		.map((el) => {
			return `
			<div class="card">
				<img class="img" src="${el.webImage.url}" alt="${el.title}" />
				<h3 class="title">${el.title}</h3>
				<div class="more-info">
					<h4>${el.longTitle}</h4>
					<p>see more info <a href="${el.links.web}">here</a></p>
				</div>
				<div class="actions">
					<button class="see-more">see more</button>
					<button class="delete">remove card</button>
				</div>
			</div>
			`;
		})
		.join("");

	// console.log(resultsHtml);
	imagesSection.innerHTML = resultsHtml;

	addActions();
}

renderCards();

// async
const startTimeOut = document.querySelector(".start-timeout");
const stopTimeOut = document.querySelector(".stop-timeout");
const startInterval = document.querySelector(".start-interval");
const stopInterval = document.querySelector(".stop-interval");

let timeoutId = null,
	intervalId = null;

function logFor() {
	for (let index = 0; index < 10; index++) {
		console.log(index);
	}
}
function syncFn() {
	console.log("function start");
	logFor();
	console.log("function end");
}

function asyncFn() {
	console.log("function start");

	setTimeout(logFor, 2000);
	// setInterval(logFor, 2000);

	console.log("function end");
}

function startIntervalFn() {
	intervalId = setInterval(() => {
		console.log("hello from interval");
	}, 1000);
	console.log(intervalId);
}

startInterval.addEventListener("click", startIntervalFn);
stopInterval.addEventListener("click", (e) => {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
});

startTimeOut.addEventListener("click", () => {
	console.log("start timeout clicked");
	timeoutId = setTimeout(() => {
		console.log("timeout");
	}, 5000);
});

stopTimeOut.addEventListener("click", () => {
	console.log("stop timeout clicked");

	if (timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = null;
	}
});

// slider

function mainSlider() {
	const slides = document.querySelectorAll(".slide");
	const next = document.querySelector(".next");
	const prev = document.querySelector(".prev");
	let slideIntervalId = null;

	let activeIndex = 0;

	function renderSlides() {
		slides.forEach((el, i) => {
			if (i === activeIndex) {
				el.classList.add("active");
			} else {
				el.classList.remove("active");
			}
		});
	}

	function nextFn() {
		if (activeIndex === slides.length - 1) {
			activeIndex = 0;
		} else {
			activeIndex++;
		}

		// console.log(activeIndex);
		renderSlides();
	}

	function prevFn() {
		if (activeIndex === 0) {
			activeIndex = slides.length - 1;
		} else {
			activeIndex--;
		}

		renderSlides();

		// console.log(activeIndex);
	}

	// console.log(slides);

	//
	renderSlides();
	// next.addEventListener("click", () => {
	// 	setTimeout(nextFn, 2000);
	// });
	next.addEventListener("click", nextFn);
	prev.addEventListener("click", prevFn);

	// slideIntervalId = setInterval(nextFn, 3000);
	// clearInterval(slideIntervalId);

	document.addEventListener("keyup", (e) => {
		console.log(e.code);
		if (e.code === "ArrowRight") {
			nextFn();
		}
		if (e.code === "ArrowLeft") {
			prevFn();
		}
	});
}

mainSlider();
