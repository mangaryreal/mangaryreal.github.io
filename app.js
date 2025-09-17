// Application state
let appState = {
    settings: {
        language: 'en',
        currency: 'USD',
        monthlySalary: 5000,
        workingDays: 22,
        schedule: {
            mon: { start: '09:00', end: '17:00' },
            tue: { start: '09:00', end: '17:00' },
            wed: { start: '09:00', end: '17:00' },
            thu: { start: '09:00', end: '17:00' },
            fri: { start: '09:00', end: '17:00' },
            sat: { start: '', end: '' },
            sun: { start: '', end: '' }
        }
    },
    calendar: {
        currentMonth: 8, // September (0-indexed)
        currentYear: 2025,
        workedDays: new Set()
    },
    ui: {
        currentView: 'full',
        currentTab: 'tracker'
    },
    achievements: {
        unlocked: new Set(),
        streak: 0,
        firstDay: false,
        totalDaysWorked: 0
    },
    messages: {
        currentIndex: 0,
        types: ['timeRemaining', 'timeElapsed', 'dailyEarnings', 'weeklyEarnings', 'monthlyProgress', 'motivational', 'earningsRate', 'achievements'],
        isPaused: false,
        rotationInterval: null
    }
};

// Comprehensive translation data with enhanced message system
const translations = {
    en: {
        appTitle: "Weekly Time Tracker",
        tracker: "Tracker",
        calendar: "Calendar",
        achievements: "Achievements",
        settings: "Settings",
        currentStatus: "Current Status",
        notWorking: "Not Working",
        working: "Working",
        workComplete: "Work Complete",
        noWorkScheduled: "No Work Scheduled",
        timeRemaining: "Time Remaining",
        earned: "Earned",
        today: "Today",
        thisWeek: "This Week",
        thisMonth: "This Month",
        quickView: "Quick View",
        ready: "Ready",
        daysWorked: "Days Worked",
        monthlyTarget: "Monthly Target",
        projectedEarnings: "Projected Earnings",
        yourAchievements: "Your Achievements",
        unlocked: "Unlocked",
        dayStreak: "Day Streak",
        languageRegion: "Language & Region",
        language: "Language",
        currencySalary: "Currency & Salary",
        currency: "Currency",
        monthlySalary: "Monthly Salary",
        workingDaysPerMonth: "Working Days per Month",
        weeklySchedule: "Weekly Schedule",
        monday: "Monday",
        tuesday: "Tuesday", 
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        to: "to",
        cancel: "Cancel",
        saveSettings: "Save Settings",
        messages: {
            timeRemaining: [
                "{time} left - like watching {comparison}!",
                "{time} remaining - perfect time for {comparison}!",
                "{time} to go - enough for {comparison}!"
            ],
            timeElapsed: [
                "You've been working for {time} - great focus!",
                "{time} into your workday - momentum building!",
                "{time} completed - you're crushing it!"
            ],
            dailyEarnings: [
                "Daily earnings: {amount} - enough for {comparison}!",
                "Today's total: {amount} - perfect for {comparison}!",
                "You've earned {amount} today - treat yourself to {comparison}!"
            ],
            weeklyEarnings: [
                "This week you'll earn {amount} - ideal for {comparison}!",
                "Weekly projection: {amount} - save up for {comparison}!",
                "Week's total: {amount} - splurge on {comparison}!"
            ],
            monthlyProgress: [
                "Monthly progress: {percent}% complete - you're doing great!",
                "{percent}% of your month done - keep up the momentum!",
                "Month is {percent}% finished - excellent progress!"
            ],
            motivational: [
                "Halfway through your workday - keep up the momentum!",
                "Every minute brings you closer to your goals!",
                "You're building excellent work habits - stay focused!",
                "Your dedication today shapes your success tomorrow!"
            ],
            earningsRate: [
                "Earning {rate} per second - watch your money grow!",
                "Making {rate} every second - time is literally money!",
                "Your time generates {rate} per second - fantastic!"
            ],
            achievements: [
                "🎉 First hour completed! You're building great work habits!",
                "🎉 Quarter day done! Consistency leads to success!",
                "🎉 Halfway mark reached! You're absolutely crushing it!",
                "🎉 Three-quarters complete! Final stretch - finish strong!"
            ]
        },
        timeComparisons: {
            short: ["a coffee break", "checking social media", "a short YouTube video", "walking to the store"],
            medium: ["watching a TV episode", "having lunch", "a short workout", "commuting to work"],
            long: ["watching a movie", "a good nap", "cooking dinner", "a long walk"],
            veryLong: ["binge-watching a series", "a full workout session", "deep cleaning", "a road trip"]
        },
        motivational: {
            ready: "Ready to start your productive day!",
            setSchedule: "Set your schedule in Settings to begin tracking.",
            workStarts: "Work starts in",
            workCompleted: "🎉 Congratulations! Work day complete!",
            timeToRelax: "Time to relax and enjoy your well-deserved break!"
        },
        achievements: {
            firstDay: { name: "First Day", description: "Complete your first work day" },
            weekWarrior: { name: "Week Warrior", description: "Work 5 days in a week" },
            monthMaster: { name: "Month Master", description: "Complete a full month" },
            earlyBird: { name: "Early Bird", description: "Start work before 8 AM" },
            nightOwl: { name: "Night Owl", description: "Work past 8 PM" },
            dedicated: { name: "Dedicated", description: "Maintain a 7-day streak" }
        }
    },
    "zh-TW": {
        appTitle: "每週工作時間追踪器",
        tracker: "追踪器",
        calendar: "日曆",
        achievements: "成就",
        settings: "設定",
        currentStatus: "目前狀態",
        notWorking: "未工作",
        working: "工作中",
        workComplete: "工作完成",
        noWorkScheduled: "今天沒有工作安排",
        timeRemaining: "剩餘時間",
        earned: "已賺取",
        today: "今天",
        thisWeek: "本週",
        thisMonth: "本月",
        quickView: "快速檢視",
        ready: "準備中",
        daysWorked: "已工作天數",
        monthlyTarget: "月度目標",
        projectedEarnings: "預計收入",
        yourAchievements: "您的成就",
        unlocked: "已解鎖",
        dayStreak: "天連續",
        languageRegion: "語言和地區",
        language: "語言",
        currencySalary: "貨幣和薪資",
        currency: "貨幣",
        monthlySalary: "月薪",
        workingDaysPerMonth: "每月工作天數",
        weeklySchedule: "每週時間表",
        monday: "週一",
        tuesday: "週二",
        wednesday: "週三", 
        thursday: "週四",
        friday: "週五",
        saturday: "週六",
        sunday: "週日",
        to: "到",
        cancel: "取消",
        saveSettings: "儲存設定",
        messages: {
            timeRemaining: [
                "還有{time} - 像看{comparison}的時間！",
                "剩餘{time} - 適合{comparison}！",
                "還要{time} - 足夠{comparison}！"
            ],
            timeElapsed: [
                "您已經工作了{time} - 專注力很棒！",
                "工作了{time} - 勢頭正佳！",
                "完成了{time} - 您做得太好了！"
            ],
            dailyEarnings: [
                "今日收入：{amount} - 夠{comparison}！",
                "今天賺取：{amount} - 適合{comparison}！",
                "今日總計：{amount} - 可以{comparison}！"
            ],
            weeklyEarnings: [
                "本週您將賺取{amount} - 適合{comparison}！",
                "週收入預計：{amount} - 存起來{comparison}！",
                "本週總計：{amount} - 奢侈地{comparison}！"
            ],
            monthlyProgress: [
                "月度進度：已完成{percent}% - 您做得很棒！",
                "本月{percent}%已完成 - 保持這個勢頭！",
                "月份{percent}%完成 - 進步優秀！"
            ],
            motivational: [
                "工作日已過半 - 保持這個勢頭！",
                "每一分鐘都讓您更接近目標！",
                "您正在建立優秀的工作習慣 - 保持專注！",
                "今天的努力塑造明天的成功！"
            ],
            earningsRate: [
                "每秒賺取{rate} - 看著您的錢增長！",
                "每秒創造{rate} - 時間就是金錢！",
                "您的時間每秒產生{rate} - 太棒了！"
            ],
            achievements: [
                "🎉 第一小時完成！您正在建立良好的工作習慣！",
                "🎉 四分之一完成！持續性帶來成功！",
                "🎉 達到中點！您絕對做得很棒！",
                "🎉 四分之三完成！最後衝刺 - 完美結束！"
            ]
        },
        timeComparisons: {
            short: ["飲茶時間", "看社交媒體", "短片時間", "去便利店"],
            medium: ["看一集電視劇", "午餐時間", "簡單運動", "通勤時間"],
            long: ["看一部電影", "午睡時間", "煮晚餐", "長距離散步"],
            veryLong: ["追劇時間", "完整健身", "大掃除", "短途旅行"]
        },
        motivational: {
            ready: "準備好開始充實的一天！",
            setSchedule: "在設定中設置您的時間表以開始追蹤。",
            workStarts: "工作將在",
            workCompleted: "🎉 恭喜！今天的工作完成了！",
            timeToRelax: "是時候放鬆並享受應得的休息了！"
        },
        achievements: {
            firstDay: { name: "第一天", description: "完成第一個工作日" },
            weekWarrior: { name: "週戰士", description: "一週工作5天" },
            monthMaster: { name: "月度大師", description: "完成整月工作" },
            earlyBird: { name: "早起鳥", description: "早上8點前開始工作" },
            nightOwl: { name: "夜貓子", description: "工作到晚上8點後" },
            dedicated: { name: "專注", description: "保持7天連續工作" }
        }
    },
    de: {
        appTitle: "Wöchentlicher Zeitverfolger",
        tracker: "Tracker",
        calendar: "Kalender", 
        achievements: "Erfolge",
        settings: "Einstellungen",
        currentStatus: "Aktueller Status",
        notWorking: "Nicht arbeiten",
        working: "Arbeiten",
        workComplete: "Arbeit abgeschlossen",
        noWorkScheduled: "Keine Arbeit heute geplant",
        timeRemaining: "Verbleibende Zeit",
        earned: "Verdient",
        today: "Heute",
        thisWeek: "Diese Woche",
        thisMonth: "Diesen Monat",
        quickView: "Schnellansicht",
        ready: "Bereit",
        daysWorked: "Arbeitstage",
        monthlyTarget: "Monatsziel",
        projectedEarnings: "Projizierte Einnahmen",
        yourAchievements: "Ihre Erfolge",
        unlocked: "Freigeschaltet",
        dayStreak: "Tage-Serie",
        languageRegion: "Sprache & Region",
        language: "Sprache",
        currencySalary: "Währung & Gehalt",
        currency: "Währung",
        monthlySalary: "Monatsgehalt",
        workingDaysPerMonth: "Arbeitstage pro Monat",
        weeklySchedule: "Wochenplan",
        monday: "Montag",
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag", 
        friday: "Freitag",
        saturday: "Samstag",
        sunday: "Sonntag",
        to: "bis",
        cancel: "Abbrechen",
        saveSettings: "Einstellungen speichern",
        messages: {
            timeRemaining: [
                "Noch {time} - wie {comparison}!",
                "{time} verbleibend - perfekt für {comparison}!",
                "{time} zu gehen - genug für {comparison}!"
            ],
            timeElapsed: [
                "Du arbeitest schon {time} - tolle Konzentration!",
                "{time} in deinen Arbeitstag - Momentum baut sich auf!",
                "{time} geschafft - du schaffst das großartig!"
            ],
            dailyEarnings: [
                "Tageseinnahmen: {amount} - genug für {comparison}!",
                "Heute verdient: {amount} - perfekt für {comparison}!",
                "Tagesgesamtsumme: {amount} - gönn dir {comparison}!"
            ],
            weeklyEarnings: [
                "Diese Woche verdienst du {amount} - ideal für {comparison}!",
                "Wochenprojektion: {amount} - spar für {comparison}!",
                "Wochentotal: {amount} - gib aus für {comparison}!"
            ],
            monthlyProgress: [
                "Monatsfortschritt: {percent}% geschafft - du machst das toll!",
                "{percent}% deines Monats sind vorbei - weiter so!",
                "Monat ist {percent}% fertig - exzellenter Fortschritt!"
            ],
            motivational: [
                "Halber Arbeitstag geschafft - weiter so!",
                "Jede Minute bringt dich deinen Zielen näher!",
                "Du entwickelst großartige Arbeitsgewohnheiten - bleib fokussiert!",
                "Deine heutige Hingabe formt deinen morgigen Erfolg!"
            ],
            earningsRate: [
                "Verdienst {rate} pro Sekunde - sieh zu wie dein Geld wächst!",
                "Machst {rate} jede Sekunde - Zeit ist buchstäblich Geld!",
                "Deine Zeit generiert {rate} pro Sekunde - fantastisch!"
            ],
            achievements: [
                "🎉 Erste Stunde geschafft! Du entwickelst tolle Arbeitsgewohnheiten!",
                "🎉 Viertel Tag erledigt! Konstanz führt zum Erfolg!",
                "🎉 Halbzeit erreicht! Du schaffst das absolut großartig!",
                "🎉 Drei Viertel geschafft! Endspurt - stark beenden!"
            ]
        },
        timeComparisons: {
            short: ["eine Kaffeepause", "Social Media checken", "ein kurzes Video", "zum Laden gehen"],
            medium: ["eine TV-Episode", "Mittagessen", "kurzes Training", "zur Arbeit fahren"],
            long: ["einen Film schauen", "ein Nickerchen", "Abendessen kochen", "langer Spaziergang"],
            veryLong: ["Serie schauen", "volles Training", "Großputz", "Roadtrip"]
        },
        motivational: {
            ready: "Bereit für einen produktiven Tag!",
            setSchedule: "Stellen Sie Ihren Zeitplan in den Einstellungen ein, um die Verfolgung zu beginnen.",
            workStarts: "Arbeit beginnt in",
            workCompleted: "🎉 Glückwunsch! Arbeitstag abgeschlossen!",
            timeToRelax: "Zeit zum Entspannen und wohlverdienten Pause!"
        },
        achievements: {
            firstDay: { name: "Erster Tag", description: "Ersten Arbeitstag abschließen" },
            weekWarrior: { name: "Wochen-Krieger", description: "5 Tage in einer Woche arbeiten" },
            monthMaster: { name: "Monats-Meister", description: "Einen ganzen Monat abschließen" },
            earlyBird: { name: "Frühaufsteher", description: "Vor 8 Uhr mit der Arbeit beginnen" },
            nightOwl: { name: "Nachteule", description: "Nach 20 Uhr arbeiten" },
            dedicated: { name: "Engagiert", description: "7-Tage-Serie aufrechterhalten" }
        }
    },
    ja: {
        appTitle: "週次勤務時間トラッカー",
        tracker: "トラッカー",
        calendar: "カレンダー",
        achievements: "実績",
        settings: "設定",
        currentStatus: "現在のステータス",
        notWorking: "非勤務",
        working: "勤務中",
        workComplete: "勤務完了",
        noWorkScheduled: "本日は勤務予定なし",
        timeRemaining: "残り時間",
        earned: "獲得額",
        today: "今日",
        thisWeek: "今週",
        thisMonth: "今月",
        quickView: "クイックビュー",
        ready: "準備完了",
        daysWorked: "勤務日数",
        monthlyTarget: "月次目標",
        projectedEarnings: "予想収入",
        yourAchievements: "あなたの実績",
        unlocked: "解除済み",
        dayStreak: "日連続",
        languageRegion: "言語・地域",
        language: "言語",
        currencySalary: "通貨・給与",
        currency: "通貨",
        monthlySalary: "月給",
        workingDaysPerMonth: "月間勤務日数",
        weeklySchedule: "週間スケジュール",
        monday: "月曜日",
        tuesday: "火曜日",
        wednesday: "水曜日",
        thursday: "木曜日",
        friday: "金曜日",
        saturday: "土曜日",
        sunday: "日曜日",
        to: "から",
        cancel: "キャンセル",
        saveSettings: "設定を保存",
        messages: {
            timeRemaining: [
                "あと{time} - {comparison}と同じ時間！",
                "残り{time} - {comparison}にぴったり！",
                "{time}で終了 - {comparison}に十分！"
            ],
            timeElapsed: [
                "{time}勤務中 - 素晴らしい集中力！",
                "勤務{time}経過 - 勢いが増しています！",
                "{time}完了 - 本当に素晴らしい！"
            ],
            dailyEarnings: [
                "本日の収入：{amount} - {comparison}に十分！",
                "今日の獲得額：{amount} - {comparison}にぴったり！",
                "日給：{amount} - {comparison}をお楽しみください！"
            ],
            weeklyEarnings: [
                "今週は{amount}稼げます - {comparison}に理想的！",
                "週間予想：{amount} - {comparison}のために貯金！",
                "週合計：{amount} - {comparison}で贅沢を！"
            ],
            monthlyProgress: [
                "月間進捗：{percent}%完了 - 素晴らしい仕事です！",
                "月の{percent}%が完了 - この調子で！",
                "月{percent}%終了 - 優秀な進歩！"
            ],
            motivational: [
                "勤務日の半分完了 - この勢いを保って！",
                "一分一分が目標に近づけています！",
                "素晴らしい勤務習慣を築いています - 集中を保って！",
                "今日の献身が明日の成功を形作ります！"
            ],
            earningsRate: [
                "毎秒{rate}獲得 - お金の成長を見てください！",
                "毎秒{rate}作成 - 時間は文字通りお金です！",
                "あなたの時間は毎秒{rate}を生み出します - 素晴らしい！"
            ],
            achievements: [
                "🎉 最初の1時間完了！素晴らしい勤務習慣を築いています！",
                "🎉 4分の1日完了！一貫性が成功につながります！",
                "🎉 中間点到達！あなたは絶対に素晴らしい！",
                "🎉 4分の3完了！最後のスパート - 強く終えて！"
            ]
        },
        timeComparisons: {
            short: ["コーヒーブレイク", "SNSチェック", "短い動画", "コンビニまで"],
            medium: ["テレビ番組一話", "昼食", "軽い運動", "通勤時間"],
            long: ["映画鑑賞", "昼寝", "夕食作り", "長い散歩"],
            veryLong: ["ドラマ鑑賞", "フル・ワークアウト", "大掃除", "ドライブ"]
        },
        motivational: {
            ready: "生産的な一日を始める準備ができました！",
            setSchedule: "追跡を開始するには、設定でスケジュールを設定してください。",
            workStarts: "勤務開始まで",
            workCompleted: "🎉 おめでとうございます！本日の勤務完了！",
            timeToRelax: "リラックスして、よく頑張った休憩を楽しんでください！"
        },
        achievements: {
            firstDay: { name: "初日", description: "初回勤務日を完了" },
            weekWarrior: { name: "週間戦士", description: "1週間で5日勤務" },
            monthMaster: { name: "月間マスター", description: "1か月完走" },
            earlyBird: { name: "早起き鳥", description: "午前8時前に勤務開始" },
            nightOwl: { name: "夜フクロウ", description: "午後8時以降も勤務" },
            dedicated: { name: "献身的", description: "7日連続勤務を維持" }
        }
    }
};

