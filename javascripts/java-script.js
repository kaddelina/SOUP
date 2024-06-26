document.addEventListener("DOMContentLoaded", function() {
    let Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;
    
    let engine = Engine.create();

    let width = window.innerWidth;
    let height = window.innerHeight;

    let scale = width < 1000 ? 0.125 : 0.25; 
    
    let render = Render.create({
        element: document.querySelector(".space"), 
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false, 
            background: 'transparent'
        },
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createletter(texture, scale) {
        let x = getRandomInt(0, width);
        let y = getRandomInt(-300, -100);
        let radius = 90 * (scale / 0.25); 
        return Bodies.circle(x, y, radius, {
            isStatic: false,
            friction: 0.9,
            restitution: 0.1,
            density: 0.05,
            render: {
                sprite: {
                    texture: texture,
                    xScale: scale,
                    yScale: scale
                }
            }
        });
    }

    function createTextBlock(x, y, text) {
        let fontFace = new FontFace('Arial Narrow', 'url(./fonts/arialnarrow.ttf)');
        fontFace.load().then(function(loadedFace) {
            document.fonts.add(loadedFace);

            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            
            context.font = '60px Arial Narrow'; 
            let textWidth = context.measureText(text).width;
            canvas.width = textWidth * 2; 
            canvas.height = 80; 

            context.font = '60px Arial Narrow'; 
            context.fillStyle = 'black'; 
            context.fillText(text, 0, 60); 

            let texture = canvas.toDataURL('image/png');
            
            let textBlock = Bodies.rectangle(x, y, textWidth, 40, {
                isStatic: false,
                friction: 0.9,
                restitution: 0.1,
                density: 0.05,
                render: {
                    sprite: {
                        texture: texture,
                        xScale: 0.5, 
                        yScale: 0.5
                    }
                }
            });

            World.add(engine.world, textBlock);
        }).catch(function(error) {
            console.error('Ошибка загрузки шрифта:', error);
        });
    }

    let letters = [
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
        createletter("./img/s.png", scale), 
        createletter("./img/o.png", scale),
        createletter("./img/u.png", scale),
        createletter("./img/p.png", scale),
    ];

    createTextBlock(300, -100, ' секонд-хенд SOUP');
    createTextBlock(500, -130, 'шабловка,26');
    createTextBlock(1000, -100, 'sekond@soup.ru');

    let ground = Bodies.rectangle(width / 2, height, width, 60, { 
        isStatic: true,
        render: {
            visible: false
        }
    });
    
    let leftWall = Bodies.rectangle(0, height / 2, 60, height, { 
        isStatic: true,
        render: {
            visible: false
        }
    });
    
    let rightWall = Bodies.rectangle(width, height / 2, 60, height, { 
        isStatic: true,
        render: {
            visible: false
        }
    });

    World.add(engine.world, letters);
    World.add(engine.world, ground);
    World.add(engine.world, leftWall);
    World.add(engine.world, rightWall);
    
    Engine.run(engine);
    Render.run(render);
    
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    
    World.add(engine.world, mouseConstraint);
});
