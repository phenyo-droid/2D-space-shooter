const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player{
    constructor(x, y, radius, color){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.velocity=velocity
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()
        this.x= this.x + this.velocity.x
        this.y= this.y + this.velocity.y
    }
}


class Enemy {
    constructor(x, y, radius, color, velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.velocity=velocity
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()
        this.x= this.x + this.velocity.x
        this.y= this.y + this.velocity.y
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 10, 'white')
player.draw()

const projectiles = []
const enemies = []

function spawnEnemies(){
    setInterval(()=> {
        const radius = Math.random() * (30 - 4) + 4

        let x
        let y

        if(Math.random() < .5) {
         x = Math.random()<.5 ? 0 - radius : canvas.width + radius
         y = Math.random()* canvas.height

        } else {

            x = Math.random()* canvas.width
         y = Math.random()* canvas.height
        }

        const color = `hsl(${Math.random()*360}, 50%, 50%)'`

        const angle = math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy (x, y, radius, color, velocity))
    }, 1000)
}

let animationId
function animate (){
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw
    projectiles.forEach((projectile, index) => {
        projectile.update()

        // remove from edges of screen
        if (projectiles.x + projectile.radius < 0 || projectile.x - projectile.projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height ){
            setTimeout(()=> {
                projectiles.splice(projectileIndex, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if (dist - enemy.radius - projectile.radius < 1){
            cancelAnimationFrame(animationId)
        } 


        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            // when projectiles touch enemy
            if (dist - enemy.radius - projectile.radius < 1) {

                if(enemy.radius - 10 > 10){
                    enemy.radius -= 10
                     setTimeout(() => { 
                    projectiles.splice(projectileIndex, 1)
                }, 0)

                } else {
                setTimeout(() => {
                    enemies.splice(index, 1)
                    projectiles.splice(projectileIndex, 1)
                }, 0)
            }
        })
    })
}

window.addEventListener('click', (event) => {
    const angle = math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)

const velocity = {
    x: Math.cos(angle), *5
    y: Math.sin(angle) *5
}

    projectiles.push
    (new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white',velocity))
})

animate()
spawnEnemies()