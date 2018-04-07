function getDefaultData() {
    return {
        playing_as: {
            player1: false,
            player2: false,
            robot: false
        },
        winner: "",
        choosingPlayersScreen: true,
        choosingX_or_OScreen: false,
        players: {
            player1_playing_with: "",
            player2_playing_with: "",
            robot_playing_with: ""
        },
        game_turn: {
            player1: false,
            player2: false,
            robot: false
        },
        game: [
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B1"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B2"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B3"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B4"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B5"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B6"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B7"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B8"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B9"
            }
        ]
    }
}
let app = new Vue({
    el: '#game',
    data: {
        playing_as: {
            player1: false,
            player2: false,
            robot: false
        },
        winner: "",
        choosingPlayersScreen: true,
        choosingX_or_OScreen: false,
        players: {
            player1_playing_with: "",
            player2_playing_with: "",
            robot_playing_with: ""
        },
        game_turn: {
            player1: false,
            player2: false,
            robot: false
        },
        game: [
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B1"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B2"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B3"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B4"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B5"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B6"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B7"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B8"
            },
            {
                occupied_with: "",
                occupied_by: "", // player 1, player 2 or robot
                name: "B9"
            }
        ]
    },
    methods: {
        newGame() {
            this.$data = getDefaultData()
        },
        // CHOOSING HOW MANY PLAYERS SCREEEN
        turnOffPlayersScreen() {
            //turning off choosing players screen
            this.choosingPlayersScreen = false
            // turn on choosingX_orO screen for player1
            this.choosingX_or_OScreen = true
        },
        turnOffX_or_OScreen() {
            this.choosingX_or_OScreen = false
        },
        chooseOnePlayer() {
            this.playing_as.player1 = true
            this.playing_as.robot = true
            this.game_turn.player1 = true
            this.turnOffPlayersScreen()
        },
        chooseTwoPlayers() {
            this.playing_as.player1 = true
            this.playing_as.player2 = true
            this.turnOffPlayersScreen()
        },
        //==================================
        // CHOOSE X or O
        chooseX() {
            if (!this.playing_as.robot) {
                this.players.player1_playing_with = "X"
                this.players.player2_playing_with = "O"
            }
            if (this.playing_as.robot) {
                this.players.player1_playing_with = "X"
                this.players.robot_playing_with = "O"
            }
            this.turnOffX_or_OScreen()
        },
        chooseO() {
            if (!this.playing_as.robot) {
                this.players.player1_playing_with = "O"
                this.players.player2_playing_with = "X"
            }
            if (this.playing_as.robot) {
                this.players.player1_playing_with = "O"
                this.players.robot_playing_with = "X"
            }
            this.turnOffX_or_OScreen()
        },
        // ==== FILL A BLOCK ======
        fillBlock(block) {
            if (this.game_turn.player1) {
                block.occupied_with = this.players.player1_playing_with
                block.occupied_by = "player1"
                //console.log("filled by player 1")
            }

            if (this.game_turn.player2) {
                block.occupied_with = this.players.player2_playing_with
                block.occupied_by = "player2"
            }

            if (this.game_turn.robot) {
                block.occupied_with = this.players.robot_playing_with
                block.occupied_by = "robot"
                //console.log("filled by robot")
            }
        },
        // TURN
        turn(block) {
            if (!this.checkWinningCombos()) {
                if (!block.occupied_by) { // if the block is empty
                    if (this.playing_as.player1 && this.playing_as.robot) {
                        if (this.game_turn.player1) {
                            this.fillBlock(block)
                            this.game_turn.player1 = false
                            this.game_turn.robot = true
                            this.checkWinningCombos()
                            return
                        }
        
                        if (this.game_turn.robot) {
                            this.fillBlock(block)
                            this.game_turn.player1 = true
                            this.game_turn.robot = false
                            this.checkWinningCombos()
                            return
                        }
                    }
                }
            }
        },
        checkWinningCombos() {
            let whoWon = ""
            let winningMatrice = [
                ["B1","B2","B3"],

                ["B4","B5","B6"],

                ["B7","B8","B9"],

                ["B1","B2","B3"],

                ["B1","B5","B9"],

                ["B1","B4","B7"],

                ["B2","B5","B8"],

                ["B3","B5","B7"],

                ["B3","B6","B9"]
            ]
            /*
                winning combos

                b1 b2 b3 || b4 b5 b6 || b7 b8 b9

                b1 b2 b3 || b1 b5 b9 || b1 b4 b7

                b2 b5 b8 || b3 b5 b7 || b3 b6 b9

            */
            let blocksOccupiedByPlayer1 = []
            let blocksOccupiedByRobot = []

            this.game.forEach((block, index) => {
                if (block.occupied_by === "player1") {
                    blocksOccupiedByPlayer1.push(block.name)
                }

                if (block.occupied_by === "robot") {
                    blocksOccupiedByRobot.push(block.name)
                }
            })

            function checkWin(playerBlocks, playerName) {
                winningMatrice.forEach(block => {
                    // console.log(block)
                    // thanks to lodash <3
                    let found = _.intersection(block, playerBlocks)
                    
                    if (found.toString() === block.toString()) {
                        whoWon = `${playerName} won`
                    }
                })
            }

            checkWin(blocksOccupiedByPlayer1, "Player 1")
            checkWin(blocksOccupiedByRobot, "Robot")

            if (whoWon) {
                this.winner = whoWon
                return whoWon
            }
        }
    }
})