// Currency configurations with cultural money comparisons
const currencies = {
    USD: { 
        symbol: '$', 
        name: 'US Dollar',
        comparisons: {
            small: ['a coffee at Starbucks', 'a candy bar', 'a single song download'],
            medium: ['a nice lunch', 'a movie ticket', 'a book', 'a cup of bubble tea'],
            large: ['dinner for two', 'a new video game', 'monthly Netflix', 'a nice bottle of wine'],
            huge: ['a weekend getaway', 'new headphones', 'weekly groceries', 'a fancy dinner']
        }
    },
    HKD: { 
        symbol: 'HK$', 
        name: 'Hong Kong Dollar',
        comparisons: {
            small: ['港式茶餐廳點心', 'MTR單程票', '菠蘿包'],
            medium: ['茶餐廳套餐', '電影票', '奶茶', '雜誌'],
            large: ['火鍋晚餐', 'Octopus卡增值', '精美點心', '的士車程'],
            huge: ['澳門週末遊', '購物狂歡', '高級餐廳', '新手機殼']
        }
    },
    EUR: { 
        symbol: '€', 
        name: 'Euro',
        comparisons: {
            small: ['einen Kaffee', 'ein Gebäck', 'eine Zeitung'],
            medium: ['ein Mittagessen', 'ein Kinoticket', 'ein Buch', 'ein Bier'],
            large: ['Abendessen für zwei', 'eine Flasche Wein', 'Monatsticket', 'ein Shirt'],
            huge: ['Wochenendtrip', 'neue Schuhe', 'Wocheneinkauf', 'schönes Abendessen']
        }
    },
    GBP: { 
        symbol: '£', 
        name: 'British Pound',
        comparisons: {
            small: ['a coffee', 'a chocolate bar', 'a magazine'],
            medium: ['a pub lunch', 'a cinema ticket', 'a book', 'a pint'],
            large: ['dinner for two', 'monthly Netflix', 'a bottle of wine', 'a t-shirt'],
            huge: ['weekend getaway', 'new trainers', 'weekly shopping', 'a nice meal']
        }
    },
    CAD: { 
        symbol: 'C$', 
        name: 'Canadian Dollar',
        comparisons: {
            small: ['a Tim Hortons coffee', 'a donut', 'parking meter'],
            medium: ['lunch special', 'movie ticket', 'a book', 'bubble tea'],
            large: ['dinner for two', 'monthly transit pass', 'a bottle of wine', 'a hoodie'],
            huge: ['weekend trip', 'new headphones', 'weekly groceries', 'fancy dinner']
        }
    },
    AUD: { 
        symbol: 'A$', 
        name: 'Australian Dollar',
        comparisons: {
            small: ['a flat white', 'a meat pie', 'a chocolate bar'],
            medium: ['lunch special', 'cinema ticket', 'a book', 'a beer'],
            large: ['dinner for two', 'monthly gym', 'a bottle of wine', 'a shirt'],
            huge: ['weekend away', 'new sneakers', 'weekly groceries', 'nice restaurant']
        }
    },
    JPY: { 
        symbol: '¥', 
        name: 'Japanese Yen',
        comparisons: {
            small: ['コーヒー', 'おにぎり', '電車賃'],
            medium: ['ランチセット', 'マンガ一冊', 'ラーメン一杯', 'コンビニ弁当'],
            large: ['二人の夕食', '月額携帯料金', '本一冊', 'カラオケセッション'],
            huge: ['週末旅行', '新しい電子機器', '週の食材', '高級寿司']
        }
    }
};

