// --- BULLETPROOF MULTILINGUAL TIME TRACKER ---

console.log('🚀 Loading Multilingual Time Tracker...');

// Global app state
window.appState = {
    settings: {
        language: '',
        currency: '',
        monthlySalary: 0,
        workingDays: 22,
        schedule: {
            mon: {start:'', end:''}, tue:{start:'',end:''}, wed:{start:'',end:''}, 
            thu:{start:'',end:''}, fri:{start:'',end:''}, sat:{start:'',end:''}, sun:{start:'',end:''}
        }
    },
    calendar: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        workedDays: JSON.parse(localStorage.getItem('tracker_workedDays') || '[]'),
    },
    ui: {
        currentTab: 'tracker',
        currentView: 'full',
        setupStep: 1
    }
};

// Translations
const translations = {
    en: {
        setupTitle: "Welcome! Let's Set Up Your Time Tracker",
        step1Title: "Choose Your Language",
        step2Title: "Enter Your Salary Details", 
        step3Title: "Set Your Weekly Schedule",
        currency: "Currency", monthlySalary: "Monthly Salary", workingDaysPerMonth: "Working Days per Month",
        selectCurrency: "Select Currency", previous: "Previous", next: "Next", startTracking: "Start Tracking!",
        monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
        friday: "Friday", saturday: "Saturday", sunday: "Sunday", to: "to",
        tracker: "Tracker", calendar: "Calendar", settings: "Settings",
        today: "Today", thisWeek: "This Week", thisMonth: "This Month",
        daysWorked: "Days Worked", monthlyTarget: "Monthly Target", projectedEarnings: "Projected Earnings",
        notWorking: "Not Working", working: "Working", workComplete: "Work Complete",
        appTitle: "Multilingual Time Tracker"
    },
    'zh-TW': {
        setupTitle: "歡迎！讓我們設定您的時間追踪器",
        step1Title: "選擇您的語言", step2Title: "輸入您的薪資詳情", step3Title: "設定您的每週時間表",
        currency: "貨幣", monthlySalary: "月薪", workingDaysPerMonth: "每月工作天數",
        selectCurrency: "選擇貨幣", previous: "上一步", next: "下一步", startTracking: "開始追踪！",
        monday: "週一", tuesday: "週二", wednesday: "週三", thursday: "週四",
        friday: "週五", saturday: "週六", sunday: "週日", to: "到",
        tracker: "追踪器", calendar: "日曆", settings: "設定",
        today: "今天", thisWeek: "本週", thisMonth: "本月",
        daysWorked: "已工作天數", monthlyTarget: "月度目標", projectedEarnings: "預計收入",
        notWorking: "未工作", working: "工作中", workComplete: "工作完成",
        appTitle: "多語言時間追踪器"
    },
    de: {
        setupTitle: "Willkommen! Richten Sie Ihren Zeitverfolger ein",
        step1Title: "Wählen Sie Ihre Sprache", step2Title: "Geben Sie Ihre Gehaltsdaten ein", step3Title: "Stellen Sie Ihren Wochenplan ein",
        currency: "Währung", monthlySalary: "Monatsgehalt", workingDaysPerMonth: "Arbeitstage pro Monat",
        selectCurrency: "Währung auswählen", previous: "Zurück", next: "Weiter", startTracking: "Tracking starten!",
        monday: "Montag", tuesday: "Dienstag", wednesday: "Mittwoch", thursday: "Donnerstag",
        friday: "Freitag", saturday: "Samstag", sunday: "Sonntag", to: "bis",
        tracker: "Tracker", calendar: "Kalender", settings: "Einstellungen",
        today: "Heute", thisWeek: "Diese Woche", thisMonth: "Diesen Monat",
        daysWorked: "Arbeitstage", monthlyTarget: "Monatsziel", projectedEarnings: "Projizierte Einnahmen",
        notWorking: "Nicht arbeiten", working: "Arbeiten", workComplete: "Arbeit abgeschlossen",
        appTitle: "Mehrsprachiger Zeitverfolger"
    },
    ja: {
        setupTitle: "ようこそ！時間トラッカーを設定しましょう",
        step1Title: "言語を選択してください", step2Title: "給与詳細を入力してください", step3Title: "週間スケジュールを設定してください",
        currency: "通貨", monthlySalary: "月給", workingDaysPerMonth: "月間勤務日数",
        selectCurrency: "通貨を選択", previous: "戻る", next: "次へ", startTracking: "追跡開始！",
        monday: "月曜日", tuesday: "火曜日", wednesday: "水曜日", thursday: "木曜日",
        friday: "金曜日", saturday: "土曜日", sunday: "日曜日", to: "から",
        tracker: "トラッカー", calendar: "カレンダー", settings: "設定",
        today: "今日", thisWeek: "今週", thisMonth: "今月",
        daysWorked: "勤務日数", monthlyTarget: "月次目標", projectedEarnings: "予想収入",
        notWorking: "非勤務", working: "勤務中", workComplete: "勤務完了",
        appTitle: "多言語時間トラッカー"
    }
};

