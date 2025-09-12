// Weekly Time Tracker Application
class WeeklyTimeTracker {
    constructor() {
        this.dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.dayDisplayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.updateInterval = null;
        this.schedule = null;
        
        this.init();
    }

    init() {
        this.loadSchedule();
        this.setupEventListeners();
        this.updateDisplay();
        this.startUpdateInterval();
    }

    setupEventListeners() {
        const form = document.getElementById('schedule-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSchedule();
        });
    }

    loadSchedule() {
        const savedSchedule = localStorage.getItem('weeklyTimeSchedule');
        if (savedSchedule) {
            try {
                this.schedule = JSON.parse(savedSchedule);
                this.populateForm();
            } catch (e) {
                console.error('Error parsing saved schedule:', e);
                this.setDefaultSchedule();
            }
        } else {
            this.setDefaultSchedule();
        }
    }

    setDefaultSchedule() {
        // Use default schedule
        this.schedule = {
            monday: {start: "08:45", end: "17:30"},
            tuesday: {start: "08:45", end: "17:30"},
            wednesday: {start: "08:45", end: "17:30"},
            thursday: {start: "08:45", end: "17:30"},
            friday: {start: "08:45", end: "17:45"},
            saturday: {start: "09:00", end: "18:00"},
            sunday: {start: "09:00", end: "18:00"}
        };
    }

    populateForm() {
        for (const day of this.dayNames) {
            if (this.schedule[day]) {
                const startInput = document.getElementById(`${day}-start`);
                const endInput = document.getElementById(`${day}-end`);
                if (startInput) startInput.value = this.schedule[day].start;
                if (endInput) endInput.value = this.schedule[day].end;
            }
        }
    }

    saveSchedule() {
        const newSchedule = {};
        
        for (const day of this.dayNames) {
            const startInput = document.getElementById(`${day}-start`);
            const endInput = document.getElementById(`${day}-end`);
            const startTime = startInput ? startInput.value : null;
            const endTime = endInput ? endInput.value : null;
            
            if (startTime && endTime) {
                newSchedule[day] = {
                    start: startTime,
                    end: endTime
                };
            }
        }
        
        this.schedule = newSchedule;
        localStorage.setItem('weeklyTimeSchedule', JSON.stringify(this.schedule));
        
        // Show success message
        this.showSuccessMessage();
        
        // Update display immediately
        this.updateDisplay();
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }

    getCurrentDay() {
        const now = new Date();
        return now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    }

    getCurrentTime() {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            totalSeconds: now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
        };
    }

    timeToSeconds(timeString) {
        if (!timeString) return 0;
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60;
    }

    formatTime(totalSeconds) {
        const hours = Math.floor(Math.abs(totalSeconds) / 3600);
        const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
        const seconds = Math.abs(totalSeconds) % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        const currentDayIndex = this.getCurrentDay();
        const currentDayName = this.dayNames[currentDayIndex];
        const currentTime = this.getCurrentTime();
        
        // Update current day display
        const currentDayElement = document.getElementById('current-day');
        if (currentDayElement) {
            currentDayElement.textContent = this.dayDisplayNames[currentDayIndex];
        }
        
        // Check if schedule exists for today
        if (!this.schedule || !this.schedule[currentDayName]) {
            this.showNoSchedule();
            return;
        }
        
        const todaySchedule = this.schedule[currentDayName];
        const startSeconds = this.timeToSeconds(todaySchedule.start);
        const endSeconds = this.timeToSeconds(todaySchedule.end);
        const currentSeconds = currentTime.totalSeconds;
        
        // Update period display
        const periodDisplay = document.getElementById('period-display');
        if (periodDisplay) {
            periodDisplay.textContent = `${todaySchedule.start} - ${todaySchedule.end}`;
        }
        
        // Check time status
        if (currentSeconds < startSeconds) {
            this.showNotStarted(startSeconds - currentSeconds);
        } else if (currentSeconds > endSeconds) {
            this.showCompleted();
        } else {
            this.showInProgress(currentSeconds, startSeconds, endSeconds);
        }
    }

    showNoSchedule() {
        const periodDisplay = document.getElementById('period-display');
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        
        if (periodDisplay) periodDisplay.textContent = 'No schedule set for today';
        if (progressContainer) progressContainer.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = 'Please set up your weekly schedule below';
            statusMessage.className = 'status-message no-schedule';
            statusMessage.style.display = 'block';
        }
    }

    showNotStarted(secondsUntilStart) {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        
        if (progressContainer) progressContainer.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = `Period starts in ${this.formatTime(secondsUntilStart)}`;
            statusMessage.className = 'status-message not-started';
            statusMessage.style.display = 'block';
        }
    }

    showCompleted() {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        
        if (progressContainer) progressContainer.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = 'Today\'s period has completed';
            statusMessage.className = 'status-message completed';
            statusMessage.style.display = 'block';
        }
    }

    showInProgress(currentSeconds, startSeconds, endSeconds) {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const progressRemaining = document.getElementById('progress-remaining');
        
        if (progressContainer) progressContainer.style.display = 'block';
        if (statusMessage) statusMessage.style.display = 'none';
        
        const totalPeriodSeconds = endSeconds - startSeconds;
        const elapsedSeconds = currentSeconds - startSeconds;
        const remainingSeconds = endSeconds - currentSeconds;
        
        const percentage = (elapsedSeconds / totalPeriodSeconds) * 100;
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
        }
        
        // Update percentage display
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage.toFixed(1)}%`;
        }
        
        // Update remaining time
        if (progressRemaining) {
            progressRemaining.textContent = `${this.formatTime(remainingSeconds)} remaining`;
        }
    }

    startUpdateInterval() {
        // Clear existing interval if any
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Update every second
        this.updateInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.timeTracker = new WeeklyTimeTracker();
});

// Clean up interval when page is unloaded
window.addEventListener('beforeunload', () => {
    if (window.timeTracker) {
        window.timeTracker.stop();
    }
});