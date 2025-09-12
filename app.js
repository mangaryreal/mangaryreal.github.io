// Enhanced Weekly Time Tracker Application
class WeeklyTimeTracker {
    constructor() {
        this.dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        this.dayDisplayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.updateInterval = null;
        this.schedule = {};
        this.wageSettings = {
            enabled: false,
            monthlyWage: 0,
            workingDays: 0
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateDisplay();
        this.startUpdateInterval();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...'); // Debug log
        
        // Settings modal - using more robust event handling
        const settingsBtn = document.getElementById('settings-btn');
        const closeBtn = document.getElementById('close-btn');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const saveBtn = document.getElementById('save-settings');
        const wageToggle = document.getElementById('wage-tracking-toggle');

        console.log('Settings button found:', !!settingsBtn); // Debug log

        if (settingsBtn) {
            // Remove any existing listeners first
            settingsBtn.replaceWith(settingsBtn.cloneNode(true));
            const newSettingsBtn = document.getElementById('settings-btn');
            
            newSettingsBtn.addEventListener('click', (e) => {
                console.log('Settings button clicked!'); // Debug log
                e.preventDefault();
                e.stopPropagation();
                this.openSettings();
            });

            // Also handle keyboard events
            newSettingsBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    console.log('Settings button activated via keyboard!'); // Debug log
                    e.preventDefault();
                    this.openSettings();
                }
            });