// Currency options
const currencyOptions = [
    {value: 'USD', name: 'USD - US Dollar'},
    {value: 'HKD', name: 'HKD - Hong Kong Dollar'},
    {value: 'EUR', name: 'EUR - Euro'},
    {value: 'GBP', name: 'GBP - British Pound'},
    {value: 'CAD', name: 'CAD - Canadian Dollar'},
    {value: 'AUD', name: 'AUD - Australian Dollar'},
    {value: 'JPY', name: 'JPY - Japanese Yen'}
];

// Cultural items for motivational messages
const culturalItems = {
    HKD: { medium: ["茶餐廳套餐 (HK$35)", "電影票 (HK$60)", "點心茶 (HK$80)"] },
    EUR: { medium: ["Mittagessen (€15)", "Kinokarte (€12)", "Buch (€20)"] },
    JPY: { medium: ["ラーメン (¥1000)", "映画チケット (¥1500)", "雑誌 (¥800)"] },
    USD: { medium: ["lunch ($15)", "movie ticket ($12)", "book ($20)"] }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM loaded, starting app...');
    initializeApp();
});

function initializeApp() {
    const savedSettings = localStorage.getItem('tracker_settings');
    if (savedSettings) {
        try {
            window.appState.settings = JSON.parse(savedSettings);
            console.log('✅ Found saved settings');
            showMainApp();
        } catch (e) {
            console.log('❌ Invalid saved settings');
            showSetupWizard();
        }
    } else {
        console.log('📝 No saved settings, showing setup');
        showSetupWizard();
    }
}

function showSetupWizard() {
    document.getElementById('setup-modal').classList.remove('hidden');
    document.getElementById('main-app').classList.add('hidden');
    setupWizardStep(1);
}

function showMainApp() {
    document.getElementById('setup-modal').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    initMainApp();
}

// --- SETUP WIZARD (BULLETPROOF VERSION) ---
function setupWizardStep(step) {
    console.log('📄 Setup wizard step:', step);
    
    window.appState.ui.setupStep = step;
    
    // Hide all steps
    for (let i = 1; i <= 3; i++) {
        const stepElement = document.getElementById(`setup-step-${i}`);
        if (stepElement) {
            stepElement.classList.remove('setup-step--active');
        }
    }
    
    // Show current step
    const currentStepElement = document.getElementById(`setup-step-${step}`);
    if (currentStepElement) {
        currentStepElement.classList.add('setup-step--active');
    }
    
    // Update buttons
    const prevBtn = document.getElementById('setup-prev');
    const nextBtn = document.getElementById('setup-next');
    const finishBtn = document.getElementById('setup-finish');
    
    if (prevBtn) {
        prevBtn.style.display = step === 1 ? 'none' : 'inline-block';
        prevBtn.onclick = function() {
            console.log('⬅️ Previous clicked');
            setupWizardStep(step - 1);
        };
    }
    
    if (nextBtn) {
        nextBtn.style.display = step < 3 ? 'inline-block' : 'none';
        nextBtn.onclick = function() {
            console.log('➡️ Next clicked from step', step);
            handleNextStep(step);
        };
    }
    
    if (finishBtn) {
        finishBtn.style.display = step === 3 ? 'inline-block' : 'none';
        finishBtn.onclick = function() {
            console.log('🏁 Finish clicked');
            completeSetup();
        };
    }
    
    // Setup language selection for step 1
    if (step === 1) {
        setupLanguageButtons();
    }
    
    updateWizardLanguage();
}

