new Vue({
    el: '#app',
    data: {
        running: false,
        vida1: 100,
        vida2: 100,
        vitorias: 0,
        derrotas: 0,
        dice: 0,
        msg: '',
        res: '',
        mostrar: 'none',
        derrotado: false,
        log: [],
        cooldown1: 0,
        cooldown2: 0,
        op: false,
        altlog: false
    },
    methods: {
        random(min, max) {
            min = Math.ceil(min)
            max = Math.ceil(max)
            return Math.floor(Math.random() * (max - min)) + min
        },
        check() {
            if (this.vida2 <= 0) {
                this.vida2 = 0
                this.msg = 'Você venceu! :D'
                this.running = false
                this.res = true
                this.mostrar = 'block'
                this.derrotado = true
                this.vitorias++
            }
            if (this.vida1 <= 0) {
                this.vida1 = 0
                this.msg = 'Você perdeu! D:'
                this.res = false
                this.mostrar = 'block'
                this.running = false
                this.derrotas++
            }
        },
        start() {
            this.running = true
            this.vida1 = 100
            this.msg = ''
            this.mostrar = 'none'
            this.vida2 = 100
            this.derrotado = false
            this.log = []
            this.cooldown1 = 0
            this.cooldown2 = 0
        },
        attack() {
            //ataque jogador

            this.dice = this.random(7, 11)
            this.vida2 -= this.dice
            this.log.push(`O Jogador atacou causando ${this.dice} de dano!`)
            this.check()
            if (!this.derrotado) {
                this.dice = this.random(10, 15)
                this.vida1 -= this.dice
                this.log.push(`O Monstro atacou causando ${this.dice} de dano!`)
                this.check()
            }
            this.cooldown1--
            this.cooldown2--
        },
        attackespec() {
            //ataque jogador
            if (this.cooldown1 <= 0) {
                this.dice = this.random(13, 16)
                this.vida2 -= this.dice
                this.log.push(`O Jogador atacou causando ${this.dice} de dano!`)
                this.check()
                this.cooldown1 = 3
                this.cooldown2--
                if (!this.derrotado) {
                    this.dice = this.random(9, 15)
                    this.vida1 -= this.dice
                    this.log.push(`O Monstro atacou causando ${this.dice} de dano!`)
                    this.check()

                }
            } else {
                new quickal({
                    title: "Habilidade em cooldown",
                    message: `${this.cooldown1} Rodadas até ser utilizavel.`})
            }
        },

        heal() {
            if (this.cooldown2 <= 0) {
                if (this.vida1 >= 100) {
                    this.dice = 0
                } else {
                    this.dice = this.random(15, 18)
                    this.vida1 += this.dice
                    if (this.vida1 >= 100) {
                        this.vida1 = 100
                    }
                }
                this.log.push(`O Jogador se curou recuperando ${this.dice} de vida!`)
                this.dice = this.random(9, 15)
                this.vida1 -= this.dice
                this.log.push(`O Monstro atacou causando ${this.dice} de dano!`)
                this.check()
                this.cooldown1--
                this.cooldown2 = 2
            } else {
                new quickal({
                    title: "Habilidade em cooldown",
                    message: `${this.cooldown2} Rodadas até ser utilizavel.`
                })
            }
        }


    }
})

function autoscroll() {
    setTimeout(() => {
        var el = document.querySelector('#log')
        el.scrollTop = el.scrollHeight
        var el = document.querySelector('#log2')
        el.scrollTop = el.scrollHeight
    }, 10)

}