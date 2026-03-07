const database = {
    players: [
        { name: "Pele", clubs: ["Santos", "New York Cosmos"] },
        { name: "Diego Maradona", clubs: ["Boca Juniors", "Barcelona", "Napoli", "Sevilla", "Newell's Old Boys"] },
        { name: "Johan Cruyff", clubs: ["Ajax", "Barcelona", "Feyenoord"] },
        { name: "Zinedine Zidane", clubs: ["Bordeaux", "Juventus", "Real Madrid"] },
        { name: "Ronaldo Nazario", clubs: ["Cruzeiro", "PSV Eindhoven", "Barcelona", "Inter Milan", "Real Madrid", "AC Milan"] },
        { name: "Cristiano Ronaldo", clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"] },
        { name: "Lionel Messi", clubs: ["Barcelona", "PSG", "Inter Miami"] },
        { name: "Thierry Henry", clubs: ["Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls"] },
        { name: "Kevin De Bruyne", clubs: ["Chelsea", "Wolfsburg", "Manchester City"] },
        { name: "Mohamed Salah", clubs: ["Chelsea", "Fiorentina", "Roma", "Liverpool"] },
        { name: "Erling Haaland", clubs: ["Red Bull Salzburg", "Borussia Dortmund", "Manchester City"] },
        { name: "Vinicius Jr", clubs: ["Flamengo", "Real Madrid"] },
        { name: "Jude Bellingham", clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"] },
        { name: "Kylian Mbappe", clubs: ["Monaco", "PSG", "Real Madrid"] },
        { name: "Harry Kane", clubs: ["Tottenham", "Bayern Munich"] },
        { name: "Neymar Jr", clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"] },
        { name: "Luis Suarez", clubs: ["Ajax", "Liverpool", "Barcelona", "Atletico Madrid", "Inter Miami"] },
        { name: "Robert Lewandowski", clubs: ["Borussia Dortmund", "Bayern Munich", "Barcelona"] },
        { name: "Bukayo Saka", clubs: ["Arsenal"] },
        { name: "Phil Foden", clubs: ["Manchester City"] },
        { name: "Cole Palmer", clubs: ["Manchester City", "Chelsea"] },
        { name: "Luka Modric", clubs: ["Tottenham", "Real Madrid"] }
    ]
};

const game = {
    mode: 'local', 
    target: "Cristiano Ronaldo", 
    usedItems: [], 
    players: [], 
    turnIndex: 0, 
    timeLeft: 20, 
    timer: null,

    startLocal() {
        const inputs = document.querySelectorAll('.local-name');
        this.players = Array.from(inputs).map(i => i.value.trim()).filter(v => v !== "");
        if (this.players.length < 1) this.players = ["Player 1"];
        this.mode = 'local';
        this.init();
    },

    init() {
        this.usedItems = [this.simplify(this.target)];
        ui.showScreen('screen-game');
        ui.addLog("SYSTEM", `START WITH: ${this.target.toUpperCase()}`, "#f5c518");
        this.startTimer();
        this.updateUI();
    },

    simplify: (str) => str.toLowerCase().replace(/[^a-z0-9]/g, ""),

    handleInput() {
        const input = document.getElementById('user-input');
        const val = input.value.trim();
        if (!val) return;

        const cleanInput = this.simplify(val);
        if (this.usedItems.includes(cleanInput)) return alert("Already used!");

        // Logic: Is it a player in the target club, or a club the target player played for?
        let isValid = false;
        const targetClean = this.simplify(this.target);

        // Check if input is a CLUB of the current target PLAYER
        const currentPlayer = database.players.find(p => this.simplify(p.name) === targetClean);
        if (currentPlayer && currentPlayer.clubs.some(c => this.simplify(c) === cleanInput)) {
            isValid = true;
        } 
        // Check if input is a PLAYER who played for the current target CLUB
        else {
            const inputPlayer = database.players.find(p => this.simplify(p.name) === cleanInput);
            if (inputPlayer && inputPlayer.clubs.some(c => this.simplify(c) === targetClean)) {
                isValid = true;
            }
        }

        if (isValid) {
            if (this.mode === 'online') {
                online.sendData({ type: 'MOVE', move: val, user: online.myName });
            } else {
                this.processMove(this.players[this.turnIndex], val);
            }
        } else {
            this.eliminate();
        }
        input.value = "";
    },

    processMove(user, move) {
        ui.addLog(user, move.toUpperCase());
        this.target = move;
        this.usedItems.push(this.simplify(move));
        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        this.timeLeft = 20;
        this.updateUI();
    },

    eliminate() {
        ui.addLog("OUT", this.players[this.turnIndex], "#ff4d4d");
        this.players.splice(this.turnIndex, 1);
        if (this.players.length <= 1) {
            this.endGame(this.players[0] || "No one");
        } else {
            if (this.turnIndex >= this.players.length) this.turnIndex = 0;
            this.timeLeft = 20;
            this.updateUI();
        }
    },

    updateUI() {
        const status = document.getElementById('turn-status');
        status.innerText = `${this.players[this.turnIndex]}'S TURN`;
    },

    startTimer() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) this.eliminate();
        }, 1000);
    },

    endGame(winner) {
        clearInterval(this.timer);
        document.getElementById('winner-name').innerText = winner + " WINS!";
        document.getElementById('victory-screen').style.display = 'flex';
    }
};