function setupLanguageButtons() {
    console.log('🌐 Setting up language buttons...');
    
    const languageButtons = document.querySelectorAll('.language-btn');
    languageButtons.forEach(btn => {
        // Remove any existing onclick handlers
        btn.onclick = null;
        
        // Add new click handler
        btn.onclick = function() {
            console.log('🌍 Language clicked:', this.dataset.lang);
            
            // Clear all selections
            languageButtons.forEach(b => b.classList.remove('selected'));
            
            // Select this button
            this.classList.add('selected');
            
            // Save language
            window.appState.settings.language = this.dataset.lang;
            
            console.log('✅ Language set to:', window.appState.settings.language);
            
            // Update UI
            updateWizardLanguage();
            populateCurrencySelect();
        };
    });
}

function handleNextStep(currentStep) {
    console.log('🔄 Handling next step from:', currentStep);
    
    if (currentStep === 1) {
        if (!window.appState.settings.language) {
            alert('Please select a language first!');
            return;
        }
        console.log('✅ Step 1 valid, going to step 2');
        setupWizardStep(2);
        
    } else if (currentStep === 2) {
        const currency = document.getElementById('setup-currency-select').value;
        const salary = document.getElementById('setup-monthly-salary').value;
        const workingDays = document.getElementById('setup-working-days').value;
        
        if (!currency || !salary || salary <= 0 || !workingDays || workingDays <= 0) {
            alert('Please fill in all fields with valid values!');
            return;
        }
        
        window.appState.settings.currency = currency;
        window.appState.settings.monthlySalary = parseFloat(salary);
        window.appState.settings.workingDays = parseInt(workingDays);
        
        console.log('✅ Step 2 valid, going to step 3');
        setupWizardStep(3);
    }
}

function completeSetup() {
    console.log('🎯 Completing setup...');
    
    let hasValidSchedule = false;
    
    ['mon','tue','wed','thu','fri','sat','sun'].forEach(day => {
        const startInput = document.getElementById(`setup-${day}-start`);
        const endInput = document.getElementById(`setup-${day}-end`);
        
        const start = startInput ? startInput.value : '';
        const end = endInput ? endInput.value : '';
        
        if (start && end && start < end) {
            hasValidSchedule = true;
        }
        
        window.appState.settings.schedule[day] = {start, end};
    });
    
    if (!hasValidSchedule) {
        alert('Please set at least one working day!');
        return;
    }
    
    // Save settings
    localStorage.setItem('tracker_settings', JSON.stringify(window.appState.settings));
    
    console.log('✅ Setup complete!', window.appState.settings);
    
    // Show main app
    showMainApp();
}

function updateWizardLanguage() {
    if (!window.appState.settings.language) return;
    
    const t = translations[window.appState.settings.language];
    if (!t) return;
    
    // Update all translatable elements
    const elements = [
        ['setup-title', t.setupTitle],
        ['step1-title', t.step1Title],
        ['step2-title', t.step2Title],
        ['step3-title', t.step3Title],
        ['setup-currency-label', t.currency],
        ['setup-salary-label', t.monthlySalary],
        ['setup-working-days-label', t.workingDaysPerMonth],
        ['setup-prev', t.previous],
        ['setup-next', t.next],
        ['setup-finish', t.startTracking]
    ];
    
    elements.forEach(([id, text]) => {
        const elem = document.getElementById(id);
        if (elem) elem.textContent = text;
    });
    
    // Update day labels
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach((day, index) => {
        const dayKey = day.substr(0, 3);
        const labelElem = document.getElementById(`setup-${dayKey}-label`);
        const toLabelElem = document.getElementById(`setup-to-label-${index + 1}`);
        
        if (labelElem) labelElem.textContent = t[day];
        if (toLabelElem) toLabelElem.textContent = t.to;
    });
}