// Achievement definitions
const achievementDefinitions = {
    firstDay: { id: 'firstDay', icon: '🎯', condition: 'complete_first_day' },
    weekWarrior: { id: 'weekWarrior', icon: '💪', condition: 'complete_5_days' },
    monthMaster: { id: 'monthMaster', icon: '👑', condition: 'complete_month' },
    earlyBird: { id: 'earlyBird', icon: '🌅', condition: 'start_before_8am' },
    nightOwl: { id: 'nightOwl', icon: '🦉', condition: 'work_past_8pm' },
    dedicated: { id: 'dedicated', icon: '🔥', condition: '7_day_streak' }
};

// DOM elements and intervals
let currentTimeInterval;
let messageRotationInterval;
let miniWidgetDragData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced multilingual time tracker...');
    
    // Detect browser language
    detectBrowserLanguage();
    
    try {
        initializeApp();
        setupEventListeners();
        updateDisplay();
        startTimeUpdates();
        startMessageRotation();
        initializeMiniWidget();
        
        // Request notification permission if supported
        if ('Notification' in window) {
            Notification.requestPermission();
        }
        
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const supportedLangs = ['en', 'zh-TW', 'de', 'ja'];
    
    // Check if browser language is supported
    const detectedLang = supportedLangs.find(lang => browserLang.startsWith(lang.split('-')[0]));
    
    if (detectedLang) {
        if (detectedLang === 'zh' && browserLang.includes('TW')) {
            appState.settings.language = 'zh-TW';
        } else if (detectedLang) {
            appState.settings.language = detectedLang;
        }
    }
    
    console.log('Detected language:', appState.settings.language);
}

