const database = {
    players: [
        // --- THE GOATS & RETIRED LEGENDS ---
        { name: "Pele", clubs: ["Santos", "New York Cosmos"] },
        { name: "Diego Maradona", clubs: ["Argentinos Juniors", "Boca Juniors", "Barcelona", "Napoli", "Sevilla", "Newell's Old Boys"] },
        { name: "Johan Cruyff", clubs: ["Ajax", "Barcelona", "Los Angeles Aztecs", "Washington Diplomats", "Levante", "Feyenoord"] },
        { name: "Zinedine Zidane", clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"] },
        { name: "Ronaldo Nazario", clubs: ["Cruzeiro", "PSV Eindhoven", "Barcelona", "Inter Milan", "Real Madrid", "AC Milan", "Corinthians"] },
        { name: "Ronaldinho", clubs: ["Gremio", "PSG", "Barcelona", "AC Milan", "Flamengo", "Atletico Mineiro", "Queretaro", "Fluminense"] },
        { name: "Kaka", clubs: ["Sao Paulo", "AC Milan", "Real Madrid", "Orlando City"] },
        { name: "Thierry Henry", clubs: ["Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls"] },
        { name: "David Beckham", clubs: ["Manchester United", "Preston North End", "Real Madrid", "LA Galaxy", "AC Milan", "PSG"] },
        { name: "Zlatan Ibrahimovic", clubs: ["Malmo", "Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "PSG", "Manchester United", "LA Galaxy"] },

        // --- SAUDI PRO LEAGUE (SAUDI ARABIA) ---
        { name: "Cristiano Ronaldo", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"] },
        { name: "Neymar Jr", clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"] },
        { name: "Karim Benzema", clubs: ["Lyon", "Real Madrid", "Al Ittihad"] },
        { name: "Sadio Mane", clubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"] },
        { name: "N'Golo Kante", clubs: ["Boulogne", "Caen", "Leicester City", "Chelsea", "Al Ittihad"] },
        { name: "Riyad Mahrez", clubs: ["Le Havre", "Leicester City", "Manchester City", "Al Ahli"] },
        { name: "Ivan Rakitic", clubs: ["Basel", "Schalke 04", "Sevilla", "Barcelona", "Al Shabab"] },

        // --- MLS (USA) ---
        { name: "Lionel Messi", clubs: ["Barcelona", "PSG", "Inter Miami"] },
        { name: "Luis Suarez", clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atletico Madrid", "Gremio", "Inter Miami"] },
        { name: "Sergio Busquets", clubs: ["Barcelona", "Inter Miami"] },
        { name: "Jordi Alba", clubs: ["Valencia", "Gimnastic", "Barcelona", "Inter Miami"] },
        { name: "Olivier Giroud", clubs: ["Grenoble", "Istres", "Tours", "Montpellier", "Arsenal", "Chelsea", "AC Milan", "LAFC"] },
        { name: "Marco Reus", clubs: ["Rot Weiss Ahlen", "Monchengladbach", "Borussia Dortmund", "LA Galaxy"] },

        // --- ISL (INDIA) ---
        { name: "Sunil Chhetri", clubs: ["Mohun Bagan", "JCT", "East Bengal", "Kansas City Wizards", "Sporting CP B", "Bengaluru FC", "Mumbai City"] },
        { name: "Jason Cummings", clubs: ["Hibernian", "Nottingham Forest", "Luton Town", "Peterborough United", "Shrewsbury Town", "Dundee", "Central Coast Mariners", "Mohun Bagan"] },
        { name: "Adrian Luna", clubs: ["Defensor Sporting", "Espanyol", "Gimnastic", "Sabadell", "Veracruz", "Venados", "Melbourne City", "Kerala Blasters"] },
        { name: "Roy Krishna", clubs: ["Waitakere United", "Auckland City", "Wellington Phoenix", "ATK", "Bengaluru FC", "Odisha FC"] },

        // --- K-LEAGUE (SOUTH KOREA) ---
        { name: "Jesse Lingard", clubs: ["Manchester United", "Leicester City", "Birmingham City", "Brighton", "Derby County", "West Ham", "Nottingham Forest", "FC Seoul"] },
        { name: "Son Heung-min", clubs: ["Hamburg", "Bayer Leverkusen", "Tottenham"] },
        { name: "Cho Gue-sung", clubs: ["Anyang", "Jeonbuk Hyundai", "Gimcheon Sangmu", "Midtjylland"] },
        { name: "Kim Min-jae", clubs: ["Gyeongju KHNP", "Jeonbuk Hyundai", "Beijing Guoan", "Fenerbahce", "Napoli", "Bayern Munich"] },

        // --- LIGA PORTUGAL & OTHER EUROPE ---
        { name: "Angel Di Maria", clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "PSG", "Juventus"] },
        { name: "Viktor Gyokeres", clubs: ["Brommapojkarna", "Brighton", "St Pauli", "Swansea City", "Coventry City", "Sporting CP"] },
        { name: "Pepe", clubs: ["Maritimo", "Porto", "Real Madrid", "Besiktas"] },
        { name: "Nicolas Otamendi", clubs: ["Velez Sarsfield", "Porto", "Valencia", "Atletico Mineiro", "Manchester City", "Benfica"] },

        // --- THE "JOURNEYMEN" (THE BEST LINKS) ---
        { name: "Nicolas Anelka", clubs: ["PSG", "Arsenal", "Real Madrid", "Liverpool", "Manchester City", "Fenerbahce", "Bolton", "Chelsea", "Shanghai Shenhua", "Juventus", "West Brom", "Mumbai City"] },
        { name: "Samuel Eto'o", clubs: ["Real Madrid", "Leganes", "Mallorca", "Barcelona", "Inter Milan", "Anzhi Makhachkala", "Chelsea", "Everton", "Sampdoria", "Antalyaspor", "Konyaspor", "Qatar SC"] },
        { name: "Mario Balotelli", clubs: ["Lumezzane", "Inter Milan", "Manchester City", "AC Milan", "Liverpool", "Nice", "Marseille", "Brescia", "Monza", "Adana Demirspor", "Sion", "Genoa"] },
        { name: "Peter Crouch", clubs: ["Tottenham", "Dulwich Hamlet", "IFK Hasselholm", "QPR", "Portsmouth", "Aston Villa", "Norwich City", "Southampton", "Liverpool", "Stoke City", "Burnley"] },

        // --- CURRENT SUPERSTARS ---
        { name: "Kylian Mbappe", clubs: ["Monaco", "PSG", "Real Madrid"] },
        { name: "Erling Haaland", clubs: ["Bryne", "Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"] },
        { name: "Harry Kane", clubs: ["Leyton Orient", "Millwall", "Norwich City", "Leicester City", "Tottenham", "Bayern Munich"] },
        { name: "Jude Bellingham", clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"] },
        { name: "Robert Lewandowski", clubs: ["Znicz Pruszkow", "Lech Poznan", "Borussia Dortmund", "Bayern Munich", "Barcelona"] },
        { name: "Kevin De Bruyne", clubs: ["Genk", "Chelsea", "Werder Bremen", "Wolfsburg", "Manchester City"] },
        { name: "Mohamed Salah", clubs: ["Al Mokawloon", "Basel", "Chelsea", "Fiorentina", "Roma", "Liverpool"] },

        // --- THE "ONE CLUB PLAYER" TRAPS ---
        { name: "Bukayo Saka", clubs: ["Arsenal"] },
        { name: "Phil Foden", clubs: ["Manchester City"] },
        { name: "Lamine Yamal", clubs: ["Barcelona"] },
        { name: "Thomas Muller", clubs: ["Bayern Munich"] },
        { name: "Francesco Totti", clubs: ["Roma"] },
        { name: "Florian Wirtz", clubs: ["Bayer Leverkusen"] },
        { name: "Koke", clubs: ["Atletico Madrid"] },
        { name: "Nico Williams", clubs: ["Athletic Bilbao"] }
    ]
};
const game = {
    mode: 'local',
    target: "Cristiano Ronaldo",
    usedItems: [],
    lastUsed: "", 
    timer: null,
    timeLeft: 20,
    players: [], 
    turnIndex: 0,
    isMyTurn: true,

    initGameState() {
        this.turnIndex = 0;
        this.target = "Cristiano Ronaldo";
        this.usedItems = [this.simplify(this.target)];
        this.lastUsed = this.simplify(this.target);
        ui.showScreen('screen-game');
        ui.clearLog();
        ui.addLog("SYSTEM", "MATCH STARTED!", "#ffffff");
        ui.addLog("STARTING PLAYER", this.target.toUpperCase(), "#76c74d");
        this.updateTurnUI();
        this.resetTimer();
    },

    simplify(str) { return str.toLowerCase().replace(/[\s\.\-]/g, ""); },

    updateTurnUI() {
        const status = document.getElementById('turn-status');
        const currentPlayer = this.players[this.turnIndex];
        if (this.mode === 'online') { this.isMyTurn = (currentPlayer === online.myName); } 
        else { this.isMyTurn = true; }
        status.innerText = `${currentPlayer.toUpperCase()}'S TURN`;
        status.style.color = (this.turnIndex % 2 === 0) ? '#76c74d' : '#f5c518';
    },

    handleInput() {
        if (!this.isMyTurn) return;
        const input = document.getElementById('user-input');
        const raw = input.value.trim();
        if (!raw) return;

        const cleanRaw = this.simplify(raw);
        if (cleanRaw === this.lastUsed) {
            alert("No immediate repeats!");
            return;
        }

        let foundName = null;
        for (const p of database.players) {
            if (cleanRaw === this.simplify(p.name)) { foundName = p.name; break; }
            for (const c of p.clubs) { if (cleanRaw === this.simplify(c)) { foundName = c; break; } }
        }

        const clean = this.simplify(foundName || "");
        let linked = false;

        if (foundName && !this.usedItems.includes(clean)) {
            const targetClean = this.simplify(this.target);
            const pMatch = database.players.find(p => this.simplify(p.name) === targetClean);
            if (pMatch && pMatch.clubs.some(c => this.simplify(c) === clean)) linked = true;
            else {
                const pFound = database.players.find(p => this.simplify(p.name) === clean && p.clubs.some(c => this.simplify(c) === targetClean));
                if (pFound) linked = true;
            }
        }

        if (linked) {
            this.processMove(this.players[this.turnIndex], foundName);
            if (this.mode === 'online') online.sendData({ type: 'MOVE', user: online.myName, move: foundName });
        } else {
            this.eliminatePlayer(this.turnIndex, "WRONG ANSWER");
        }
        input.value = "";
    },

    // --- THE NEW LOGIC FOR BUKAYO SAKA / LAMINE YAMAL ---
    handleOneClub() {
        if (!this.isMyTurn) return;
        const targetClean = this.simplify(this.target);
        const pMatch = database.players.find(p => this.simplify(p.name) === targetClean);

        if (pMatch && pMatch.clubs.length === 1) {
            const onlyClub = pMatch.clubs[0];
            ui.addLog(this.players[this.turnIndex], `STAYING ON ${onlyClub.toUpperCase()}!`, "#f5c518");
            
            this.target = onlyClub;
            this.lastUsed = this.simplify(onlyClub);
            this.turnIndex = (this.turnIndex + 1) % this.players.length;
            
            if (this.mode === 'online') online.sendData({ type: 'MOVE', user: online.myName, move: this.target });
            this.updateTurnUI();
            this.resetTimer();
        } else {
            alert("This player has multiple clubs in our database!");
        }
    },

    processMove(user, move) {
        const clean = this.simplify(move);
        ui.addLog(user, move.toUpperCase());
        this.target = move;
        this.lastUsed = clean;
        this.usedItems.push(clean);
        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        this.updateTurnUI();
        if (this.mode === 'ai' && this.turnIndex === 1) setTimeout(() => this.aiMove(), 1500);
        this.resetTimer();
    },

    eliminatePlayer(index, reason) {
        const unlucky = this.players[index];
        ui.addLog("OUT", `${unlucky} ELIMINATED (${reason})`, "#ff4d4d");
        this.players.splice(index, 1);

        if (this.players.length <= 1) {
            const winner = this.players[0] || "GAME OVER";
            this.showVictory(`${winner} WINS!`);
            if (this.mode === 'online') online.sendData({ type: 'WINNER', msg: `${winner} WINS!` });
        } else {
            if (this.turnIndex >= this.players.length) this.turnIndex = 0;
            if (this.mode === 'online') online.sendData({ type: 'SYNC', list: this.players, index: this.turnIndex });
            this.updateTurnUI();
            this.resetTimer();
        }
    },

    aiMove() {
        const targetClean = this.simplify(this.target);
        let options = [];
        const pObj = database.players.find(p => this.simplify(p.name) === targetClean);
        if (pObj) { options = pObj.clubs; } 
        else { options = database.players.filter(p => p.clubs.some(c => this.simplify(c) === targetClean)).map(p => p.name); }
        
        const final = options.filter(o => !this.usedItems.includes(this.simplify(o)) && this.simplify(o) !== this.lastUsed);
        if (final.length > 0) { this.processMove("AI", final[Math.floor(Math.random() * final.length)]); } 
        else { this.eliminatePlayer(1, "AI STUCK"); }
    },

    showVictory(msg) {
        clearInterval(this.timer);
        document.getElementById('winner-name').innerText = msg;
        document.getElementById('vic-msg').innerText = `CHAIN: ${this.usedItems.length}`;
        document.getElementById('victory-screen').style.display = 'flex';
    },

    resetTimer() {
        clearInterval(this.timer);
        this.timeLeft = 20;
        this.timer = setInterval(() => {
            this.timeLeft--;
            const status = document.getElementById('turn-status');
            status.innerText = `${this.timeLeft}s | ${this.players[this.turnIndex].toUpperCase()}`;
            if (this.timeLeft <= 0) this.eliminatePlayer(this.turnIndex, "TIME OUT");
        }, 1000);
    },

    startParty() {
        const inputs = document.querySelectorAll('.party-name');
        this.players = [];
        inputs.forEach(input => { if (input.value.trim()) this.players.push(input.value.trim()); });
        if (this.players.length < 2) return alert("Add players!");
        this.mode = 'party';
        this.initGameState();
    },

    start(mode) {
        if (mode === 'ai') {
            const name = document.querySelector('.party-name').value.trim() || "YOU";
            this.players = [name, "AI"];
            this.mode = 'ai';
            this.initGameState();
        }
    }
};

const online = {
    peer: null, conn: null, connections: [], isHost: false, myName: "",
    createRoom() {
        this.myName = document.querySelector('.party-name').value || "Host";
        this.peer = new Peer();
        this.isHost = true;
        game.players = [this.myName];
        this.peer.on('open', id => {
            document.getElementById('room-display').innerText = "ID: " + id;
            document.getElementById('start-online-btn').style.display = "block";
            document.getElementById('start-local-btn').style.display = "none";
        });
        this.peer.on('connection', c => { this.connections.push(c); this.setupConn(c); });
    },
    joinRoom() {
        const id = document.getElementById('join-id').value;
        this.myName = document.querySelector('.party-name').value || "Player" + Math.floor(Math.random()*99);
        this.peer = new Peer();
        this.peer.on('open', () => { this.conn = this.peer.connect(id); this.setupConn(this.conn); });
    },
    setupConn(c) {
        c.on('open', () => { if (!this.isHost) this.sendData({ type: 'HELLO', name: this.myName }); });
        c.on('data', data => {
            if (data.type === 'HELLO' && this.isHost) {
                game.players.push(data.name);
                this.broadcast({ type: 'LIST', list: game.players });
                ui.updateOnlineList();
            }
            if (data.type === 'LIST') { game.players = data.list; ui.updateOnlineList(); }
            if (data.type === 'START') { game.mode = 'online'; game.initGameState(); }
            if (data.type === 'MOVE') { game.processMove(data.user, data.move); }
            if (data.type === 'SYNC') { game.players = data.list; game.turnIndex = data.index; game.updateTurnUI(); game.resetTimer(); }
            if (data.type === 'WINNER') { game.showVictory(data.msg); }
        });
    },
    sendData(d) { if (this.conn) this.conn.send(d); },
    broadcast(d) { this.connections.forEach(c => c.send(d)); },
    broadcastStart() { this.broadcast({ type: 'START' }); game.mode = 'online'; game.initGameState(); }
};

const ui = {
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },
    addNameField() {
        const container = document.getElementById('party-names-container');
        const input = document.createElement('input');
        input.type = "text";
        input.className = "name-input party-name";
        input.placeholder = "Player " + (container.querySelectorAll('input').length + 1);
        container.appendChild(input);
    },
    updateOnlineList() {
        document.getElementById('party-names-container').innerHTML = `<p style="color:white">Lobby: ${game.players.join(", ")}</p>`;
    },
    clearLog() { document.getElementById('game-feed').innerHTML = ""; },
    addLog(user, msg, color = "white") {
        const feed = document.getElementById('game-feed');
        feed.innerHTML += `<div style="color:${color}; margin-bottom:5px;"><strong>${user}:</strong> ${msg}</div>`;
        feed.scrollTop = feed.scrollHeight;
    }
};

window.onload = () => {
    const list = document.getElementById('player-list');
    let opts = [];
    database.players.forEach(p => { opts.push(p.name); p.clubs.forEach(c => opts.push(c)); });
    [...new Set(opts)].sort().forEach(o => {
        const el = document.createElement('option'); el.value = o; list.appendChild(el);
    });

};