function populateCurrencySelect() {
    const select = document.getElementById('setup-currency-select');
    if (!select) return;
    
    const t = translations[window.appState.settings.language] || translations.en;
    select.innerHTML = `<option value="">${t.selectCurrency}</option>`;
    
    let availableCurrencies = currencyOptions;
    if (window.appState.settings.language === 'zh-TW') {
        availableCurrencies = currencyOptions.filter(c => c.value === 'HKD');
    } else if (window.appState.settings.language === 'de') {
        availableCurrencies = currencyOptions.filter(c => c.value === 'EUR');
    } else if (window.appState.settings.language === 'ja') {
        availableCurrencies = currencyOptions.filter(c => c.value === 'JPY');
    }
    
    availableCurrencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.value;
        option.textContent = currency.name;
        select.appendChild(option);
    });
}

// --- MAIN APP ---
function initMainApp() {
    console.log('🏠 Initializing main app...');
    
    updateMainAppLanguage();
    setupMainAppEvents();
    renderCalendar();
    startRealTimeUpdates();
    setupMotivationalMessages();
}

function setupMainAppEvents() {
    // Tab navigation
    document.getElementById('tracker-tab-btn').onclick = () => switchTab('tracker');
    document.getElementById('calendar-tab-btn').onclick = () => switchTab('calendar');
    document.getElementById('settings-btn').onclick = () => openModal('settings-modal');
    
    // View modes
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.onclick = () => switchView(btn.dataset.mode);
    });
    
    // Settings
    document.getElementById('close-settings').onclick = () => closeModal('settings-modal');
    document.getElementById('cancel-settings').onclick = () => closeModal('settings-modal');
    document.getElementById('settings-form').onsubmit = handleSettingsSubmit;
    
    // Mini widget
    document.getElementById('expand-widget').onclick = () => switchView('full');
    document.getElementById('close-widget').onclick = () => switchView('full');
    
    // Focus mode
    document.getElementById('focus-exit').onclick = () => switchView('full');
    
    setupMiniWidgetDrag();
}

function updateMainAppLanguage() {
    if (!window.appState.settings.language) return;
    
    const t = translations[window.appState.settings.language];
    if (!t) return;
    
    const elements = [
        ['app-title', t.appTitle],
        ['tracker-tab-btn', t.tracker],
        ['calendar-tab-btn', t.calendar],
        ['settings-btn', t.settings],
        ['today-label', t.today],
        ['week-label', t.thisWeek],
        ['month-label', t.thisMonth],
        ['days-worked-label', t.daysWorked],
        ['monthly-target-label', t.monthlyTarget],
        ['projected-earnings-label', t.projectedEarnings]
    ];
    
    elements.forEach(([id, text]) => {
        const elem = document.getElementById(id);
        if (elem) elem.textContent = text;
    });
}

// --- REAL-TIME UPDATES ---
function startRealTimeUpdates() {
    console.log('⏱️ Starting real-time updates...');
    
    setInterval(() => {
        updateCurrentTime();
        updateStatus();
        updateProgress();
        updateEarnings();
        updateMiniWidget();
        updateFocusMode();
    }, 1000);
    
    // Initial update
    updateCurrentTime();
    updateStatus();
    updateProgress();
    updateEarnings();
    updateMiniWidget();
    updateFocusMode();
}

function updateCurrentTime() {
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.textContent = new Date().toLocaleTimeString();
    }
    
    const focusTime = document.getElementById('focus-time');
    if (focusTime && window.appState.ui.currentView === 'focus') {
        focusTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
}

function updateStatus() {
    const t = translations[window.appState.settings.language] || translations.en;
    const status = getCurrentWorkStatus();
    
    document.getElementById('current-status').textContent = status.text;
    
    const miniStatus = document.getElementById('mini-status');
    if (miniStatus) miniStatus.textContent = status.text;
    
    const focusStatus = document.getElementById('focus-status');
    if (focusStatus) focusStatus.textContent = status.text;
}

function updateProgress() {
    const status = getCurrentWorkStatus();
    
    document.getElementById('progress-fill').style.width = status.progress + '%';
    document.getElementById('progress-text').textContent = Math.round(status.progress) + '%';
    document.getElementById('time-remaining').textContent = status.timeRemaining;
    
    const miniProgressFill = document.getElementById('mini-progress-fill');
    const miniProgressText = document.getElementById('mini-progress-text');
    if (miniProgressFill) miniProgressFill.style.width = status.progress + '%';
    if (miniProgressText) miniProgressText.textContent = Math.round(status.progress) + '%';
}