function initializeApp() {
    console.log('Setting up initial values...');
    updateLanguage();
    
    // Set default values in settings form
    const languageSelect = document.getElementById('language-select');
    const currencySelect = document.getElementById('currency-select');
    const monthlySalary = document.getElementById('monthly-salary');
    const workingDays = document.getElementById('working-days');
    
    if (languageSelect) languageSelect.value = appState.settings.language;
    if (currencySelect) currencySelect.value = appState.settings.currency;
    if (monthlySalary) monthlySalary.value = appState.settings.monthlySalary;
    if (workingDays) workingDays.value = appState.settings.workingDays;
    
    // Set default schedule
    Object.keys(appState.settings.schedule).forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        if (startInput && endInput) {
            startInput.value = appState.settings.schedule[day].start;
            endInput.value = appState.settings.schedule[day].end;
        }
    });
    
    // Initialize achievements
    renderAchievements();
    
    // Make sure tracker tab is active by default
    switchTab('tracker');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // View mode controls
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    viewModeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('View mode button clicked:', this.dataset.mode);
            switchViewMode(this.dataset.mode);
        });
    });
    
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Tab button clicked:', this.dataset.tab);
            switchTab(this.dataset.tab);
        });
    });
    
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Settings button clicked');
            openModal('settings-modal');
        });
    }
    
    // Settings modal controls
    setupSettingsModal();
    
    // Calendar navigation
    setupCalendarControls();
    
    // Mini widget controls
    setupMiniWidgetControls();
    
    // Quick view controls
    setupQuickViewControls();
    
    // Language change handler
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            console.log('Language changed to:', this.value);
            appState.settings.language = this.value;
            updateLanguage();
            // Immediately update motivational message with new language
            updateMotivationalMessage();
        });
    }
    
    // Message hover pause/resume
    const messageContainer = document.getElementById('motivational-message');
    if (messageContainer) {
        messageContainer.addEventListener('mouseenter', pauseMessageRotation);
        messageContainer.addEventListener('mouseleave', resumeMessageRotation);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Touch and gesture support for mobile
    if ('ontouchstart' in window) {
        setupTouchControls();
    }
}

function startMessageRotation() {
    // Clear any existing interval
    if (messageRotationInterval) {
        clearInterval(messageRotationInterval);
    }
    
    // Start message rotation every 50 seconds
    messageRotationInterval = setInterval(() => {
        if (!appState.messages.isPaused) {
            appState.messages.currentIndex = (appState.messages.currentIndex + 1) % appState.messages.types.length;
            updateMotivationalMessage();
        }
    }, 50000);
}

function pauseMessageRotation() {
    appState.messages.isPaused = true;
}

function resumeMessageRotation() {
    appState.messages.isPaused = false;
}

function setupSettingsModal() {
    const closeSettings = document.getElementById('close-settings');
    const cancelSettings = document.getElementById('cancel-settings');
    const settingsForm = document.getElementById('settings-form');
    const settingsModal = document.getElementById('settings-modal');
    
    if (closeSettings) {
        closeSettings.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal('settings-modal');
        });
    }
    
    if (cancelSettings) {
        cancelSettings.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal('settings-modal');
        });
    }
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            handleSettingsSubmit(e);
        });
    }
    
    if (settingsModal) {
        settingsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal('settings-modal');
            }
        });
    }
}

function setupCalendarControls() {
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    
    if (prevMonth) {
        prevMonth.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateMonth(-1);
        });
    }
    
    if (nextMonth) {
        nextMonth.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navigateMonth(1);
        });
    }
}

function setupMiniWidgetControls() {
    const expandWidget = document.getElementById('expand-widget');
    const closeWidget = document.getElementById('close-widget');
    
    if (expandWidget) {
        expandWidget.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchViewMode('full');
        });
    }
    
    if (closeWidget) {
        closeWidget.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchViewMode('full');
        });
    }
}

function setupQuickViewControls() {
    const closeQuickView = document.getElementById('close-quick-view');
    
    if (closeQuickView) {
        closeQuickView.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchViewMode('full');
        });
    }
}