const online = {
    peer: null, conn: null, connections: [], myName: "", isHost: false,
    
    createRoom() {
        this.myName = document.getElementById('my-nickname').value || "Host";
        const randomId = Math.floor(1000 + Math.random() * 9000).toString();
        this.peer = new Peer(randomId);
        this.isHost = true;
        game.players = [this.myName];
        
        this.peer.on('open', id => {
            document.getElementById('room-display').innerText = "ROOM ID: " + id;
            document.getElementById('start-online-btn').style.display = "block";
        });
        this.peer.on('connection', c => {
            this.connections.push(c);
            this.setupListeners(c);
        });
    },

    joinRoom() {
        const id = document.getElementById('join-id').value;
        this.myName = document.getElementById('my-nickname').value || "Guest";
        this.peer = new Peer();
        this.peer.on('open', () => {
            this.conn = this.peer.connect(id);
            this.setupListeners(this.conn);
        });
    },

    setupListeners(c) {
        c.on('open', () => {
            if (!this.isHost) this.sendData({ type: 'JOIN', name: this.myName });
        });
        c.on('data', data => {
            if (data.type === 'JOIN' && this.isHost) {
                game.players.push(data.name);
                this.broadcast({ type: 'LOBBY', list: game.players });
            }
            if (data.type === 'LOBBY') {
                document.getElementById('lobby-list').innerText = "Players: " + data.list.join(", ");
                game.players = data.list;
            }
            if (data.type === 'START') { game.mode = 'online'; game.init(); }
            if (data.type === 'MOVE') game.processMove(data.user, data.move);
        });
    },

    sendData(d) { if (this.conn) this.conn.send(d); },
    broadcast(d) { this.connections.forEach(c => c.send(d)); },
    broadcastStart() { this.broadcast({ type: 'START' }); game.mode = 'online'; game.init(); }
};

const ui = {
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },
    addNameField() {
        const input = document.createElement('input');
        input.className = "name-input local-name";
        input.placeholder = "Next Player";
        document.getElementById('local-names-container').appendChild(input);
    },
    addLog(user, msg, color = "white") {
        const feed = document.getElementById('game-feed');
        feed.innerHTML += `<div style="color:${color}"><b>${user}:</b> ${msg}</div>`;
        feed.scrollTop = feed.scrollHeight;
    }
};

// Enter key support
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('screen-game').classList.contains('active')) {
        game.handleInput();
    }
});
