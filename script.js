const database = {
    players: [
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
        { name: "Cristiano Ronaldo", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"] },
        { name: "Neymar Jr", clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"] },
        { name: "Lionel Messi", clubs: ["Barcelona", "PSG", "Inter Miami"] },
        { name: "Kylian Mbappe", clubs: ["Monaco", "PSG", "Real Madrid"] },
        { name: "Erling Haaland", clubs: ["Bryne", "Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"] },
        { name: "Harry Kane", clubs: ["Leyton Orient", "Millwall", "Norwich City", "Leicester City", "Tottenham", "Bayern Munich"] },
        { name: "Jude Bellingham", clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"] },
        { name: "Bukayo Saka", clubs: ["Arsenal"] },
        { name: "Phil Foden", clubs: ["Manchester City"] },
        { name: "Lamine Yamal", clubs: ["Barcelona"] },
        { name: "Thomas Muller", clubs: ["Bayern Munich"] }
    ]
};

const peerConfig = {
    config: {
        'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    },
    debug: 3 // This will show errors in the browser console
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
        this.isMyTurn = (this.mode === 'online') ? (currentPlayer === online.myName) : true;
        if (status) {
            status.innerText = `${currentPlayer.toUpperCase()}'S TURN`;
            status.style.color = (this.turnIndex % 2 === 0) ? '#76c74d' : '#f5c518';
        }
    },

    handleInput() {
        if (!this.isMyTurn) return;
        const input = document.getElementById('user-input');
        const raw = input.value.trim();
        if (!raw) return;

        const cleanRaw = this.simplify(raw);
        if (cleanRaw === this.lastUsed) return alert("No repeats!");

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
        } else { alert("Not a One-Club Man!"); }
    },

    processMove(user, move) {
        const clean = this.simplify(move);
        ui.addLog(user, move.toUpperCase());
        this.target = move;
        this.lastUsed = clean;
        this.usedItems.push(clean);
        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        this.updateTurnUI();
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

    showVictory(msg) {
        clearInterval(this.timer);
        const vName = document.getElementById('winner-name');
        if (vName) vName.innerText = msg;
        document.getElementById('victory-screen').style.display = 'flex';
    },

    resetTimer() {
        clearInterval(this.timer);
        this.timeLeft = 20;
        this.timer = setInterval(() => {
            this.timeLeft--;
            const status = document.getElementById('turn-status');
            if (status) status.innerText = `${this.timeLeft}s | ${this.players[this.turnIndex].toUpperCase()}`;
            if (this.timeLeft <= 0) this.eliminatePlayer(this.turnIndex, "TIME OUT");
        }, 1000);
    }
};

const online = {
    peer: null, conn: null, connections: [], isHost: false, myName: "",

    createRoom() {
        this.cleanup();
        this.myName = document.querySelector('.party-name').value || "Host";
        this.peer = new Peer(peerConfig);
        this.isHost = true;
        game.players = [this.myName];
        this.peer.on('open', id => {
            document.getElementById('room-display').innerText = "ROOM ID: " + id;
            document.getElementById('start-online-btn').style.display = "block";
        });
        this.peer.on('connection', c => {
            this.connections.push(c);
            this.setupConn(c);
        });
    },

    joinRoom() {
        const id = document.getElementById('join-id').value.trim().toLowerCase();
        if (!id) return alert("Enter Room ID!");
        this.cleanup();
        this.myName = document.querySelector('.party-name').value || "Guest";
        this.peer = new Peer(peerConfig);
        this.peer.on('open', () => {
            this.conn = this.peer.connect(id, { reliable: true });
            this.setupConn(this.conn);
        });
        this.peer.on('error', (err) => {
            console.error(err);
            alert("Join failed. Error type: " + err.type);
        });
    },

    setupConn(c) {
        c.on('open', () => {
            console.log("Connection Established!");
            if (!this.isHost) this.sendData({ type: 'HELLO', name: this.myName });
        });
        c.on('data', data => {
            if (data.type === 'HELLO' && this.isHost) {
                if (!game.players.includes(data.name)) game.players.push(data.name);
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

    cleanup() {
        if (this.peer) {
            this.peer.destroy();
            this.peer = null;
        }
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
    updateOnlineList() {
        const container = document.getElementById('party-names-container');
        if (container) container.innerHTML = `<p style="color:white">Lobby: ${game.players.join(", ")}</p>`;
    },
    clearLog() { document.getElementById('game-feed').innerHTML = ""; },
    addLog(user, msg, color = "white") {
        const feed = document.getElementById('game-feed');
        if (feed) {
            feed.innerHTML += `<div style="color:${color}; margin-bottom:5px;"><strong>${user}:</strong> ${msg}</div>`;
            feed.scrollTop = feed.scrollHeight;
        }
    }
};

window.onload = () => {
    const list = document.getElementById('player-list');
    if (list) {
        let opts = [];
        database.players.forEach(p => { opts.push(p.name); p.clubs.forEach(c => opts.push(c)); });
        [...new Set(opts)].sort().forEach(o => {
            const el = document.createElement('option'); el.value = o; list.appendChild(el);
        });
    }
};