function initializeMiniWidget() {
    const miniWidget = document.getElementById('mini-widget');
    if (!miniWidget) return;
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    miniWidget.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('mini-widget__btn')) return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = miniWidget.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        miniWidget.classList.add('dragging');
        document.addEventListener('mousemove', dragWidget);
        document.addEventListener('mouseup', stopDragWidget);
    });
    
    function dragWidget(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        const newLeft = Math.max(0, Math.min(window.innerWidth - miniWidget.offsetWidth, startLeft + dx));
        const newTop = Math.max(0, Math.min(window.innerHeight - miniWidget.offsetHeight, startTop + dy));
        
        miniWidget.style.left = newLeft + 'px';
        miniWidget.style.top = newTop + 'px';
        miniWidget.style.right = 'auto';
    }
    
    function stopDragWidget() {
        isDragging = false;
        miniWidget.classList.remove('dragging');
        document.removeEventListener('mousemove', dragWidget);
        document.removeEventListener('mouseup', stopDragWidget);
    }
    
    // Touch support for mobile
    miniWidget.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('mini-widget__btn')) return;
        
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX;
        startY = touch.clientY;
        const rect = miniWidget.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        
        miniWidget.classList.add('dragging');
    });
    
    miniWidget.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        
        const newLeft = Math.max(0, Math.min(window.innerWidth - miniWidget.offsetWidth, startLeft + dx));
        const newTop = Math.max(0, Math.min(window.innerHeight - miniWidget.offsetHeight, startTop + dy));
        
        miniWidget.style.left = newLeft + 'px';
        miniWidget.style.top = newTop + 'px';
        miniWidget.style.right = 'auto';
    });
    
    miniWidget.addEventListener('touchend', function() {
        isDragging = false;
        miniWidget.classList.remove('dragging');
    });
}

function setupTouchControls() {
    // Add touch-friendly swipe gestures for tab navigation
    let startTouchX = 0;
    let startTouchY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startTouchX = e.touches[0].clientX;
        startTouchY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const endTouchX = e.changedTouches[0].clientX;
        const endTouchY = e.changedTouches[0].clientY;
        
        const diffX = startTouchX - endTouchX;
        const diffY = startTouchY - endTouchY;
        
        // Check if it's a horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const tabs = ['tracker', 'calendar', 'achievements'];
            const currentIndex = tabs.indexOf(appState.ui.currentTab);
            
            if (diffX > 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                switchTab(tabs[currentIndex + 1]);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe right - previous tab
                switchTab(tabs[currentIndex - 1]);
            }
        }
    });
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + key combinations
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchTab('tracker');
                break;
            case '2':
                e.preventDefault();
                switchTab('calendar');
                break;
            case '3':
                e.preventDefault();
                switchTab('achievements');
                break;
            case ',':
                e.preventDefault();
                openModal('settings-modal');
                break;
            case 'm':
                e.preventDefault();
                switchViewMode('mini');
                break;
            case 'q':
                e.preventDefault();
                switchViewMode('quick');
                break;
        }
    }
    
    // Escape key
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal:not(.hidden)');
        if (modal) {
            closeModal(modal.id);
        } else if (appState.ui.currentView !== 'full') {
            switchViewMode('full');
        }
    }
}

function switchViewMode(mode) {
    console.log('Switching view mode to:', mode);
    
    appState.ui.currentView = mode;
    
    // Update view mode buttons
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    viewModeButtons.forEach(btn => {
        btn.classList.remove('view-mode-btn--active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('view-mode-btn--active');
        }
    });
    
    // Show/hide appropriate views
    const mainApp = document.getElementById('main-app');
    const miniWidget = document.getElementById('mini-widget');
    const quickView = document.getElementById('quick-view');
    
    // Hide all views first
    if (mainApp) mainApp.classList.toggle('hidden', mode !== 'full');
    if (miniWidget) miniWidget.classList.toggle('hidden', mode !== 'mini');
    if (quickView) quickView.classList.toggle('hidden', mode !== 'quick');
    
    // Update displays for active view
    if (mode === 'mini') {
        updateMiniWidget();
    } else if (mode === 'quick') {
        updateQuickView();
    }
    
    // Provide haptic feedback on mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

function switchTab(tabName) {
    if (!tabName) return;
    
    console.log('Switching to tab:', tabName);
    appState.ui.currentTab = tabName;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('tab-btn--active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('tab-btn--active');
        }
    });
    
    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('tab-content--active');
    });
    
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('tab-content--active');
        console.log('Switched to tab content:', tabName);
    } else {
        console.error('Tab content not found:', `${tabName}-tab`);
    }
    
    // Special handling for specific tabs
    if (tabName === 'calendar') {
        setTimeout(() => renderCalendar(), 100);
    } else if (tabName === 'achievements') {
        renderAchievements();
    }
}

function updateLanguage() {
    const t = translations[appState.settings.language] || translations.en;
    console.log('Updating language to:', appState.settings.language);
    
    // Update all translatable elements
    const elements = {
        'app-title': t.appTitle,
        'tracker-tab-btn': t.tracker,
        'calendar-tab-btn': t.calendar,
        'achievements-tab-btn': t.achievements,
        'settings-title': t.settings,
        'current-status': t.notWorking,
        'today-label': t.today,
        'week-label': t.thisWeek,
        'month-label': t.thisMonth,
        'quick-view-title': t.quickView,
        'quick-time-label': t.timeRemaining,
        'quick-earned-label': t.earned,
        'days-worked-label': t.daysWorked,
        'monthly-target-label': t.monthlyTarget,
        'projected-earnings-label': t.projectedEarnings,
        'achievements-title': t.yourAchievements,
        'total-achievements-label': t.unlocked,
        'streak-label': t.dayStreak,
        'language-section-title': t.languageRegion,
        'language-label': t.language,
        'currency-section-title': t.currencySalary,
        'currency-label': t.currency,
        'salary-label': t.monthlySalary,
        'working-days-label': t.workingDaysPerMonth,
        'schedule-section-title': t.weeklySchedule,
        'monday-label': t.monday,
        'tuesday-label': t.tuesday,
        'wednesday-label': t.wednesday,
        'thursday-label': t.thursday,
        'friday-label': t.friday,
        'saturday-label': t.saturday,
        'sunday-label': t.sunday,
        'cancel-settings': t.cancel,
        'save-settings': t.saveSettings
    };
    
    // Update "to" labels
    for (let i = 1; i <= 7; i++) {
        elements[`to-label-${i}`] = t.to;
    }
    
    Object.entries(elements).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    });
    
    // Update document title
    document.title = `⏰ ${t.appTitle}`;
    
    // Update achievements
    renderAchievements();
    
    console.log('Language updated successfully');
}

function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Modal closed successfully');
    } else {
        console.error('Modal not found:', modalId);
    }
}

function handleSettingsSubmit(e) {
    e.preventDefault();
    console.log('Handling settings submit...');
    
    // Update settings from form
    const languageSelect = document.getElementById('language-select');
    const currencySelect = document.getElementById('currency-select');
    const monthlySalary = document.getElementById('monthly-salary');
    const workingDays = document.getElementById('working-days');
    
    if (languageSelect) {
        appState.settings.language = languageSelect.value;
        updateLanguage();
    }
    
    if (currencySelect) {
        appState.settings.currency = currencySelect.value;
    }
    
    if (monthlySalary) {
        appState.settings.monthlySalary = parseFloat(monthlySalary.value) || 0;
    }
    
    if (workingDays) {
        appState.settings.workingDays = parseInt(workingDays.value) || 22;
    }
    
    // Update schedule
    Object.keys(appState.settings.schedule).forEach(day => {
        const startInput = document.getElementById(`${day}-start`);
        const endInput = document.getElementById(`${day}-end`);
        if (startInput && endInput) {
            appState.settings.schedule[day] = {
                start: startInput.value,
                end: endInput.value
            };
        }
    });
    
    console.log('Settings updated:', appState.settings);
    
    closeModal('settings-modal');
    updateDisplay();
    updateMiniWidget();
    updateQuickView();
    updateMotivationalMessage();
}