function updateEarnings() {
    const todayEarnings = calculateTodayEarnings();
    const rate = calculateEarningsPerSecond();
    
    // Update earnings
    document.getElementById('today-earnings').textContent = formatCurrency(todayEarnings);
    document.getElementById('week-earnings').textContent = formatCurrency(todayEarnings * 5);
    document.getElementById('month-earnings').textContent = formatCurrency(todayEarnings * 22);
    
    // Update rates
    const rateText = formatCurrency(rate) + '/sec';
    document.getElementById('today-rate').textContent = rateText;
    
    const miniEarnings = document.getElementById('mini-earnings');
    const miniRate = document.getElementById('mini-rate');
    if (miniEarnings) miniEarnings.textContent = formatCurrency(todayEarnings);
    if (miniRate) miniRate.textContent = rateText;
    
    const focusEarnings = document.getElementById('focus-earnings');
    const focusRate = document.getElementById('focus-rate');
    if (focusEarnings) focusEarnings.textContent = formatCurrency(todayEarnings);
    if (focusRate) focusRate.textContent = rateText;
}

function updateMiniWidget() {
    // Updates handled in other functions
}

function updateFocusMode() {
    // Updates handled in other functions
}

function getCurrentWorkStatus() {
    const now = new Date();
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = dayNames[now.getDay()];
    const schedule = window.appState.settings.schedule[today];
    const t = translations[window.appState.settings.language] || translations.en;
    
    if (!schedule.start || !schedule.end) {
        return {
            text: t.notWorking,
            progress: 0,
            timeRemaining: 'No work scheduled today'
        };
    }
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = timeToMinutes(schedule.start);
    const endMinutes = timeToMinutes(schedule.end);
    
    if (currentMinutes < startMinutes) {
        const minutesToStart = startMinutes - currentMinutes;
        return {
            text: t.notWorking,
            progress: 0,
            timeRemaining: `Work starts in ${formatDuration(minutesToStart)}`
        };
    } else if (currentMinutes >= endMinutes) {
        return {
            text: t.workComplete,
            progress: 100,
            timeRemaining: 'Work day complete! 🎉'
        };
    } else {
        const workedMinutes = currentMinutes - startMinutes;
        const totalMinutes = endMinutes - startMinutes;
        const progress = (workedMinutes / totalMinutes) * 100;
        const remainingMinutes = endMinutes - currentMinutes;
        
        return {
            text: t.working,
            progress: progress,
            timeRemaining: `${formatDuration(remainingMinutes)} remaining`
        };
    }
}

function calculateTodayEarnings() {
    const now = new Date();
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = dayNames[now.getDay()];
    const schedule = window.appState.settings.schedule[today];
    
    if (!schedule.start || !schedule.end) return 0;
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();
    const startMinutes = timeToMinutes(schedule.start);
    const endMinutes = timeToMinutes(schedule.end);
    
    if (currentMinutes < startMinutes) return 0;
    
    const totalWorkedSeconds = Math.min(
        (currentMinutes - startMinutes) * 60 + currentSeconds,
        (endMinutes - startMinutes) * 60
    );
    
    return totalWorkedSeconds * calculateEarningsPerSecond();
}

function calculateEarningsPerSecond() {
    if (!window.appState.settings.monthlySalary || !window.appState.settings.workingDays) return 0;
    return window.appState.settings.monthlySalary / window.appState.settings.workingDays / 8 / 3600;
}

// --- TAB & VIEW SWITCHING ---
function switchTab(tabName) {
    window.appState.ui.currentTab = tabName;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('tab-btn--active', btn.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('tab-content--active');
    });
    
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) targetTab.classList.add('tab-content--active');
    
    if (tabName === 'calendar') {
        renderCalendar();
    }
}

function switchView(mode) {
    window.appState.ui.currentView = mode;
    
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.toggle('view-mode-btn--active', btn.dataset.mode === mode);
    });
    
    document.getElementById('main-app').classList.toggle('hidden', mode !== 'full');
    document.getElementById('mini-widget').classList.toggle('hidden', mode !== 'mini');
    document.getElementById('focus-mode').classList.toggle('hidden', mode !== 'focus');
}

