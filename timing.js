setTimeout(() => {
	let timing = document.querySelector(".timing")
    let time = printNavTimingData()
    let content = time < 0.45 ? " - that's faster than the blink of your eye! 😲" : ""
    timing.textContent = `Page loaded in ${time} s ${content}`
	timing.classList.remove("dots")
}, 2000)

// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/domComplete#examples
function printNavTimingData() {
    let timing = 0
	performance.getEntriesByType("navigation").forEach((p, i) => {
        timing = p.domInteractive
	})
    return (timing/1000).toFixed(2)
}