function startTimeUpdates() {
    updateCurrentTime();
    currentTimeInterval = setInterval(() => {
        updateCurrentTime();
        updateProgress();
        updateEarnings();
        updateMiniWidget();
        updateQuickView();
        checkAchievements();
    }, 1000);
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.textContent = timeString;
    }
}

function updateDisplay() {
    console.log('Updating display...');
    updateProgress();
    updateMotivationalMessage();
    updateEarnings();
    updateCalendarSummary();
    renderAchievements();
}

function updateProgress() {
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    const t = translations[appState.settings.language] || translations.en;
    
    const statusElement = document.getElementById('current-status');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const timeRemaining = document.getElementById('time-remaining');
    
    if (!statusElement || !progressFill || !progressText || !timeRemaining) return;
    
    if (!schedule.start || !schedule.end) {
        statusElement.textContent = t.noWorkScheduled;
        progressFill.style.width = '0%';
        progressText.textContent = '0%';
        timeRemaining.textContent = t.noWorkScheduled;
        return;
    }
    
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    if (currentTimeSeconds < startTimeSeconds) {
        statusElement.textContent = t.notWorking;
        progressFill.style.width = '0%';
        progressText.textContent = '0%';
        const secondsToStart = startTimeSeconds - currentTimeSeconds;
        timeRemaining.textContent = `${t.motivational.workStarts} ${formatTimeRemaining(secondsToStart)}`;
    } else if (currentTimeSeconds >= endTimeSeconds) {
        statusElement.textContent = t.workComplete;
        progressFill.style.width = '100%';
        progressText.textContent = '100%';
        timeRemaining.textContent = t.workComplete;
        
        // Mark today as worked and check achievements
        const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        if (!appState.calendar.workedDays.has(dateKey)) {
            appState.calendar.workedDays.add(dateKey);
            appState.achievements.totalDaysWorked++;
            checkAchievements();
        }
    } else {
        statusElement.textContent = t.working;
        const totalSeconds = endTimeSeconds - startTimeSeconds;
        const workedSeconds = currentTimeSeconds - startTimeSeconds;
        const progress = (workedSeconds / totalSeconds) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        const remainingSeconds = endTimeSeconds - currentTimeSeconds;
        timeRemaining.textContent = `${formatTimeRemaining(remainingSeconds)} ${t.timeRemaining.toLowerCase()}`;
    }
}

function parseTimeToSeconds(timeString) {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60;
}

function formatTimeRemaining(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}

function calculateTimeRemaining() {
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    
    if (!schedule.start || !schedule.end) return 0;
    
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    return Math.max(0, endTimeSeconds - currentTimeSeconds);
}

function calculateTimeElapsed() {
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    
    if (!schedule.start || !schedule.end) return 0;
    
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    return Math.max(0, currentTimeSeconds - startTimeSeconds);
}

function generateMessage(type) {
    const t = translations[appState.settings.language] || translations.en;
    const messages = t.messages[type];
    
    if (!messages || messages.length === 0) {
        return { title: 'Ready to work!', text: 'Set your schedule to get started.' };
    }
    
    const template = messages[Math.floor(Math.random() * messages.length)];
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    
    // Generate data based on message type
    let data = {};
    
    switch(type) {
        case 'timeRemaining':
            const remainingSeconds = calculateTimeRemaining();
            data.time = formatTimeRemaining(remainingSeconds);
            data.comparison = getTimeComparison(Math.floor(remainingSeconds / 60), t);
            break;
            
        case 'timeElapsed':
            const elapsedSeconds = calculateTimeElapsed();
            data.time = formatTimeRemaining(elapsedSeconds);
            break;
            
        case 'dailyEarnings':
            const dailyAmount = calculateDailyEarnings();
            data.amount = formatCurrency(dailyAmount);
            data.comparison = getMoneyComparison(dailyAmount);
            break;
            
        case 'weeklyEarnings':
            const weeklyAmount = calculateWeeklyEarnings();
            data.amount = formatCurrency(weeklyAmount);
            data.comparison = getMoneyComparison(weeklyAmount);
            break;
            
        case 'monthlyProgress':
            const workedDays = appState.calendar.workedDays.size;
            const targetDays = appState.settings.workingDays;
            const percent = Math.round((workedDays / targetDays) * 100);
            data.percent = percent;
            break;
            
        case 'earningsRate':
            const dailyWage = appState.settings.monthlySalary / appState.settings.workingDays;
            const rate = formatCurrency(dailyWage / (8 * 3600)); // per second
            data.rate = rate;
            break;
    }
    
    // Replace placeholders in template
    let processedMessage = template;
    Object.keys(data).forEach(key => {
        processedMessage = processedMessage.replace(`{${key}}`, data[key]);
    });
    
    return {
        title: processedMessage.split(' - ')[0] || processedMessage,
        text: processedMessage.split(' - ')[1] || ''
    };
}

function updateMotivationalMessage() {
    const messageContainer = document.getElementById('motivational-message');
    if (!messageContainer) return;
    
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    const t = translations[appState.settings.language] || translations.en;
    
    if (!schedule.start || !schedule.end) {
        messageContainer.innerHTML = `
            <div class="message-content">
                <h3>${t.motivational.ready}</h3>
                <p>${t.motivational.setSchedule}</p>
            </div>
        `;
        return;
    }
    
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    let messageType = appState.messages.types[appState.messages.currentIndex];
    let message;
    
    if (currentTimeSeconds < startTimeSeconds) {
        const secondsToStart = startTimeSeconds - currentTimeSeconds;
        message = {
            title: `Work starts in ${formatTimeRemaining(secondsToStart)}`,
            text: 'Get ready for a productive day!'
        };
    } else if (currentTimeSeconds >= endTimeSeconds) {
        message = {
            title: t.motivational.workCompleted,
            text: t.motivational.timeToRelax
        };
    } else {
        message = generateMessage(messageType);
    }
    
    messageContainer.innerHTML = `
        <div class="message-content">
            <h3>${message.title}</h3>
            ${message.text ? `<p>${message.text}</p>` : ''}
        </div>
    `;
}

function getTimeComparison(minutes, t) {
    const comparisons = t.timeComparisons;
    
    if (minutes <= 30) {
        return comparisons.short[Math.floor(Math.random() * comparisons.short.length)];
    } else if (minutes <= 90) {
        return comparisons.medium[Math.floor(Math.random() * comparisons.medium.length)];
    } else if (minutes <= 180) {
        return comparisons.long[Math.floor(Math.random() * comparisons.long.length)];
    } else {
        return comparisons.veryLong[Math.floor(Math.random() * comparisons.veryLong.length)];
    }
}

