let leftArrow = document.querySelector(".leftArrow")
let rightArrow = document.querySelector(".rightArrow")
let sliderWarp = document.querySelector(".sliderWarp")
let sliderNavButtonsContainer = document.querySelector(
	".sliderNavButtonsContainer"
)
let totalSlides = document.querySelectorAll(".sliderWarp .timelinePanel").length
let container = document.querySelector(".container")

function showNext(right = true, times = 1) {
	for (let i = 0; i < times; i++) {
		let currentSlide = sliderWarp.dataset.current
		let nextSlide = right
			? parseInt(currentSlide) + 1
			: parseInt(currentSlide) - 1

		if (nextSlide > totalSlides) {
			return
		} else if (nextSlide < 1) {
			return
		}

		parseInt(nextSlide) == 1
			? (leftArrow.style.opacity = 0.25)
			: (leftArrow.style.opacity = 1)
		parseInt(currentSlide) + 1 == totalSlides
			? (rightArrow.style.opacity = 0.25)
			: (rightArrow.style.opacity = 1)

		sliderWarp.querySelectorAll(".timelinePanel").forEach((e) => {
			e.style.opacity = 0
			e.classList.remove("isActive")
		})
		sliderWarp.querySelector(
			`.timelinePanel[data-slide="${nextSlide}"]`
		).style.opacity = 1
		sliderWarp
			.querySelector(`.timelinePanel[data-slide="${nextSlide}"]`)
			.classList.add("isActive")

		let currentSlideMargin = sliderWarp.style.marginLeft
		let marginToAdd = right ? -100 : 100
		sliderWarp.style.marginLeft = `${
			parseInt(currentSlideMargin) + marginToAdd
		}%`

		sliderNavButtonsContainer
			.querySelectorAll(".navButton")
			.forEach((e) => {
				e.classList.remove("isActiveNav")
			})
		sliderNavButtonsContainer
			.querySelector(`.navButton[data-slide="${nextSlide}"]`)
			.classList.add("isActiveNav")

		let currentButtonMargin = sliderNavButtonsContainer.style.marginLeft
		let buttonMarginToAdd = right ? -59 : 59
		sliderNavButtonsContainer.style.marginLeft = `${
			parseInt(currentButtonMargin) + buttonMarginToAdd
		}px`

		sliderWarp.dataset.current = nextSlide
		sliderNavButtonsContainer.dataset.current = nextSlide
	}
}

leftArrow.addEventListener("click", () => {
	showNext(false)
})

rightArrow.addEventListener("click", () => {
	showNext()
})

sliderNavButtonsContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("navButton")) {
		console.log("clicked nav button")
		let currentSlideButton = e.target.parentElement.dataset.current
		let numberOnSlide = e.target.dataset.slide
		if (numberOnSlide > currentSlideButton) {
			showNext(true, numberOnSlide - currentSlideButton)
		} else if (numberOnSlide < currentSlideButton) {
			showNext(false, currentSlideButton - numberOnSlide)
		}
	}
})

let classesThatCanInvokeSwipe = [
	"sliderWindow",
	"sliderWarp",
	"timelinePanel",
	"timelineImage",
	"slideTitle",
	"timelineSnippet",
	"timelineDate",
	"sliderNav",
	"sliderNavButtonsContainer",
]

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)

let xDown = null
let yDown = null

function getTouches(evt) {
	return evt.touches || evt.originalEvent.touches
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0]
	xDown = firstTouch.clientX
	yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
	if (!classesThatCanInvokeSwipe.includes(evt.target.classList[0])) return

	if (!xDown || !yDown) {
		return
	}

	let xUp = evt.touches[0].clientX
	let yUp = evt.touches[0].clientY

	let xDiff = xDown - xUp
	let yDiff = yDown - yUp

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			showNext()
		} else {
			showNext(false)
		}
	}
	xDown = null
	yDown = null
}