// --- CALENDAR ---
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthHeader = document.getElementById('calendar-month');
    
    if (!grid || !monthHeader) return;
    
    const { currentMonth, currentYear } = window.appState.calendar;
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    grid.innerHTML = '';
    
    // Day headers
    const dayHeaders = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        'zh-TW': ['日', '一', '二', '三', '四', '五', '六'],
        de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        ja: ['日', '月', '火', '水', '木', '金', '土']
    };
    
    const headers = dayHeaders[window.appState.settings.language] || dayHeaders.en;
    headers.forEach(header => {
        const cell = document.createElement('div');
        cell.className = 'calendar-day calendar-day--header';
        cell.textContent = header;
        grid.appendChild(cell);
    });
    
    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day calendar-day--other-month';
        grid.appendChild(cell);
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;
        
        const dateStr = `${currentYear}-${currentMonth}-${day}`;
        const isToday = isDateToday(currentYear, currentMonth, day);
        const isWorked = window.appState.calendar.workedDays.includes(dateStr);
        
        if (isToday) cell.classList.add('calendar-day--today');
        if (isWorked) cell.classList.add('calendar-day--worked');
        
        cell.onclick = () => toggleWorkDay(dateStr, cell);
        grid.appendChild(cell);
    }
    
    // Month name
    const monthNames = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'zh-TW': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };
    
    const names = monthNames[window.appState.settings.language] || monthNames.en;
    monthHeader.textContent = `${names[currentMonth]} ${currentYear}`;
    
    setupCalendarNavigation();
    updateCalendarSummary();
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            window.appState.calendar.currentMonth--;
            if (window.appState.calendar.currentMonth < 0) {
                window.appState.calendar.currentMonth = 11;
                window.appState.calendar.currentYear--;
            }
            renderCalendar();
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = () => {
            window.appState.calendar.currentMonth++;
            if (window.appState.calendar.currentMonth > 11) {
                window.appState.calendar.currentMonth = 0;
                window.appState.calendar.currentYear++;
            }
            renderCalendar();
        };
    }
}

function toggleWorkDay(dateStr, cell) {
    const index = window.appState.calendar.workedDays.indexOf(dateStr);
    
    if (index >= 0) {
        window.appState.calendar.workedDays.splice(index, 1);
        cell.classList.remove('calendar-day--worked');
    } else {
        window.appState.calendar.workedDays.push(dateStr);
        cell.classList.add('calendar-day--worked');
    }
    
    localStorage.setItem('tracker_workedDays', JSON.stringify(window.appState.calendar.workedDays));
    updateCalendarSummary();
}

function updateCalendarSummary() {
    const { currentMonth, currentYear } = window.appState.calendar;
    const workedCount = window.appState.calendar.workedDays.filter(dateStr => {
        const [year, month] = dateStr.split('-').map(Number);
        return year === currentYear && month === currentMonth;
    }).length;
    
    const dailyWage = window.appState.settings.monthlySalary / window.appState.settings.workingDays;
    const projectedEarnings = workedCount * dailyWage;
    
    document.getElementById('days-worked').textContent = workedCount;
    document.getElementById('monthly-target').textContent = window.appState.settings.workingDays;
    document.getElementById('projected-earnings').textContent = formatCurrency(projectedEarnings);
}

// --- MOTIVATIONAL MESSAGES ---
function setupMotivationalMessages() {
    const messageContainer = document.getElementById('motivational-message');
    if (!messageContainer) return;
    
    let paused = false;
    let messageIndex = 0;
    
    messageContainer.addEventListener('mouseenter', () => {
        paused = true;
        messageContainer.classList.add('paused');
    });
    
    messageContainer.addEventListener('mouseleave', () => {
        paused = false;
        messageContainer.classList.remove('paused');
    });
    
    function rotateMessage() {
        if (paused) return;
        
        const messages = [
            generateTimeMessage(),
            generateMoneyMessage(),
            generateProjectionMessage()
        ];
        
        const message = messages[messageIndex % messages.length];
        messageContainer.innerHTML = `<div class="message-content motivational-enter">${message}</div>`;
        messageIndex++;
    }
    
    setInterval(rotateMessage, 50000);
    rotateMessage();
}