function getMoneyComparison(amount) {
    const currency = appState.settings.currency;
    const currencyData = currencies[currency] || currencies.USD;
    const comparisons = currencyData.comparisons;
    
    // Determine category based on amount and currency
    let category = 'small';
    
    if (currency === 'USD') {
        if (amount >= 100) category = 'huge';
        else if (amount >= 40) category = 'large';
        else if (amount >= 10) category = 'medium';
    } else if (currency === 'HKD') {
        if (amount >= 800) category = 'huge';
        else if (amount >= 300) category = 'large';
        else if (amount >= 80) category = 'medium';
    } else if (currency === 'EUR') {
        if (amount >= 80) category = 'huge';
        else if (amount >= 30) category = 'large';
        else if (amount >= 8) category = 'medium';
    } else if (currency === 'GBP') {
        if (amount >= 70) category = 'huge';
        else if (amount >= 25) category = 'large';
        else if (amount >= 8) category = 'medium';
    } else if (currency === 'JPY') {
        if (amount >= 8000) category = 'huge';
        else if (amount >= 3000) category = 'large';
        else if (amount >= 800) category = 'medium';
    } else {
        // CAD, AUD and others similar to USD
        if (amount >= 120) category = 'huge';
        else if (amount >= 50) category = 'large';
        else if (amount >= 12) category = 'medium';
    }
    
    const categoryItems = comparisons[category] || comparisons.small;
    return categoryItems[Math.floor(Math.random() * categoryItems.length)];
}

function updateEarnings() {
    const dailyEarnings = calculateDailyEarnings();
    const weeklyEarnings = calculateWeeklyEarnings();
    const monthlyEarnings = calculateMonthlyEarnings();
    
    const todayElem = document.getElementById('today-earnings');
    const weekElem = document.getElementById('week-earnings');
    const monthElem = document.getElementById('month-earnings');
    
    if (todayElem) todayElem.textContent = formatCurrency(dailyEarnings);
    if (weekElem) weekElem.textContent = formatCurrency(weeklyEarnings);
    if (monthElem) monthElem.textContent = formatCurrency(monthlyEarnings);
}

function updateMiniWidget() {
    if (appState.ui.currentView !== 'mini') return;
    
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    const t = translations[appState.settings.language] || translations.en;
    
    const miniStatus = document.getElementById('mini-status');
    const miniProgressFill = document.getElementById('mini-progress-fill');
    const miniProgressText = document.getElementById('mini-progress-text');
    const miniEarnings = document.getElementById('mini-earnings');
    
    if (!miniStatus || !miniProgressFill || !miniProgressText || !miniEarnings) return;
    
    if (!schedule.start || !schedule.end) {
        miniStatus.textContent = t.ready;
        miniProgressFill.style.width = '0%';
        miniProgressText.textContent = '0%';
        miniEarnings.textContent = formatCurrency(0);
        return;
    }
    
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    if (currentTimeSeconds < startTimeSeconds) {
        miniStatus.textContent = t.notWorking;
        miniProgressFill.style.width = '0%';
        miniProgressText.textContent = '0%';
    } else if (currentTimeSeconds >= endTimeSeconds) {
        miniStatus.textContent = t.workComplete;
        miniProgressFill.style.width = '100%';
        miniProgressText.textContent = '100%';
    } else {
        miniStatus.textContent = t.working;
        const totalSeconds = endTimeSeconds - startTimeSeconds;
        const workedSeconds = currentTimeSeconds - startTimeSeconds;
        const progress = (workedSeconds / totalSeconds) * 100;
        
        miniProgressFill.style.width = `${progress}%`;
        miniProgressText.textContent = `${Math.round(progress)}%`;
    }
    
    const dailyEarnings = calculateDailyEarnings();
    miniEarnings.textContent = formatCurrency(dailyEarnings);
}

function updateQuickView() {
    if (appState.ui.currentView !== 'quick') return;
    
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    const t = translations[appState.settings.language] || translations.en;
    
    const quickProgressCircle = document.getElementById('quick-progress-circle');
    const quickProgressPercent = document.getElementById('quick-progress-percent');
    const quickStatus = document.getElementById('quick-status');
    const quickTimeRemaining = document.getElementById('quick-time-remaining');
    const quickEarned = document.getElementById('quick-earned');
    const quickMessage = document.getElementById('quick-message');
    
    if (!quickProgressCircle || !quickProgressPercent || !quickStatus || !quickTimeRemaining || !quickEarned || !quickMessage) return;
    
    if (!schedule.start || !schedule.end) {
        quickProgressPercent.textContent = '0%';
        quickStatus.textContent = t.ready;
        quickTimeRemaining.textContent = '--';
        quickEarned.textContent = formatCurrency(0);
        quickMessage.textContent = t.motivational.ready;
        
        const circumference = 2 * Math.PI * 52;
        quickProgressCircle.style.strokeDashoffset = circumference;
        return;
    }
    
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    let progress = 0;
    let status = t.ready;
    let timeText = '--';
    let message = t.motivational.ready;
    
    if (currentTimeSeconds < startTimeSeconds) {
        progress = 0;
        status = t.notWorking;
        const secondsToStart = startTimeSeconds - currentTimeSeconds;
        timeText = formatTimeRemaining(secondsToStart);
        message = `${t.motivational.workStarts} ${formatTimeRemaining(secondsToStart)}`;
    } else if (currentTimeSeconds >= endTimeSeconds) {
        progress = 100;
        status = t.workComplete;
        timeText = 'Complete';
        message = t.motivational.workCompleted;
    } else {
        const totalSeconds = endTimeSeconds - startTimeSeconds;
        const workedSeconds = currentTimeSeconds - startTimeSeconds;
        progress = (workedSeconds / totalSeconds) * 100;
        status = t.working;
        const remainingSeconds = endTimeSeconds - currentTimeSeconds;
        timeText = formatTimeRemaining(remainingSeconds);
        message = `${Math.round(progress)}% complete`;
    }
    
    // Update circular progress
    const circumference = 2 * Math.PI * 52;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    quickProgressCircle.style.strokeDashoffset = strokeDashoffset;
    
    quickProgressPercent.textContent = `${Math.round(progress)}%`;
    quickStatus.textContent = status;
    quickTimeRemaining.textContent = timeText;
    quickEarned.textContent = formatCurrency(calculateDailyEarnings());
    quickMessage.textContent = message;
}

function calculateDailyEarnings() {
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    
    if (!schedule.start || !schedule.end) return 0;
    
    const startTimeSeconds = parseTimeToSeconds(schedule.start);
    const endTimeSeconds = parseTimeToSeconds(schedule.end);
    const currentTimeSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    if (currentTimeSeconds < startTimeSeconds) return 0;
    
    const workedSeconds = Math.min(currentTimeSeconds - startTimeSeconds, endTimeSeconds - startTimeSeconds);
    return calculateEarningsForSeconds(workedSeconds);
}

function calculateWeeklyEarnings() {
    const workingDaysInWeek = Object.values(appState.settings.schedule)
        .filter(day => day.start && day.end).length;
    
    return calculateDailyEarnings() + (workingDaysInWeek - 1) * (appState.settings.monthlySalary / appState.settings.workingDays);
}

function calculateMonthlyEarnings() {
    return appState.calendar.workedDays.size * (appState.settings.monthlySalary / appState.settings.workingDays);
}

function calculateEarningsForSeconds(seconds) {
    const dailyWage = appState.settings.monthlySalary / appState.settings.workingDays;
    const secondsInDay = 8 * 3600; // Assuming 8-hour work day
    return (seconds / secondsInDay) * dailyWage;
}

