class Timer {
    constructor() {
        this.init()
    }

    init() {
        this.timeSeconds = 0
        this.timeDecEl = document.querySelector('#time-dec')
        this.timeIncEl = document.querySelector('#time-inc')
        this.statsEl = document.querySelector("#stats")
        this.startTimerEl = document.querySelector("#start")
        this.stopTimerEl = document.querySelector("#stop")
        this.clearTimerEl = document.querySelector("#clear")
        this.audio = new Audio("./../assets/audio.wav")

        this.timeDecEl.addEventListener('click', () => {
            if (this.timeSeconds > 0) {
                this.timeSeconds--
                this.setStats()
            }
        })

        this.timeIncEl.addEventListener('click', () => {
            this.timeSeconds++
            this.setStats()
        })

        this.startTimerEl.addEventListener('click', () => {
            if (this.timeSeconds > 0) {
                this.disableOperationsButtons()
                this.startTimer()
            }
        })

        this.stopTimerEl.addEventListener('click', () => {
            if (this.timeSeconds > 0) {
                this.stopTimer()
            }
        })

        this.clearTimerEl.addEventListener('click', () => {
            if (this.timeSeconds > 0) {
                this.clearStats()
            }
        })

        document.addEventListener('keyup', (e) => {
            const key = e.key
            switch(key) {
                case '+':
                    this.timeSeconds++
                    this.setStats()
                    break
                case '-':
                    if (this.timeSeconds > 0) {
                        this.timeSeconds--
                        this.setStats()
                    }
                    break
                case 'Enter':
                    if (this.timeSeconds > 0) {
                        this.disableOperationsButtons()
                        this.startTimer()
                    }
                    break
                case ' ':
                    if (this.timeSeconds > 0) {
                        this.stopTimer()
                    }
                    break
                case 'Escape':
                    if (this.timeSeconds > 0) {
                        this.clearStats()
                    }
                    break

            }
        })
    }

    playAudio() {
        let audioTimerCount = 0
        const audioTimer = setInterval(() => {
            if (audioTimerCount === 2) {
                clearInterval(audioTimer)
                audioTimerCount = 0
            }
            audioTimerCount++
            this.audio.play()
        }, 2000)
    }

    setStats() {
        const timeToMinutes = Math.floor(this.timeSeconds / 60)
        let timeSeconds = 0
        if (timeToMinutes >= 0 && timeToMinutes <= 1) {
            timeSeconds = this.timeSeconds >= 60 ? this.timeSeconds - 60 : this.timeSeconds
        }else {
            timeSeconds = this.timeSeconds >= 60 ? (this.timeSeconds - (timeToMinutes * 60)) : this.timeSeconds
        }
        const stat = `${timeToMinutes.toString().padStart(2, "0")}:${timeSeconds.toString().padStart(2, "0")}`
        this.statsEl.innerHTML = stat
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (this.timeSeconds > 0) {
                this.timeSeconds--
                this.setStats()
            } else if (this.timeSeconds === 0) {
                this.disableOperationsButtons(false)
                clearInterval(this.timer)
                this.playAudio()
            }
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timer)
        this.disableOperationsButtons(false)
    }

    clearStats() {
        this.timeSeconds = 0
        const stat = '00:00'
        this.statsEl.innerHTML = stat
        clearInterval(this.timer)
        this.disableOperationsButtons(false)
    }

    disableOperationsButtons(active = true) {
        if (active) {
            this.startTimerEl.disabled = true
            this.timeDecEl.disabled = true
            this.timeIncEl.disabled = true
        }else {
            this.startTimerEl.disabled = false
            this.timeDecEl.disabled = false
            this.timeIncEl.disabled = false
        }
    }
}

new Timer()