            console.log('Settings button event listeners attached'); // Debug log
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                console.log('Close button clicked!'); // Debug log
                e.preventDefault();
                e.stopPropagation();
                this.closeSettings();
            });
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) {
                    console.log('Modal backdrop clicked!'); // Debug log
                    this.closeSettings();
                }
            });
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                console.log('Save button clicked!'); // Debug log
                e.preventDefault();
                this.saveSettings();
            });
        }

        if (wageToggle) {
            wageToggle.addEventListener('change', () => {
                console.log('Wage toggle changed!'); // Debug log
                this.toggleWageInputs();
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modalBackdrop = document.getElementById('modal-backdrop');
                if (modalBackdrop && modalBackdrop.classList.contains('show')) {
                    console.log('Escape key pressed, closing modal'); // Debug log
                    this.closeSettings();
                }
            }
        });

        console.log('Event listeners setup complete'); // Debug log
    }

    loadSettings() {
        // Load schedule
        const savedSchedule = localStorage.getItem('weeklyTimeSchedule');
        if (savedSchedule) {
            try {
                this.schedule = JSON.parse(savedSchedule);
                console.log('Loaded schedule:', this.schedule); // Debug log
            } catch (e) {
                console.error('Error parsing saved schedule:', e);
                this.schedule = {};
            }
        }

        // Load wage settings
        const savedWageSettings = localStorage.getItem('wageSettings');
        if (savedWageSettings) {
            try {
                this.wageSettings = JSON.parse(savedWageSettings);
                console.log('Loaded wage settings:', this.wageSettings); // Debug log
            } catch (e) {
                console.error('Error parsing wage settings:', e);
                this.wageSettings = { enabled: false, monthlyWage: 0, workingDays: 0 };
            }
        }

        // Populate forms after DOM is ready
        setTimeout(() => {
            this.populateScheduleForm();
            this.populateWageForm();
        }, 100);
    }

    populateScheduleForm() {
        console.log('Populating schedule form...'); // Debug log
        for (const day of this.dayNames) {
            if (this.schedule[day]) {
                const startInput = document.getElementById(`${day}-start`);
                const endInput = document.getElementById(`${day}-end`);
                if (startInput) startInput.value = this.schedule[day].start || '';
                if (endInput) endInput.value = this.schedule[day].end || '';
            }
        }
    }

    populateWageForm() {
        console.log('Populating wage form...'); // Debug log
        const wageToggle = document.getElementById('wage-tracking-toggle');
        const monthlyWageInput = document.getElementById('monthly-wage');
        const workingDaysSelect = document.getElementById('working-days');

        if (wageToggle) wageToggle.checked = this.wageSettings.enabled;
        if (monthlyWageInput) monthlyWageInput.value = this.wageSettings.monthlyWage || '';
        if (workingDaysSelect) workingDaysSelect.value = this.wageSettings.workingDays || '';
        
        this.toggleWageInputs();
    }

    openSettings() {
        console.log('Opening settings modal...'); // Debug log
        const modalBackdrop = document.getElementById('modal-backdrop');
        const body = document.body;
        
        if (modalBackdrop) {
            // Ensure clean state
            modalBackdrop.classList.remove('show');
            body.classList.remove('modal-open');
            
            // Force reflow
            modalBackdrop.offsetHeight;
            
            // Show modal
            modalBackdrop.classList.add('show');
            body.classList.add('modal-open');
            
            console.log('Modal backdrop classes:', modalBackdrop.classList.toString()); // Debug log
            
            // Focus management for accessibility
            setTimeout(() => {
                const firstInput = modalBackdrop.querySelector('input:not([type="checkbox"]), select, button');
                if (firstInput) {
                    firstInput.focus();
                    console.log('Focused first input:', firstInput.id); // Debug log
                }
            }, 200);
            
            console.log('Settings modal opened successfully'); // Debug log
        } else {
            console.error('Modal backdrop element not found!'); // Debug log
        }
    }

    closeSettings() {
        console.log('Closing settings modal...'); // Debug log
        const modalBackdrop = document.getElementById('modal-backdrop');
        const body = document.body;
        
        if (modalBackdrop) {
            modalBackdrop.classList.remove('show');
            body.classList.remove('modal-open');
            
            // Return focus to settings button
            setTimeout(() => {
                const settingsBtn = document.getElementById('settings-btn');
                if (settingsBtn) {
                    settingsBtn.focus();
                    console.log('Focus returned to settings button'); // Debug log
                }
            }, 200);
            
            console.log('Settings modal closed successfully'); // Debug log
        }
    }

    toggleWageInputs() {
        const wageToggle = document.getElementById('wage-tracking-toggle');
        const wageInputs = document.getElementById('wage-inputs');
        
        if (wageToggle && wageInputs) {
            if (wageToggle.checked) {
                wageInputs.style.display = 'grid';
                console.log('Wage inputs shown'); // Debug log
            } else {
                wageInputs.style.display = 'none';
                console.log('Wage inputs hidden'); // Debug log
            }
        }
    }

    validateSchedule() {
        const errors = [];
        
        for (const day of this.dayNames) {
            const startInput = document.getElementById(`${day}-start`);
            const endInput = document.getElementById(`${day}-end`);
            const startTime = startInput ? startInput.value.trim() : '';
            const endTime = endInput ? endInput.value.trim() : '';
            
            // If one time is filled, both must be filled
            if ((startTime && !endTime) || (!startTime && endTime)) {
                const dayName = this.dayDisplayNames[this.dayNames.indexOf(day)];
                errors.push(`${dayName}: Both start and end times must be provided`);
            }
            
            // If both times are provided, end must be after start
            if (startTime && endTime && startTime >= endTime) {
                const dayName = this.dayDisplayNames[this.dayNames.indexOf(day)];
                errors.push(`${dayName}: End time must be after start time`);
            }
        }
        
        console.log('Validation errors:', errors); // Debug log
        return errors;
    }

    saveSettings() {
        console.log('Saving settings...'); // Debug log
        
        // Clear previous messages
        this.hideMessages();
        
        // Validate schedule
        const validationErrors = this.validateSchedule();
        if (validationErrors.length > 0) {
            this.showValidationError(validationErrors.join('<br>'));
            return;
        }
        
        // Save schedule
        const newSchedule = {};
        for (const day of this.dayNames) {
            const startInput = document.getElementById(`${day}-start`);
            const endInput = document.getElementById(`${day}-end`);
            const startTime = startInput ? startInput.value.trim() : '';
            const endTime = endInput ? endInput.value.trim() : '';
            
            if (startTime && endTime) {
                newSchedule[day] = {
                    start: startTime,
                    end: endTime
                };
            }
        }
        
        this.schedule = newSchedule;
        localStorage.setItem('weeklyTimeSchedule', JSON.stringify(this.schedule));
        
        // Save wage settings
        const wageToggle = document.getElementById('wage-tracking-toggle');
        const monthlyWageInput = document.getElementById('monthly-wage');
        const workingDaysSelect = document.getElementById('working-days');
        
        this.wageSettings = {
            enabled: wageToggle ? wageToggle.checked : false,
            monthlyWage: monthlyWageInput ? parseFloat(monthlyWageInput.value) || 0 : 0,
            workingDays: workingDaysSelect ? parseInt(workingDaysSelect.value) || 0 : 0
        };
        
        localStorage.setItem('wageSettings', JSON.stringify(this.wageSettings));
        
        console.log('Settings saved successfully:', { schedule: this.schedule, wageSettings: this.wageSettings }); // Debug log
        
        // Show success message
        this.showSuccessMessage();
        
        // Update display immediately
        this.updateDisplay();
        
        // Close modal after short delay
        setTimeout(() => {
            this.closeSettings();
        }, 1500);
    }

    showValidationError(message) {
        const validationMessage = document.getElementById('validation-message');
        if (validationMessage) {
            validationMessage.innerHTML = message;
            validationMessage.className = 'validation-message error';
            validationMessage.style.display = 'block';
            console.log('Showing validation error:', message); // Debug log
        }
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'block';
            console.log('Showing success message'); // Debug log
        }
    }

    hideMessages() {
        const validationMessage = document.getElementById('validation-message');
        const successMessage = document.getElementById('success-message');
        
        if (validationMessage) validationMessage.style.display = 'none';
        if (successMessage) successMessage.style.display = 'none';
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

    calculateWagePerSecond() {
        if (!this.wageSettings.enabled || !this.wageSettings.monthlyWage || !this.wageSettings.workingDays) {
            return 0;
        }

        // Calculate total working hours per week from schedule
        let totalWeeklyHours = 0;
        for (const day of this.dayNames) {
            if (this.schedule[day]) {
                const startSeconds = this.timeToSeconds(this.schedule[day].start);
                const endSeconds = this.timeToSeconds(this.schedule[day].end);
                totalWeeklyHours += (endSeconds - startSeconds) / 3600; // Convert to hours
            }
        }

        if (totalWeeklyHours === 0) return 0;

        // Calculate monthly hours (4.33 weeks per month on average)
        const totalMonthlyHours = totalWeeklyHours * 4.33;
        const totalMonthlySeconds = totalMonthlyHours * 3600;

        return this.wageSettings.monthlyWage / totalMonthlySeconds;
    }

    calculateTodaysEarnings(currentSeconds, startSeconds) {
        const wagePerSecond = this.calculateWagePerSecond();
        if (wagePerSecond === 0) return 0;

        const elapsedSeconds = currentSeconds - startSeconds;
        return Math.max(0, elapsedSeconds * wagePerSecond);
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
        if (!this.schedule[currentDayName]) {
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
        const earningsDisplay = document.getElementById('earnings-display');
        
        if (periodDisplay) periodDisplay.textContent = 'No schedule set for today';
        if (progressContainer) progressContainer.style.display = 'none';
        if (earningsDisplay) earningsDisplay.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = 'Set your work schedule in settings to start tracking your progress';
            statusMessage.className = 'status-message no-schedule';
            statusMessage.style.display = 'block';
        }
    }

    showNotStarted(secondsUntilStart) {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        const earningsDisplay = document.getElementById('earnings-display');
        
        if (progressContainer) progressContainer.style.display = 'none';
        if (earningsDisplay) earningsDisplay.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = `Work starts in ${this.formatTime(secondsUntilStart)}`;
            statusMessage.className = 'status-message not-started';
            statusMessage.style.display = 'block';
        }
    }

    showCompleted() {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        const earningsDisplay = document.getElementById('earnings-display');
        
        if (progressContainer) progressContainer.style.display = 'none';
        
        if (statusMessage) {
            statusMessage.textContent = 'Work period completed for today';
            statusMessage.className = 'status-message completed';
            statusMessage.style.display = 'block';
        }

        // Show final earnings if wage tracking is enabled
        if (this.wageSettings.enabled) {
            const currentDayIndex = this.getCurrentDay();
            const currentDayName = this.dayNames[currentDayIndex];
            const todaySchedule = this.schedule[currentDayName];
            
            if (todaySchedule) {
                const startSeconds = this.timeToSeconds(todaySchedule.start);
                const endSeconds = this.timeToSeconds(todaySchedule.end);
                const totalEarnings = this.calculateTodaysEarnings(endSeconds, startSeconds);
                
                if (earningsDisplay) {
                    const earningsText = document.getElementById('earnings-text');
                    if (earningsText) {
                        earningsText.textContent = `💰 You earned $${totalEarnings.toFixed(2)} today!`;
                    }
                    earningsDisplay.style.display = 'block';
                }
            }
        } else {
            if (earningsDisplay) earningsDisplay.style.display = 'none';
        }
    }

    showInProgress(currentSeconds, startSeconds, endSeconds) {
        const progressContainer = document.getElementById('progress-container');
        const statusMessage = document.getElementById('status-message');
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const progressRemaining = document.getElementById('progress-remaining');
        const earningsDisplay = document.getElementById('earnings-display');
        
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

        // Update earnings if wage tracking is enabled
        if (this.wageSettings.enabled) {
            const todaysEarnings = this.calculateTodaysEarnings(currentSeconds, startSeconds);
            
            if (earningsDisplay) {
                const earningsText = document.getElementById('earnings-text');
                if (earningsText) {
                    earningsText.textContent = `💰 You've earned $${todaysEarnings.toFixed(2)} today!`;
                }
                earningsDisplay.style.display = 'block';
            }
        } else {
            if (earningsDisplay) earningsDisplay.style.display = 'none';
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
    console.log('DOM loaded, initializing Weekly Time Tracker...'); // Debug log
    
    // Wait a bit to ensure all elements are properly rendered
    setTimeout(() => {
        window.timeTracker = new WeeklyTimeTracker();
        console.log('Time Tracker initialized:', window.timeTracker); // Debug log
    }, 100);
});

// Clean up interval when page is unloaded
window.addEventListener('beforeunload', () => {
    if (window.timeTracker) {
        window.timeTracker.stop();
    }
});
