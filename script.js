const database = {
    players: [
        { name: "Pele", clubs: ["Santos", "New York Cosmos"] },
        { name: "Diego Maradona", clubs: ["Boca Juniors", "Barcelona", "Napoli", "Sevilla"] },
        { name: "Cristiano Ronaldo", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"] },
        { name: "Lionel Messi", clubs: ["Barcelona", "PSG", "Inter Miami"] },
        { name: "Neymar Jr", clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"] },
        { name: "Kylian Mbappe", clubs: ["Monaco", "PSG", "Real Madrid"] },
        { name: "Erling Haaland", clubs: ["Borussia Dortmund", "Manchester City"] },
        { name: "Harry Kane", clubs: ["Tottenham", "Bayern Munich"] }
    ]
};

// IMPROVED CONFIG: Using multiple Google STUN servers for better "drilling" through firewalls
const peerConfig = {
    secure: true,
    debug: 3,
    config: {
        'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' }
        ],
        'iceCandidatePoolSize': 10
    }
};

const game = {
    mode: 'local', target: "Cristiano Ronaldo", usedItems: [], lastUsed: "", 
    timer: null, timeLeft: 20, players: [], turnIndex: 0, isMyTurn: true,

    initGameState() {
        this.turnIndex = 0;
        this.target = "Cristiano Ronaldo";
        this.usedItems = [this.simplify(this.target)];
        this.lastUsed = this.simplify(this.target);
        ui.showScreen('screen-game');
        ui.clearLog();
        ui.addLog("SYSTEM", "MATCH STARTED!", "#76c74d");
        this.updateTurnUI();
        this.startTimer(); 
    },

    simplify(str) { return str.toLowerCase().replace(/[\s\.\-]/g, ""); },

    updateTurnUI() {
        const status = document.getElementById('turn-status');
        const currentPlayer = this.players[this.turnIndex] || "Player";
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
        let foundName = null;
        for (const p of database.players) {
            if (cleanRaw === this.simplify(p.name)) { foundName = p.name; break; }
            for (const c of p.clubs) { if (cleanRaw === this.simplify(c)) { foundName = c; break; } }
        }

        if (foundName && !this.usedItems.includes(this.simplify(foundName))) {
            this.processMove(this.players[this.turnIndex], foundName);
            if (this.mode === 'online') online.sendData({ type: 'MOVE', user: online.myName, move: foundName });
        } else {
            ui.addLog("SYSTEM", "WRONG PLAYER OR CLUB", "#ff4d4d");
        }
        input.value = "";
    },

    processMove(user, move) {
        ui.addLog(user, move.toUpperCase());
        this.target = move;
        this.lastUsed = this.simplify(move);
        this.usedItems.push(this.simplify(move));
        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        this.updateTurnUI();
        this.timeLeft = 20; 
    },

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.timeLeft = 20;
        this.timer = setInterval(() => {
            this.timeLeft--;
            const status = document.getElementById('turn-status');
            if (status) status.innerText = `${this.timeLeft}s | ${this.players[this.turnIndex].toUpperCase()}`;
            if (this.timeLeft <= 0) {
                ui.addLog("SYSTEM", "TIME OUT!", "#ff4d4d");
                this.turnIndex = (this.turnIndex + 1) % this.players.length;
                this.updateTurnUI();
                this.timeLeft = 20;
            }
        }, 1000);
    }
};

const online = {
    peer: null, conn: null, connections: [], isHost: false, myName: "",

    createRoom() {
        this.cleanup();
        this.myName = document.querySelector('.party-name').value || "Host";
        ui.addLog("SYSTEM", "CREATING ROOM...", "#f5c518");
        this.peer = new Peer(peerConfig);
        this.isHost = true;
        game.players = [this.myName];

        this.peer.on('open', id => {
            document.getElementById('room-display').innerText = "ID: " + id;
            document.getElementById('start-online-btn').style.display = "block";
            ui.addLog("SYSTEM", "ROOM READY!", "#76c74d");
        });

        this.peer.on('connection', c => {
            this.connections.push(c);
            this.setupConn(c);
        });

        this.peer.on('error', err => {
            ui.addLog("ERROR", err.type, "#ff4d4d");
        });
    },

    joinRoom() {
        const id = document.getElementById('join-id').value.trim().toLowerCase();
        if(!id) return alert("Type Room ID");
        this.cleanup();
        this.myName = document.querySelector('.party-name').value || "Guest";
        ui.addLog("SYSTEM", "JOINING...", "#f5c518");
        
        this.peer = new Peer(peerConfig);
        this.peer.on('open', () => {
            this.conn = this.peer.connect(id, { reliable: true });
            this.setupConn(this.conn);
        });

        this.peer.on('error', err => {
            ui.addLog("ERROR", "JOIN FAILED: " + err.type, "#ff4d4d");
        });
    },

    setupConn(c) {
        c.on('open', () => {
            ui.addLog("SYSTEM", "CONNECTED!", "#76c74d");
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
            if (data.type === 'MOVE') game.processMove(data.user, data.move);
        });
    },

    cleanup() { if (this.peer) this.peer.destroy(); },
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
            feed.insertAdjacentHTML('beforeend', `<div style="color:${color}; margin-bottom:5px;"><b>${user}:</b> ${msg}</div>`);
            feed.scrollTop = feed.scrollHeight;
        }
    }
};

window.onload = () => {
    // Map buttons to functions manually
    document.getElementById('create-room-btn').onclick = () => online.createRoom();
    document.getElementById('join-room-btn').onclick = () => online.joinRoom();
    document.getElementById('start-online-btn').onclick = () => online.broadcastStart();
    document.getElementById('submit-move-btn').onclick = () => game.handleInput();
};