function renderCalendar() {
    console.log('Rendering calendar...');
    
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonth = document.getElementById('calendar-month');
    
    if (!calendarGrid || !calendarMonth) {
        console.error('Calendar elements not found');
        return;
    }
    
    const year = appState.calendar.currentYear;
    const month = appState.calendar.currentMonth;
    
    // Update month header with localized month names
    const monthNames = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'zh-TW': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };
    
    const currentMonthNames = monthNames[appState.settings.language] || monthNames.en;
    calendarMonth.textContent = `${currentMonthNames[month]} ${year}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers with localization
    const dayHeaders = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        'zh-TW': ['日', '一', '二', '三', '四', '五', '六'],
        de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        ja: ['日', '月', '火', '水', '木', '金', '土']
    };
    
    const currentDayHeaders = dayHeaders[appState.settings.language] || dayHeaders.en;
    currentDayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day calendar-day--header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day calendar-day--other-month';
        calendarGrid.appendChild(dayElement);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dateKey = `${year}-${month}-${day}`;
        const isToday = today.getFullYear() === year && 
                       today.getMonth() === month && 
                       today.getDate() === day;
        const isWorked = appState.calendar.workedDays.has(dateKey);
        
        if (isToday) {
            dayElement.classList.add('calendar-day--today');
        }
        
        if (isWorked) {
            dayElement.classList.add('calendar-day--worked');
        }
        
        dayElement.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleWorkDay(dateKey, dayElement);
        });
        
        calendarGrid.appendChild(dayElement);
    }
    
    updateCalendarSummary();
    console.log('Calendar rendered successfully');
}

function toggleWorkDay(dateKey, dayElement) {
    console.log('Toggling work day:', dateKey);
    
    if (appState.calendar.workedDays.has(dateKey)) {
        appState.calendar.workedDays.delete(dateKey);
        dayElement.classList.remove('calendar-day--worked');
        appState.achievements.totalDaysWorked = Math.max(0, appState.achievements.totalDaysWorked - 1);
    } else {
        appState.calendar.workedDays.add(dateKey);
        dayElement.classList.add('calendar-day--worked');
        appState.achievements.totalDaysWorked++;
    }
    
    updateCalendarSummary();
    updateEarnings();
    checkAchievements();
    
    // Provide haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

function updateCalendarSummary() {
    const workedDays = Array.from(appState.calendar.workedDays)
        .filter(dateKey => {
            const [year, month] = dateKey.split('-').map(Number);
            return year === appState.calendar.currentYear && month === appState.calendar.currentMonth;
        }).length;
    
    const projectedEarnings = workedDays * (appState.settings.monthlySalary / appState.settings.workingDays);
    
    const daysWorkedElem = document.getElementById('days-worked');
    const monthlyTargetElem = document.getElementById('monthly-target');
    const projectedEarningsElem = document.getElementById('projected-earnings');
    
    if (daysWorkedElem) daysWorkedElem.textContent = workedDays;
    if (monthlyTargetElem) monthlyTargetElem.textContent = appState.settings.workingDays;
    if (projectedEarningsElem) projectedEarningsElem.textContent = formatCurrency(projectedEarnings);
}

function navigateMonth(direction) {
    console.log('Navigating month:', direction);
    appState.calendar.currentMonth += direction;
    
    if (appState.calendar.currentMonth > 11) {
        appState.calendar.currentMonth = 0;
        appState.calendar.currentYear++;
    } else if (appState.calendar.currentMonth < 0) {
        appState.calendar.currentMonth = 11;
        appState.calendar.currentYear--;
    }
    
    renderCalendar();
}

function renderAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    const totalAchievements = document.getElementById('total-achievements');
    const streakCount = document.getElementById('streak-count');
    
    if (!achievementsGrid) return;
    
    const t = translations[appState.settings.language] || translations.en;
    
    achievementsGrid.innerHTML = '';
    let unlockedCount = 0;
    
    Object.entries(achievementDefinitions).forEach(([key, achievement]) => {
        const isUnlocked = appState.achievements.unlocked.has(key);
        if (isUnlocked) unlockedCount++;
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement-card ${isUnlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}`;
        
        const achievementData = t.achievements[key] || { name: achievement.id, description: 'Achievement' };
        
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievementData.name}</div>
            <div class="achievement-description">${achievementData.description}</div>
            ${isUnlocked ? '<div class="achievement-date">Unlocked!</div>' : ''}
        `;
        
        achievementsGrid.appendChild(achievementElement);
    });
    
    if (totalAchievements) totalAchievements.textContent = unlockedCount;
    if (streakCount) streakCount.textContent = appState.achievements.streak;
}

function checkAchievements() {
    const newAchievements = [];
    
    // Check First Day achievement
    if (appState.achievements.totalDaysWorked >= 1 && !appState.achievements.unlocked.has('firstDay')) {
        appState.achievements.unlocked.add('firstDay');
        newAchievements.push('firstDay');
    }
    
    // Check Week Warrior achievement (5 days worked)
    if (appState.achievements.totalDaysWorked >= 5 && !appState.achievements.unlocked.has('weekWarrior')) {
        appState.achievements.unlocked.add('weekWarrior');
        newAchievements.push('weekWarrior');
    }
    
    // Check Month Master achievement (22+ days worked)
    if (appState.achievements.totalDaysWorked >= 22 && !appState.achievements.unlocked.has('monthMaster')) {
        appState.achievements.unlocked.add('monthMaster');
        newAchievements.push('monthMaster');
    }
    
    // Check Early Bird achievement (work starts before 8 AM)
    const now = new Date();
    const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
    const schedule = appState.settings.schedule[today];
    
    if (schedule.start) {
        const startTimeSeconds = parseTimeToSeconds(schedule.start);
        if (startTimeSeconds < 8 * 3600 && !appState.achievements.unlocked.has('earlyBird')) {
            appState.achievements.unlocked.add('earlyBird');
            newAchievements.push('earlyBird');
        }
        
        const endTimeSeconds = parseTimeToSeconds(schedule.end);
        if (endTimeSeconds > 20 * 3600 && !appState.achievements.unlocked.has('nightOwl')) {
            appState.achievements.unlocked.add('nightOwl');
            newAchievements.push('nightOwl');
        }
    }
    
    // Show notifications for new achievements
    newAchievements.forEach(achievementId => {
        showAchievementNotification(achievementId);
    });
    
    if (newAchievements.length > 0) {
        renderAchievements();
    }
}

function showAchievementNotification(achievementId) {
    const t = translations[appState.settings.language] || translations.en;
    const achievement = achievementDefinitions[achievementId];
    const achievementData = t.achievements[achievementId];
    
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`🎉 Achievement Unlocked!`, {
            body: `${achievement.icon} ${achievementData.name}: ${achievementData.description}`,
            icon: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0iIzMxM3ExMzMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNi41MiIgeT0iNi44NiIgd2lkdGg9IjE5LjUiIGhlaWdodD0iMTkuNiIgZmlsbD0iIzFGQjhDRCIgcng9IjIuNSIvPjx3b3JkcyBmaWxsPSIjZmZmIiBmb250LWFzbmxleT0iTXluIGduZmdpLyBHZWlzdF9zYW5zLXNlcmlmIiBweD0iMiIgcHk9IjEiPkJlbGFwPC90ZXh0Pjwvc3ZnPg=='
        });
    }
    
    // Provide haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
    }
}

function formatCurrency(amount) {
    const currency = currencies[appState.settings.currency];
    const symbol = currency ? currency.symbol : '$';
    
    // Format based on currency
    if (appState.settings.currency === 'JPY') {
        return `${symbol}${Math.round(amount)}`;
    } else {
        return `${symbol}${amount.toFixed(2)}`;
    }
}