function generateTimeMessage() {
    const minutes = Math.floor(Math.random() * 60) + 30;
    const lang = window.appState.settings.language || 'en';
    
    const comparisons = {
        en: ['watching a TV episode', 'having lunch', 'a coffee break'],
        'zh-TW': ['看一集電視劇', '午餐時間', '飲茶時間'],
        de: ['eine TV-Episode', 'Mittagessen', 'Kaffeepause'],
        ja: ['テレビ番組一話', '昼食', 'コーヒータイム']
    };
    
    const items = comparisons[lang] || comparisons.en;
    const item = items[Math.floor(Math.random() * items.length)];
    
    return `<h3>${minutes} minutes left</h3><p>About as long as ${item}</p>`;
}

function generateMoneyMessage() {
    const earnings = calculateTodayEarnings();
    const currency = window.appState.settings.currency || 'USD';
    const items = culturalItems[currency] || culturalItems.USD;
    const item = items.medium[Math.floor(Math.random() * items.medium.length)];
    
    return `<h3>Earned ${formatCurrency(earnings)}</h3><p>Enough for ${item}!</p>`;
}

function generateProjectionMessage() {
    const dailyWage = window.appState.settings.monthlySalary / window.appState.settings.workingDays;
    const weeklyProjection = dailyWage * 5;
    const monthlyProjection = window.appState.settings.monthlySalary;
    
    return `<h3>Weekly: ${formatCurrency(weeklyProjection)}</h3><p>Monthly: ${formatCurrency(monthlyProjection)}</p>`;
}

// --- SETTINGS ---
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    if (modalId === 'settings-modal') {
        populateSettingsForm();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function populateSettingsForm() {
    document.getElementById('language-select').value = window.appState.settings.language;
    document.getElementById('currency-select').value = window.appState.settings.currency;
    document.getElementById('monthly-salary').value = window.appState.settings.monthlySalary;
    document.getElementById('working-days').value = window.appState.settings.workingDays;
    
    Object.keys(window.appState.settings.schedule).forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        if (startInput) startInput.value = window.appState.settings.schedule[day].start;
        if (endInput) endInput.value = window.appState.settings.schedule[day].end;
    });
}

function handleSettingsSubmit(e) {
    e.preventDefault();
    
    window.appState.settings.language = document.getElementById('language-select').value;
    window.appState.settings.currency = document.getElementById('currency-select').value;
    window.appState.settings.monthlySalary = parseFloat(document.getElementById('monthly-salary').value);
    window.appState.settings.workingDays = parseInt(document.getElementById('working-days').value);
    
    Object.keys(window.appState.settings.schedule).forEach(day => {
        const start = document.getElementById(`${day}-start`).value;
        const end = document.getElementById(`${day}-end`).value;
        window.appState.settings.schedule[day] = {start, end};
    });
    
    localStorage.setItem('tracker_settings', JSON.stringify(window.appState.settings));
    closeModal('settings-modal');
    updateMainAppLanguage();
}

// --- MINI WIDGET DRAG ---
function setupMiniWidgetDrag() {
    const widget = document.getElementById('mini-widget');
    if (!widget) return;
    
    let isDragging = false;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;
    
    widget.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('mini-widget__btn')) return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = widget.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        widget.classList.add('dragging');
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            widget.style.left = (startLeft + dx) + 'px';
            widget.style.top = (startTop + dy) + 'px';
            widget.style.right = 'auto';
        }
        
        function handleMouseUp() {
            isDragging = false;
            widget.classList.remove('dragging');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

// --- UTILITY FUNCTIONS ---
function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
}

function formatCurrency(amount) {
    const currency = window.appState.settings.currency || 'USD';
    let symbol = '$';
    
    switch (currency) {
        case 'HKD': symbol = 'HK$'; break;
        case 'EUR': symbol = '€'; break;
        case 'GBP': symbol = '£'; break;
        case 'CAD': symbol = 'C$'; break;
        case 'AUD': symbol = 'A$'; break;
        case 'JPY': symbol = '¥'; break;
    }
    
    return currency === 'JPY' ? 
        symbol + Math.round(amount) : 
        symbol + amount.toFixed(2);
}

function isDateToday(year, month, day) {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
}

console.log('✅ Multilingual Time Tracker loaded successfully!');
